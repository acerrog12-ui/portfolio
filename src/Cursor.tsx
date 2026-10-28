import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Custom chrome arrow cursor for mouse users only (phones keep their normal touch).
// It follows the mouse smoothly and grows a little over links, buttons and cards.
// The arrow is Doston's chrome 3D render (public/img/cursor.webp); its tip is the top-left corner.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  useEffect(() => {
    const el = ref.current
    if (!el || !fine) return
    document.documentElement.classList.add('has-cursor')
    const x = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3' })
    let shown = false
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        gsap.to(el, { autoAlpha: 1, duration: 0.2 })
        shown = true
      }
      x(e.clientX)
      y(e.clientY)
      const hot = (e.target as Element | null)?.closest?.('a, button, input, textarea, label, [data-cursor]')
      el.classList.toggle('is-hot', !!hot)
    }
    const leave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.2 })
      shown = false
    }
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [fine])

  if (!fine) return null
  return (
    <div ref={ref} className="site-cursor" aria-hidden>
      <img src={`${import.meta.env.BASE_URL}img/cursor.webp`} alt="" width={36} height={41} draggable={false} />
    </div>
  )
}
