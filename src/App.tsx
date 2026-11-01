import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import gsap from 'gsap'
import { allWorks, categories, clients, contacts, projectAbout, projects, services, team, ui, type Category, type Project } from './content'
import { img, reducedMotion, SplitChars, useLang } from './lib'
import { ChromeDefs, chromeFill, footerShapes } from './shapes'
import { clamp01, onReveal, onScroll, pageTop, power2Out, progress, rangeOf, refresh } from './motion'

const isPhone = () => window.matchMedia('(max-width: 639px)').matches

// Simple hash routing: #/work/<category-id> opens a direction page
function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => setRoute(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export default function App() {
  const [open, setOpen] = useState<Project | null>(null)
  const route = useRoute()
  const cat = route === 'work/all' ? allWorks : route.startsWith('work/') ? categories.find((c) => c.id === route.slice(5)) : undefined
  const lastCat = useRef<string | null>(null)

  // Going to a direction page starts at the top; coming back returns to the Projects section
  useLayoutEffect(() => {
    if (cat) {
      lastCat.current = cat.id
      window.scrollTo(0, 0)
    } else if (lastCat.current) {
      lastCat.current = null
      setTimeout(() => {
        refresh()
        const el = document.getElementById('projects')
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY)
      }, 60)
    }
  }, [cat])

  // Endless CSS animations (floating objects, marquees) only run while on screen
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.floaty, .marquee')
    const io = new IntersectionObserver((es) => es.forEach((e) => ((e.target as HTMLElement).style.animationPlayState = e.isIntersecting ? 'running' : 'paused')), { rootMargin: '100px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [cat])

  return (
    <div>
      {/* while a project is open, the page behind it is hidden (after the slide-in), so iPhone Safari
          shows black above the project instead of the page under its address bar */}
      <div className={open ? 'behind-modal' : ''}>
      <Nav />
      {cat ? (
        <CategoryPage key={cat.id} cat={cat} onOpen={setOpen} />
      ) : (
        <main>
          <Hero />
          <Clients onOpen={setOpen} />
          {/* work first: logos, then projects prove what Doston can do; services, about and team follow */}
          <Projects />
          <Services />
          <About />
          <Team />
        </main>
      )}
      <Contact />
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </div>
  )
}

function scrollTo(id: string) {
  if (window.location.hash.startsWith('#/work/') && id !== 'contact') {
    window.location.hash = ''
    setTimeout(() => scrollTo(id), 80)
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------- NAV ---------------- */
function Nav() {
  const { t, lang, setLang, classic, setClassic } = useLang()
  const links = ['projects', 'services', 'about', 'contact'] as const
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black pt-[var(--sat)] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-[300px] before:bg-black before:content-['']">
      {/* the black strip above the bar covers the iPhone status and address bar area, so scrolled content never shows above the menu */}
      <nav className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-4 text-[11px] font-bold tracking-wide uppercase sm:px-8 sm:text-[13px]">
        <ul className="hidden flex-1 justify-around md:flex">
          {links.map((l) =>
            l === 'projects' ? (
              <li key={l}>
                <ProjectsMenu label={t(ui.nav[l])} />
              </li>
            ) : (
              <li key={l}>
                <button onClick={() => scrollTo(l)} className="group relative">
                  {t(ui.nav[l])}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ),
          )}
        </ul>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-base md:hidden">
          ACE<span className="text-pink">.</span>
        </button>
        <span className="ml-auto md:hidden">
          <ProjectsMenu label={t(ui.nav.projects)} />
        </span>
        <div className="flex overflow-hidden rounded-full border border-white/50">
          {(['uz', 'ru', 'en'] as const).map((l) => (
            <button
              key={l}
              // a second tap on "uz" switches the spelling: new alphabet (ş, ç, ō) <-> usual Latin (sh, ch, oʻ)
              onClick={() => (l === 'uz' && lang === 'uz' ? setClassic(!classic) : setLang(l))}
              title={l === 'uz' ? (classic ? 'Yangi alifbo: ş, ç, ō' : 'Lotin yozuvi: sh, ch, o‘') : undefined}
              className={`px-2.5 py-1 transition-colors ${lang === l ? 'bg-white text-black' : 'text-white'}`}
            >
              {l}
              {l === 'uz' && lang === 'uz' && <span className="ml-1 text-[0.7em] font-semibold opacity-50">{classic ? 'sh' : 'ş'}</span>}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}

// "Projects" in the nav with a small arrow: opens a list of All works and every direction.
// Opens on hover with a mouse and on tap on phones.
function ProjectsMenu({ label }: { label: string }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const onHash = () => setOpen(false)
    document.addEventListener('pointerdown', close)
    window.addEventListener('hashchange', onHash)
    return () => { document.removeEventListener('pointerdown', close); window.removeEventListener('hashchange', onHash) }
  }, [open])
  const hover = (v: boolean) => (e: React.PointerEvent) => { if (e.pointerType === 'mouse') setOpen(v) }
  const items = [allWorks, ...categories]
  return (
    <div ref={box} className="relative" onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="group relative flex items-center gap-1.5 uppercase">
        {label}
        <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}><path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>
      <div className={`absolute top-full right-0 z-50 pt-3 md:right-auto md:left-1/2 md:-translate-x-1/2 ${open ? '' : 'pointer-events-none'}`}>
        <ul className={`w-64 overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0e] p-2 shadow-2xl transition duration-200 ${open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}>
          {items.map((c) => (
            <li key={c.id}>
              <a href={`#/work/${c.id}`} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-[12px] font-bold tracking-wide normal-case hover:bg-white/10 ${c.id === 'all' ? 'text-[#9b7bff]' : 'text-white'}`}>
                {t(c.title)}
                <span className="text-white/40">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Turn on once public/img/ace-head-smile.webp (same framing as ace-head.webp) is added
const HEAD_SMILE = false

/* ---------------- HERO ---------------- */
function Hero() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  const avatar = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)

  // Make the headline as big as possible: scale it so its widest line fills the screen width
  useLayoutEffect(() => {
    const h = title.current
    if (!h) return
    const fit = () => {
      h.style.fontSize = ''
      // width of the widest text line, measured from the letters themselves
      const lines = new Map<number, [number, number]>()
      h.querySelectorAll<HTMLElement>('.char').forEach((c) => {
        const b = c.getBoundingClientRect()
        const key = Math.round(c.offsetTop / 10)
        const cur = lines.get(key)
        lines.set(key, cur ? [Math.min(cur[0], b.left), Math.max(cur[1], b.right)] : [b.left, b.right])
      })
      const widest = Math.max(...[...lines.values()].map(([l, r]) => r - l))
      const room = h.clientWidth
      if (widest > 0) h.style.fontSize = `${(parseFloat(getComputedStyle(h).fontSize) * room * 0.995) / widest}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    let w = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === w) return
      w = window.innerWidth
      fit()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    // the letter masks only matter while the letters rise in; after that they would cut
    // the round tops and bottoms of the tall letters, so they are opened
    const openMasks = () => gsap.set('.hero-title .line-mask', { overflow: 'visible' })
    if (reducedMotion()) return void openMasks()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-title .char', { yPercent: 110, duration: 1.3, stagger: 0.03 }, 0.15)
        .from('.hero-head', { y: 140, autoAlpha: 0, scale: 0.8, duration: 1.6, ease: 'elastic.out(1,0.7)' }, 0.45)
        .from('.hero-fade', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9)

    }, root)
    // the char layers only exist while the letters fly in
    const clearChars = window.setTimeout(() => {
      gsap.set('.hero-title .char', { clearProps: 'transform' })
      openMasks()
    }, 2600)

    // on scroll the head rises and the headline slides away
    const sec = root.current
    const av = avatar.current
    const h1 = title.current
    let top = 0, height = 1, lastP = -1
    const stopScroll = sec && av && h1 && !isPhone()
      ? onScroll(sec, (y) => {
          const p = clamp01((y - top) / height)
          if (p === lastP) return
          lastP = p
          av.style.transform = p ? `translate3d(0,${(-30 * p).toFixed(2)}%,0)` : ''
          h1.style.transform = p ? `translate3d(0,${(-40 * p).toFixed(2)}%,0)` : ''
          h1.style.opacity = p ? String(1 - 0.8 * p) : ''
        }, () => { top = pageTop(sec); height = Math.max(1, sec.offsetHeight) })
      : undefined

    // the head follows the mouse a little
    const inner = avatar.current?.firstElementChild as HTMLElement | null
    const xTo = inner && gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'power3' })
    const yTo = inner && gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'power3' })
    const rTo = inner && gsap.quickTo(inner, 'rotate', { duration: 0.8, ease: 'power3' })
    const move = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5
      const dy = e.clientY / window.innerHeight - 0.5
      xTo?.(dx * 36)
      yTo?.(dy * 24)
      rTo?.(dx * 7)
    }
    if (window.matchMedia('(pointer: fine)').matches) window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.clearTimeout(clearChars)
      stopScroll?.()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  // Keep the headline on one line inside the screen whatever font actually rendered
  // (a fallback font is much wider and would be cut off at the sides).
  useEffect(() => {
    const h = title.current
    if (!h) return
    const fitTitle = () => {
      h.style.fontSize = ''
      const r = document.createRange()
      r.selectNodeContents(h)
      const w = r.getBoundingClientRect().width
      const room = h.clientWidth
      if (w > room + 1) h.style.fontSize = `${(parseFloat(getComputedStyle(h).fontSize) * room) / w}px`
    }
    fitTitle()
    document.fonts?.ready.then(fitTitle)
    document.fonts?.load("1em 'Six Caps'").then(fitTitle).catch(() => {})
    window.addEventListener('resize', fitTitle)
    return () => window.removeEventListener('resize', fitTitle)
  }, [lang])

  // Hovering the contact button sends a flash of light across the character's glasses
  // (and fades in the smiling render once that file is added, see HEAD_SMILE).
  const happy = (on: boolean) => {
    if (reducedMotion()) return
    const glint = root.current?.querySelector('.hero-glint')
    const smile = root.current?.querySelector('.hero-smile')
    // the streak only exists while it runs: a blended, masked layer left on the page
    // made the browser redraw the whole head on every scroll frame
    if (on && glint) gsap.fromTo(glint, { display: 'block', backgroundPosition: '76% 0%' }, { backgroundPosition: '14% 0%', duration: 0.85, ease: 'power1.inOut', overwrite: true, onComplete: () => gsap.set(glint, { display: 'none' }) })
    if (smile) gsap.to(smile, { opacity: on ? 1 : 0, duration: 0.25, overwrite: true })
  }

  return (
    <section ref={root} className="relative flex flex-col overflow-hidden bg-ink sm:min-h-[100svh] px-3 pt-[calc(72px+var(--sat))] pb-8 sm:px-4 sm:pt-[calc(78px+var(--sat))]">
      {/* tall condensed Six Caps across the full width (Doston picked it), one line on every screen */}
      <h1 ref={title} className="hero-title live-wc silver relative z-0 -mt-[1.5vw] text-center text-[38vw] leading-[0.9] whitespace-nowrap uppercase sm:-mt-[1.9vw]" style={{ fontFamily: "'Six Caps', 'Archivo', sans-serif", fontWeight: 400, fontSynthesis: 'none', letterSpacing: '-0.02em' }}>
        <span className="inline-block">
          <SplitChars text={t(ui.hero.hi)} className="inline-block" />
        </span>{' '}
        <span className="inline-block">
          <SplitChars text={t(ui.hero.name)} className="inline-block" />
        </span>
      </h1>

      <div className="relative flex flex-1 flex-col items-center sm:block">
        {/* the head sits on top of the headline, touching the letters like in the reference */}
        <div ref={avatar} className="hero-avatar live-wc relative z-10 mx-auto -mt-[16vw] w-[min(58vw,46svh)] max-w-[440px] sm:absolute sm:top-0 sm:left-1/2 sm:mt-[-25vw] sm:w-[27vw] sm:max-w-[620px] sm:-translate-x-1/2">
          <div>
            <div className="hero-head relative">
              <img src={img('ace-head.webp')} srcSet={`${img('ace-head-s.webp')} 640w, ${img('ace-head.webp')} 1000w`} sizes="(max-width: 640px) 64vw, 29vw" fetchPriority="high" alt="Doston «Ace» Daminov" className="w-full" />
              {/* the same head smiling, shown while the contact button is hovered */}
              {/* light streak clipped to the lenses (mask cut from the head render) */}
              <span
                aria-hidden
                className="hero-glint pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  display: 'none',
                  WebkitMaskImage: `url(${img('ace-glasses-mask.webp')})`,
                  maskImage: `url(${img('ace-glasses-mask.webp')})`,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  backgroundImage: 'linear-gradient(110deg, transparent 44%, rgba(255,255,255,0.75) 46%, transparent 48%, rgba(255,255,255,0.4) 49.3%, transparent 50.4%)',
                  backgroundSize: '300% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '76% 0%',
                }}
              />
              {HEAD_SMILE && <img src={img('ace-head-smile.webp')} alt="" aria-hidden decoding="async" className="hero-smile pointer-events-none absolute inset-0 w-full opacity-0" />}
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-4 flex w-full flex-row items-center justify-between gap-3 sm:absolute sm:top-[0.6vw] sm:mt-0 sm:items-start sm:gap-6 sm:px-[3vw]">
          <p className="hero-fade min-w-0 flex-1 text-[12px] leading-[1.5] font-semibold uppercase sm:max-w-[23vw] sm:flex-none sm:text-[1.3vw]">
            {t(ui.hero.tagline)}
          </p>
          <div className="hero-fade shrink-0">
            <a href={contacts.telegram} target="_blank" rel="noreferrer" onPointerEnter={(e) => e.pointerType === 'mouse' && happy(true)} onPointerLeave={(e) => e.pointerType === 'mouse' && happy(false)} className="pill-grad hero-pill px-5 py-3 text-[13px] sm:mt-[-0.4vw] sm:px-[2.4vw] sm:py-[1.15vw] sm:text-[1.3vw]">
            {t(ui.hero.cta)}
          </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// A chrome object you can grab with the mouse and pull a little; on release it springs back.
// Touch is left alone so a finger on an object still scrolls the page.
function Grab({ children, className = '' }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const n = el.current
    if (!n) return
    let sx = 0, sy = 0, on = false
    const max = 140
    const rubber = (d: number) => Math.sign(d) * max * (1 - Math.exp(-Math.abs(d) / max))
    const down = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      on = true; sx = e.clientX; sy = e.clientY
      gsap.killTweensOf(n)
      n.setPointerCapture(e.pointerId)
      e.preventDefault()
    }
    const move = (e: PointerEvent) => {
      if (!on) return
      const x = rubber(e.clientX - sx), y = rubber(e.clientY - sy)
      gsap.set(n, { x, y, rotate: x * 0.08 })
    }
    const up = () => {
      if (!on) return
      on = false
      gsap.to(n, { x: 0, y: 0, rotate: 0, duration: 1.4, ease: 'elastic.out(1, 0.35)' })
    }
    n.addEventListener('pointerdown', down)
    n.addEventListener('pointermove', move)
    n.addEventListener('pointerup', up)
    n.addEventListener('pointercancel', up)
    return () => {
      n.removeEventListener('pointerdown', down)
      n.removeEventListener('pointermove', move)
      n.removeEventListener('pointerup', up)
      n.removeEventListener('pointercancel', up)
      gsap.killTweensOf(n)
    }
  }, [])
  return (
    <div ref={el} className={`pointer-events-auto relative select-none ${className}`} onDragStart={(e) => e.preventDefault()}>
      {children}
    </div>
  )
}

/* ---------------- CLIENT LOGOS + IMAGE STRIP ---------------- */
// An endlessly moving row that can also be grabbed and thrown left or right.
// speed is in px per second; negative moves left. Children must be the item list repeated twice.
// A tap without movement on an item with data-id calls onTap with that id.
function DragRow({ speed, children, onTap }: { speed: number; children: ReactNode; onTap?: (id: string) => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const onTapRef = useRef(onTap)
  onTapRef.current = onTap

  useEffect(() => {
    const el = track.current
    const box = wrap.current
    if (!el || !box) return
    const auto = reducedMotion() ? 0 : speed
    let x = 0
    let vel = auto
    let dragging = false
    let lastX = 0
    let lastT = 0
    let raf = 0
    let prev = performance.now()
    let startX = 0
    let startT = 0
    let moved = 0
    let wheelUntil = 0

    // the track width is measured once (and on resize), not every frame: reading it per frame forced a layout each frame
    let half = el.scrollWidth / 2
    const wrapX = () => {
      if (half <= 0) return
      x = ((x % half) - half) % half // keep x in (-half, 0]
    }

    // Two modes. Drifting on its own: a browser animation that runs on the graphics card,
    // so the page does no work per frame. Dragged, thrown or swiped: a JS loop, until the
    // row is back to its normal drift, then it hands back to the browser animation.
    let anim: Animation | null = null
    let dur = 0
    let visible = false
    const readX = () => {
      if (!anim || !dur) return
      const t = (Number(anim.currentTime) || 0) % dur
      const frac = auto < 0 ? t / dur : 1 - t / dur
      x = -frac * half
    }
    const startAuto = () => {
      anim?.cancel()
      anim = null
      el.style.transform = `translate3d(${x}px,0,0)`
      if (!auto || half <= 0 || typeof el.animate !== 'function') return
      dur = (half / Math.abs(auto)) * 1000
      anim = el.animate([{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(${-half}px,0,0)` }], { duration: dur, iterations: Infinity, direction: auto < 0 ? 'normal' : 'reverse' })
      const frac = half ? -x / half : 0
      anim.currentTime = (auto < 0 ? frac : 1 - frac) * dur
      if (!visible) anim.pause()
    }
    const stopAuto = () => {
      if (!anim) return
      readX()
      anim.cancel()
      anim = null
      el.style.transform = `translate3d(${x}px,0,0)`
    }

    const loop = (now: number) => {
      raf = 0
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      if (!dragging && now > wheelUntil) {
        vel += (auto - vel) * Math.min(1, dt * 2.5) // ease back to the normal drift after a throw
        x += vel * dt
      }
      wrapX()
      el.style.transform = `translate3d(${x}px,0,0)`
      // settled: hand back to the browser animation
      if (!dragging && now > wheelUntil && Math.abs(vel - auto) < 2) {
        vel = auto
        startAuto()
        return
      }
      raf = requestAnimationFrame(loop)
    }
    const startLoop = () => {
      stopAuto()
      if (!raf) {
        prev = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }

    const ro = new ResizeObserver(() => {
      const h = el.scrollWidth / 2
      if (Math.abs(h - half) < 0.5) return
      readX()
      half = h
      wrapX()
      if (anim) startAuto()
    })
    ro.observe(el)
    // only animate while the row is on screen
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (!visible) anim?.pause()
      else if (anim) anim.play()
      else if (!raf) startAuto()
    })
    io.observe(box)

    const down = (e: PointerEvent) => {
      startLoop()
      dragging = true
      startX = e.clientX
      startT = performance.now()
      moved = 0
      lastX = e.clientX
      lastT = performance.now()
      vel = 0
      box.setPointerCapture(e.pointerId)
      box.classList.add('cursor-grabbing')
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const now = performance.now()
      const dx = e.clientX - lastX
      x += dx
      moved = Math.max(moved, Math.abs(e.clientX - startX))
      vel = (dx / Math.max(1, now - lastT)) * 1000
      lastX = e.clientX
      lastT = now
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      // a quick press that barely moved is a click, not a drag
      if (e.type === 'pointerup' && moved < 6 && performance.now() - startT < 500) {
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find((n) => (n as HTMLElement).dataset?.id) as HTMLElement | undefined
        if (hit?.dataset.id) {
          vel = auto
          box.classList.remove('cursor-grabbing')
          onTapRef.current?.(hit.dataset.id)
          return
        }
      }
      vel = Math.max(-3000, Math.min(3000, vel))
      box.classList.remove('cursor-grabbing')
    }
    // two-finger sideways swipe on a trackpad (or shift + wheel) moves the row;
    // mostly-vertical wheel stays page scrolling
    const wheel = (e: WheelEvent) => {
      const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0)
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return
      e.preventDefault()
      startLoop()
      x -= dx
      vel = 0
      wheelUntil = performance.now() + 250
    }
    box.addEventListener('wheel', wheel, { passive: false })
    box.addEventListener('pointerdown', down)
    box.addEventListener('pointermove', move)
    box.addEventListener('pointerup', up)
    box.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(raf)
      anim?.cancel()
      io.disconnect()
      ro.disconnect()
      box.removeEventListener('wheel', wheel)
      box.removeEventListener('pointerdown', down)
      box.removeEventListener('pointermove', move)
      box.removeEventListener('pointerup', up)
      box.removeEventListener('pointercancel', up)
    }
  }, [speed])

  return (
    <div ref={wrap} className="flex cursor-grab touch-pan-y overflow-hidden select-none">
      <div ref={track} className="flex shrink-0 gap-3 pr-3 will-change-transform sm:gap-4 sm:pr-4">
        {children}
      </div>
    </div>
  )
}

