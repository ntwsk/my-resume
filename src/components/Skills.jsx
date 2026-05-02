import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { skills } from '../data/resume'

const categoryMeta = {
  salesforce: { label: 'Salesforce Platform', color: '#00a1e0', glyph: 'SF' },
  cloud:      { label: 'Cloud & AI',          color: '#ff9900', glyph: 'CL' },
  dev:        { label: 'Development',         color: '#00ff88', glyph: 'DV' },
}
const categoryOrder = ['salesforce', 'cloud', 'dev']

function SkillBadge({ skill, index, catColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareMaxOpacity={0.05}
        glareColor={catColor}
        glarePosition="all"
        scale={1.04}
        transitionSpeed={500}
        className="h-full"
      >
        <div
          className="g-border rounded-xl px-4 py-3 h-full flex items-center gap-3 cursor-default group"
          style={{ background: '#080b10', transition: 'background 0.25s, box-shadow 0.25s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${catColor}08`
            e.currentTarget.style.boxShadow  = `0 0 20px ${catColor}12`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#080b10'
            e.currentTarget.style.boxShadow  = 'none'
          }}
        >
          {/* Dot accent */}
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-150"
            style={{ background: catColor, boxShadow: `0 0 6px ${catColor}` }}
          />
          <span className="font-mono text-sm" style={{ color: '#c8d0dc' }}>{skill.name}</span>
        </div>
      </Tilt>
    </motion.div>
  )
}

export default function Skills() {
  const grouped = categoryOrder.map((cat) => ({
    cat,
    meta: categoryMeta[cat],
    items: skills.filter((s) => s.category === cat),
  }))

  return (
    <section id="skills" className="py-28 px-6" style={{ background: '#040810' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="sec-label mb-3">02 — Skills</p>
          <h2 className="font-sans text-3xl lg:text-4xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>
            Tech Stack
          </h2>
        </motion.div>

        <div className="space-y-12">
          {grouped.map(({ cat, meta, items }) => (
            <div key={cat}>
              {/* Category header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-5"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0"
                  style={{ background: `${meta.color}12`, border: `1px solid ${meta.color}30`, color: meta.color }}
                >
                  {meta.glyph}
                </div>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: meta.color }}>
                  {meta.label}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${meta.color}20, transparent)` }} />
                <span className="font-mono text-xs" style={{ color: '#3d4a5c' }}>{items.length}</span>
              </motion.div>

              {/* Badge grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                {items.map((skill, i) => (
                  <SkillBadge key={skill.name} skill={skill} index={i} catColor={meta.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
