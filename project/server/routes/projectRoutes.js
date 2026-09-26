import { Router } from 'express'
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getProjects)
router.post('/', requireAuth, createProject)
router.put('/:id', requireAuth, updateProject)
router.delete('/:id', requireAuth, deleteProject)

export default router
