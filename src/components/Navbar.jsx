import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'about',    href: '#about' },
  { label: 'skills',   href: '#skills' },
  { label: 'work',     href: '#experience' },
  { label: 'certs',    href: '#certifications' },
  { label: 'contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = links.map((l) => l.href.replace('#', ''))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(2,3,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,255,136,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold"
              style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }}
            >
              N
            </div>
            <span className="font-mono text-sm text-[#8892a4] group-hover:text-[#00ff88] transition-colors">
              ntwsk<span className="text-[#00ff88] blink">_</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l, i) => {
              const isActive = active === l.href.replace('#', '')
              return (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.3 }}
                  className="relative px-4 py-2 font-mono text-xs transition-colors"
                  style={{ color: isActive ? '#00ff88' : '#3d4a5c' }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#8892a4' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#3d4a5c' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded"
                      style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    <span style={{ color: 'rgba(0,255,136,0.3)' }}>/</span>
                    {l.label}
                  </span>
                </motion.a>
              )
            })}
            <motion.a
              href="mailto:ntwsk.tt@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="ml-3 px-4 py-1.5 font-mono text-xs rounded transition-all"
              style={{
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.25)',
                color: '#00ff88',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.08)' }}
            >
              email me
            </motion.a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded transition-colors"
            style={{ color: open ? '#00ff88' : '#3d4a5c' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{ background: 'rgba(2,3,5,0.97)', borderBottom: '1px solid rgba(0,255,136,0.08)' }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-6 py-4 font-mono text-sm transition-colors"
                style={{ color: active === l.href.replace('#','') ? '#00ff88' : '#3d4a5c', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
              >
                <span style={{ color: 'rgba(0,255,136,0.3)' }}>›</span>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
