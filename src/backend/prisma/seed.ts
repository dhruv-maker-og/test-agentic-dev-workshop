import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  })

  console.log('Seed complete — test user ready')

  // --- Habit seed data ---
  const now = new Date()

  const morningExercise = await prisma.habit.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: testUser.id,
      name: 'Morning Exercise',
      description: '30 minutes of morning workout',
      frequency: 'Daily',
    },
  })

  const read30Minutes = await prisma.habit.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: testUser.id,
      name: 'Read 30 Minutes',
      description: 'Read a book for at least 30 minutes',
      frequency: 'Daily',
    },
  })

  const drinkWater = await prisma.habit.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: testUser.id,
      name: 'Drink Water',
      description: 'Drink at least 8 glasses of water',
      frequency: 'Daily',
    },
  })

  console.log('Seed complete — habits ready')

  // --- HabitLog seed data ---
  // Helper to get a date N days ago at midnight UTC
  function daysAgo(n: number): Date {
    const d = new Date(now)
    d.setUTCDate(d.getUTCDate() - n)
    d.setUTCHours(0, 0, 0, 0)
    return d
  }

  // Morning Exercise: logs for the past 5 consecutive days (streak of 5)
  for (let i = 0; i < 5; i++) {
    const completedDate = daysAgo(i)
    await prisma.habitLog.upsert({
      where: {
        habitId_completedDate: {
          habitId: morningExercise.id,
          completedDate,
        },
      },
      update: {},
      create: {
        habitId: morningExercise.id,
        completedDate,
      },
    })
  }

  // Read 30 Minutes: logs for the past 3 consecutive days (streak of 3)
  for (let i = 0; i < 3; i++) {
    const completedDate = daysAgo(i)
    await prisma.habitLog.upsert({
      where: {
        habitId_completedDate: {
          habitId: read30Minutes.id,
          completedDate,
        },
      },
      update: {},
      create: {
        habitId: read30Minutes.id,
        completedDate,
      },
    })
  }

  // Drink Water: logs for 2 days ago and 3 days ago only (streak of 0 — missed yesterday)
  for (const daysBack of [2, 3]) {
    const completedDate = daysAgo(daysBack)
    await prisma.habitLog.upsert({
      where: {
        habitId_completedDate: {
          habitId: drinkWater.id,
          completedDate,
        },
      },
      update: {},
      create: {
        habitId: drinkWater.id,
        completedDate,
      },
    })
  }

  console.log('Seed complete — habit logs ready')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
