import { motion } from 'framer-motion'
import useGameProgress from '../hooks/useGameProgress'
import { stages } from '../data/resume'

export default function StageNav() {
  const { currentStage, unlockedIds } = useGameProgress()

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-0.5"
    >
      {stages.map((stage) => {
        const isActive  = stage.num === currentStage
        const isCleared = unlockedIds.has(stage.id) && !isActive
        const isLocked  = !unlockedIds.has(stage.id) && !isActive

        return (
          <a
            key={stage.id}
            href={`#${stage.id}`}
            className="relative flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            style={{ textDecoration: 'none' }}
          >
            {isActive && (
              <motion.div
                layoutId="stage-active-bg"
                className="absolute inset-0 rounded-lg"
                style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <span className="relative w-4 text-center font-mono shrink-0" style={{ fontSize: '11px' }}>
              {isCleared && <span style={{ color: '#00ff88' }}>✓</span>}
              {isActive  && <span className="stage-pulse" style={{ color: '#00ff88' }}>◉</span>}
              {isLocked  && <span style={{ color: '#1a2535' }}>◯</span>}
            </span>

            <div className="relative">
              <div
                className="font-mono font-bold"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: isActive ? '#00ff88' : isCleared ? '#3d4a5c' : '#1a2535',
                  transition: 'color 0.3s',
                }}
              >
                {stage.codename}
              </div>
              <div
                className="font-mono"
                style={{ fontSize: '9px', letterSpacing: '0.05em', color: isActive ? 'rgba(0,255,136,0.4)' : '#1a2535' }}
              >
                {isCleared ? 'CLEARED' : isActive ? 'ACTIVE' : 'LOCKED'}
              </div>
            </div>
          </a>
        )
      })}
    </motion.nav>
  )
}
