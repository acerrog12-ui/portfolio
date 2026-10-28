import { useId } from 'react'

// Glossy "inflated" 3D-looking shapes (chrome and candy), drawn with SVG gradients.
// Placeholders until the rendered PNG objects arrive.
function Chrome({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}c`} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.28" stopColor="#c9ccd3" />
        <stop offset="0.48" stopColor="#5d6069" />
        <stop offset="0.56" stopColor="#f4f5f8" />
        <stop offset="0.8" stopColor="#8d9099" />
        <stop offset="1" stopColor="#2c2e33" />
      </linearGradient>
      <radialGradient id={`${id}h`} cx="0.32" cy="0.22" r="0.35">
        <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

function Candy({ id, light, mid, dark }: { id: string; light: string; mid: string; dark: string }) {
  return (
    <defs>
      <radialGradient id={`${id}c`} cx="0.38" cy="0.3" r="0.8">
        <stop offset="0" stopColor={light} />
        <stop offset="0.45" stopColor={mid} />
        <stop offset="1" stopColor={dark} />
      </radialGradient>
      <radialGradient id={`${id}h`} cx="0.32" cy="0.22" r="0.3">
        <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

type P = { className?: string; color?: string }

export const Star = ({ className, color }: P) => {
  const id = useId().replace(/:/g, '')
  const d = 'M50 2c5 28 20 43 48 48-28 5-43 20-48 48-5-28-20-43-48-48C30 45 45 30 50 2z'
  if (color) return (<svg viewBox="0 0 100 100" className={className} aria-hidden><path d={d} fill={color} /></svg>)
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <Chrome id={id} />
      <path d={d} fill={`url(#${id}c)`} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />
      <path d={d} fill={`url(#${id}h)`} />
    </svg>
  )
}

export const Heart = ({ className }: P) => {
  const id = useId().replace(/:/g, '')
  const d = 'M50 88C20 66 2 50 2 28 2 13 14 2 28 2c9 0 17 5 22 13C55 7 63 2 72 2c14 0 26 11 26 26 0 22-18 38-48 60z'
  return (
    <svg viewBox="0 0 100 90" className={className} aria-hidden>
      <Candy id={id} light="#ffb3dc" mid="#ff2bd1" dark="#7a0a5e" />
      <path d={d} fill={`url(#${id}c)`} />
      <path d={d} fill={`url(#${id}h)`} />
      <ellipse cx="28" cy="20" rx="9" ry="5" fill="#fff" opacity="0.7" transform="rotate(-30 28 20)" />
    </svg>
  )
}

export const Flower = ({ className, color }: P) => {
  const id = useId().replace(/:/g, '')
  const petals = [0, 72, 144, 216, 288]
  if (color) return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {petals.map((r) => <ellipse key={r} cx="50" cy="26" rx="18" ry="24" fill={color} transform={`rotate(${r} 50 50)`} />)}
      <circle cx="50" cy="50" r="13" fill="#ffd54a" />
    </svg>
  )
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <Candy id={id} light="#d9c8ff" mid="#7a4dff" dark="#2a0f6b" />
      {petals.map((r) => (
        <g key={r} transform={`rotate(${r} 50 50)`}>
          <ellipse cx="50" cy="26" rx="18" ry="24" fill={`url(#${id}c)`} />
          <ellipse cx="45" cy="18" rx="6" ry="9" fill="#fff" opacity="0.45" />
        </g>
      ))}
      <Chrome id={`${id}x`} />
      <circle cx="50" cy="50" r="14" fill={`url(#${id}xc)`} />
      <circle cx="46" cy="45" r="5" fill="#fff" opacity="0.8" />
    </svg>
  )
}

export const Cube = ({ className }: P) => {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <Chrome id={id} />
      <path d="M50 4l42 22v48L50 96 8 74V26z" fill={`url(#${id}c)`} />
      <path d="M50 4l42 22-42 22L8 26z" fill="#f2f3f6" opacity="0.85" />
      <path d="M50 48v48l42-22V26z" fill="#2c2e33" opacity="0.55" />
      <path d="M50 4l42 22v48L50 96 8 74V26z" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" />
    </svg>
  )
}

// Footer row shapes (flat, bold, like the reference)
export const footerShapes = [
  (c: string) => <svg viewBox="0 0 100 100"><path d="M0 0h40v40H0zM60 0h40v40H60zM0 60h40v40H0zM60 60h40v40H60z" fill={c} /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill={c} /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><path d="M0 0h100v100A100 100 0 0 1 0 0z" fill={c} /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><path d="M50 0l50 100H0z" fill={c} /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><path d="M35 0h30v35h35v30H65v35H35V65H0V35h35z" fill={c} /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><path d="M0 50a50 50 0 0 1 100 0z M0 55h100a50 50 0 0 1-100 0z" fill={c} /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill={c} /><circle cx="50" cy="50" r="22" fill="#000" /></svg>,
  (c: string) => <svg viewBox="0 0 100 100"><path d="M50 2c4 30 18 44 48 48-30 4-44 18-48 48-4-30-18-44-48-48C32 46 46 32 50 2z" fill={c} /></svg>,
]
export const footerColors = ['#7a4dff', '#b9f43c', '#ffffff', '#7a4dff', '#ffffff', '#ff2bd1', '#b9f43c', '#ff2bd1']

// Chrome gamepad with "ACE" lettering (like the PLAY controller reference)
export const AcePad = ({ className }: P) => {
  const id = useId().replace(/:/g, '')
  const body = 'M40 30 C40 14 60 8 80 8 L180 8 C200 8 220 14 220 30 L236 104 C242 132 222 150 200 140 L168 112 L92 112 L60 140 C38 150 18 132 24 104 Z'
  return (
    <svg viewBox="0 0 260 152" className={className} aria-hidden>
      <Chrome id={id} />
      <filter id={`${id}s`} x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.6" />
      </filter>
      <path d={body} fill={`url(#${id}c)`} stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" filter={`url(#${id}s)`} />
      <path d={body} fill={`url(#${id}h)`} />
      <text x="130" y="86" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="64" fontStretch="112%" letterSpacing="-2" fill="#1d1f24" stroke="#fff" strokeOpacity="0.9" strokeWidth="2.5" paintOrder="stroke">
        ACE
      </text>
      <text x="130" y="84" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="64" fontStretch="112%" letterSpacing="-2" fill={`url(#${id}c)`} opacity="0.9">
        ACE
      </text>
    </svg>
  )
}
