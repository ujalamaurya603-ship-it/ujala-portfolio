import Message from '../models/Message.js'
import { validateContactPayload } from '../utils/validators.js'

export async function submitContact(req, res) {
  const { errors, data } = validateContactPayload(req.body)
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') })
  }

  const saved = await Message.create(data)
  res.status(201).json({ message: 'Message received.', id: saved._id })
}

// Admin-only: list messages
export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 })
  res.json(messages)
}
