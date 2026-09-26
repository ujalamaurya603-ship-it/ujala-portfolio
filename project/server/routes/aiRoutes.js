import { Router } from 'express'
import { askAI } from '../controllers/aiController.js'
import { strictLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/ask', strictLimiter, askAI)

export default router
