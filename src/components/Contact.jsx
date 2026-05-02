import { motion } from 'framer-motion'
import { Mail, GitFork, Link2, Terminal, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/resume'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: '#00ff88',
  },
  {
    icon: GitFork,
    label: 'GitHub',
    value: 'github.com/ntwsk',
    href: profile.github,
    color: '#e2e8f0',
  },
  {
    icon: Link2,
    label: 'LinkedIn',
    value: 'nuttawut-sukaew',
    href: profile.linkedin,
    color: '#0ea5e9',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden" style={{ background: '#040810' }}>
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 65%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="sec-label mb-3">05 — Contact</p>
          <h2
            className="font-sans text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: '#e2e8f0', letterSpacing: '-0.03em' }}
          >
            Let's build something
            <span className="block" style={{ color: '#00ff88' }}>great together.</span>
          </h2>
          <p className="max-w-md mx-auto text-base leading-relaxed" style={{ color: '#8892a4' }}>
            Open to interesting Salesforce & Cloud roles. Response time is fast — drop a message.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label !== 'Email' ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="g-border rounded-2xl p-6 flex flex-col items-center gap-4 group"
              style={{ background: '#080b10', textDecoration: 'none' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${c.color}10`, border: `1px solid ${c.color}20` }}
              >
                <c.icon size={20} style={{ color: c.color }} />
              </div>
              <div className="text-center">
                <p className="font-mono text-xs mb-1" style={{ color: c.color }}>{c.label}</p>
                <p className="font-mono text-xs break-all" style={{ color: '#3d4a5c' }}>{c.value}</p>
              </div>
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: c.color }}
              />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px max-w-2xl mx-auto mb-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)' }} />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 font-mono text-xs mb-2" style={{ color: '#3d4a5c' }}>
            <Terminal size={12} />
            <span>Designed & built by Nuttawut Sukaew</span>
          </div>
          <p className="font-mono text-xs" style={{ color: '#1f2937' }}>
            React · Vite · Tailwind · Framer Motion · GSAP · Lenis
          </p>
        </motion.div>
      </div>
    </section>
  )
}
