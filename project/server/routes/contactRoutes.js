import { Router } from 'express'
import { submitContact, getMessages } from '../controllers/contactController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { strictLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/', strictLimiter, submitContact)
router.get('/', requireAuth, getMessages)

export default router
