import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Pre-built routes
app.use('/api/auth', authRoutes)

// Cart routes are added by [BACKEND] Issue during workshop

app.listen(PORT, () => {
  console.log(`FoodOrder API running on port ${PORT}`)
})

export default app
