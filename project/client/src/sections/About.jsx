import React from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.3, 1] } },
}

function StatCard({ target, suffix = '', label }) {
  const { ref, display } = useCountUp(target, { suffix })
  return (
    <motion.div ref={ref} variants={fadeUp} className="glass rounded-[20px] px-5 py-6 text-center">
      <div className="font-display font-extrabold text-4xl grad-text">{display}</div>
      <p className="text-xs mt-1 font-medium" style={{ color: 'var(--ink-dim)' }}>{label}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <p className="section-tag mb-3">About Me</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">A student developer, building deliberately</h2>
          <p className="leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
            I'm currently pursuing my Bachelor of Computer Applications, using every project as a chance to
            sharpen both my code and my sense of what makes an interface actually work for people. I care about
            clean, responsive design as much as I care about clean logic underneath it.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-2 gap-10 items-start mb-16"
        >
          <motion.div variants={fadeUp} className="glass rounded-2xl p-8">
            <h3 className="font-display font-bold text-lg mb-4">What drives me</h3>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--ink-dim)' }}>
              <li className="flex gap-3"><span style={{ color: 'var(--accent-2)' }}>●</span> Building responsive, user-friendly web experiences</li>
              <li className="flex gap-3"><span style={{ color: 'var(--accent-2)' }}>●</span> Strengthening core programming &amp; problem-solving skills</li>
              <li className="flex gap-3"><span style={{ color: 'var(--accent-2)' }}>●</span> Learning by shipping — personal projects, not just coursework</li>
              <li className="flex gap-3"><span style={{ color: 'var(--accent-2)' }}>●</span> Collaborating well — teamwork, leadership, clear communication</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="glass rounded-2xl p-8">
            <h3 className="font-display font-bold text-lg mb-4">Currently</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
              Pursuing my BCA degree while exploring AI tools, backend fundamentals, and more advanced
              React patterns — always looking for the next small thing to build and break and learn from.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          <StatCard target={3} label="Projects Built" />
          <StatCard target={12} label="Technologies" />
          <StatCard target={8} label="Certificates" />
          <StatCard target={150} suffix="+" label="Learning Hours" />
        </motion.div>
      </div>
    </section>
  )
}
