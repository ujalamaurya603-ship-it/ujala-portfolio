import { Router } from 'express'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getSkills)
router.post('/', requireAuth, createSkill)
router.put('/:id', requireAuth, updateSkill)
router.delete('/:id', requireAuth, deleteSkill)

export default router