function Clients({ onOpen }: { onOpen: (p: Project) => void }) {
  const covers = projects.map((p) => p.id)
  const half = Math.ceil(covers.length / 2)
  const rows = [covers.slice(0, half), covers.slice(half)]
  return (
    <section aria-label="Clients" className="relative bg-ink py-10 sm:py-14">
      {/* client logos: drifts on its own, and can be dragged or swiped sideways like the project rows */}
      <div className="edge-fade [--logo-k:0.68] sm:[--logo-k:1]">
        <DragRow speed={-40}>
          {/* 6 sets of logos (two identical halves) so the loop has no gap even on very wide screens */}
          {[0, 1, 2, 3, 4, 5].flatMap((k) =>
            clients.map((c, i) => (
              <div key={`${k}-${i}`} className="flex h-16 shrink-0 items-center px-6 font-display text-lg leading-none whitespace-nowrap text-white uppercase opacity-90 sm:h-20 sm:px-9 sm:text-2xl">
                {c.logo ? (
                  // same visual weight for every logo: wide ones get shorter, square ones taller
                  <img src={img(`logos/${c.logo}`)} alt={k ? '' : c.name} decoding="async" draggable={false}
                    width={Math.round(100 * (c.ratio ?? 3))} height={100}
                    className="pointer-events-none w-auto"
                    style={{ height: `calc(${Math.min(52, 62 / Math.pow(c.ratio ?? 3, 0.42)).toFixed(1)}px * var(--logo-k, 1))` }} />
                ) : c.name}
              </div>
            )),
          )}
        </DragRow>
      </div>
      <div className="mt-10 space-y-3 sm:mt-14 sm:space-y-4">
        {rows.map((r, ri) => (
          <DragRow key={ri} speed={ri ? 40 : -48} onTap={(id) => { const p = projects.find((q) => q.id === id); if (p) onOpen(p) }}>
            {[...r, ...r].map((id, i) => (
              <div key={i} data-id={id} data-cursor className="relative h-32 w-[228px] shrink-0 overflow-hidden rounded-[1.25rem] transition-transform duration-500 select-none hover:scale-[1.03] sm:h-52 sm:w-[370px]">
                <img src={img(`${id}-s.webp`)} decoding="async" alt="" width={370} height={208} draggable={false} className="h-full w-full object-cover" />
                <CoverText p={projects.find((q) => q.id === id)!} small />
              </div>
            ))}
          </DragRow>
        ))}
      </div>
    </section>
  )
}

