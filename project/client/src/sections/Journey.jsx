import React from 'react'
import { motion } from 'framer-motion'
import { TIMELINE } from '../data/fallbackData.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] } },
}

export default function Journey() {
  return (
    <section id="journey" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-14 max-w-2xl">
          <p className="section-tag mb-3">Journey</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Milestones so far</h2>
        </motion.div>

        <div className="relative pl-10">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(var(--accent), var(--accent-2))' }} />
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-10"
          >
            {TIMELINE.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                <div
                  className="absolute w-3.5 h-3.5 rounded-full border-2"
                  style={{ left: -31, top: 4, background: 'var(--bg)', borderColor: 'var(--accent-2)', boxShadow: '0 0 0 5px rgba(255,61,143,0.15)' }}
                />
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-2)' }}>{t.year}</p>
                <h3 className="font-display font-bold text-base mb-1">{t.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
