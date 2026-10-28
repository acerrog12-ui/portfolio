// Colorful geometric shapes used in the About section and the footer.
type P = { className?: string; color?: string }

export const Heart = ({ className, color = '#ff3d5a' }: P) => (
  <svg viewBox="0 0 100 90" className={className} aria-hidden>
    <defs>
      <radialGradient id="hg" cx="35%" cy="30%" r="75%">
        <stop offset="0" stopColor="#ff8a9a" />
        <stop offset="1" stopColor={color} />
      </radialGradient>
    </defs>
    <path d="M50 88C20 66 2 50 2 28 2 13 14 2 28 2c9 0 17 5 22 13C55 7 63 2 72 2c14 0 26 11 26 26 0 22-18 38-48 60z" fill="url(#hg)" />
  </svg>
)

export const Flower = ({ className, color = '#9b5cff' }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="50" cy="26" rx="18" ry="24" fill={color} transform={`rotate(${r} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="13" fill="#ffd54a" />
  </svg>
)

export const Star = ({ className, color = '#c7c9d6' }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <path d="M50 2c4 30 18 44 48 48-30 4-44 18-48 48-4-30-18-44-48-48C32 46 46 32 50 2z" fill={color} />
  </svg>
)

export const Cube = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <path d="M50 4l42 22v48L50 96 8 74V26z" fill="#4b6bff" />
    <path d="M50 4l42 22-42 22L8 26z" fill="#7d93ff" />
    <path d="M50 48v48l42-22V26z" fill="#2f47c9" />
  </svg>
)

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
