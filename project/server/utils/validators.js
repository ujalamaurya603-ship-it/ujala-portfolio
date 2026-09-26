const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim())
}

// Basic sanitizer: strips angle brackets to reduce risk of stored HTML/script injection
// being reflected back in the admin dashboard. This is not a substitute for output
// encoding on the frontend, but adds a layer of defense on top of that.
export function sanitizeText(value, maxLength = 5000) {
  if (typeof value !== 'string') return ''
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength)
}

export function validateContactPayload(body) {
  const errors = []
  const name = sanitizeText(body.name, 100)
  const email = (body.email || '').trim()
  const subject = sanitizeText(body.subject, 150)
  const message = sanitizeText(body.message, 3000)

  if (!name) errors.push('Name is required.')
  if (!isValidEmail(email)) errors.push('A valid email is required.')
  if (!message) errors.push('Message is required.')

  return { errors, data: { name, email, subject, message } }
}
