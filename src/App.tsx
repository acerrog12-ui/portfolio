import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { categories, clients, contacts, projects, services, team, ui, type Category, type Project } from './content'
import { img, reducedMotion, SplitChars, useLang } from './lib'
import { ChromeDefs, chromeFill, footerShapes } from './shapes'

gsap.registerPlugin(ScrollTrigger)

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
  const cat = route.startsWith('work/') ? categories.find((c) => c.id === route.slice(5)) : undefined
  const lastCat = useRef<string | null>(null)

  // Going to a direction page starts at the top; coming back returns to the Projects section
  useLayoutEffect(() => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis
    if (cat) {
      lastCat.current = cat.id
      lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0)
      setTimeout(() => lenis?.resize(), 60)
    } else if (lastCat.current) {
      lastCat.current = null
      setTimeout(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
        const el = document.getElementById('projects')
        if (!el) return
        const y = el.getBoundingClientRect().top + window.scrollY
        lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : window.scrollTo(0, y)
      }, 60)
    }
  }, [cat])

  // Smooth scrolling, synced with ScrollTrigger
  useEffect(() => {
    if (reducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ;(window as unknown as { lenis: Lenis }).lenis = lenis
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Nav />
      {cat ? (
        <CategoryPage key={cat.id} cat={cat} onOpen={setOpen} />
      ) : (
        <main>
          <Hero />
          <Clients />
          <About />
          <Services />
          <Projects />
          <Team />
        </main>
      )}
      <Contact />
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
  const el = document.getElementById(id)
  const lenis = (window as unknown as { lenis?: Lenis }).lenis
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------- NAV ---------------- */
function Nav() {
  const { t, lang, setLang } = useLang()
  const links = ['about', 'services', 'projects', 'contact'] as const
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-4 text-[11px] font-bold tracking-wide uppercase sm:px-8 sm:text-[13px]">
        <ul className="hidden flex-1 justify-around md:flex">
          {links.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="group relative">
                {t(ui.nav[l])}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-base md:hidden">
          ACE<span className="text-pink">.</span>
        </button>
        <div className="ml-auto flex overflow-hidden rounded-full border border-white/50 md:ml-0">
          {(['uz', 'en'] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 transition-colors ${lang === l ? 'bg-white text-black' : 'text-white'}`}>
              {l}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { t } = useLang()
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
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-title .char', { yPercent: 110, duration: 1.3, stagger: 0.03 }, 0.15)
        .from('.hero-head', { y: 140, autoAlpha: 0, scale: 0.8, duration: 1.6, ease: 'elastic.out(1,0.7)' }, 0.45)
        .from('.hero-fade', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9)

      // on scroll the head rises and the headline slides away
      gsap.to(avatar.current, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-title', { yPercent: -40, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)

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
    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink px-3 pt-[72px] pb-8 sm:px-4 sm:pt-[78px]">
      <h1 ref={title} className="hero-title silver relative z-0 text-center font-display text-[16.5vw] leading-[0.84] uppercase sm:text-[10vw]" style={{ fontStretch: '96%', letterSpacing: '-0.025em' }}>
        <span className="block sm:inline-block">
          <SplitChars text={t(ui.hero.hi)} className="inline-block" />
        </span>{' '}
        <span className="block sm:inline-block">
          <SplitChars text={t(ui.hero.name)} className="inline-block" />
        </span>
      </h1>

      <div className="relative flex flex-1 flex-col items-center sm:block">
        {/* the head sits on top of the headline, touching the letters like in the reference */}
        <div ref={avatar} className="relative z-10 mx-auto -mt-[7vw] w-[64vw] max-w-[440px] sm:absolute sm:top-0 sm:left-1/2 sm:mt-[-6.6vw] sm:w-[29vw] sm:max-w-[560px] sm:-translate-x-1/2">
          <div>
            <img src={img('ace-head.webp')} alt="Doston «Ace» Daminov" className="hero-head w-full" />
          </div>
        </div>

        <div className="relative z-20 mt-6 flex w-full flex-col items-start justify-between gap-6 sm:absolute sm:top-[3.4vw] sm:mt-0 sm:flex-row sm:items-start sm:px-[3vw]">
          <p className="hero-fade max-w-[300px] text-[13px] leading-[1.55] font-semibold uppercase sm:max-w-[23vw] sm:text-[1.3vw]">
            {t(ui.hero.tagline)}
          </p>
          <div className="hero-fade">
            <a href={`mailto:${contacts.email}`} className="pill-grad hero-pill px-7 py-3.5 text-[14px] sm:mt-[-0.4vw] sm:px-[2.4vw] sm:py-[1.15vw] sm:text-[1.3vw]">
            {t(ui.hero.cta)}
          </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CLIENT LOGOS + IMAGE STRIP ---------------- */
// An endlessly moving row that can also be grabbed and thrown left or right.
// speed is in px per second; negative moves left. Children must be the item list repeated twice.
function DragRow({ speed, children }: { speed: number; children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

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

    const wrapX = () => {
      const half = el.scrollWidth / 2
      if (half <= 0) return
      x = ((x % half) - half) % half // keep x in (-half, 0]
    }
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      if (!dragging) {
        vel += (auto - vel) * Math.min(1, dt * 2.5) // ease back to the normal drift after a throw
        x += vel * dt
      }
      wrapX()
      el.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const down = (e: PointerEvent) => {
      dragging = true
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
      vel = (dx / Math.max(1, now - lastT)) * 1000
      lastX = e.clientX
      lastT = now
    }
    const up = () => {
      if (!dragging) return
      dragging = false
      vel = Math.max(-3000, Math.min(3000, vel))
      box.classList.remove('cursor-grabbing')
    }
    box.addEventListener('pointerdown', down)
    box.addEventListener('pointermove', move)
    box.addEventListener('pointerup', up)
    box.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(raf)
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

function Clients() {
  const covers = projects.map((p) => p.id)
  const half = Math.ceil(covers.length / 2)
  const rows = [covers.slice(0, half), covers.slice(half)]
  return (
    <section aria-label="Clients" className="relative bg-ink py-10 sm:py-14">
      <div className="edge-fade flex overflow-hidden">
        <ul className="marquee flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20" style={{ ['--speed' as string]: '35s' }}>
          {[...clients, ...clients].map((c, i) => (
            <li key={i} className="font-display text-lg leading-none whitespace-nowrap text-white uppercase opacity-90 sm:text-2xl">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 space-y-3 sm:mt-14 sm:space-y-4">
        {rows.map((r, ri) => (
          <DragRow key={ri} speed={ri ? 40 : -48}>
            {[...r, ...r].map((id, i) => (
              <img key={i} src={img(`${id}.jpg`)} alt="" width={370} height={208} draggable={false} className="pointer-events-none h-32 w-[228px] shrink-0 rounded-[1.25rem] object-cover select-none sm:h-52 sm:w-[370px]" />
            ))}
          </DragRow>
        ))}
      </div>
    </section>
  )
}

/* ---------------- ABOUT ---------------- */
function About() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.about-title .char', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.about-title', start: 'top 85%' } })
      // words light up one by one while scrolling
      gsap.fromTo('.about-word', { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 55%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const end = Number(el.dataset.value)
        const o = { v: 0 }
        gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => (el.textContent = String(Math.round(o.v))) })
      })
      gsap.from('.award', { y: 80, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.15, scrollTrigger: { trigger: '.award', start: 'top 85%' } })
      // objects slide in from off-screen and grow as the section scrolls into view,
      // then keep drifting up a little while it scrolls past
      gsap.utils.toArray<HTMLElement>('.about-obj').forEach((el, i) => {
        const side = Number(el.dataset.from)
        gsap.fromTo(
          el,
          { xPercent: side * 140, yPercent: 40, scale: 0.55, rotate: side * 35 },
          { xPercent: 0, yPercent: 0, scale: 1, rotate: 0, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top 95%', end: 'top 15%', scrub: 1 } },
        )
        gsap.to(el, { yPercent: -[50, 30, 70, 40][i % 4], ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 15%', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="about" ref={root} className="relative overflow-hidden bg-ink px-4 pt-28 pb-40 sm:px-8 sm:pt-40 sm:pb-56">
      {/* big chrome objects that fly in from the screen edges while scrolling, like the reference */}
      <div data-from="-1" className="about-obj pointer-events-none absolute top-24 left-[-2%] w-28 sm:top-32 sm:w-[17vw]">
        <img src={img('el-ae.webp')} alt="" loading="lazy" className="floaty w-full drop-shadow-[0_20px_40px_rgba(122,77,255,0.35)]" style={{ ['--r' as string]: '-12deg' }} />
      </div>
      <div data-from="1" className="about-obj pointer-events-none absolute top-20 right-[-3%] w-32 sm:top-28 sm:w-[19vw]">
        <img src={img('el-3d.webp')} alt="" loading="lazy" className="floaty w-full drop-shadow-[0_20px_40px_rgba(122,77,255,0.35)]" style={{ ['--r' as string]: '10deg', ['--d' as string]: '8s' }} />
      </div>
      <div data-from="-1" className="about-obj pointer-events-none absolute top-[34%] left-[-4%] w-28 sm:w-[16vw]">
        <img src={img('el-pen.webp')} alt="" loading="lazy" className="floaty w-full drop-shadow-[0_20px_40px_rgba(122,77,255,0.35)]" style={{ ['--r' as string]: '14deg', ['--d' as string]: '9s' }} />
      </div>
      <div data-from="1" className="about-obj pointer-events-none absolute top-[36%] right-[-4%] w-36 sm:w-[22vw]">
        <img src={img('ace-pad.webp')} alt="" loading="lazy" className="floaty w-full drop-shadow-[0_20px_40px_rgba(122,77,255,0.35)]" style={{ ['--r' as string]: '-14deg', ['--d' as string]: '7s' }} />
      </div>

      <div className="relative mx-auto max-w-[1100px] text-center">
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
        <a href={`mailto:${contacts.email}`} className="pill-grad mt-10 px-7 py-3 text-[12px]">
          {t(ui.hero.cta)} <span aria-hidden>•</span>
        </a>

        <div className="mx-auto mt-24 grid max-w-[820px] grid-cols-3 border-y border-line">
          {ui.about.stats.map((s, i) => (
            <div key={i} className={`py-6 ${i ? 'border-l border-line' : ''}`}>
              <div className="font-display text-5xl sm:text-7xl">
                <span className="stat-num" data-value={s.value}>
                  {s.value}
                </span>
                {s.suffix}
              </div>
              <div className="mt-2 text-[11px] font-bold tracking-wide text-white/50 uppercase sm:text-xs">
                {t(s.label)} · {t(s.unit)}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-28 flex max-w-[820px] sm:mt-40 flex-col items-center gap-8 sm:flex-row sm:items-stretch">
          <img src={img('taf-trophy.webp')} alt="Tashkent Advertising Festival 2023" loading="lazy" className="award w-40 shrink-0 object-contain drop-shadow-[0_20px_40px_rgba(122,77,255,0.35)] sm:-ml-28 sm:w-56" />
          <div className="award flex-1 rounded-[1.75rem] border-[1.5px] border-white/60 p-6 text-left sm:p-8">
            <div className="font-display text-4xl">{t(ui.about.award.title)}</div>
            <p className="mt-2 text-sm font-semibold text-white/60 uppercase">{t(ui.about.award.sub)}</p>
            <img src={img('violence.jpg')} alt="Violence" loading="lazy" className="mt-5 aspect-video w-full rounded-xl object-cover" />
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
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      // the light panel slides up over the black page
      gsap.from('.svc-card', { y: 120, scale: 0.96, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 35%', scrub: true } })
      // the title starts pale grey and fills in black
      gsap.fromTo('.svc-title', { color: '#c4c7cb' }, { color: '#000', ease: 'none', scrollTrigger: { trigger: '.svc-title', start: 'top 85%', end: 'top 35%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row) => {
        gsap.from(row, { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 92%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="services" ref={root} className="relative z-10 -mt-24 bg-transparent px-2 sm:-mt-32 sm:px-3">
      <div className="svc-card rounded-[2rem] bg-paper px-5 pt-20 pb-40 text-black sm:rounded-[2.75rem] sm:px-12 sm:pt-28 sm:pb-56">
        <h2 className="svc-title text-center font-display text-[clamp(2.6rem,10vw,10rem)] leading-none uppercase">{t(ui.services.title)}</h2>
        <ol className="mx-auto mt-16 max-w-[1000px] sm:mt-24">
          {services.map((s, i) => (
            <li key={i} className="svc-row group grid grid-cols-[70px_1fr] items-start gap-x-4 border-b border-black/15 py-7 sm:grid-cols-[150px_1fr] sm:py-10">
              <span className="font-display text-[2.6rem] leading-[0.85] transition-colors duration-300 group-hover:text-violet sm:text-[4.5rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="transition-transform duration-500 group-hover:translate-x-2">
                <h3 className="font-cond text-base font-extrabold uppercase sm:text-xl">{t(s.title)}</h3>
                <p className="mt-2 max-w-[640px] text-sm leading-relaxed text-black/50 sm:text-base">{t(s.text)}</p>
              </div>
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
    const ctx = gsap.context(() => {
      gsap.from('.proj-title .char', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.proj-title', start: 'top 85%' } })
      const cards = gsap.utils.toArray<HTMLElement>('.proj-card')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        // each card dims a little as the next one slides over it
        gsap.to(card.firstElementChild, { scale: 0.97, filter: 'brightness(0.75)', ease: 'none', scrollTrigger: { trigger: next, start: 'top 80%', end: 'top 20%', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="projects" ref={root} className="relative z-20 -mt-24 rounded-t-[2rem] bg-ink px-3 pt-24 pb-24 sm:-mt-32 sm:rounded-t-[2.75rem] sm:px-8 sm:pt-32">
      <h2 className="proj-title outline-text mb-14 text-center font-display text-[clamp(2.6rem,10vw,10rem)] leading-none uppercase sm:mb-20">
        <SplitChars text={t(ui.projects.title)} />
      </h2>
      <div className="mx-auto max-w-[1180px]">
        {categories.map((c, i) => {
          const ps = c.projects.map((id) => projects.find((p) => p.id === id)!)
          const pics = [ps[0], ps[1] ?? ps[0], ps[2] ?? ps[1] ?? ps[0]]
          return (
            <article key={c.id} className="proj-card sticky mb-[6vh]" style={{ top: `calc(9vh + ${i * 14}px)` }}>
              <a href={`#/work/${c.id}`} className="group block origin-top overflow-hidden rounded-[1.75rem] border-[1.5px] border-white/70 bg-ink p-3 will-change-transform sm:rounded-[2.25rem] sm:p-5">
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
                <div className="grid w-full grid-cols-3 gap-2 sm:h-[62vh] sm:max-h-[620px] sm:grid-rows-2 sm:gap-3">
                  {pics.map((p, k) => (
                    <span key={k} className={k === 0 ? 'col-span-3 aspect-video overflow-hidden rounded-[1.25rem] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:h-full' : 'hidden overflow-hidden rounded-[1.25rem] sm:block'}>
                      <img src={img(`${p.id}.jpg`)} alt={k === 0 ? t(c.title) : ''} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                    </span>
                  ))}
                </div>
              </a>
            </article>
          )
        })}
        <div className="mt-4 text-center">
          <a href={contacts.behance} target="_blank" rel="noreferrer" className="pill-line px-7 py-3 text-xs sm:text-sm">
            {t(ui.projects.all)} ↗
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
  const ps = cat.projects.map((id) => projects.find((p) => p.id === id)!)
  const idx = categories.indexOf(cat)
  const others = categories.filter((c) => c.id !== cat.id)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.cat-title .char', { yPercent: 110, stagger: 0.03, duration: 1.1, ease: 'expo.out', delay: 0.1 })
      gsap.from('.cat-fade', { y: 30, autoAlpha: 0, duration: 1, ease: 'expo.out', delay: 0.4 })
      gsap.utils.toArray<HTMLElement>('.cat-item').forEach((el) => {
        gsap.from(el, { y: 80, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } })
      })
    }, root)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [lang, cat.id])

  return (
    <main ref={root} className="relative bg-ink px-3 pt-24 pb-48 sm:px-8 sm:pt-28 sm:pb-64">
      <div className="mx-auto max-w-[1300px]">
        <a href="#" className="cat-fade pill-line px-5 py-2 text-xs">
          ← {t(ui.projects.back)}
        </a>
        <div className="mt-10 flex items-end gap-4 sm:gap-8">
          <span className="font-display text-5xl leading-none text-white/30 sm:text-8xl">{String(idx + 1).padStart(2, '0')}</span>
          <h1 className="cat-title silver font-display text-[clamp(2.4rem,7.5vw,7.5rem)] leading-[0.88] uppercase">
            <SplitChars text={t(cat.title)} />
          </h1>
        </div>
        <p className="cat-fade mt-6 max-w-xl text-sm font-semibold text-white/60 uppercase sm:text-base">
          {t(cat.text)} · {ps.length} {t(ui.projects.count)}
        </p>

        <div className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-2 md:gap-6">
          {ps.map((p, i) => (
            <button key={p.id} onClick={() => onOpen(p)} className={`cat-item group block overflow-hidden rounded-[1.75rem] border-[1.5px] border-white/70 p-3 text-left sm:p-4 ${ps.length % 2 && i === 0 ? 'md:col-span-2' : ''}`}>
              <span className="block aspect-video overflow-hidden rounded-[1.25rem]">
                <img src={img(`${p.id}.jpg`)} alt={t(p.title)} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              </span>
              <span className="flex items-center gap-4 px-1 pt-4 pb-1">
                <span className="min-w-0 flex-1">
                  <span className="block font-cond text-base font-extrabold uppercase sm:text-lg">{p.client}</span>
                  <span className="block truncate text-xs text-white/50 sm:text-sm">
                    {t(p.title)}
                    {p.year && ` · ${p.year}`} · {t(p.tags)}
                  </span>
                </span>
                <span className="pill-line shrink-0 px-4 py-2 text-[10px] group-hover:bg-white group-hover:text-black sm:text-xs">{t(ui.projects.view)}</span>
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

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    if (!reducedMotion()) gsap.from(ref.current, { yPercent: 100, duration: 0.9, ease: 'expo.out' })
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div ref={ref} data-lenis-prevent className="absolute inset-x-0 top-6 bottom-0 overflow-y-auto rounded-t-[2rem] bg-ink sm:inset-x-8" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-ink/90 px-5 py-4 backdrop-blur sm:px-8">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.2em] text-white/50 uppercase">{project.client}{project.year && ` · ${project.year}`} · {t(project.tags)}</div>
            <h3 className="truncate font-display text-lg font-bold sm:text-2xl">{t(project.title)}</h3>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full bg-white px-5 py-2 text-xs font-semibold tracking-widest text-black uppercase">
            {t(ui.projects.close)} ✕
          </button>
        </div>
        <img src={img(`${project.id}-full.jpg`)} alt={t(project.title)} className="mx-auto block w-full max-w-[1100px] px-3 pb-10 sm:px-8" />
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
    const ctx = gsap.context(() => {
      gsap.from('.team-title .char', { yPercent: 110, stagger: 0.035, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.team-title', start: 'top 85%' } })
      gsap.from('.team-chip', { scale: 0, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'back.out(2)', scrollTrigger: { trigger: '.team-chips', start: 'top 85%' } })
      gsap.to('.team-ring', { rotate: 360, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [lang])

  const ring = `${t(team.title)} • ${t(team.title)} • `
  const dots = ['bg-violet', 'bg-lime', 'bg-pink', 'bg-white', 'bg-violet', 'bg-lime']
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
          <button onClick={() => scrollTo('contact')} className="pill-grad mt-12 px-8 py-4 text-[13px]">
            {t(team.cta)} <span aria-hidden>•</span>
          </button>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 200 200" className="team-ring absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
            </defs>
            <text className="fill-white font-display text-[13px] tracking-[0.14em]">
              <textPath href="#ring" textLength="510">{ring}</textPath>
            </text>
          </svg>
          <div className="absolute inset-[20%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_40%,#7a4dff_0%,#2a0f4a_55%,#000_100%)]">
            <img src={img('ace-bust.webp')} alt="Doston «Ace» Daminov" loading="lazy" className="absolute inset-x-0 bottom-0 mx-auto w-[96%] translate-x-[11%]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CONTACT (light panel) + FOOTER (black panel) ---------------- */
function Contact() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reducedMotion()) return
const ctx = gsap.context(() => {
      gsap.from('.ct-panel', { y: 120, scale: 0.96, ease: 'none', scrollTrigger: { trigger: '.ct-panel', start: 'top bottom', end: 'top 40%', scrub: true } })
      gsap.from('.ct-title .char', { yPercent: 110, stagger: 0.03, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.ct-title', start: 'top 85%' } })
      gsap.utils.toArray<HTMLElement>('.ct-obj').forEach((el) => {
        const side = Number(el.dataset.from)
        gsap.fromTo(
          el,
          { xPercent: side * 140, yPercent: 40, scale: 0.55, rotate: side * 35 },
          { xPercent: 0, yPercent: 0, scale: 1, rotate: 0, ease: 'power2.out', scrollTrigger: { trigger: '.ct-panel', start: 'top 95%', end: 'top 20%', scrub: 1 } },
        )
      })
    }, root)
    return () => ctx.revert()
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

  // The form opens the visitor's mail app with the message filled in
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Portfolio: ${f.get('name') || ''}`
    const body = `${f.get('message') || ''}\n\n${f.get('name') || ''} · ${f.get('email') || ''}`
    window.location.href = `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  const field = 'w-full border-b border-black/25 bg-transparent py-3 text-base text-black outline-none placeholder:text-black/40 focus:border-black'

  return (
    <footer id="contact" ref={root} className="relative z-30 -mt-24 px-2 sm:-mt-32 sm:px-3">
      <div className="ct-panel relative overflow-hidden rounded-[2rem] bg-paper px-5 pt-20 pb-40 text-black sm:rounded-[2.75rem] sm:px-14 sm:pt-28 sm:pb-52">
        {/* big chrome objects half off the panel edges, flying in on scroll like in About */}
        <div data-from="-1" className="ct-obj pointer-events-none absolute bottom-14 left-[-8%] w-24 sm:bottom-[24%] sm:left-[-7%] sm:w-[16vw]">
          <img src={img('el-3d.webp')} alt="" loading="lazy" className="floaty w-full" style={{ ['--r' as string]: '-12deg' }} />
        </div>
        <div data-from="1" className="ct-obj pointer-events-none absolute top-[-4%] right-[-3%] w-24 sm:right-[-2%] sm:w-[12vw]">
          <img src={img('el-bolt.webp')} alt="" loading="lazy" className="floaty w-full" style={{ ['--r' as string]: '16deg', ['--d' as string]: '8s' }} />
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
            <a href={`mailto:${contacts.email}`} className="mt-6 inline-block text-lg font-semibold break-all text-violet underline underline-offset-4 hover:text-pink sm:text-xl">
              {contacts.email}
            </a>
            <p className="mt-4 max-w-sm text-sm text-black/55">{t(ui.contact.lead)}</p>
          </div>
          <form onSubmit={send} className="flex flex-col gap-4">
            <input name="name" required placeholder={t(ui.contact.form.name)} className={field} />
            <input name="email" type="email" placeholder={t(ui.contact.form.email)} className={field} />
            <textarea name="message" rows={3} placeholder={t(ui.contact.form.message)} className={`${field} resize-none`} />
            <button type="submit" className="mt-4 rounded-full border-[1.5px] border-black/30 py-3 text-sm font-extrabold tracking-wide text-violet uppercase transition-colors hover:border-violet hover:bg-violet hover:text-white">
              {t(ui.contact.form.send)}
            </button>
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
