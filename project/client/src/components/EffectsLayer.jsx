import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

// Bundles: loading screen, custom cursor, animated background (mesh + grid + blobs + particles),
// scroll progress bar, and back-to-top button. Mounted once near the root of the app.
export default function EffectsLayer() {
  const [loading, setLoading] = useState(true)
  const reducedMotion = useReducedMotion()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  // custom cursor
  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(hover:hover)').matches) return
    let mx = 0, my = 0, rx = 0, ry = 0, raf
    const dot = dotRef.current
    const ring = ringRef.current
    function onMove(e) {
      mx = e.clientX; my = e.clientY
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }
    function animRing() {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animRing)
    }
    window.addEventListener('mousemove', onMove)
    animRing()

    function grow() { ring && ring.classList.add('grow') }
    function shrink() { ring && ring.classList.remove('grow') }
    const interactive = document.querySelectorAll('a, button, input, textarea, [data-cursor-grow]')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [reducedMotion, loading])

  // scroll progress + back to top
  useEffect(() => {
    function onScroll() {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0)
      setShowTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, particles = [], raf

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = reducedMotion ? 0 : window.innerWidth < 768 ? 28 : 55
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      })
    }
    function draw() {
      ctx.clearRect(0, 0, w, h)
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? 'rgba(200,190,255,0.5)' : 'rgba(123,47,247,0.35)'
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    if (count > 0) draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [reducedMotion])

  return (
    <>
      {/* Loader */}
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center transition-opacity duration-500"
        style={{
          background: 'var(--bg)',
          opacity: loading ? 1 : 0,
          visibility: loading ? 'visible' : 'hidden',
        }}
      >
        <div className="font-display font-extrabold text-3xl grad-text animate-pulse">UM.</div>
      </div>

      {/* Custom cursor (desktop only) */}
      <div ref={dotRef} className="cursor-dot fixed top-0 left-0 w-[7px] h-[7px] rounded-full pointer-events-none z-[9999]" style={{ background: 'var(--accent-2)' }} />
      <div ref={ringRef} className="cursor-ring fixed top-0 left-0 w-[34px] h-[34px] rounded-full pointer-events-none z-[9999] border transition-all" style={{ borderColor: 'var(--accent)', opacity: 0.55 }} />

      {/* Background field */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -inset-[10%] blur-md"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(123,47,247,0.16), transparent 40%), radial-gradient(circle at 80% 15%, rgba(255,61,143,0.14), transparent 40%), radial-gradient(circle at 50% 80%, rgba(0,212,184,0.10), transparent 45%)',
          }}
        />
        {!reducedMotion && (
          <>
            <div className="absolute rounded-full blur-[80px] opacity-40 animate-[blobDrift_24s_ease-in-out_infinite]" style={{ width: 480, height: 480, background: 'var(--accent)', top: -120, left: -100 }} />
            <div className="absolute rounded-full blur-[80px] opacity-40 animate-[blobDrift_24s_ease-in-out_infinite]" style={{ width: 420, height: 420, background: 'var(--accent-2)', bottom: -100, right: -80, animationDelay: '-8s' }} />
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 h-[3px] z-[60]" style={{ width: `${progress}%`, background: 'linear-gradient(120deg,var(--accent),var(--accent-2))' }} />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
        className={`glass fixed bottom-6 left-6 z-[60] w-11 h-11 rounded-full flex items-center justify-center transition-all ${showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
