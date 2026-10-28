import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { clients, contacts, projects, services, team, ui, type Project } from './content'
import { img, reducedMotion, SplitChars, useLang } from './lib'
import { Cube, Flower, footerColors, footerShapes, Heart, Star } from './shapes'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [open, setOpen] = useState<Project | null>(null)

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
    <div className="noise">
      <Nav />
      <main>
        <Hero />
        <Clients />
        <About />
        <Services />
        <Projects onOpen={setOpen} />
        <Team />
      </main>
      <Contact />
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </div>
  )
}

function scrollTo(id: string) {
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
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-5 text-[11px] font-medium tracking-[0.18em] uppercase sm:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-sm font-black tracking-normal">
          DD<span className="text-pink">.</span>
        </button>
        <ul className="hidden gap-10 md:flex">
          {links.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="group relative">
                {t(ui.nav[l])}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex overflow-hidden rounded-full border border-white/40">
          {(['uz', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 transition-colors ${lang === l ? 'bg-white text-black' : 'text-white'}`}
            >
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

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-title .char', { yPercent: 110, duration: 1.3, stagger: 0.035 }, 0.15)
        .from(avatar.current, { scale: 0.4, autoAlpha: 0, rotate: -18, duration: 1.6, ease: 'elastic.out(1,0.6)' }, 0.5)
        .from('.hero-fade', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9)

      // avatar drifts up and the title spreads apart on scroll
      gsap.to(avatar.current, { yPercent: -35, scale: 0.85, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-l1', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-l2', { xPercent: 12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)

    // avatar follows the mouse a little
    const inner = avatar.current?.firstElementChild as HTMLElement | null
    const xTo = inner && gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'power3' })
    const yTo = inner && gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'power3' })
    const rTo = inner && gsap.quickTo(inner, 'rotate', { duration: 0.8, ease: 'power3' })
    const move = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5
      const dy = e.clientY / window.innerHeight - 0.5
      xTo?.(dx * 40)
      yTo?.(dy * 30)
      rTo?.(dx * 8)
    }
    window.addEventListener('mousemove', move)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-24 pb-10 sm:px-8">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-pink/15 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <h1 className="hero-title font-display leading-[0.86] font-black tracking-[-0.04em] text-[clamp(2.6rem,11vw,11rem)]">
          <span className="hero-l1 block">
            <SplitChars text={t(ui.hero.hi)} />
          </span>
          <span className="hero-l2 block text-right">
            <SplitChars text={t(ui.hero.name)} />
          </span>
        </h1>

        <div ref={avatar} className="relative mx-auto mt-8 w-[62vw] max-w-[440px] sm:absolute sm:top-1/2 sm:left-1/2 sm:mt-0 sm:w-[30vw] sm:-translate-x-1/2 sm:-translate-y-[46%]">
          <img src={img('avatar-glasses.webp')} alt="Doston Daminov" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
        </div>

        <div className="relative mt-10 flex flex-col items-start justify-between gap-8 sm:mt-14 sm:flex-row sm:items-end">
          <p className="hero-fade max-w-[300px] text-[13px] leading-relaxed font-medium tracking-wide text-white/70 uppercase">{t(ui.hero.tagline)} 🎨</p>
          <a href={`mailto:${contacts.email}`} className="hero-fade group relative overflow-hidden rounded-full p-[1.5px] grad">
            <span className="block rounded-full bg-ink px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500 group-hover:bg-transparent">
              {t(ui.hero.cta)} ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CLIENT LOGOS + IMAGE STRIP ---------------- */
function Clients() {
  const row = [...clients, ...clients]
  const covers = projects.map((p) => p.id)
  return (
    <section aria-label="Clients" className="relative border-y border-line py-8">
      <div className="flex overflow-hidden">
        <div className="marquee flex shrink-0 items-center gap-14 pr-14" style={{ ['--speed' as string]: '40s' }}>
          {row.map((c, i) => (
            <span key={i} className="flex items-center gap-14 font-display text-2xl font-bold whitespace-nowrap text-white/80 sm:text-3xl">
              {c}
              <Star className="h-5 w-5" color="#ff3d8b" />
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 flex overflow-hidden">
        <div className="marquee marquee-reverse flex shrink-0 gap-4 pr-4" style={{ ['--speed' as string]: '70s' }}>
          {[...covers, ...covers].map((id, i) => (
            <img key={i} src={img(`${id}.jpg`)} alt="" loading="lazy" className="h-40 w-auto shrink-0 rounded-2xl object-cover sm:h-56" />
          ))}
        </div>
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
      gsap.from('.about-title .char', {
        yPercent: 110,
        stagger: 0.04,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about-title', start: 'top 85%' },
      })
      // words light up one by one while scrolling
      gsap.fromTo('.about-word', { opacity: 0.12 }, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const end = Number(el.dataset.value)
        const o = { v: 0 }
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
        })
      })
      gsap.from('.award', { y: 80, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.15, scrollTrigger: { trigger: '.award', start: 'top 85%' } })
      gsap.to('.parallax', {
        yPercent: (i) => [-60, -30, -80, -45][i % 4],
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="about" ref={root} className="relative overflow-hidden px-4 py-28 sm:px-8 sm:py-40">
      <div className="parallax pointer-events-none absolute top-24 left-[4%] w-16 sm:w-28">
        <Star className="floaty w-full" />
      </div>
      <div className="parallax pointer-events-none absolute top-[38%] right-[5%] w-16 sm:w-24">
        <Cube className="floaty w-full" />
      </div>
      <div className="parallax pointer-events-none absolute bottom-[34%] left-[6%] w-14 sm:w-24" style={{ ['--r' as string]: '-12deg' }}>
        <Heart className="floaty w-full" />
      </div>
      <div className="parallax pointer-events-none absolute top-[12%] right-[18%] w-12 sm:w-20" style={{ ['--d' as string]: '8s' }}>
        <Flower className="floaty w-full" />
      </div>

      <div className="relative mx-auto max-w-[1100px] text-center">
        <img src={img('avatar-hoodie.webp')} alt="" loading="lazy" className="mx-auto mb-6 w-36 sm:w-48" />
        <h2 className="about-title outline-text font-display text-[clamp(2.2rem,9.5vw,9rem)] leading-none font-black tracking-tight">
          <SplitChars text={t(ui.about.title)} />
        </h2>
        <p className="about-text mx-auto mt-12 max-w-[820px] text-xl leading-snug font-medium sm:text-3xl">
          {t(ui.about.text)
            .split(' ')
            .map((w, i) => (
              <span key={i} className="about-word">
                {w}{' '}
              </span>
            ))}
        </p>

        <div className="mx-auto mt-20 grid max-w-[900px] grid-cols-3 gap-4">
          {ui.about.stats.map((s, i) => (
            <div key={i} className="text-left">
              <div className="text-xs tracking-wide text-white/50 sm:text-sm">{t(s.label)}</div>
              <div className="font-display text-5xl font-black sm:text-8xl">
                <span className="stat-num" data-value={s.value}>
                  {s.value}
                </span>
                {s.suffix}
              </div>
              <div className="-mt-2 font-hand text-2xl text-pink sm:-mt-4 sm:text-4xl">{t(s.unit)}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-24 flex max-w-[900px] flex-col items-center gap-8 sm:flex-row sm:items-stretch">
          <img src={img('taf-trophy.webp')} alt="Tashkent Advertising Festival 2023" loading="lazy" className="award w-32 shrink-0 object-contain sm:w-40" />
          <div className="award flex-1 rounded-3xl border border-dashed border-white/25 bg-ink-2 p-6 text-left sm:p-8">
            <div className="font-display text-4xl font-black">{t(ui.about.award.title)}</div>
            <p className="mt-2 text-sm text-white/60 uppercase">{t(ui.about.award.sub)}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <img src={img('violence.jpg')} alt="Violence" loading="lazy" className="aspect-video w-full rounded-xl object-cover" />
              <img src={img('istedodlar-zamini.jpg')} alt="" loading="lazy" className="aspect-video w-full rounded-xl object-cover" />
            </div>
            <p className="mt-4 text-xs text-white/40">{t(ui.about.award.note)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-card', {
        y: 140,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true },
      })
      gsap.from('.svc-title .char', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.svc-title', start: 'top 85%' } })
      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row) => {
        gsap.from(row, { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 90%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="services" ref={root} className="px-2 sm:px-4">
      <div className="svc-card rounded-[2rem] bg-paper px-4 py-20 text-ink sm:rounded-[3rem] sm:px-12 sm:py-28">
        <h2 className="svc-title text-center font-display text-[clamp(2.2rem,9.5vw,9rem)] leading-none font-black tracking-tight">
          <SplitChars text={t(ui.services.title)} />
        </h2>
        <ol className="mx-auto mt-16 grid max-w-[1200px] gap-x-12 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={i} className="svc-row group grid grid-cols-[64px_1fr] gap-x-4 border-t border-ink/15 py-6 sm:grid-cols-[88px_1fr]">
              <span className="font-display text-3xl font-black transition-colors duration-300 group-hover:text-pink sm:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="transition-transform duration-500 group-hover:translate-x-2">
                <h3 className="font-display text-base font-bold uppercase sm:text-xl">{t(s.title)}</h3>
                <p className="mt-1.5 text-sm text-ink/60">{t(s.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- PROJECTS (stacked sticky cards) ---------------- */
function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
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
        // shrink and dim each card as the next one slides over it
        gsap.to(card.firstElementChild, {
          scale: 0.9,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 75%', end: 'top 12%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="projects" ref={root} className="px-4 pt-32 pb-24 sm:px-8">
      <h2 className="proj-title mb-16 text-center font-display text-[clamp(2.2rem,9.5vw,9rem)] leading-none font-black tracking-tight">
        <SplitChars text={t(ui.projects.title)} />
      </h2>
      <div className="mx-auto max-w-[1200px]">
        {projects.map((p, i) => (
          <article key={p.id} className="proj-card sticky top-[8vh] mb-[8vh] sm:h-[84vh] sm:max-h-[860px]" style={{ top: `calc(8vh + ${Math.min(i, 6) * 6}px)` }}>
            <div className="flex h-full origin-top flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink-2 p-3 will-change-transform sm:p-4">
              <header className="flex items-center gap-4 px-2 pt-1 pb-4 sm:px-3">
                <span className="font-display text-3xl font-black sm:text-5xl">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
                    {t(ui.projects.client)} · {p.client}
                    {p.year && ` · ${p.year}`}
                  </div>
                  <h3 className="truncate font-display text-sm font-bold sm:text-xl">{t(p.title)}</h3>
                </div>
                <span className="hidden text-xs text-white/50 md:block">{t(p.tags)}</span>
                <button onClick={() => onOpen(p)} className="shrink-0 rounded-full border border-white/30 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors hover:border-transparent hover:bg-white hover:text-black sm:px-5">
                  {t(ui.projects.view)} ↗
                </button>
              </header>
              <button onClick={() => onOpen(p)} className="group relative aspect-[4/3] min-h-0 overflow-hidden rounded-[1.25rem] sm:aspect-auto sm:flex-1" aria-label={t(p.title)}>
                <img src={img(`${p.id}.jpg`)} alt={t(p.title)} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
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
      <div ref={ref} data-lenis-prevent className="absolute inset-x-0 top-6 bottom-0 overflow-y-auto rounded-t-[2rem] bg-ink-2 sm:inset-x-8" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-ink-2/90 px-5 py-4 backdrop-blur sm:px-8">
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
  const chipColors = ['bg-pink', 'bg-violet', 'bg-lime text-ink', 'bg-sky text-ink', 'bg-white text-ink', 'bg-pink']
  return (
    <section ref={root} className="relative overflow-hidden px-4 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="team-title font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] font-black tracking-tight">
            <SplitChars text={t(team.title)} />
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">{t(team.lead)}</p>
          <div className="team-chips mt-10 flex flex-wrap gap-3">
            {team.directions.map((d, i) => (
              <span key={i} className={`team-chip rounded-full px-5 py-3 text-sm font-semibold ${chipColors[i % chipColors.length]}`}>
                {t(d)}
              </span>
            ))}
          </div>
          <button onClick={() => scrollTo('contact')} className="group mt-12 inline-flex items-center gap-3 rounded-full p-[1.5px] grad">
            <span className="rounded-full bg-ink px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500 group-hover:bg-transparent">
              {t(team.cta)} ↗
            </span>
          </button>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 200 200" className="team-ring absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
            </defs>
            <text className="fill-white font-display text-[13px] font-black tracking-[0.18em]">
              <textPath href="#ring" textLength="510">{ring}</textPath>
            </text>
          </svg>
          <div className="absolute inset-[22%] overflow-hidden rounded-full">
            <img src={img('istedodlar-zamini.jpg')} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CONTACT + FOOTER ---------------- */
function Contact() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ct-title .char', { yPercent: 110, stagger: 0.035, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.ct-title', start: 'top 85%' } })
      gsap.from('.ct-fig', { y: 120, autoAlpha: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.ct-fig', start: 'top 90%' } })
      gsap.from('.foot-shape', {
        y: 160,
        rotate: () => gsap.utils.random(-90, 90),
        stagger: 0.07,
        duration: 1.2,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.foot-shapes', start: 'top 95%' },
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  const socials = [
    { name: 'Telegram', href: contacts.telegram },
    { name: 'Instagram', href: contacts.instagram },
    { name: 'Behance', href: contacts.behance },
  ]

  return (
    <footer id="contact" ref={root} className="relative overflow-hidden px-4 pt-24 pb-6 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="ct-title font-display text-[clamp(2.2rem,9vw,8.5rem)] leading-[0.9] font-black tracking-tight">
              <SplitChars text={t(ui.contact.title)} />
            </h2>
            <p className="mt-6 max-w-md text-white/60">{t(ui.contact.lead)}</p>
            <a href={`mailto:${contacts.email}`} className="mt-8 inline-block font-display text-xl font-bold break-all underline decoration-pink decoration-2 underline-offset-8 transition-colors hover:text-pink sm:text-4xl">
              {contacts.email}
            </a>
          </div>
          <img src={img('contact-figure.jpg')} alt="" loading="lazy" className="ct-fig mx-auto w-40 mix-blend-lighten sm:w-56" />
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 text-sm sm:grid-cols-3">
          <div className="font-display text-3xl leading-none font-black uppercase sm:text-5xl">
            Doston
            <br />
            Daminov
          </div>
          <div>
            <div className="mb-3 text-[10px] tracking-[0.2em] text-white/40 uppercase">{t(ui.contact.social)}</div>
            <ul className="space-y-1.5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-pink">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[10px] tracking-[0.2em] text-white/40 uppercase">{t(ui.contact.mail)}</div>
            <a href={`mailto:${contacts.email}`} className="transition-colors hover:text-pink">
              {contacts.email}
            </a>
            <div className="mt-1 text-white/40">Tashkent, Uzbekistan</div>
          </div>
        </div>

        <div className="foot-shapes mt-14 grid grid-cols-8 gap-2 sm:gap-4">
          {footerShapes.map((S, i) => (
            <div key={i} className="foot-shape aspect-square transition-transform duration-500 hover:-rotate-12 hover:scale-110">
              {S(footerColors[i])}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between text-[11px] text-white/40">
          <span>© {new Date().getFullYear()} Doston Daminov</span>
          <span>{t(ui.contact.rights)}</span>
        </div>
      </div>
    </footer>
  )
}
