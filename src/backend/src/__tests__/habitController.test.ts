import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'

// Mock Prisma before importing controller
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    habit: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    habitLog: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  }
  return { PrismaClient: jest.fn(() => mockPrisma) }
})

import { PrismaClient } from '@prisma/client'
import habitRoutes from '../routes/habitRoutes'

const prisma = new PrismaClient() as unknown as {
  habit: {
    findMany: jest.Mock
    findFirst: jest.Mock
    create: jest.Mock
  }
  habitLog: {
    findUnique: jest.Mock
    create: jest.Mock
    delete: jest.Mock
  }
}

const app = express()
app.use(express.json())
app.use('/api/habits', habitRoutes)

const TEST_USER_ID = 1
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const validToken = jwt.sign({ userId: TEST_USER_ID }, JWT_SECRET, {
  expiresIn: '1h',
})

function todayUTC(): Date {
  const now = new Date()
  now.setUTCHours(0, 0, 0, 0)
  return now
}

function daysAgo(n: number): Date {
  const d = todayUTC()
  d.setUTCDate(d.getUTCDate() - n)
  return d
}

describe('Habit Tracking API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ─── GET /api/habits ─────────────────────────────────────────

  describe('GET /api/habits', () => {
    it('returns 401 without auth token', async () => {
      const res = await request(app).get('/api/habits')
      expect(res.status).toBe(401)
    })

    it('returns 200 with habits including completedToday and streak', async () => {
      const today = todayUTC()
      const mockHabits = [
        {
          id: 1,
          userId: TEST_USER_ID,
          name: 'Exercise',
          description: 'Daily exercise',
          frequency: 'Daily',
          createdAt: new Date(),
          logs: [
            { id: 1, completedDate: today, createdAt: new Date() },
            { id: 2, completedDate: daysAgo(1), createdAt: new Date() },
            { id: 3, completedDate: daysAgo(2), createdAt: new Date() },
          ],
        },
        {
          id: 2,
          userId: TEST_USER_ID,
          name: 'Read',
          description: 'Read daily',
          frequency: 'Daily',
          createdAt: new Date(),
          logs: [],
        },
      ]

      prisma.habit.findMany.mockResolvedValue(mockHabits)

      const res = await request(app)
        .get('/api/habits')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(2)
      expect(res.body[0].completedToday).toBe(true)
      expect(res.body[0].streak).toBe(3)
      expect(res.body[1].completedToday).toBe(false)
      expect(res.body[1].streak).toBe(0)
    })

    it('calculates streak correctly when today is not completed but yesterday is', async () => {
      const mockHabits = [
        {
          id: 1,
          userId: TEST_USER_ID,
          name: 'Meditate',
          description: 'Daily meditation',
          frequency: 'Daily',
          createdAt: new Date(),
          logs: [
            { id: 1, completedDate: daysAgo(1), createdAt: new Date() },
            { id: 2, completedDate: daysAgo(2), createdAt: new Date() },
            { id: 3, completedDate: daysAgo(3), createdAt: new Date() },
          ],
        },
      ]

      prisma.habit.findMany.mockResolvedValue(mockHabits)

      const res = await request(app)
        .get('/api/habits')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(200)
      expect(res.body[0].completedToday).toBe(false)
      expect(res.body[0].streak).toBe(3)
    })

    it('returns streak of 0 when neither today nor yesterday is completed', async () => {
      const mockHabits = [
        {
          id: 1,
          userId: TEST_USER_ID,
          name: 'Water',
          description: 'Drink water',
          frequency: 'Daily',
          createdAt: new Date(),
          logs: [
            { id: 1, completedDate: daysAgo(2), createdAt: new Date() },
            { id: 2, completedDate: daysAgo(3), createdAt: new Date() },
          ],
        },
      ]

      prisma.habit.findMany.mockResolvedValue(mockHabits)

      const res = await request(app)
        .get('/api/habits')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(200)
      expect(res.body[0].completedToday).toBe(false)
      expect(res.body[0].streak).toBe(0)
    })
  })

  // ─── POST /api/habits ────────────────────────────────────────

  describe('POST /api/habits', () => {
    it('returns 401 without auth token', async () => {
      const res = await request(app)
        .post('/api/habits')
        .send({ name: 'Test', description: 'desc', frequency: 'Daily' })
      expect(res.status).toBe(401)
    })

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ name: 'Test' })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeDefined()
    })

    it('returns 201 with the created habit', async () => {
      const mockHabit = {
        id: 1,
        userId: TEST_USER_ID,
        name: 'New Habit',
        description: 'A new habit',
        frequency: 'Daily',
        createdAt: new Date(),
      }

      prisma.habit.create.mockResolvedValue(mockHabit)

      const res = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          name: 'New Habit',
          description: 'A new habit',
          frequency: 'Daily',
        })

      expect(res.status).toBe(201)
      expect(res.body.id).toBe(1)
      expect(res.body.name).toBe('New Habit')
      expect(res.body.userId).toBe(TEST_USER_ID)
    })
  })

  // ─── GET /api/habits/:id ─────────────────────────────────────

  describe('GET /api/habits/:id', () => {
    it('returns 401 without auth token', async () => {
      const res = await request(app).get('/api/habits/1')
      expect(res.status).toBe(401)
    })

    it('returns 404 when habit does not exist', async () => {
      prisma.habit.findFirst.mockResolvedValue(null)

      const res = await request(app)
        .get('/api/habits/999')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('Habit not found')
    })

    it('returns 200 with habit details, streak, and logs', async () => {
      const today = todayUTC()
      const mockHabit = {
        id: 1,
        userId: TEST_USER_ID,
        name: 'Exercise',
        description: 'Daily exercise',
        frequency: 'Daily',
        createdAt: new Date(),
        logs: [
          { id: 1, completedDate: today, createdAt: new Date() },
          { id: 2, completedDate: daysAgo(1), createdAt: new Date() },
        ],
      }

      prisma.habit.findFirst.mockResolvedValue(mockHabit)

      const res = await request(app)
        .get('/api/habits/1')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(200)
      expect(res.body.id).toBe(1)
      expect(res.body.completedToday).toBe(true)
      expect(res.body.streak).toBe(2)
      expect(res.body.logs).toHaveLength(2)
    })
  })

  // ─── POST /api/habits/:id/log ────────────────────────────────

  describe('POST /api/habits/:id/log', () => {
    it('returns 401 without auth token', async () => {
      const res = await request(app).post('/api/habits/1/log')
      expect(res.status).toBe(401)
    })

    it('returns 404 when habit does not exist', async () => {
      prisma.habit.findFirst.mockResolvedValue(null)

      const res = await request(app)
        .post('/api/habits/999/log')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('Habit not found')
    })

    it('creates a log and returns completed: true when no log exists for today', async () => {
      prisma.habit.findFirst.mockResolvedValue({
        id: 1,
        userId: TEST_USER_ID,
        name: 'Exercise',
        description: 'Daily exercise',
        frequency: 'Daily',
        createdAt: new Date(),
      })
      prisma.habitLog.findUnique.mockResolvedValue(null)
      prisma.habitLog.create.mockResolvedValue({
        id: 1,
        habitId: 1,
        completedDate: todayUTC(),
        createdAt: new Date(),
      })

      const res = await request(app)
        .post('/api/habits/1/log')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(200)
      expect(res.body.completed).toBe(true)
    })

    it('removes the log and returns completed: false when a log already exists for today', async () => {
      const existingLog = {
        id: 1,
        habitId: 1,
        completedDate: todayUTC(),
        createdAt: new Date(),
      }

      prisma.habit.findFirst.mockResolvedValue({
        id: 1,
        userId: TEST_USER_ID,
        name: 'Exercise',
        description: 'Daily exercise',
        frequency: 'Daily',
        createdAt: new Date(),
      })
      prisma.habitLog.findUnique.mockResolvedValue(existingLog)
      prisma.habitLog.delete.mockResolvedValue(existingLog)

      const res = await request(app)
        .post('/api/habits/1/log')
        .set('Authorization', `Bearer ${validToken}`)

      expect(res.status).toBe(200)
      expect(res.body.completed).toBe(false)
    })
  })
})
