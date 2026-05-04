import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Cloud, Code, Settings, Layers, Award, GraduationCap, ExternalLink } from 'lucide-react'
import { certifications, education } from '../data/resume'

const iconMap = { cloud: Cloud, code: Code, settings: Settings, layers: Layers }

const GROUP_META = {
  'Amazon Web Services': { color: '#ff9900', linkLabel: 'Verify on Credly' },
  'Salesforce':          { color: '#00a1e0', linkLabel: 'View on Trailhead' },
}

function CertCard({ cert, index }) {
  const Icon = iconMap[cert.icon] ?? Award

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      className="perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        glareEnable
        glareMaxOpacity={0.1}
        glareColor={cert.color}
        glarePosition="all"
        scale={1.04}
        transitionSpeed={500}
        className="h-full"
      >
        <div
          className="g-border rounded-2xl p-6 h-full flex flex-col select-none"
          style={{
            background: '#080b10',
            minHeight: 180,
            transition: 'box-shadow 0.3s',
            opacity: cert.retired ? 0.6 : 1,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 50px ${cert.color}12` }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
        >
          {/* Top bar accent */}
          <div
            className="absolute top-0 inset-x-0 h-px rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)` }}
          />

          {/* Retired badge */}
          {cert.retired && (
            <div
              className="absolute top-3 right-3 px-2 py-0.5 rounded font-mono"
              style={{ fontSize: '9px', letterSpacing: '0.1em', background: 'rgba(107,114,128,0.15)', border: '1px solid rgba(107,114,128,0.3)', color: '#6b7280' }}
            >
              RETIRED
            </div>
          )}

          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            style={{ background: `${cert.color}10`, border: `1px solid ${cert.color}25` }}
          >
            <Icon size={20} style={{ color: cert.color }} />
          </div>

          {/* Name */}
          <p className="font-sans font-semibold text-sm leading-snug flex-1 mb-4" style={{ color: '#e2e8f0' }}>
            {cert.name}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-mono text-xs" style={{ color: '#3d4a5c' }}>{cert.issuer}</p>
            </div>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25`, color: cert.color }}
            >
              {cert.year}
            </span>
          </div>

        </div>
      </Tilt>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6" style={{ background: '#020305' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="sec-label mb-3">STAGE 05 — TROPHIES</p>
          <h2 className="font-sans text-3xl lg:text-4xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>
            Certifications
          </h2>
        </motion.div>

        {/* Cert groups */}
        <div className="space-y-10 mb-16">
          {(() => {
            const groups = []
            const seen = {}
            certifications.forEach((cert) => {
              if (!seen[cert.issuer]) {
                seen[cert.issuer] = { issuer: cert.issuer, link: cert.link, certs: [] }
                groups.push(seen[cert.issuer])
              }
              seen[cert.issuer].certs.push(cert)
            })
            return groups.map(({ issuer, link, certs }) => {
              const meta = GROUP_META[issuer] ?? { color: '#8892a4', linkLabel: 'Verify' }
              return (
                <div key={issuer}>
                  {/* Group header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-5"
                  >
                    <span className="font-mono text-xs tracking-widest uppercase shrink-0" style={{ color: meta.color }}>
                      {issuer}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${meta.color}20, transparent)` }} />
                    <span className="font-mono text-xs shrink-0" style={{ color: '#3d4a5c' }}>{certs.length}</span>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs transition-colors shrink-0"
                        style={{ color: '#3d4a5c', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = meta.color }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#3d4a5c' }}
                      >
                        <ExternalLink size={10} />
                        {meta.linkLabel}
                      </a>
                    )}
                  </motion.div>
                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {certs.map((cert, i) => (
                      <CertCard key={cert.id} cert={cert} index={i} />
                    ))}
                  </div>
                </div>
              )
            })
          })()}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="sec-label mb-6">Education</p>
          <div
            className="g-border rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{ background: '#080b10' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)' }}
            >
              <GraduationCap size={24} style={{ color: '#00ff88' }} />
            </div>
            <div className="flex-1">
              <h3 className="font-sans font-semibold text-lg" style={{ color: '#e2e8f0' }}>{education.degree}</h3>
              <p className="font-mono text-sm mt-1" style={{ color: '#00ff88' }}>{education.university}</p>
              <p className="font-mono text-xs mt-1.5" style={{ color: '#3d4a5c' }}>
                {education.period} · {education.location}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span
                className="font-mono text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)', color: '#00ff88' }}
              >
                Computer Science
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
