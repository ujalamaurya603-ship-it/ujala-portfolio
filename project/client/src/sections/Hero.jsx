import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useToast } from '../context/ToastContext.jsx'
import profileImg from '../assets/profile.jpg'

const ROLES = ['Web Developer', 'BCA Student', 'Problem Solver', 'Future Software Engineer']

function useTypingEffect(reducedMotion) {
  const [text, setText] = useState(reducedMotion ? ROLES[0] : '')
  useEffect(() => {
    if (reducedMotion) return
    let roleIdx = 0, charIdx = 0, deleting = false, timeout
    function loop() {
      const current = ROLES[roleIdx]
      if (!deleting) {
        charIdx++
        setText(current.slice(0, charIdx))
        if (charIdx === current.length) {
          deleting = true
          timeout = setTimeout(loop, 1400)
          return
        }
      } else {
        charIdx--
        setText(current.slice(0, charIdx))
        if (charIdx === 0) {
          deleting = false
          roleIdx = (roleIdx + 1) % ROLES.length
        }
      }
      timeout = setTimeout(loop, deleting ? 45 : 85)
    }
    loop()
    return () => clearTimeout(timeout)
  }, [reducedMotion])
  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.3, 1] } },
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const typedText = useTypingEffect(reducedMotion)
  const { showToast } = useToast()
  const wrapRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return
    function onMove(e) {
      const r = wrap.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
    }
    function onLeave() { card.style.transform = 'rotateY(0) rotateX(0)' }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion])

  return (
    <section id="home" className="min-h-screen flex items-center pt-28 pb-16 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-14 items-center"
      >
        <div>
          <motion.div variants={item} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-3)', boxShadow: '0 0 10px 2px var(--accent-3)' }} />
            Currently learning: Advanced React &amp; Backend Development
          </motion.div>

          <motion.p variants={item} className="font-display text-lg md:text-xl font-semibold mb-2" style={{ color: 'var(--ink-dim)' }}>
            Hi, I'm
          </motion.p>

          <motion.h1 variants={item} className="font-display font-extrabold text-5xl md:text-6xl leading-[1.05] mb-4">
            Ujala <span className="grad-text">Maurya</span>
          </motion.h1>

          <motion.div variants={item} className="font-display text-xl md:text-2xl font-semibold mb-5 h-8" style={{ color: 'var(--accent-2)' }}>
            {typedText}
            <span className="inline-block w-[2px] ml-0.5 animate-pulse" style={{ background: 'var(--accent-2)' }}>&nbsp;</span>
          </motion.div>

          <motion.p variants={item} className="max-w-lg mb-8 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
            I build modern, responsive and user-friendly websites — currently sharpening my skills
            as a BCA student, one project and one problem at a time.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"              
            >
              Download Resume 
            </a>
            <a href="#contact" className="btn btn-ghost">Contact Me</a>
          </motion.div>
        </div>

        <motion.div variants={item} ref={wrapRef} style={{ perspective: 1000 }}>
          <div
            ref={cardRef}
            className="relative w-full max-w-[320px] aspect-square mx-auto rounded-[32px] transition-transform duration-150"
            style={{ transformStyle: 'preserve-3d', animation: reducedMotion ? 'none' : 'floatY 6s ease-in-out infinite' }}
          >
            <div className="absolute -inset-8 rounded-full -z-10 blur-2xl" style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.35), transparent 65%)' }} />
            <div
              className="absolute -inset-[3px] rounded-[34px] p-[3px]"
              style={{
                background: 'conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: reducedMotion ? 'none' : 'spin 8s linear infinite',
              }}
            />
            <div className="relative w-full h-full rounded-[30px] overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              <img src={profileImg} alt="Ujala Maurya" className="w-full h-full object-cover" />
            </div>
            <div className="glass absolute -bottom-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-2)' }} />
              BCA Student &middot; Web Developer
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}
