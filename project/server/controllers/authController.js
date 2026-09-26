import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { isValidEmail } from '../utils/validators.js'

export async function login(req, res) {
  const { email, password } = req.body

  if (!isValidEmail(email) || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const valid = await user.comparePassword(password)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  res.json({ token, user: { email: user.email, role: user.role } })
}
