import { useState, useEffect } from 'react'
import { stages } from '../data/resume'

const XP_TOTAL = stages.reduce((sum, s) => sum + s.xp, 0)

export default function useGameProgress() {
  const [currentStage, setCurrentStage] = useState(1)
  const [unlockedIds, setUnlockedIds] = useState(() => new Set(['hero']))
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const stage = stages.find((s) => s.id === e.target.id)
          if (!stage) return
          setCurrentStage(stage.num)
          setUnlockedIds((prev) => {
            if (prev.has(stage.id)) return prev
            return new Set([...prev, stage.id])
          })
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    stages.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const xpEarned = stages
    .filter((s) => unlockedIds.has(s.id))
    .reduce((sum, s) => sum + s.xp, 0)

  return {
    currentStage,
    currentStageId: stages[currentStage - 1]?.id ?? 'hero',
    xpEarned,
    xpTotal: XP_TOTAL,
    scrollProgress,
    unlockedIds,
  }
}
