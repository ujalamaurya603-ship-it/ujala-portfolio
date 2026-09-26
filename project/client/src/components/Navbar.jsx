import React, { useEffect, useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'ai', label: 'AI' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(LINKS.map((l) => l.id))

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all border-b"
      style={{
        background: scrolled ? 'var(--surface)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderColor: scrolled ? 'var(--border)' : 'transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <a href="#home" className="font-display font-extrabold text-lg tracking-tight">
          Ujala<span style={{ color: 'var(--accent-2)' }}>.</span>dev
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative pb-1 transition-colors"
              style={{ color: active === l.id ? 'var(--ink)' : 'var(--ink-dim)' }}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-full rounded" style={{ background: 'linear-gradient(120deg,var(--accent),var(--accent-2))' }} />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="glass w-11 h-11 rounded-xl flex items-center justify-center" aria-label="Toggle theme">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={() => setMenuOpen((o) => !o)} className="md:hidden glass w-11 h-11 rounded-xl flex items-center justify-center" aria-label="Menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className="md:hidden glass mx-4 rounded-2xl relative z-10 overflow-hidden transition-all"
        style={{ maxHeight: menuOpen ? 480 : 0 }}
      >
        <div className="flex flex-col p-4 gap-1 text-sm font-medium">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} className="py-2.5 px-2" style={{ color: active === l.id ? 'var(--ink)' : 'var(--ink-dim)' }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
