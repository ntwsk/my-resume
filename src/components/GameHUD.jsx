import { motion } from 'framer-motion'
import useGameProgress from '../hooks/useGameProgress'
import { stages } from '../data/resume'

export default function GameHUD() {
  const { currentStage, xpEarned, xpTotal } = useGameProgress()
  const stage = stages[currentStage - 1]
  const xpPct = (xpEarned / xpTotal) * 100

  return (
    <>
      {/* Desktop — fixed top-right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed top-20 right-4 z-40 hidden md:block"
      >
        <div
          className="g-border rounded-xl px-4 py-3 min-w-[230px]"
          style={{ background: 'rgba(8,11,16,0.88)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-xs font-bold" style={{ color: '#e2e8f0', letterSpacing: '0.05em' }}>
              NUTTAWUT.exe
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: '#00ff88' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="font-mono text-xs mb-3" style={{ letterSpacing: '0.04em' }}>
            <span style={{ color: '#3d4a5c' }}>STAGE </span>
            <span style={{ color: '#00ff88' }}>{String(currentStage).padStart(2, '0')}</span>
            <span style={{ color: '#3d4a5c' }}>/{stages.length} — </span>
            <span style={{ color: '#e2e8f0' }}>{stage?.codename}</span>
          </div>

          <div>
            <div className="flex justify-between font-mono mb-1.5" style={{ fontSize: '10px', color: '#3d4a5c' }}>
              <span>XP</span>
              <span>{xpEarned.toLocaleString()} / {xpTotal.toLocaleString()}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,255,136,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00ff88, #0ea5e9)' }}
                animate={{ width: `${xpPct}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile — thin bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-0 inset-x-0 z-40 md:hidden"
        style={{
          background: 'rgba(2,3,5,0.92)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,255,136,0.1)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-2.5">
          <span className="font-mono shrink-0" style={{ fontSize: '10px', color: '#3d4a5c' }}>
            STAGE{' '}
            <span style={{ color: '#00ff88' }}>{String(currentStage).padStart(2, '0')}/{stages.length}</span>
            {'  '}
            <span style={{ color: '#e2e8f0' }}>{stage?.codename}</span>
          </span>
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,255,136,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #00ff88, #0ea5e9)' }}
              animate={{ width: `${xpPct}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 20 }}
            />
          </div>
          <span className="font-mono shrink-0" style={{ fontSize: '10px', color: '#3d4a5c' }}>
            {xpEarned.toLocaleString()}<span style={{ color: '#1a2535' }}>/{xpTotal.toLocaleString()}</span> XP
          </span>
        </div>
      </motion.div>
    </>
  )
}
