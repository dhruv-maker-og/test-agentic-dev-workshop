import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getHabits,
  createHabit,
  getHabitById,
  toggleLog,
} from '../controllers/habitController'

const router = Router()

router.get('/', authenticate, getHabits)
router.post('/', authenticate, createHabit)
router.get('/:id', authenticate, getHabitById)
router.post('/:id/log', authenticate, toggleLog)

export default router
