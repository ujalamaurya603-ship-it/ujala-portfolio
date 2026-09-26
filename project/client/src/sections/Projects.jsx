import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import api from '../utils/api.js'
import { FALLBACK_PROJECTS } from '../data/fallbackData.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] } },
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-5"
        style={{ background: 'rgba(5,3,15,0.75)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, scale: 0.97, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.97, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="glass rounded-3xl max-w-2xl w-full p-8 relative max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center">
            <X size={16} />
          </button>
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-2)' }}>{project.subtitle}</p>
          <h3 className="font-display font-bold text-2xl mb-4">{project.title}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-dim)' }}>{project.longDescription || project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech?.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--ink-dim)', background: 'var(--surface)' }}>{t}</span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectCard({ project, onView }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="glass rounded-[22px] overflow-hidden group transition-shadow"
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{ background: 'linear-gradient(120deg,var(--accent),var(--accent-2))', opacity: 0.85 }}
        >
          <span className="font-display font-extrabold text-white text-2xl px-4 text-center">{project.title}</span>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.55), transparent 60%)' }} />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-2)' }}>{project.subtitle}</p>
        <h3 className="font-display font-bold text-lg mb-2">{project.title}</h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech?.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--ink-dim)', background: 'var(--surface)' }}>{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xs px-4 py-2.5">
              <Github size={14} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xs px-4 py-2.5">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          <button onClick={() => onView(project)} className="btn btn-primary text-xs px-4 py-2.5">View Details</button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [active, setActive] = useState(null)

  useEffect(() => {
    api.getProjects().then((data) => { if (Array.isArray(data) && data.length) setProjects(data) }).catch(() => {})
  }, [])

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-14 max-w-2xl">
          <p className="section-tag mb-3">Projects</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Things I've built</h2>
          <p style={{ color: 'var(--ink-dim)' }}>Loaded from the backend once connected — these come from the database, not hardcoded markup.</p>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-3 gap-7"
        >
          {projects.map((p) => <ProjectCard key={p._id || p.title} project={p} onView={setActive} />)}
        </motion.div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
