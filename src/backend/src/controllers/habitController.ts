import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

/**
 * Returns today's date at midnight UTC.
 */
function todayUTC(): Date {
  const now = new Date()
  now.setUTCHours(0, 0, 0, 0)
  return now
}

/**
 * Calculates the current streak for a habit based on its completion logs.
 * The streak is the number of consecutive days (ending today or yesterday)
 * the habit was logged as complete.
 */
function calculateStreak(logs: { completedDate: Date }[]): number {
  if (logs.length === 0) return 0

  const completedSet = new Set(
    logs.map((log) => {
      const d = new Date(log.completedDate)
      d.setUTCHours(0, 0, 0, 0)
      return d.toISOString().split('T')[0]
    })
  )

  const today = todayUTC()
  let checkDate = new Date(today)

  // If today is not completed, start checking from yesterday
  const todayStr = checkDate.toISOString().split('T')[0]
  if (!completedSet.has(todayStr)) {
    checkDate.setUTCDate(checkDate.getUTCDate() - 1)
    const yesterdayStr = checkDate.toISOString().split('T')[0]
    if (!completedSet.has(yesterdayStr)) {
      return 0
    }
  }

  let streak = 0
  while (completedSet.has(checkDate.toISOString().split('T')[0])) {
    streak++
    checkDate.setUTCDate(checkDate.getUTCDate() - 1)
  }

  return streak
}

/**
 * GET /api/habits
 * Returns all habits for the authenticated user with today's completion status and current streak.
 */
export const getHabits = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!

    const habits = await prisma.habit.findMany({
      where: { userId },
      include: { logs: true },
    })

    const today = todayUTC()
    const todayStr = today.toISOString().split('T')[0]

    const result = habits.map((habit) => {
      const completedToday = habit.logs.some((log) => {
        const logDate = new Date(log.completedDate)
        logDate.setUTCHours(0, 0, 0, 0)
        return logDate.toISOString().split('T')[0] === todayStr
      })

      const streak = calculateStreak(habit.logs)

      return {
        id: habit.id,
        userId: habit.userId,
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        createdAt: habit.createdAt,
        completedToday,
        streak,
      }
    })

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * POST /api/habits
 * Creates a new habit for the authenticated user.
 */
export const createHabit = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!
    const { name, description, frequency } = req.body

    if (!name || !description || !frequency) {
      res
        .status(400)
        .json({ error: 'Name, description and frequency are required' })
      return
    }

    const habit = await prisma.habit.create({
      data: { userId, name, description, frequency },
    })

    res.status(201).json({
      id: habit.id,
      userId: habit.userId,
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      createdAt: habit.createdAt,
    })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * GET /api/habits/:id
 * Returns habit details with recent completion logs and current streak.
 */
export const getHabitById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!
    const habitId = parseInt(req.params.id, 10)

    if (isNaN(habitId)) {
      res.status(400).json({ error: 'Invalid habit ID' })
      return
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
      include: {
        logs: {
          orderBy: { completedDate: 'desc' },
        },
      },
    })

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' })
      return
    }

    const today = todayUTC()
    const todayStr = today.toISOString().split('T')[0]

    const completedToday = habit.logs.some((log) => {
      const logDate = new Date(log.completedDate)
      logDate.setUTCHours(0, 0, 0, 0)
      return logDate.toISOString().split('T')[0] === todayStr
    })

    const streak = calculateStreak(habit.logs)

    res.status(200).json({
      id: habit.id,
      userId: habit.userId,
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      createdAt: habit.createdAt,
      streak,
      completedToday,
      logs: habit.logs.map((log) => ({
        id: log.id,
        completedDate: log.completedDate,
        createdAt: log.createdAt,
      })),
    })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * POST /api/habits/:id/log
 * Toggles today's completion for a habit.
 */
export const toggleLog = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!
    const habitId = parseInt(req.params.id, 10)

    if (isNaN(habitId)) {
      res.status(400).json({ error: 'Invalid habit ID' })
      return
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
    })

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' })
      return
    }

    const today = todayUTC()

    const existingLog = await prisma.habitLog.findUnique({
      where: {
        habitId_completedDate: {
          habitId,
          completedDate: today,
        },
      },
    })

    if (existingLog) {
      await prisma.habitLog.delete({
        where: { id: existingLog.id },
      })
      res.status(200).json({ completed: false })
    } else {
      await prisma.habitLog.create({
        data: {
          habitId,
          completedDate: today,
        },
      })
      res.status(200).json({ completed: true })
    }
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * PUT /api/habits/:id
 * Updates a habit's name, description, or frequency.
 */
export const updateHabit = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!
    const habitId = parseInt(req.params.id, 10)

    if (isNaN(habitId)) {
      res.status(400).json({ error: 'Invalid habit ID' })
      return
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
    })

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' })
      return
    }

    const { name, description, frequency } = req.body

    const updated = await prisma.habit.update({
      where: { id: habitId },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(frequency !== undefined && { frequency }),
      },
    })

    res.status(200).json({
      id: updated.id,
      userId: updated.userId,
      name: updated.name,
      description: updated.description,
      frequency: updated.frequency,
      createdAt: updated.createdAt,
    })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * DELETE /api/habits/:id
 * Deletes a habit and all associated completion logs.
 */
export const deleteHabit = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!
    const habitId = parseInt(req.params.id, 10)

    if (isNaN(habitId)) {
      res.status(400).json({ error: 'Invalid habit ID' })
      return
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, userId },
    })

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' })
      return
    }

    await prisma.habitLog.deleteMany({
      where: { habitId },
    })

    await prisma.habit.delete({
      where: { id: habitId },
    })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
