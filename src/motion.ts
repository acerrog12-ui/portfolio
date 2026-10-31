// A small scroll engine that replaces GSAP ScrollTrigger.
//
// Why: ScrollTrigger keeps an endless requestAnimationFrame loop running even when nothing
// moves, re-measures every trigger on refresh, and each scrubbed tween is updated through
// GSAP's ticker. Here there is one passive scroll listener and at most one frame of work per
// scroll frame, and only sections that are on (or near) the screen do anything. Element
// positions are measured once (and again when the page size changes), not on every frame.

type Item = {
  box: Element
  on: boolean
  update: (y: number, vh: number, dt: number) => boolean | void // true = needs another frame (smoothing)
  measure?: () => void
}

const items = new Set<Item>()
let raf = 0
let last = 0
let wired = false

const frame = (now: number) => {
  raf = 0
  const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60
  last = now
  const y = window.scrollY
  const vh = window.innerHeight
  let again = false
  items.forEach((it) => {
    if (it.on && it.update(y, vh, dt)) again = true
  })
  if (again) raf = requestAnimationFrame(frame)
  else last = 0
}
// set every effect to its state for the current scroll, on or off screen (start states)
const drawAll = () => {
  const y = window.scrollY
  const vh = window.innerHeight
  items.forEach((it) => it.update(y, vh, 1))
}

export const kick = () => {
  if (!raf) raf = requestAnimationFrame(frame)
}

let measureQueued = 0
export const refresh = () => {
  if (measureQueued) return
  measureQueued = requestAnimationFrame(() => {
    measureQueued = 0
    items.forEach((it) => it.measure?.())
    drawAll()
    kick()
  })
}

const wire = () => {
  if (wired) return
  wired = true
  window.addEventListener('scroll', kick, { passive: true })
  let w = window.innerWidth
  window.addEventListener('resize', () => {
    // phone address bar showing/hiding changes only the height: no need to re-measure
    if (window.innerWidth !== w) {
      w = window.innerWidth
      refresh()
    } else kick()
  })
  // images loading or fonts arriving move things down the page
  new ResizeObserver(refresh).observe(document.body)
  document.fonts?.ready.then(refresh)
}

const io = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      const it = boxes.get(e.target)
      it?.forEach((i) => (i.on = e.isIntersecting))
      // big panels and moving parts are only promoted to their own GPU layer while near the screen
      ;(e.target as HTMLElement).toggleAttribute('data-live', e.isIntersecting)
    })
    kick()
  },
  { rootMargin: '25% 0px' },
)
const boxes = new Map<Element, Set<Item>>()

/** Run update on every scroll frame while box is on or near the screen. */
export function onScroll(box: Element, update: Item['update'], measure?: () => void) {
  wire()
  const it: Item = { box, on: false, update, measure }
  items.add(it)
  if (!boxes.has(box)) {
    boxes.set(box, new Set())
    io.observe(box)
  }
  boxes.get(box)!.add(it)
  measure?.()
  update(window.scrollY, window.innerHeight, 1)
  kick()
  return () => {
    items.delete(it)
    const s = boxes.get(box)
    s?.delete(it)
    if (s && !s.size) {
      boxes.delete(box)
      io.unobserve(box)
      ;(box as HTMLElement).removeAttribute('data-live')
    }
  }
}

/** Position of an element in the page, ignoring transforms (so moving it doesn't change it). */
export const pageTop = (el: HTMLElement) => {
  let y = 0
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop
  return y
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/**
 * Scroll range like ScrollTrigger's start/end: "top 80%" = the element's top reaches 80% of
 * the screen height. Returns a function giving progress 0..1 for a scroll position.
 * Positions are read from `geo`, which the caller refreshes in measure().
 */
export type Edge = 'top' | 'bottom'
export function rangeOf(top: number, height: number, vh: number, start: [Edge, number], end: [Edge, number]) {
  const at = ([edge, frac]: [Edge, number]) => top + (edge === 'bottom' ? height : 0) - frac * vh
  return [at(start), at(end)] as const
}
export const progress = (y: number, [s, e]: readonly [number, number]) => (e === s ? (y >= e ? 1 : 0) : clamp01((y - s) / (e - s)))

export const power2Out = (t: number) => 1 - (1 - t) * (1 - t)

/**
 * Run play() once, when the element's top comes up to `at` of the screen height
 * (or right away if it is already above that line).
 */
export function onReveal(el: Element, play: () => void, at = 0.85) {
  let done = false
  const ob = new IntersectionObserver(
    ([e]) => {
      if (done) return
      if (e.isIntersecting) {
        done = true
        ob.disconnect()
        play()
      }
    },
    // the watched area reaches far above the screen, so anything that is already above the
    // line counts too (after a reload halfway down, or a jump straight past it)
    { rootMargin: `100000px 0px -${Math.round((1 - at) * 100)}% 0px` },
  )
  ob.observe(el)
  return () => ob.disconnect()
}