/* ---------------- TAF! STATUETTE ---------------- */
// A rendered 360° turn of the statuette on black (no glow, Doston asked).
// It sits on the pure black About section, so no blend mode is needed (blending an
// animated image made the browser redraw it with the page behind on every frame).
// It only plays while on screen.
function TafSpin({ className = '' }: { className?: string }) {
  // An animated image, not a video: Safari (and battery-saving modes) can refuse to start
  // muted autoplay videos, which left the statuette frozen. Animated WebP always plays.
  const still = reducedMotion()
  return (
    <img
      src={img(still ? 'taf-spin-poster.webp' : 'taf-spin.webp')}
      alt="Tashkent Advertising Festival 2023"
      loading="lazy"
      decoding="async"
      width={360}
      height={716}
      draggable={false}
      className={`pointer-events-none ${className}`}
    />
  )
}

/* ---------------- ABOUT ---------------- */
function About() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const sec = root.current!
    const stops: (() => void)[] = []
    const ctx = gsap.context(() => {
      const title = gsap.from('.about-title .char', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'expo.out', paused: true, onComplete: () => gsap.set('.about-title .char', { clearProps: 'transform' }) })
      stops.push(onReveal(sec.querySelector('.about-title')!, () => title.play()))
      sec.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
        const end = Number(el.dataset.value)
        const o = { v: 0 }
        el.textContent = '0'
        stops.push(onReveal(el, () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(o.v))) }), 0.9))
      })
      const award = gsap.from('.award', { y: 80, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.15, paused: true })
      stops.push(onReveal(sec.querySelector('.award')!, () => award.play()))
    }, root)

    // words light up one by one while scrolling (each word fades over 0.5 of the run, starting 0.1 apart, like a GSAP stagger)
    const text = sec.querySelector<HTMLElement>('.about-text')!
    const words = Array.from(sec.querySelectorAll<HTMLElement>('.about-word'))
    const total = 0.5 + 0.1 * Math.max(0, words.length - 1)
    const shown = words.map(() => -1)
    let wr: readonly [number, number] = [0, 1]
    let tTop = 0, tH = 0
    stops.push(onScroll(text, (y, vh) => {
      wr = rangeOf(tTop, tH, vh, ['top', 0.8], ['bottom', 0.55])
      const p = progress(y, wr) * total
      words.forEach((w, i) => {
        const o = Math.round((0.15 + 0.85 * clamp01((p - 0.1 * i) / 0.5)) * 100) / 100
        if (o !== shown[i]) { shown[i] = o; w.style.opacity = String(o) }
      })
    }, () => { tTop = pageTop(text); tH = text.offsetHeight }))

    // objects slide in from off-screen and grow as the section scrolls into view
    // (eased toward the scroll position, like a 1 s scrub), then keep drifting up a little while it scrolls past
    if (!isPhone()) {
      const objs = Array.from(sec.querySelectorAll<HTMLElement>('.about-obj'))
      const drift = [50, 30, 70, 40]
      const cur = objs.map(() => -1)
      let sTop = 0, sH = 0
      stops.push(onScroll(sec, (y, vh, dt) => {
        const fly = progress(y, rangeOf(sTop, sH, vh, ['top', 0.95], ['top', 0.15]))
        const away = progress(y, rangeOf(sTop, sH, vh, ['top', 0.15], ['bottom', 0]))
        let moving = false
        objs.forEach((el, i) => {
          // smooth toward the target
          const c = cur[i] < 0 ? fly : cur[i] + (fly - cur[i]) * (1 - Math.exp(-dt / 0.28))
          cur[i] = Math.abs(fly - c) < 0.0005 ? fly : c
          if (cur[i] !== fly) moving = true
          const side = Number(el.dataset.from)
          const e = power2Out(cur[i])
          const x = side * 140 * (1 - e)
          const yy = 40 * (1 - e) - drift[i % 4] * away
          el.style.transform = `translate3d(${x.toFixed(2)}%,${yy.toFixed(2)}%,0) rotate(${(side * 35 * (1 - e)).toFixed(2)}deg) scale(${(0.55 + 0.45 * e).toFixed(4)})`
        })
        return moving
      }, () => { sTop = pageTop(sec); sH = sec.offsetHeight }))
    } else {
      // phones: a single light fly-in when each object appears, no scroll-linked motion
      const m = gsap.context(() => {
        sec.querySelectorAll<HTMLElement>('.about-obj-m').forEach((el) => {
          const side = Number(el.dataset.from)
          const tw = gsap.from(el, { xPercent: side * 110, rotate: side * 30, scale: 0.6, autoAlpha: 0, duration: 1.2, ease: 'expo.out', paused: true })
          stops.push(onReveal(el, () => tw.play(), 0.92))
        })
      }, root)
      stops.push(() => m.revert())
    }
    return () => {
      stops.forEach((f) => f())
      ctx.revert()
      words.forEach((w) => (w.style.opacity = ''))
    }
  }, [lang])

  return (
    <section id="about" ref={root} className="relative overflow-hidden bg-ink px-4 pt-28 pb-40 sm:px-8 sm:pt-40 sm:pb-56">
      {/* big chrome objects that fly in from the screen edges while scrolling, like the reference */}
      <div data-from="-1" className="about-obj live-wc pointer-events-none absolute hidden sm:block top-24 left-[-2%] w-28 sm:top-32 sm:w-[17vw]">
        <span aria-hidden="true" className="obj-glow" />
        <Grab>
          <img src={img('el-ae.webp')} alt="" loading="lazy" className="floaty relative w-full" style={{ ['--r' as string]: '-12deg' }} />
        </Grab>
      </div>
      <div data-from="1" className="about-obj live-wc pointer-events-none absolute hidden sm:block top-20 right-[-3%] w-32 sm:top-28 sm:w-[19vw]">
        <span aria-hidden="true" className="obj-glow" />
        <Grab>
          <img src={img('el-3d.webp')} alt="" loading="lazy" className="floaty relative w-full" style={{ ['--r' as string]: '10deg', ['--d' as string]: '8s' }} />
        </Grab>
      </div>
      <div data-from="-1" className="about-obj live-wc pointer-events-none absolute hidden sm:block top-[34%] left-[-4%] w-28 sm:w-[16vw]">
        <span aria-hidden="true" className="obj-glow" />
        <Grab>
          <img src={img('el-pen.webp')} alt="" loading="lazy" className="floaty relative w-full" style={{ ['--r' as string]: '14deg', ['--d' as string]: '9s' }} />
        </Grab>
      </div>
      <div data-from="1" className="about-obj live-wc pointer-events-none absolute hidden sm:block top-[36%] right-[-4%] w-36 sm:w-[22vw]">
        <span aria-hidden="true" className="obj-glow" />
        <Grab>
          <img src={img('ace-pad.webp')} alt="" loading="lazy" className="floaty relative w-full" style={{ ['--r' as string]: '-14deg', ['--d' as string]: '7s' }} />
        </Grab>
      </div>

      {/* phones: two objects above the heading, two between the button and the stats */}
      <div data-from="-1" className="about-obj-m pointer-events-none absolute top-14 left-3 w-24 sm:hidden">
        <img src={img('el-ae.webp')} alt="" loading="lazy" className="w-full -rotate-12" />
      </div>
      <div data-from="1" className="about-obj-m pointer-events-none absolute top-16 right-2 w-28 sm:hidden">
        <img src={img('el-3d.webp')} alt="" loading="lazy" className="w-full rotate-[10deg]" />
      </div>

      <div className="relative mx-auto max-w-[1100px] pt-20 text-center sm:pt-0">
        <h2 className="about-title outline-text font-display text-[clamp(2.6rem,10vw,10rem)] leading-none uppercase">
          <SplitChars text={t(ui.about.title)} />
        </h2>
        <p className="about-text mx-auto mt-10 max-w-[640px] text-base leading-[1.7] font-medium sm:text-lg">
          {t(ui.about.text)
            .split(' ')
            .map((w, i) => (
              <span key={i} className="about-word">
                {w}{' '}
              </span>
            ))}
        </p>
        <a href={contacts.telegram} target="_blank" rel="noreferrer" className="pill-grad mt-10 px-7 py-3 text-[12px]">
          {t(ui.hero.cta)} <span aria-hidden>•</span>
        </a>

        <div className="pointer-events-none mt-12 flex items-center justify-between sm:hidden">
          <div data-from="-1" className="about-obj-m w-32">
            <img src={img('el-pen.webp')} alt="" loading="lazy" className="w-full rotate-[14deg]" />
          </div>
          <div data-from="1" className="about-obj-m w-40">
            <img src={img('ace-pad.webp')} alt="" loading="lazy" className="w-full -rotate-12" />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[820px] grid-cols-2 border-y border-line sm:mt-24">
          {ui.about.stats.map((s, i) => (
            <div key={i} className={`py-6 ${i ? 'border-l border-line' : ''}`}>
              <div className="font-display text-5xl sm:text-7xl">
                <span className="stat-num" data-value={s.value}>
                  {s.value}
                </span>
                {s.suffix}
              </div>
              <div className="mt-2 text-[11px] font-bold tracking-wide text-white/50 uppercase sm:text-xs">
                {t(s.label)}{s.unit && ` · ${t(s.unit)}`}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-28 flex max-w-[1080px] flex-col items-center justify-center gap-6 sm:mt-40 sm:flex-row sm:gap-12">
          <TafSpin className="award w-52 shrink-0 sm:w-64 lg:w-72" />
          <div className="award w-full max-w-[700px] flex-1 rounded-[1.75rem] border-[1.5px] border-white/60 p-6 text-left sm:p-9">
            <div className="font-display text-4xl">{t(ui.about.award.title)}</div>
            <p className="mt-2 text-sm font-semibold text-white/60 uppercase">{t(ui.about.award.sub)}</p>
            <img src={img('violence.webp')} srcSet={`${img('violence-s.webp')} 640w, ${img('violence.webp')} 1200w`} sizes="(max-width: 640px) 90vw, 560px" alt="Violence" loading="lazy" className="mt-5 aspect-video w-full rounded-xl object-cover" />
            <p className="mt-4 text-xs text-white/40">{t(ui.about.award.note)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SERVICES (light panel) ---------------- */
function Services() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  // the light panel slides up over the black page, and the title starts pale grey and fills in black
  useEffect(() => {
    const sec = root.current
    if (!sec || reducedMotion()) return
    const card = sec.querySelector<HTMLElement>('.svc-card')!
    const title = sec.querySelector<HTMLElement>('.svc-title')!
    let top = 0, h = 0, titleTop = 0, titleH = 0
    let lastP = -1, lastC = -1
    const stop = onScroll(sec, (y, vh) => {
      const p = progress(y, rangeOf(top, h, vh, ['top', 1], ['top', 0.35]))
      if (p !== lastP) {
        lastP = p
        // only a layer of its own while it moves: a big panel kept on the GPU costs memory the whole time
        card.style.willChange = p < 1 ? 'transform' : ''
        card.style.transform = p < 1 ? `translate3d(0,${(120 * (1 - p)).toFixed(1)}px,0) scale(${(0.96 + 0.04 * p).toFixed(4)})` : ''
      }
      const c = Math.round(progress(y, rangeOf(titleTop, titleH, vh, ['top', 0.85], ['top', 0.35])) * 100) / 100
      if (c !== lastC) {
        lastC = c
        const v = Math.round(0xc4 * (1 - c)), g = Math.round(0xc7 * (1 - c)), b = Math.round(0xcb * (1 - c))
        title.style.color = `rgb(${v},${g},${b})`
      }
    }, () => {
      top = pageTop(sec)
      h = sec.offsetHeight
      // the title is sticky, so take where it sits before it sticks: the top of the panel plus its padding
      // (measured with the panel in its starting place, moved down 120px and shrunk, as the old version did)
      titleTop = pageTop(card) + 120 + card.offsetHeight * 0.02 + 0.96 * parseFloat(getComputedStyle(card).paddingTop)
      titleH = title.offsetHeight
    })
    return () => {
      stop()
      card.style.transform = ''
      card.style.willChange = ''
      title.style.color = ''
    }
  }, [lang])

  // Like fido.studio: the title stays pinned at the top while the list scrolls under it.
  // Each row comes up from below faded, is clear in the middle of the screen,
  // then fades away before it reaches the title. Worked out from where each row
  // is on screen right now (not from positions measured once), so images loading higher
  // up the page can't push the effect out of place. All rows are read first and written
  // after, so the browser lays the page out once per frame, not once per row.
  useEffect(() => {
    const sec = root.current
    if (!sec || reducedMotion()) return
    const rows = Array.from(sec.querySelectorAll<HTMLElement>('.svc-row'))
    const desk = window.matchMedia('(min-width: 640px)')
    const shift = rows.map(() => 0)
    const tops = rows.map(() => 0)
    const hs = rows.map(() => 0)
    const shownO = rows.map(() => '')
    const stop = onScroll(sec, (_y, vh) => {
      const d = desk.matches
      const exitStart = d ? 0.5 : 0.48
      const exitEnd = d ? 0.3 : 0.28 // just below the pinned title
      for (let i = 0; i < rows.length; i++) {
        const b = rows[i].getBoundingClientRect()
        tops[i] = b.top
        hs[i] = b.height
      }
      rows.forEach((r, i) => {
        const hgt = hs[i]
        const top = tops[i] - shift[i]
        if (top + hgt < -200 || top > vh + 200) return // off screen: nothing to update
        const c = (top + hgt / 2) / vh
        const tin = clamp01((1 - c) / 0.36)
        const e = 1 - Math.pow(1 - tin, 2)
        const out = clamp01((exitStart - c) / (exitStart - exitEnd))
        const y = Math.round((70 * (1 - e) - 40 * out) * 10) / 10
        const o = ((0.08 + 0.92 * e) * (1 - out)).toFixed(3)
        if (y === shift[i] && o === shownO[i]) return
        shift[i] = y
        shownO[i] = o
        r.style.opacity = o
        r.style.transform = `translate3d(0,${y}px,0)`
      })
    })
    return () => {
      stop()
      rows.forEach((r) => { r.style.opacity = ''; r.style.transform = '' })
    }
  }, [lang])

  return (
    <section id="services" ref={root} className="relative z-30 -mt-24 bg-transparent px-2 sm:-mt-32 sm:px-3">
      <div className="svc-card rounded-[2rem] bg-paper px-5 pt-20 pb-40 text-black sm:rounded-[2.75rem] sm:px-12 sm:pt-28 sm:pb-56">
        {/* pinned under the nav while the list below scrolls */}
        <h2 className="svc-title sticky top-[calc(72px+var(--sat))] z-10 text-center font-display text-[clamp(2.6rem,9vw,8.5rem)] leading-none uppercase sm:top-[calc(84px+var(--sat))]">{t(ui.services.title)}</h2>
        <ol className="mx-auto mt-[22vh] max-w-[1100px] pb-[18vh] sm:mt-[30vh]">
          {services.map((s, i) => (
            <li key={i} className="svc-row live-wc group grid grid-cols-[56px_1fr] items-start gap-x-4 py-[7vh] sm:grid-cols-[120px_1fr_1fr] sm:gap-x-10 sm:py-[9vh]">
              <span className="font-display text-[2.2rem] leading-[0.85] transition-colors duration-300 group-hover:text-violet sm:text-[4rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-cond text-lg font-extrabold uppercase transition-transform duration-500 group-hover:translate-x-2 sm:pt-2 sm:text-[1.7rem] sm:leading-tight">{t(s.title)}</h3>
              <p className="col-start-2 mt-2 max-w-[520px] text-sm leading-relaxed whitespace-pre-line text-black/55 sm:col-start-3 sm:mt-0 sm:pt-2 sm:text-base">{t(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- PROJECTS (stacked sticky cards) ---------------- */
function Projects() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const sec = root.current!
    let stop = () => {}
    const ctx = gsap.context(() => {
      const tw = gsap.from('.proj-title .char', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'expo.out', paused: true, onComplete: () => gsap.set('.proj-title .char', { clearProps: 'transform' }) })
      stop = onReveal(sec.querySelector('.proj-title')!, () => tw.play())
    }, root)
    return () => {
      stop()
      ctx.revert()
    }
  }, [lang])

  // Each card darkens a little as the next one slides over it (a black layer fading in,
  // not a CSS filter or a shrink: scaling a rounded card full of pictures was the slowest
  // thing on the page). Once a card is fully covered by the next one, its pictures are not
  // drawn at all: only its top edge still peeks out. The cards are sticky, so their place on
  // screen is read each frame (all reads first, then all writes).
  useEffect(() => {
    const sec = root.current
    if (!sec) return
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.proj-card'))
    const dims = cards.map((c) => c.querySelector<HTMLElement>('.proj-dim')!)
    const grids = cards.map((c) => c.querySelector<HTMLElement>('.proj-grid')!)
    const stickTop = cards.map(() => 0)
    const nextTop = cards.map(() => 0)
    const dimShown = cards.map(() => -1)
    const still = reducedMotion()
    const stop = onScroll(sec, (_y, vh) => {
      for (let i = 1; i < cards.length; i++) nextTop[i] = cards[i].getBoundingClientRect().top
      for (let i = 0; i < cards.length - 1; i++) {
        const t = nextTop[i + 1]
        const v = t <= stickTop[i + 1] + 1 ? 'hidden' : ''
        if (grids[i].style.visibility !== v) grids[i].style.visibility = v
        if (still) continue
        // from the next card's top at 80% of the screen to 20%
        const o = Math.round(0.4 * clamp01((0.8 * vh - t) / (0.6 * vh)) * 100) / 100
        if (o !== dimShown[i]) { dimShown[i] = o; dims[i].style.opacity = String(o) }
      }
    }, () => {
      cards.forEach((c, i) => (stickTop[i] = parseFloat(getComputedStyle(c).top) || 0))
    })
    return () => {
      stop()
      grids.forEach((g) => (g.style.visibility = ''))
      dims.forEach((d) => (d.style.opacity = ''))
    }
  }, [lang])

  return (
    <section id="projects" ref={root} className="relative z-20 bg-ink px-3 pt-16 pb-40 sm:px-8 sm:pt-24 sm:pb-52">
      <h2 className="proj-title outline-text mb-14 text-center font-display text-[clamp(2.6rem,10vw,10rem)] leading-none uppercase sm:mb-20">
        <SplitChars text={t(ui.projects.title)} />
      </h2>
      <div className="mx-auto max-w-[1400px]">
        {categories.map((c, i) => {
          const ps = c.projects.map((id) => projects.find((p) => p.id === id)!)
          const pics = c.covers ?? [ps[0].id, (ps[1] ?? ps[0]).id, (ps[2] ?? ps[1] ?? ps[0]).id]
          return (
            <article key={c.id} className="proj-card sticky mb-[6vh]" style={{ top: `calc(9vh + var(--sat) + ${i * 14}px)` }}>
              <a href={`#/work/${c.id}`} className="group relative block origin-top overflow-hidden rounded-[1.75rem] border-[1.5px] border-white/70 bg-ink p-3 sm:rounded-[2.25rem] sm:p-5">
                <span className="proj-dim live-wo pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
                <header className="flex items-center gap-3 px-1 pt-1 pb-4 sm:gap-5 sm:px-2 sm:pb-5">
                  <span className="font-display text-4xl leading-none sm:text-6xl">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-cond text-sm font-extrabold uppercase sm:text-xl">{t(c.title)}</div>
                    <div className="truncate text-[11px] text-white/50 sm:text-sm">
                      {ps.length} {t(ui.projects.count)} · {t(c.text)}
                    </div>
                  </div>
                  <span className="pill-line shrink-0 px-4 py-2 text-[10px] group-hover:bg-white group-hover:text-black sm:px-6 sm:py-2.5 sm:text-xs">
                    {t(ui.projects.open)} →
                  </span>
                </header>
                {/* tiles keep the pictures' own 16:9 shape, so nothing gets cut off */}
                <div className="proj-grid grid w-full grid-cols-3 gap-2 sm:grid-rows-2 sm:gap-3">
                  {pics.map((p, k) => (
                    <span key={k} className={k === 0 ? 'col-span-3 aspect-video overflow-hidden rounded-[1.25rem] sm:col-span-2 sm:row-span-2' : 'hidden aspect-video overflow-hidden rounded-[1.25rem] sm:block'}>
                      <img src={img(`${p}.webp`)} srcSet={`${img(`${p}-s.webp`)} 640w, ${img(`${p}.webp`)} 1200w`} sizes={k === 0 ? "(max-width: 640px) 90vw, 62vw" : "(max-width: 640px) 90vw, 31vw"} alt={k === 0 ? t(c.title) : ''} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                    </span>
                  ))}
                </div>
              </a>
            </article>
          )
        })}
        <div className="mt-4 text-center">
          <a href="#/work/all" className="pill-line px-7 py-3 text-xs sm:text-sm">
            {t(ui.projects.all)} · {allWorks.projects.length} →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- DIRECTION PAGE (all projects of one category) ---------------- */
function CategoryPage({ cat, onOpen }: { cat: Category; onOpen: (p: Project) => void }) {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  const isAll = cat.id === 'all'
  // filter tabs on the "All works" page: '' = everything, otherwise a direction id
  const [filter, setFilter] = useState('')
  const shown = isAll && filter ? categories.find((c) => c.id === filter)! : cat
  const ps = shown.projects.map((id) => projects.find((p) => p.id === id)!)
  const idx = categories.indexOf(cat)
  const others = cat.id === 'all' ? categories : [...categories.filter((c) => c.id !== cat.id), allWorks]

  useLayoutEffect(() => {
    // the letter masks only matter while the letters rise in; after that they would cut
    // the round tops and bottoms of the tall letters, so they are opened
    const openMasks = () => gsap.set('.hero-title .line-mask', { overflow: 'visible' })
    if (reducedMotion()) return void openMasks()
    const ctx = gsap.context(() => {
      gsap.from('.cat-title .char', { yPercent: 110, stagger: 0.03, duration: 1.1, ease: 'expo.out', delay: 0.1 })
      gsap.from('.cat-fade', { y: 30, autoAlpha: 0, duration: 1, ease: 'expo.out', delay: 0.4 })
    }, root)
    return () => ctx.revert()
  }, [lang, cat.id])

  // cards come up as they scroll in; after a tab switch the visible ones come up together
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const stops: (() => void)[] = []
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cat-item').forEach((el, i) => {
        const inView = el.getBoundingClientRect().top < window.innerHeight * 0.92
        if (filter && inView) gsap.from(el, { y: 50, autoAlpha: 0, duration: 0.8, ease: 'expo.out', delay: i * 0.06 })
        else {
          const tw = gsap.from(el, { y: 80, autoAlpha: 0, duration: 1.1, ease: 'expo.out', paused: true })
          stops.push(onReveal(el, () => tw.play(), 0.92))
        }
      })
    }, root)
    refresh()
    return () => {
      stops.forEach((f) => f())
      ctx.revert()
    }
  }, [lang, cat.id, filter])

  return (
    <main ref={root} className="relative bg-ink px-3 pt-[calc(6rem+var(--sat))] pb-48 sm:px-8 sm:pt-[calc(7rem+var(--sat))] sm:pb-64">
      <div className="mx-auto max-w-[1300px]">
        <a href="#" className="cat-fade pill-line px-5 py-2 text-xs">
          ← {t(ui.projects.back)}
        </a>
        <div className="mt-10 flex items-end gap-4 sm:gap-8">
          {idx >= 0 && <span className="font-display text-5xl leading-none text-white/30 sm:text-8xl">{String(idx + 1).padStart(2, '0')}</span>}
          <h1 className="cat-title silver font-display text-[clamp(2.4rem,7.5vw,7.5rem)] leading-[0.88] uppercase">
            <SplitChars text={t(cat.title)} />
          </h1>
        </div>
        <p className="cat-fade mt-6 max-w-xl text-sm font-semibold text-white/60 uppercase sm:text-base">
          {t(cat.text)} · {cat.projects.length} {t(ui.projects.count)}
        </p>

        {isAll && (
          <div className="cat-fade mt-10 flex flex-wrap gap-2 sm:mt-14 sm:gap-3">
            {[{ id: '', label: t(ui.projects.everything), n: cat.projects.length }, ...categories.map((c) => ({ id: c.id, label: t(c.short ?? c.title), n: c.projects.length }))].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:px-7 sm:py-3.5 sm:text-lg ${filter === f.id ? 'bg-white text-black' : 'bg-white/[0.08] text-white hover:bg-white/[0.16]'}`}
              >
                {f.label}
                <sup className="ml-1 text-[0.6em] opacity-50">{f.n}</sup>
              </button>
            ))}
          </div>
        )}

        <div className={`grid gap-5 md:grid-cols-2 md:gap-6 ${isAll ? 'mt-8 sm:mt-10' : 'mt-14 sm:mt-20'}`}>
          {ps.map((p, i) => (
            <button key={p.id} onClick={() => onOpen(p)} className={`cat-item group block overflow-hidden rounded-[1.75rem] border-[1.5px] border-white/70 p-3 text-left sm:p-4 ${ps.length % 2 && i === 0 ? 'md:col-span-2' : ''}`}>
              <span className="relative block aspect-video overflow-hidden rounded-[1.25rem]">
                {(p.videos || p.embed || p.p1v) && <span className="absolute top-3 left-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">{p.videos ? "▶ Video" : "▶ Motion"}</span>}
                <img src={img(`${p.id}.webp`)} srcSet={`${img(`${p.id}-s.webp`)} 640w, ${img(`${p.id}.webp`)} 1200w`} sizes="(max-width: 640px) 95vw, 50vw" alt={t(p.title)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              </span>
              {/* project name on the left, its direction on the right (like fido.studio) */}
              <span className="flex items-baseline gap-4 px-1 pt-4 pb-1">
                <span className="min-w-0 flex-1 truncate text-lg font-semibold sm:text-2xl">{t(p.title)}</span>
                <span className="shrink-0 text-sm text-white/50 transition-colors group-hover:text-white sm:text-base">{t(dirOf(p.id))}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-24 border-t border-line pt-10">
          <div className="mb-5 text-xs font-extrabold tracking-wide text-white/50 uppercase">{t(ui.projects.title)}</div>
          <div className="flex flex-wrap gap-3">
            {others.map((c) => (
              <a key={c.id} href={`#/work/${c.id}`} className="pill-line px-5 py-2.5 text-xs sm:text-sm">
                {t(c.title)} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

// the direction a project belongs to (short label, as on the filter tabs)
const dirOf = (id: string) => {
  const c = categories.find((k) => k.projects.includes(id))
  return c ? (c.short ?? c.title) : allWorks.title
}

// Title over a project cover, like the deck covers: dark shade from the left and bottom,
// the title with its last part in the accent color, and a small info row.
const coverLabels = {
  client: { uz: 'Mijoz', ru: 'Клиент', en: 'Client' },
  year: { uz: 'Yil', ru: 'Год', en: 'Year' },
  work: { uz: 'Ish', ru: 'Работа', en: 'Work' },
}
function CoverText({ p, small }: { p: Project; small?: boolean }) {
  const { t } = useLang()
  const title = t(p.title)
  const cut = title.lastIndexOf(' · ') >= 0 ? title.lastIndexOf(' · ') + 3 : title.lastIndexOf(' ') + 1
  const head = title.slice(0, cut)
  const tail = title.slice(cut)
  const meta: [string, string][] = [[t(coverLabels.client), p.client]]
  if (p.year) meta.push([t(coverLabels.year), p.year])
  meta.push([t(coverLabels.work), t(p.tags)])
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,10,.6)_0%,rgba(6,7,10,.3)_40%,rgba(6,7,10,0)_70%),linear-gradient(0deg,rgba(6,7,10,.78)_0%,rgba(6,7,10,.38)_30%,rgba(6,7,10,0)_60%)]" />
      <span className={`pointer-events-none absolute inset-x-0 bottom-0 block ${small ? 'p-3 sm:p-4' : 'p-4 sm:p-6 lg:p-7'}`}>
        <span className={`block max-w-[85%] font-display leading-[1.02] text-white normal-case ${small ? 'text-[13px] sm:text-lg' : 'text-[clamp(1.25rem,2.6vw,2.3rem)]'}`}>
          {head}
          <span style={{ color: p.accent || '#9b7bff' }}>{tail}</span>
        </span>
        <span className={`mt-3 hidden gap-6 ${small ? '' : 'sm:flex'}`}>
          {meta.map(([k, v]) => (
            <span key={k} className="min-w-0">
              <span className="block text-[9px] font-bold tracking-[0.18em] text-white/50 uppercase">{k}</span>
              <span className="block truncate text-[11px] font-semibold text-white/90 lg:text-xs">{v}</span>
            </span>
          ))}
        </span>
      </span>
    </>
  )
}

// An animated HTML presentation shown at its full height, so the modal does the scrolling.
// Its slides still animate as they reach the screen (IntersectionObserver sees the real viewport).
function EmbedDeck({ src, title, onInnerScroll, active = true }: { src: string; title: string; onInnerScroll?: (y: number) => void; active?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [h, setH] = useState(0)
  const [compact] = useState(() => window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches)
  useEffect(() => {
    const f = frame.current
    if (!f) return
    let ro: ResizeObserver | undefined
    let watched: Document | undefined
    // the deck's own document, once its HTML is parsed (not the blank page the iframe starts with)
    const deckDoc = () => {
      const doc = f.contentDocument
      return doc?.body && doc.readyState !== 'loading' && doc.location.href !== 'about:blank' ? doc : undefined
    }
    const measure = () => {
      const doc = deckDoc()
      if (doc) setH(doc.documentElement.scrollHeight)
    }
    // Size the frame as soon as the page structure exists, not after every image and video
    // has loaded: waiting for 'load' left only the first slides visible for 5-10 seconds.
    const attach = () => {
      const doc = deckDoc()
      if (!doc) return
      measure()
      if (watched !== doc && 'ResizeObserver' in window) {
        ro?.disconnect()
        ro = new ResizeObserver(measure)
        ro.observe(doc.body)
        watched = doc
      }
    }
    // Safari does not always fire the deck's own scroll observers inside a frame this tall,
    // which left its slides blank and still: reveal slides from here as they scroll into view.
    let raf = 0
    const reveal = () => {
      raf = 0
      const doc = deckDoc()
      if (!doc) return
      const top = f.getBoundingClientRect().top
      const vh = window.innerHeight
      doc.querySelectorAll<HTMLElement>('.frame:not(.in)').forEach((fr) => {
        const r = fr.getBoundingClientRect()
        if (top + r.top < vh * 0.85 && top + r.bottom > vh * 0.1) fr.classList.add('in')
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(reveal) }
    window.addEventListener('scroll', onScroll, true)
    const poll = window.setInterval(() => { attach(); onScroll() }, 100)
    const stop = window.setTimeout(() => window.clearInterval(poll), 15000)
    f.addEventListener('load', attach)
    window.addEventListener('resize', measure)
    return () => {
      window.clearInterval(poll)
      window.clearTimeout(stop)
      window.removeEventListener('scroll', onScroll, true)
      cancelAnimationFrame(raf)
      f.removeEventListener('load', attach)
      window.removeEventListener('resize', measure)
      ro?.disconnect()
    }
  }, [])
  const url = `${import.meta.env.BASE_URL}${src}`
  return (
    <div className="w-full">
      {/* phones: the deck scrolls inside a screen-high frame, so the phone only draws the slides on screen
          (drawing all 18 at once ran out of memory and Safari reloaded the page) */}
      {compact ? (
        <iframe
          src={url}
          title={title}
          className="block w-full bg-black"
          // the frame only takes the finger once the project view has scrolled it fully into place;
          // before that, swipes move the whole view (otherwise the part above stayed stuck on top)
          style={{ height: '100svh', border: 0, pointerEvents: active ? 'auto' : 'none' }}
          // the deck scrolls inside the frame here, so pass its scroll up to hide or show the title bar
          onLoad={(e) => {
            const w = e.currentTarget.contentWindow
            try { w?.addEventListener('scroll', () => onInnerScroll?.(w.scrollY), { passive: true }) } catch { /* other origin */ }
          }}
        />
      ) : (
        <iframe ref={frame} src={url} title={title} scrolling="no" className="block w-full bg-black" style={{ height: h || '56vw', border: 0 }} />
      )}
    </div>
  )
}

// phones get a 1080px copy: the full-size layouts are huge to decode and can crash mobile Safari
/* animated first page: plays once and stays on the finished page.
   If autoplay is blocked (or motion is reduced) the finished page is shown as a picture. */
function CoverVideo({ id, alt }: { id: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still, setStill] = useState(() => reducedMotion())
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.play()?.catch(() => setStill(true))
  }, [])
  if (still) return <Layout file={`${id}-p1.webp`} alt={alt} />
  return (
    <video
      ref={ref}
      className="block aspect-video w-full object-cover"
      src={`${import.meta.env.BASE_URL}video/${id}-p1.mp4`}
      poster={`${import.meta.env.BASE_URL}video/${id}-p1.jpg`}
      aria-label={alt}
      muted
      playsInline
      autoPlay
      preload="auto"
    />
  )
}

function Layout({ file, alt }: { file: string; alt: string }) {
  return (
    <picture>
      <source media="(max-width: 900px)" srcSet={img(file.replace('.webp', '-m.webp'))} />
      <img src={img(file)} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </picture>
  )
}

/* "About the project": what it is, what was made, Doston's role and the studio */
function ProjectAbout({ project }: { project: Project }) {
  const { t } = useLang()
  const a = projectAbout[project.id]
  const studio = a?.studio === undefined ? 'Tasnif Group' : a.studio
  const rows: [string, string][] = [
    [t(ui.projects.client), project.client],
    ...(project.year ? [[t(ui.projects.year), project.year] as [string, string]] : []),
    [t(ui.projects.work), t(a?.work ?? project.tags)],
    ...(a?.role ? [[t(ui.projects.role), t(a.role)] as [string, string]] : []),
  ]
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(122,77,255,0.28)_0%,transparent_65%)]" />
      <div className="relative mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#9b7bff] uppercase">{t(ui.projects.about)}</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.02] font-bold">{t(a?.title ?? project.title)}</h2>
          {a && <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-white/75 sm:text-base">{t(a.text)}</p>}
        </div>
        <dl className="self-end border-b border-white/12 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] gap-4 border-t border-white/12 py-4">
              <dt className="pt-0.5 text-[10px] font-bold tracking-[0.2em] text-[#9b7bff] uppercase">{k}</dt>
              <dd className="font-medium text-white/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      {studio && (
        <div className="relative mx-auto mt-12 flex max-w-[1300px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 sm:mt-16">
          {studio === 'Tasnif Group' && <img src={img('logos/tasnif-group.webp')} alt="Tasnif Group" className="h-6 w-auto shrink-0 sm:h-7" />}
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-[0.12em] text-white/80 uppercase sm:text-[13px]">{t(ui.projects.madeAt).replace('{s}', studio)}</div>
            <div className="mt-1 text-[11px] text-white/50 sm:text-xs">{t(ui.projects.rights).replace('{s}', studio)}</div>
          </div>
        </div>
      )}
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  // the title bar floats over the project: it slides away while scrolling down
  // and comes back as soon as you scroll up
  const [barHidden, setBarHidden] = useState(false)
  const lastY = useRef(0)
  // phones: the deck frame scrolls on its own, and only once the view has reached the bottom
  const [deckActive, setDeckActive] = useState(false)
  const [deckOnly] = useState(() => !!project.embed && !project.videos?.length && project.full === false && !project.p1 && window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches)
  const onOuterScroll = () => {
    // the deck takes the finger once its frame has reached the top of the screen
    const f = ref.current?.querySelector('iframe')
    if (f) {
      const r = f.getBoundingClientRect()
      setDeckActive(r.top <= 2 && r.bottom > 120)
    }
    onScroll()
  }
  const onScroll = (y = ref.current?.scrollTop ?? 0) => {
    const d = y - lastY.current
    if (Math.abs(d) > 4) {
      setBarHidden(d > 0 && y > 60)
      lastY.current = y
    }
  }
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    // clearProps: a leftover transform would make the fixed title bar and close button scroll away with the page
    // once the view is in place, a deck at its very top takes the finger straight away
    if (!reducedMotion()) gsap.from(ref.current, { yPercent: 100, duration: 0.9, ease: 'expo.out', clearProps: 'transform', onComplete: onOuterScroll })
    else onOuterScroll()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[70] bg-black" onClick={onClose}>
      <div ref={ref} onScroll={onOuterScroll} className="absolute inset-0 overflow-y-auto bg-ink" onClick={(e) => e.stopPropagation()}>
        <div className={`fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-4 bg-gradient-to-b from-black/85 via-black/55 to-transparent px-5 pt-[calc(1rem+var(--sat))] pb-10 transition-transform duration-500 ease-out sm:px-8 sm:pt-[calc(1.25rem+var(--sat))] ${barHidden ? '-translate-y-full' : ''}`}>
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.2em] text-white/50 uppercase">{project.client}{project.year && ` · ${project.year}`} · {t(project.tags)}</div>
            <h3 className="truncate font-display text-lg font-bold sm:text-2xl">{t(project.title)}</h3>
            {project.note && <p className="mt-1 text-xs text-white/60 sm:text-sm">{t(project.note)}</p>}
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full bg-white px-5 py-2 text-xs font-semibold tracking-widest text-black uppercase">
            {t(ui.projects.close)} ✕
          </button>
        </div>
        {/* page 1 (video, or the first page of the layout), then "About the project" as page 2.
            Decks carry their own About page: the role and studio are written into it. */}
        {/* while the title bar is hidden (scrolling down), a small close button stays on screen */}
        <button
          onClick={onClose}
          aria-label={t(ui.projects.close)}
          className={`fixed top-[calc(1rem+var(--sat))] right-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/70 text-xl text-white backdrop-blur transition-all duration-300 sm:right-8 ${barHidden ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
        >
          ✕
        </button>
        {project.videos?.map((v, i) => (
          <div key={v}>
            <video
              className="block max-h-[100svh] w-full bg-black object-contain"
              src={`${import.meta.env.BASE_URL}video/${v}.mp4`}
              poster={`${import.meta.env.BASE_URL}video/${v}.jpg`}
              controls
              playsInline
              preload="metadata"
            />
            {i === 0 && !project.embed && <ProjectAbout project={project} />}
          </div>
        ))}
        {project.p1 && (project.p1v ? <CoverVideo id={project.id} alt={t(project.title)} /> : <Layout file={`${project.id}-p1.webp`} alt={t(project.title)} />)}
        {!project.videos?.length && !project.embed && <ProjectAbout project={project} />}
        {project.embed && <EmbedDeck src={project.embed} title={t(project.title)} onInnerScroll={onScroll} active={deckActive} />}
        {project.full !== false &&
          (project.parts ? Array.from({ length: project.parts }, (_, i) => `${project.id}-full-${i + 1}.webp`) : [`${project.id}-full.webp`]).map((f, i) => (
            <Layout key={f} file={f} alt={i || project.p1 ? '' : t(project.title)} />
          ))}
        {/* end of the project: way back. Not under a deck on phones: the deck fills the screen and
            scrolls inside itself, and any extra space below let the view slide and cut off its top */}
        <div className={`flex justify-center px-5 py-16 sm:py-24 ${deckOnly ? 'hidden' : ''}`}>
          <button onClick={onClose} className="rounded-full bg-white px-8 py-4 text-xs font-semibold tracking-widest text-black uppercase sm:text-sm">
            ← {t(ui.projects.backToProjects)}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------- BIG PROJECTS / TEAM ---------------- */
function Team() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const sec = root.current!
    const stops: (() => void)[] = []
    const ctx = gsap.context(() => {
      const title = gsap.from('.team-title .char', { yPercent: 110, stagger: 0.035, duration: 1, ease: 'expo.out', paused: true, onComplete: () => gsap.set('.team-title .char', { clearProps: 'transform' }) })
      stops.push(onReveal(sec.querySelector('.team-title')!, () => title.play()))
      const chips = gsap.from('.team-chip', { scale: 0, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'back.out(2)', paused: true })
      stops.push(onReveal(sec.querySelector('.team-chips')!, () => chips.play()))
    }, root)
    // the name ring turns once while the section crosses the screen
    const ring = sec.querySelector<SVGElement>('.team-ring')!
    let top = 0, h = 0, last = -1
    stops.push(onScroll(sec, (y, vh) => {
      const deg = Math.round(360 * progress(y, rangeOf(top, h, vh, ['top', 1], ['bottom', 0])) * 10) / 10
      if (deg !== last) { last = deg; ring.style.transform = `rotate(${deg}deg)` }
    }, () => { top = pageTop(sec); h = sec.offsetHeight }))
    return () => {
      stops.forEach((f) => f())
      ctx.revert()
      ring.style.transform = ''
    }
  }, [lang])

  const ring = `${t(team.title)} • ${t(team.title)} • `
  const dots = ['bg-violet', 'bg-[#9b7bff]', 'bg-pink', 'bg-white', 'bg-violet', 'bg-[#9b7bff]']
  return (
    <section ref={root} className="relative z-20 overflow-hidden bg-ink px-4 pt-16 pb-48 sm:px-8 sm:pb-64">
      <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="team-title outline-text font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.9] uppercase">
            <SplitChars text={t(team.title)} />
          </h2>
          <p className="mt-8 max-w-xl text-base leading-[1.7] font-medium text-white/80 sm:text-lg">{t(team.lead)}</p>
          <div className="team-chips mt-10 flex flex-wrap gap-3">
            {team.directions.map((d, i) => (
              <span key={i} className="team-chip inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-white/70 px-5 py-2.5 text-sm font-bold uppercase">
                <span className={`h-2.5 w-2.5 rounded-full ${dots[i % dots.length]}`} />
                {t(d)}
              </span>
            ))}
          </div>
          <a href={contacts.telegram} target="_blank" rel="noreferrer" className="pill-grad mt-12 px-8 py-4 text-[13px]">
            {t(team.cta)} <span aria-hidden>•</span>
          </a>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 200 200" className="team-ring live-wc absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
            </defs>
            <text className="fill-white font-display text-[13px] tracking-[0.14em]">
              <textPath href="#ring" textLength="510">{ring}</textPath>
            </text>
          </svg>
          <div className="absolute inset-[20%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_40%,#7a4dff_0%,#2a0f4a_55%,#000_100%)]">
            <img src={img('ace-bust.webp')} srcSet={`${img('ace-bust-s.webp')} 640w, ${img('ace-bust.webp')} 1000w`} sizes="(max-width: 640px) 80vw, 460px" alt="Doston «Ace» Daminov" loading="lazy" className="absolute inset-x-0 bottom-0 mx-auto w-[96%] translate-x-[11%]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function TgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.2em] w-[1.2em] fill-current" aria-hidden>
      <path d="M21.9 4.3 18.8 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.7 13l-4.6-1.4c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3Z" />
    </svg>
  )
}

/* ---------------- CONTACT (light panel) + FOOTER (black panel) ---------------- */
function Contact() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const sec = root.current!
    const panel = sec.querySelector<HTMLElement>('.ct-panel')!
    const objs = Array.from(sec.querySelectorAll<HTMLElement>('.ct-obj'))
    let stopReveal = () => {}
    const ctx = gsap.context(() => {
      const tw = gsap.from('.ct-title .char', { yPercent: 110, stagger: 0.03, duration: 1, ease: 'expo.out', paused: true, onComplete: () => gsap.set('.ct-title .char', { clearProps: 'transform' }) })
      stopReveal = onReveal(sec.querySelector('.ct-title')!, () => tw.play())
    }, root)
    // the light panel slides up, and the chrome objects fly in from the sides (eased like a 1 s scrub)
    let top = 0, h = 0, lastP = -1
    const cur = objs.map(() => -1)
    const stop = onScroll(sec, (y, vh, dt) => {
      const p = progress(y, rangeOf(top, h, vh, ['top', 1], ['top', 0.4]))
      if (p !== lastP) {
        lastP = p
        panel.style.willChange = p < 1 ? 'transform' : ''
        panel.style.transform = p < 1 ? `translate3d(0,${(120 * (1 - p)).toFixed(1)}px,0) scale(${(0.96 + 0.04 * p).toFixed(4)})` : ''
      }
      const fly = progress(y, rangeOf(top, h, vh, ['top', 0.95], ['top', 0.2]))
      let moving = false
      objs.forEach((el, i) => {
        const c = cur[i] < 0 ? fly : cur[i] + (fly - cur[i]) * (1 - Math.exp(-dt / 0.28))
        cur[i] = Math.abs(fly - c) < 0.0005 ? fly : c
        if (cur[i] !== fly) moving = true
        const side = Number(el.dataset.from)
        const e = power2Out(cur[i])
        el.style.transform = e < 1 ? `translate3d(${(side * 140 * (1 - e)).toFixed(2)}%,${(40 * (1 - e)).toFixed(2)}%,0) rotate(${(side * 35 * (1 - e)).toFixed(2)}deg) scale(${(0.55 + 0.45 * e).toFixed(4)})` : ''
      })
      return moving
    }, () => {
      h = panel.offsetHeight
      // measured from where the panel starts (moved down 120px and shrunk), as the old version did
      top = pageTop(panel) + 120 + h * 0.02
    })
    return () => {
      stop()
      stopReveal()
      ctx.revert()
      panel.style.transform = ''
      panel.style.willChange = ''
      objs.forEach((el) => (el.style.transform = ''))
    }
  }, [lang])

  // the footer row sits at the very end of the page, so reveal it when it becomes visible
  const footRow = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const row = footRow.current
    if (!row) return
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        row.classList.add('is-in')
        io.disconnect()
      }
    })
    io.observe(row)
    return () => io.disconnect()
  }, [])

  const socials = [
    { name: 'Telegram', href: contacts.telegram },
    { name: 'Instagram', href: contacts.instagram },
    { name: 'Behance', href: contacts.behance },
  ]

  // The form goes to Doston's Telegram bot through the relay; without one it opens the mail app
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    if (!contacts.relay) {
      const subject = `Portfolio: ${f.get('name') || ''}`
      const body = `${f.get('message') || ''}\n\n${f.get('name') || ''} · ${f.get('phone') || ''}`
      window.location.href = `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }
    setStatus('sending')
    try {
      const r = await fetch(contacts.relay, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(f)) })
      if (!r.ok) throw new Error()
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }
  const field = 'w-full border-b border-black/25 bg-transparent py-3 text-base text-black outline-none placeholder:text-black/40 focus:border-black'

  return (
    <footer id="contact" ref={root} className="relative z-30 -mt-24 px-2 sm:-mt-32 sm:px-3">
      <div className="ct-panel relative overflow-hidden rounded-[2rem] bg-paper px-5 pt-20 pb-40 text-black sm:rounded-[2.75rem] sm:px-14 sm:pt-28 sm:pb-52">
        {/* big chrome objects half off the panel edges, flying in on scroll like in About */}
        <div data-from="-1" className="ct-obj live-wc pointer-events-none absolute hidden sm:block bottom-14 left-[-8%] w-24 sm:bottom-[24%] sm:left-[-7%] sm:w-[16vw]">
          <Grab>
            <img src={img('el-3d.webp')} alt="" loading="lazy" className="floaty w-full" style={{ ['--r' as string]: '-12deg' }} />
          </Grab>
        </div>
        <div data-from="1" className="ct-obj live-wc pointer-events-none absolute top-[-4%] right-[-3%] w-24 sm:right-[-2%] sm:w-[12vw]">
          <Grab>
            <img src={img('el-bolt.webp')} alt="" loading="lazy" className="floaty w-full" style={{ ['--r' as string]: '16deg', ['--d' as string]: '8s' }} />
          </Grab>
        </div>
        <div className="relative mx-auto grid max-w-[1200px] gap-14 md:grid-cols-2 md:items-center">
          <div className="md:pl-10">
            <h2 className="ct-title font-display text-[clamp(2.1rem,3.6vw,4rem)] leading-[0.92] uppercase">
              {t(ui.contact.title)
                .split(' ')
                .map((w, i) => (
                  <SplitChars key={i} text={w} />
                ))}
            </h2>
            {/* Telegram is the main way to reach Doston */}
            <a href={contacts.telegram} target="_blank" rel="noreferrer" className="pill-grad mt-7 gap-3 px-7 py-4 text-[15px] sm:text-lg">
              <TgIcon /> {contacts.telegramHandle}
            </a>
            <div className="mt-5 flex flex-col gap-1 text-base font-semibold sm:text-lg">
              <a href={contacts.phoneHref} className="w-fit text-black transition-colors hover:text-violet">
                {contacts.phone}
              </a>
              <a href={`mailto:${contacts.email}`} className="w-fit text-sm font-medium break-all text-black/55 transition-colors hover:text-violet">
                {contacts.email}
              </a>
            </div>
            <p className="mt-4 max-w-sm text-sm text-black/55">{t(ui.contact.lead)}</p>
          </div>
          <form onSubmit={send} className="flex flex-col gap-4">
            <input name="name" required placeholder={t(ui.contact.form.name)} className={field} />
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={7} maxLength={20} placeholder={t(ui.contact.form.phone)} className={field} />
            <textarea name="message" rows={3} placeholder={t(ui.contact.form.message)} className={`${field} resize-none`} />
            {/* honeypot: hidden from people, bots fill it */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <button type="submit" disabled={status === 'sending'} className="mt-4 disabled:opacity-60 rounded-full border-[1.5px] border-black/30 py-3 text-sm font-extrabold tracking-wide text-violet uppercase transition-colors hover:border-violet hover:bg-violet hover:text-white">
              {t(status === 'sending' ? ui.contact.form.sending : ui.contact.form.send)}
            </button>
            {status === 'sent' && <p role="status" className="text-sm font-semibold text-violet">{t(ui.contact.form.sent)}</p>}
            {status === 'error' && (
              <p role="alert" className="text-sm font-semibold text-red-600">
                {t(ui.contact.form.error)}{' '}
                <a href={contacts.telegram} target="_blank" rel="noreferrer" className="underline">{contacts.telegramHandle}</a>
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="relative z-10 -mt-24 overflow-hidden rounded-t-[2rem] bg-ink px-4 pt-12 pb-6 text-white sm:-mt-32 sm:rounded-t-[2.75rem] sm:px-10 sm:pt-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
            <div className="outline-text font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.9] uppercase">
              Doston
              <br />
              Daminov
            </div>
            <div className="text-sm">
              <div className="mb-3 text-[11px] font-extrabold tracking-wide uppercase">{t(ui.contact.social)}</div>
              <ul className="space-y-1.5 text-white/70">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-sm">
              <div className="mb-3 text-[11px] font-extrabold tracking-wide uppercase">{t(ui.contact.mail)}</div>
              <div className="space-y-1.5 text-white/70">
                <a href={contacts.telegram} target="_blank" rel="noreferrer" className="block font-semibold text-white transition-colors hover:text-pink">
                  Telegram {contacts.telegramHandle}
                </a>
                <a href={contacts.phoneHref} className="block transition-colors hover:text-white">
                  {contacts.phone}
                </a>
                <a href={`mailto:${contacts.email}`} className="block transition-colors hover:text-white">
                  {contacts.email}
                </a>
                <div>Tashkent, Uzbekistan</div>
              </div>
            </div>
          </div>

          <ChromeDefs />
          <div ref={footRow} className="foot-shapes mt-12 grid grid-cols-8 gap-1.5 sm:mt-16 sm:gap-3">
            {footerShapes.map((S, i) => (
              <div key={i} className="foot-shape aspect-square" style={{ ['--i' as string]: i, ['--fr' as string]: `${[-40, 60, -80, 30, -60, 80, -30, 50][i]}deg` }}>
                {S(chromeFill)}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between text-[11px] text-white/40">
            <span>© {new Date().getFullYear()} Doston «Ace» Daminov</span>
            <span>{t(ui.contact.rights)}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
