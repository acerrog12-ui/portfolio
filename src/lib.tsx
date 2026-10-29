import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from './content'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (v: Record<Lang, string>) => string
  /** Uzbek in the usual Latin spelling (sh, ch, oʻ, gʻ) instead of the new alphabet (ş, ç, ō, ğ) */
  classic: boolean
  setClassic: (c: boolean) => void
}
const LangCtx = createContext<Ctx>({ lang: 'uz', setLang: () => {}, t: (v) => v.uz, classic: false, setClassic: () => {} })

// New alphabet -> usual Latin. Capitals become SH/CH inside all-caps words, Sh/Ch otherwise.
const pairs: Record<string, [string, string]> = { ş: ['sh', 'Sh'], ç: ['ch', 'Ch'], ō: ['o‘', 'O‘'], ğ: ['g‘', 'G‘'] }
export function toClassic(text: string): string {
  if (!/[şçōğŞÇŌĞ]/.test(text)) return text
  return text.replace(/[\p{L}ʻʼ'‘]+/gu, (w) => {
    if (!/[şçōğŞÇŌĞ]/.test(w)) return w
    const caps = w.length > 1 && w === w.toUpperCase()
    return w.replace(/[şçōğŞÇŌĞ]/g, (ch) => {
      const lower = ch.toLowerCase()
      const [lo, cap] = pairs[lower]
      if (ch === lower) return lo
      return caps ? cap.toUpperCase() : cap
    })
  })
}

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved
  } catch {
    /* storage blocked */
  }
  const nl = navigator.language || ''
  return nl.startsWith('ru') ? 'ru' : nl.startsWith('uz') ? 'uz' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage blocked */
    }
  }, [lang])
  const [classic, setClassic] = useState<boolean>(() => {
    try {
      return localStorage.getItem('uzScript') === 'classic'
    } catch {
      return false
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('uzScript', classic ? 'classic' : 'new')
    } catch {
      /* storage blocked */
    }
  }, [classic])
  const t = (v: Record<Lang, string>) => (lang === 'uz' && classic ? toClassic(v.uz) : v[lang])
  return <LangCtx.Provider value={{ lang, setLang, t, classic, setClassic }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)

export const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}`

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Splits text into per-letter spans (grouped by word, so words never break) for GSAP. */
export function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={`line-mask ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {[...w].map((c, i) => (
            <span key={i} className="char">
              {c}
            </span>
          ))}
          {wi < words.length - 1 && <span className="char">{'\u00a0'}</span>}
        </span>
      ))}
    </span>
  )
}
