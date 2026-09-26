import Certificate from '../models/Certificate.js'

export async function getCertificates(req, res) {
  const certs = await Certificate.find().sort({ order: 1, createdAt: -1 })
  res.json(certs)
}

export async function createCertificate(req, res) {
  const { title, organization, date, imageUrl, verifyUrl, order } = req.body
  if (!title || !organization || !imageUrl) {
    return res.status(400).json({ message: 'Title, organization and imageUrl are required.' })
  }
  const cert = await Certificate.create({ title, organization, date, imageUrl, verifyUrl, order })
  res.status(201).json(cert)
}

export async function updateCertificate(req, res) {
  const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!cert) return res.status(404).json({ message: 'Certificate not found.' })
  res.json(cert)
}

export async function deleteCertificate(req, res) {
  const cert = await Certificate.findByIdAndDelete(req.params.id)
  if (!cert) return res.status(404).json({ message: 'Certificate not found.' })
  res.json({ message: 'Certificate deleted.' })
}
