import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  )

  useEffect(() => {
    if (isMobile) return

    let mx = 0, my = 0
    let rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.left = mx + 'px'
        dot.current.style.top  = my + 'px'
      }
    }

    const onEnter = () => ring.current?.classList.add('hover')
    const onLeave = () => ring.current?.classList.remove('hover')

    let raf
    const lerp = (a, b, t) => a + (b - a) * t
    const loop = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top  = ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
