import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameProgress from '../hooks/useGameProgress'
import { stages } from '../data/resume'

let nextId = 0

export default function StageToast() {
  const { currentStage } = useGameProgress()
  const prevRef = useRef(currentStage)
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const prev = prevRef.current
    prevRef.current = currentStage

    if (currentStage > prev) {
      const prevData = stages[prev - 1]
      const nextData = stages[currentStage - 1]
      if (prevData && nextData) {
        const id = ++nextId
        setToasts((t) => [...t, {
          id,
          prevNum: prev,
          nextNum: currentStage,
          xp: nextData.xp,
          codename: nextData.codename,
        }])
        setTimeout(() => {
          setToasts((t) => t.filter((toast) => toast.id !== id))
        }, 3200)
      }
    }
  }, [currentStage])

  return (
    <div className="fixed z-50 flex flex-col gap-2 items-end right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:bottom-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="g-border rounded-xl px-4 py-3 pointer-events-auto"
            style={{
              background: 'rgba(8,11,16,0.94)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,255,136,0.08)',
              minWidth: '200px',
            }}
          >
            <div className="font-mono text-xs mb-1" style={{ color: '#00ff88' }}>
              ✓ STAGE {String(toast.prevNum).padStart(2, '0')} CLEARED
            </div>
            <div className="font-mono text-xs font-bold mb-1" style={{ color: '#a855f7' }}>
              +{toast.xp.toLocaleString()} XP
            </div>
            <div className="font-mono" style={{ fontSize: '10px', color: '#3d4a5c' }}>
              → ENTERING {String(toast.nextNum).padStart(2, '0')}: {toast.codename}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
