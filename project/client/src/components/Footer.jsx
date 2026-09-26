import React from 'react'

export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-10 text-sm px-6" style={{ color: 'var(--ink-faint)' }}>
      © {new Date().getFullYear()} Ujala Maurya. Built with care, currently a work in progress.
    </footer>
  )
}
