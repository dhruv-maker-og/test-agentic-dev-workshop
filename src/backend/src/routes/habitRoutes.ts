import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getHabits,
  createHabit,
  getHabitById,
  toggleLog,
  updateHabit,
  deleteHabit,
} from '../controllers/habitController'

const router = Router()

router.get('/', authenticate, getHabits)
router.post('/', authenticate, createHabit)
router.get('/:id', authenticate, getHabitById)
router.put('/:id', authenticate, updateHabit)
router.delete('/:id', authenticate, deleteHabit)
router.post('/:id/log', authenticate, toggleLog)

export default router
