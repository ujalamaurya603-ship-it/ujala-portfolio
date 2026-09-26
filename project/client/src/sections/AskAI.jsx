import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import api from '../utils/api.js'
import { AI_FALLBACK_KB } from '../data/fallbackData.js'

const SUGGESTIONS = [
  'What technologies does Ujala know?',
  'Tell me about her projects',
  'How can I contact her?',
]

function fallbackAnswer(query) {
  const q = query.toLowerCase()
  if (/tech|know|skill|stack|language/.test(q)) return AI_FALLBACK_KB.technologies
  if (/project|built|build|work/.test(q)) return AI_FALLBACK_KB.projects
  if (/learn|currently|now/.test(q)) return AI_FALLBACK_KB.learning
  if (/contact|reach|email|phone|call/.test(q)) return AI_FALLBACK_KB.contact
  if (/certificat|course|achievement/.test(q)) return AI_FALLBACK_KB.certificates
  if (/educat|bca|degree|college|study/.test(q)) return AI_FALLBACK_KB.education
  return AI_FALLBACK_KB.default
}

export default function AskAI() {
  const [messages, setMessages] = useState([
    { who: 'ai', text: "Hi! I'm a demo assistant for Ujala's portfolio. Ask me about her skills, projects, certificates, or how to get in touch." },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const windowRef = useRef(null)

  useEffect(() => {
    if (windowRef.current) windowRef.current.scrollTop = windowRef.current.scrollHeight
  }, [messages, typing])

  async function send(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { who: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    try {
      // Real requests go through the backend (server/controllers/aiController.js),
      // which calls an AI provider if configured, or returns a safe rule-based fallback.
      const data = await api.askAI(trimmed)
      setMessages((m) => [...m, { who: 'ai', text: data.reply }])
    } catch {
      setMessages((m) => [...m, { who: 'ai', text: fallbackAnswer(trimmed) }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <section id="ai" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }} className="mb-10 text-center"
        >
          <p className="section-tag mb-3">Ask Ujala AI</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Have a question? Ask the AI.</h2>
          <p style={{ color: 'var(--ink-dim)' }}>Try: "What technologies does Ujala know?" or "Tell me about her projects."</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-3xl overflow-hidden"
        >
          <div ref={windowRef} className="p-6 space-y-4 overflow-y-auto" style={{ height: 340 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                className="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  m.who === 'user'
                    ? { marginLeft: 'auto', background: 'linear-gradient(120deg,var(--accent),var(--accent-2))', color: '#fff', borderBottomRightRadius: 4 }
                    : { background: 'var(--surface)', border: '1px solid var(--border)', borderBottomLeftRadius: 4 }
                }
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="px-4 py-2.5 rounded-2xl inline-flex gap-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--ink-dim)' }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--ink-dim)', animationDelay: '0.15s' }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--ink-dim)', animationDelay: '0.3s' }} />
              </div>
            )}
          </div>
          <div className="border-t p-4 flex gap-3" style={{ borderColor: 'var(--border)' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              type="text" placeholder="Ask something about Ujala..." className="field flex-1"
            />
            <button onClick={() => send(input)} className="btn btn-primary px-5"><Send size={16} /></button>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {SUGGESTIONS.map((s) => (
            <button
              key={s} onClick={() => send(s)}
              className="text-xs px-3.5 py-2 rounded-full border"
              style={{ borderColor: 'var(--border)', color: 'var(--ink-dim)', background: 'var(--surface)' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
