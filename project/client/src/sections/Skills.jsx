import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, FileCode2, Palette, Atom, Database, GitBranch, Github, Wrench } from 'lucide-react'
import api from '../utils/api.js'
import { FALLBACK_SKILLS } from '../data/fallbackData.js'

const ICONS = {
  code: Code2, js: FileCode2, html: FileCode2, css: Palette,
  react: Atom, db: Database, git: GitBranch, github: Github, tool: Wrench,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] } },
}

function SkillCard({ skill }) {
  const Icon = ICONS[skill.icon] || Code2
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="group glass rounded-[18px] p-5 relative overflow-hidden transition-shadow"
      style={{ '--tw-shadow': 'none' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div className="mb-3 transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ color: 'var(--accent)' }}>
        <Icon size={26} />
      </div>
      <p className="font-semibold text-sm">{skill.name}</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--ink-faint)' }}>{skill.category}</p>
      <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
        <p className="text-xs leading-snug" style={{ color: 'var(--ink-dim)' }}>{skill.description}</p>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState(FALLBACK_SKILLS)

  useEffect(() => {
    api.getSkills().then((data) => { if (Array.isArray(data) && data.length) setSkills(data) }).catch(() => {})
  }, [])

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-14 max-w-2xl">
          <p className="section-tag mb-3">Skills</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">My skill ecosystem</h2>
          <p style={{ color: 'var(--ink-dim)' }}>Hover a card to see what it's for. No inflated percentages — just what I actually work with.</p>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {skills.map((s, i) => <SkillCard key={s.name + i} skill={s} />)}
        </motion.div>
      </div>
    </section>
  )
}
