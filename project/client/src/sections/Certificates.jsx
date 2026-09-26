import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github } from 'lucide-react'
import api from '../utils/api.js'
import { FALLBACK_CERTIFICATES } from '../data/fallbackData.js'

import technorhythm from '../assets/certs/technorhythm.jpg'
import super77 from '../assets/certs/super77.jpg'
import hpLife from '../assets/certs/hp_life.jpg'
import googleAnalytics from '../assets/certs/google_analytics.jpg'
import linkedin from '../assets/certs/linkedin.jpg'
import simplilearn from '../assets/certs/simplilearn.jpg'
import hackerrank from '../assets/certs/hackerrank.jpg'
import unicef from '../assets/certs/unicef.jpg'

const LOCAL_IMAGES = {
  technorhythm, super77, hp_life: hpLife, google_analytics: googleAnalytics,
  linkedin, simplilearn, hackerrank, unicef,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] } },
}

function resolveImage(cert) {
  if (cert.image && LOCAL_IMAGES[cert.image]) {
    return LOCAL_IMAGES[cert.image]
  }

  const fallback = FALLBACK_CERTIFICATES.find(
    (item) => item.title === cert.title
  )

  if (fallback && LOCAL_IMAGES[fallback.image]) {
    return LOCAL_IMAGES[fallback.image]
  }

  return ''
}

export function Certificates() {
  const [certs, setCerts] = useState(FALLBACK_CERTIFICATES)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
  api.getCertificates().then((data) => {
    if (Array.isArray(data) && data.length) {
      setCerts(data)
    }
  }).catch(() => {})
}, [])

  return (
    <section id="certificates" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-14 max-w-2xl">
          <p className="section-tag mb-3">Certificates</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Courses &amp; achievements</h2>
          <p style={{ color: 'var(--ink-dim)' }}>Click any certificate to view it up close.</p>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {certs.map((c, i) => (
            <motion.div
              key={i} variants={fadeUp}
              className="glass rounded-[18px] overflow-hidden cursor-pointer"
              onClick={() => setLightbox(resolveImage(c))}
            >
           <img
              src={resolveImage(c)}
              alt={c.title}
              className="w-full h-[170px]
            object-contain"
            />
              <div className="p-3.5">
                <p className="font-semibold text-xs leading-snug">{c.title}</p>
                <p className="text-[11px] mt-1" style={{ color: 'var(--ink-faint)' }}>{c.organization}</p>
                <p className="text-[11px]" style={{ color: 'var(--ink-faint)' }}>{c.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: 'rgba(5,3,15,0.85)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              src={lightbox} alt="Certificate preview"
              className="rounded-2xl shadow-2xl"
              style={{ maxWidth: 'min(90vw, 560px)', maxHeight: '80vh' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function GithubActivity() {
  return (
    <section id="github-activity" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-10 text-center"
        >
          <Github size={34} className="mx-auto mb-4" style={{ color: 'var(--ink-dim)' }} />
          <h3 className="font-display font-bold text-lg mb-2">GitHub Activity</h3>
          <p className="text-sm max-w-md mx-auto mb-6" style={{ color: 'var(--ink-dim)' }}>
            Live repository stats, stars and languages will appear here once GitHub API access is connected on the backend.
          </p>
          <a href="https://github.com/ujalamaurya603-ship-it" target="_blank" rel="noopener noreferrer" className="btn btn-ghost inline-flex">
            Visit GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
