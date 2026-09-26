import { Router } from 'express'
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../controllers/certificateController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getCertificates)
router.post('/', requireAuth, createCertificate)
router.put('/:id', requireAuth, updateCertificate)
router.delete('/:id', requireAuth, deleteCertificate)

export default router
