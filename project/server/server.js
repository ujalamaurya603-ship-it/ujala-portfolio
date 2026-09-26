import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import aiRoutes from './routes/aiRoutes.js'

dotenv.config()

const app = express()

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '100kb' }))
app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/ai', aiRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
