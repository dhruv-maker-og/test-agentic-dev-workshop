import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import habitRoutes from './routes/habitRoutes'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Pre-built routes
app.use('/api/auth', authRoutes)

// Feature routes are added by [BACKEND] Issues during the workshop
app.use('/api/habits', habitRoutes)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})

export default app
