import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ExternalLink, GitFork, Link2, ChevronDown } from 'lucide-react'
import { profile } from '../data/resume'

const AVATAR_URL = `${import.meta.env.BASE_URL}my-image.png`

// Animated terminal lines
const TERMINAL_LINES = [
  { delay: 0.5,  text: '$ whoami',                                         color: '#00ff88' },
  { delay: 0.9,  text: 'Nuttawut Sukaew',                                  color: '#e2e8f0' },
  { delay: 1.3,  text: '$ cat role.txt',                                   color: '#00ff88' },
  { delay: 1.6,  text: 'Salesforce Developer',                             color: '#7dd3fc' },
  { delay: 1.9,  text: '@ ATA IT Limited (National Bank of Canada group)', color: '#7dd3fc' },
  { delay: 2.4,  text: '$ cat experience.txt',                             color: '#00ff88' },
  { delay: 2.7,  text: 'Former Accenture & I&I Group — 6+ years',         color: '#e2e8f0' },
  { delay: 3.1,  text: '$ cat stack.txt',                                  color: '#00ff88' },
  { delay: 3.4,  text: 'Apex · LWC · Aura · SF Flow · SOQL',              color: '#a855f7' },
  { delay: 3.7,  text: 'Marketing Cloud · Dialogflow CX · AWS',           color: '#a855f7' },
  { delay: 4.0,  text: 'JavaScript · Python · Robot Framework',           color: '#a855f7' },
]

// Floating particle
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function Hero() {
  const [typed, setTyped] = useState([])
  const canvasRef = useRef(null)

  // Terminal typewriter
  useEffect(() => {
    setTyped([])
    const ids = TERMINAL_LINES.map((line) =>
      setTimeout(() => {
        setTyped((prev) => [...prev, line])
      }, line.delay * 1000)
    )
    return () => { ids.forEach(clearTimeout); setTyped([]) }
  }, [])

  // Matrix rain canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width  = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    const cols  = Math.floor(W / 18)
    const drops = Array(cols).fill(1)
    const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコ'

    const draw = () => {
      ctx.fillStyle = 'rgba(2,3,5,0.05)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(0,255,136,0.15)'
      ctx.font = '13px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 18, y * 18)
        if (y * 18 > H && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }
    const id = setInterval(draw, 60)

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => { clearInterval(id); window.removeEventListener('resize', onResize) }
  }, [])

  const particles = Array.from({ length: 12 }, (_, i) => ({
    width:  2 + Math.random() * 3 + 'px',
    height: 2 + Math.random() * 3 + 'px',
    left:   Math.random() * 100 + '%',
    top:    Math.random() * 100 + '%',
    background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#0ea5e9' : '#a855f7',
    boxShadow: `0 0 6px ${i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#0ea5e9' : '#a855f7'}`,
  }))

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-16"
      style={{ background: 'linear-gradient(160deg, #020305 0%, #040810 50%, #020305 100%)' }}
    >
      {/* Matrix canvas — subtle background layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      />

      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 65%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%)' }} />

      {/* Floating particles */}
      {particles.map((p, i) => <Particle key={i} style={p} />)}

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: text ───────────────────────────────── */}
            <div>
              {/* Stage label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="sec-label mb-3"
              >
                STAGE 01 — PROFILE
              </motion.p>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full font-mono text-xs"
                style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7' }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#a855f7]" />
                Anime &amp; YouTube 24/7 &amp; Vibe coding with AI enthusiast
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16,1,0.3,1] }}
                className="font-sans font-bold mb-4 leading-[1.05]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', color: '#e2e8f0', letterSpacing: '-0.03em' }}
              >
                {profile.name}
              </motion.h1>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-semibold transition-all"
                  style={{ background: '#00ff88', color: '#020305', boxShadow: '0 0 24px rgba(0,255,136,0.35)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 36px rgba(0,255,136,0.55)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 24px rgba(0,255,136,0.35)' }}
                >
                  <ExternalLink size={14} />
                  Email Me
                </a>
                <a
                  href={profile.github}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892a4' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'; e.currentTarget.style.color = '#00ff88' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#8892a4' }}
                >
                  <GitFork size={14} /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892a4' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'; e.currentTarget.style.color = '#0ea5e9' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#8892a4' }}
                >
                  <Link2 size={14} /> LinkedIn
                </a>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-1.5 font-mono text-xs"
                style={{ color: '#3d4a5c' }}
              >
                <MapPin size={12} style={{ color: '#00ff88' }} />
                {profile.location} · UTC+7
              </motion.div>
            </div>

            {/* ── Right: avatar + terminal ──────────────────── */}
            <div className="flex flex-col items-center lg:items-end gap-8">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16,1,0.3,1] }}
                className="float relative"
              >
                {/* Orbit ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full"
                  style={{ border: '1px solid rgba(0,255,136,0.12)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00ff88]"
                    style={{ boxShadow: '0 0 8px #00ff88' }} />
                </motion.div>

                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
                  style={{ background: 'radial-gradient(circle, #00ff88, transparent)' }} />

                {/* Image */}
                <div
                  className="relative w-52 h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden"
                  style={{ border: '2px solid rgba(0,255,136,0.3)', boxShadow: '0 0 50px rgba(0,255,136,0.15), inset 0 0 30px rgba(0,255,136,0.05)' }}
                >
                  <img
                    src={AVATAR_URL}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                  />
                  <div className="w-full h-full hidden items-center justify-center font-mono text-5xl font-bold"
                    style={{ background: '#080b10', color: '#00ff88' }}>
                    NS
                  </div>
                </div>

              </motion.div>

              {/* Terminal widget */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="w-full max-w-sm rounded-xl overflow-hidden"
                style={{ background: '#080b10', border: '1px solid rgba(0,255,136,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                {/* Terminal titlebar */}
                <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-xs" style={{ color: '#3d4a5c' }}>bash — ntwsk</span>
                </div>

                {/* Terminal body */}
                <div className="p-4 font-mono text-xs leading-7 min-h-[280px]">
                  {typed.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: line.color }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  {typed.length < TERMINAL_LINES.length && (
                    <span style={{ color: '#00ff88' }}>
                      <span className="blink">█</span>
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-8"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown size={18} style={{ color: 'rgba(0,255,136,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
