import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, ChevronRight, ChevronDown } from 'lucide-react'
import { experience } from '../data/resume'

const companyColors = {
  'ATA IT Limited (National Bank of Canada group)': '#00ff88',
  'Accenture':                                      '#a855f7',
  'I&I Group Public Company Limited':               '#0ea5e9',
}

function ExperienceCard({ job, index }) {
  const [open, setOpen] = useState(true)
  const color = companyColors[job.company] ?? '#8892a4'

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16,1,0.3,1] }}
    >
      <div
        className="g-border rounded-2xl overflow-hidden"
        style={{ background: '#080b10' }}
      >
        {/* Card header — always visible */}
        <button
          className="w-full flex items-start gap-5 p-6 text-left"
          onClick={() => setOpen(!open)}
        >
          {/* Company color bar */}
          <div className="shrink-0 mt-1 flex flex-col items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            />
            <div className="w-px flex-1 min-h-[20px]" style={{ background: `linear-gradient(${color}60, transparent)` }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}
                  >
                    {job.type}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-lg leading-tight" style={{ color: '#e2e8f0' }}>{job.role}</h3>
                <p className="font-mono text-sm mt-0.5" style={{ color }}>@ {job.company}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: '#3d4a5c' }}>
                  <Calendar size={11} />
                  {job.period}
                </span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} style={{ color: '#3d4a5c' }} />
                </motion.div>
              </div>
            </div>
          </div>
        </button>

        {/* Expandable highlights */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-6 pt-0 ml-8" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {job.roles ? (
                  <div className="mt-4 space-y-5">
                    {job.roles.map((roleGroup, ri) => (
                      <div key={ri}>
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="w-0.5 h-4 rounded-full shrink-0" style={{ background: color }} />
                          <span className="font-mono text-xs font-semibold uppercase tracking-widest" style={{ color }}>
                            {roleGroup.title}
                          </span>
                        </div>
                        <ul className="space-y-2 ml-4">
                          {roleGroup.highlights.map((h, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 + ri * 0.1 }}
                              className="flex items-start gap-3 text-sm leading-relaxed"
                              style={{ color: '#8892a4' }}
                            >
                              <ChevronRight size={13} className="mt-0.5 shrink-0" style={{ color }} />
                              {h}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-4 space-y-2.5">
                    {job.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: '#8892a4' }}
                      >
                        <ChevronRight size={13} className="mt-0.5 shrink-0" style={{ color }} />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #040810 0%, #020305 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="sec-label mb-3">STAGE 04 — QUESTS</p>
          <h2 className="font-sans text-3xl lg:text-4xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>
            Career Timeline
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical track */}
          <div
            className="hidden lg:block absolute left-2 top-3 bottom-3 w-px"
            style={{ background: 'linear-gradient(180deg, #00ff88 0%, #0ea5e9 50%, rgba(14,165,233,0.1) 100%)' }}
          />

          <div className="lg:pl-12 space-y-5">
            {experience.map((job, i) => (
              <ExperienceCard key={job.id} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
