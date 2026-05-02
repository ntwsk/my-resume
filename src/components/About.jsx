import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { aboutJson } from '../data/resume'

function JsonStr({ v })   { return <span className="tok-str">"{v}"</span> }
function JsonNum({ v })   { return <span className="tok-num">{v}</span> }
function JsonBool({ v })  { return <span className="tok-bool">{String(v)}</span> }
function Punct({ c })     { return <span className="tok-punct">{c}</span> }

function JsonArray({ items }) {
  return (
    <>
      <Punct c="[" />
      {items.map((item, i) => (
        <span key={item}>
          <JsonStr v={item} />
          {i < items.length - 1 && <span style={{ color: '#374151' }}>, </span>}
        </span>
      ))}
      <Punct c="]" />
    </>
  )
}

const lines = [
  { t: 'comment', text: '// profile.ts — Nuttawut Sukaew' },
  { t: 'blank' },
  { t: 'code', indent: 0, content: (
    <><span className="tok-kw">const</span> <span className="tok-key">profile</span> <Punct c="= {" /></>
  )},
  { t: 'code', indent: 1, content: <><span className="tok-key">"name"</span><Punct c=": " /><JsonStr v={aboutJson.name} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"handle"</span><Punct c=": " /><JsonStr v={aboutJson.handle} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"role"</span><Punct c=": " /><JsonStr v={aboutJson.role} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"currentCompany"</span><Punct c=": " /><JsonStr v={aboutJson.currentCompany} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"previousCompanies"</span><Punct c=": " /><JsonArray items={aboutJson.previousCompanies} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"skills"</span><Punct c=": " /><JsonArray items={aboutJson.skills} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"certifications"</span><Punct c=": " /><JsonArray items={aboutJson.certifications} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"education"</span><Punct c=": {" /></> },
  { t: 'code', indent: 2, content: <><span className="tok-key">"degree"</span><Punct c=": " /><JsonStr v={aboutJson.education.degree} /></> },
  { t: 'code', indent: 2, content: <><span className="tok-key">"university"</span><Punct c=": " /><JsonStr v={aboutJson.education.university} /></> },
  { t: 'code', indent: 2, content: <><span className="tok-key">"year"</span><Punct c=": " /><JsonNum v={aboutJson.education.year} /></> },
  { t: 'code', indent: 1, content: <><Punct c="}" /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"remote"</span><Punct c=": " /><JsonBool v={aboutJson.remote} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"openToWork"</span><Punct c=": " /><JsonBool v={aboutJson.openToWork} /></> },
  { t: 'code', indent: 1, content: <><span className="tok-key">"location"</span><Punct c=": " /><JsonStr v={aboutJson.location} /></> },
  { t: 'code', indent: 0, content: <><Punct c="}" /></> },
]

export default function About() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #020305 0%, #040810 100%)' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="sec-label mb-3">01 — About</p>
          <h2 className="font-sans text-3xl lg:text-4xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Code editor card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            className="g-border rounded-2xl overflow-hidden"
            style={{ background: '#080b10', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
          >
            {/* Window chrome */}
            <div className="flex items-center px-4 py-3" style={{ background: '#0c1018', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div className="flex ml-4 gap-0.5">
                <span className="px-3 py-1 rounded-t font-mono text-xs" style={{ background: '#080b10', borderTop: '1px solid rgba(0,255,136,0.25)', borderLeft: '1px solid rgba(0,255,136,0.1)', borderRight: '1px solid rgba(0,255,136,0.1)', color: '#00ff88', marginBottom: '-1px' }}>
                  profile.ts
                </span>
                <span className="px-3 py-1 font-mono text-xs" style={{ color: '#3d4a5c' }}>index.ts</span>
              </div>
            </div>

            {/* Code */}
            <div className="p-6 overflow-x-auto">
              <table className="border-separate" style={{ borderSpacing: '0', minWidth: 'max-content' }}>
                <tbody>
                  {lines.map((line, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.035, duration: 0.3 }}
                    >
                      <td className="select-none pr-6 text-right font-mono text-xs align-top" style={{ color: '#1f2937', minWidth: '2rem', paddingTop: '2px' }}>
                        {line.t !== 'blank' ? i + 1 : ''}
                      </td>
                      <td className="font-mono text-sm leading-7" style={{ paddingLeft: line.t === 'code' ? `${(line.indent ?? 0) * 20}px` : '0' }}>
                        {line.t === 'comment' && <span className="tok-comment">{line.text}</span>}
                        {line.t === 'blank'   && <span>&nbsp;</span>}
                        {line.t === 'code'    && line.content}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16,1,0.3,1] }}
            className="flex flex-col gap-5"
          >
            {[
              { label: 'Years of Experience', value: '4+', color: '#00ff88', desc: 'Salesforce development & support' },
              { label: 'Support Tickets Handled', value: '300+', color: '#0ea5e9', desc: 'At I&I Group — 24/7 on-call' },
              { label: 'Salesforce Certifications', value: '3×', color: '#a855f7', desc: 'Associate · Admin · App Builder' },
              { label: 'Companies', value: '3', color: '#f59e0b', desc: 'I&I Group · Accenture · ATA IT' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.2 }}
                className="g-border rounded-xl p-5 flex items-center gap-5"
                style={{ background: '#080b10' }}
              >
                <div
                  className="text-3xl font-bold font-mono shrink-0 w-16 text-center"
                  style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}
                >
                  {stat.value}
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm" style={{ color: '#e2e8f0' }}>{stat.label}</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: '#3d4a5c' }}>{stat.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Language badges */}
            <div className="g-border rounded-xl p-5" style={{ background: '#080b10' }}>
              <p className="font-mono text-xs mb-3" style={{ color: '#3d4a5c' }}>// languages</p>
              <div className="flex flex-wrap gap-2">
                {['Thai (Native)', 'English (B2 — goFLUENT)'].map((lang) => (
                  <span key={lang} className="px-3 py-1 rounded-full font-mono text-xs"
                    style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)', color: '#00ff88' }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
