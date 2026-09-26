import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin } from 'lucide-react'
import api from '../utils/api.js'
import { useToast } from '../context/ToastContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please fill in all required fields.', 'error')
      return
    }
    if (!EMAIL_RE.test(form.email)) {
      showToast('Please enter a valid email address.', 'error')
      return
    }
    setSending(true)
    try {
      await api.sendContact(form)
      showToast('Message sent! Ujala will get back to you soon.', 'success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      showToast(err.message || 'Something went wrong. Please try again.', 'error')
    } finally {
      setSending(false)
    }
  }

  function copyEmail(e) {
    e.preventDefault()
    navigator.clipboard?.writeText('ujalamaurya603@gmail.com')
      .then(() => showToast('Email copied to clipboard!', 'success'))
      .catch(() => { window.location.href = 'mailto:ujalamaurya603@gmail.com' })
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }} className="mb-12 text-center"
        >
          <p className="section-tag mb-3">Contact</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Let's build something together</h2>
          <p style={{ color: 'var(--ink-dim)' }}>Open to opportunities, collaborations, and conversations about web development.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-3xl p-8 md:p-10 mb-10"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--ink-dim)' }}>Name</label>
              <input required value={form.name} onChange={update('name')} type="text" placeholder="Your name" className="field" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--ink-dim)' }}>Email</label>
              <input required value={form.email} onChange={update('email')} type="email" placeholder="you@example.com" className="field" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--ink-dim)' }}>Subject</label>
              <input required value={form.subject} onChange={update('subject')} type="text" placeholder="What's this about?" className="field" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--ink-dim)' }}>Message</label>
              <textarea required value={form.message} onChange={update('message')} rows={4} placeholder="Write your message..." className="field" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={sending} className="btn btn-primary w-full md:w-auto justify-center disabled:opacity-60">
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-wrap justify-center gap-4"
        >
          <a href="mailto:ujalamaurya603@gmail.com" onClick={copyEmail} className="btn btn-ghost">
            <Mail size={16} /> ujalamaurya603@gmail.com
          </a>
          <a href="tel:+916386666767" className="btn btn-ghost"><Phone size={16} /> +91 6386666767</a>
          <a href="https://github.com/ujalamaurya603-ship-it" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Github size={16} /> GitHub</a>
          <a href="https://www.linkedin.com/in/ujala-maurya-b09a6b381" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Linkedin size={16} /> LinkedIn</a>
        </motion.div>
      </div>
    </section>
  )
}
