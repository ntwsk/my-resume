import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useLenis() {
  useEffect(() => {
    // Skip Lenis on touch devices — native iOS/Android momentum scroll feels
    // better than smoothed JS scroll, and avoids battery cost of the RAF loop.
    if (window.matchMedia('(hover: none)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}
