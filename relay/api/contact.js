// Contact form relay: receives the portfolio form and forwards it to Telegram.
// Env vars (set in Vercel, never in the repo): BOT_TOKEN, CHAT_ID.
const ALLOWED = ['https://acerrog12-ui.github.io', 'http://localhost:5173', 'http://localhost:4173']
const hits = new Map() // best-effort per-IP rate limit (per warm instance)

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  if (ALLOWED.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  if (!ALLOWED.includes(origin)) return res.status(403).json({ ok: false })

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  if (recent.length >= 5) return res.status(429).json({ ok: false })
  hits.set(ip, [...recent, now])

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  if (b.website) return res.status(200).json({ ok: true }) // honeypot: bots fill it, people don't see it
  const name = String(b.name || '').trim().slice(0, 100)
  const phone = String(b.phone || '').trim().slice(0, 30)
  const email = String(b.email || '').trim().slice(0, 120)
  const message = String(b.message || '').trim().slice(0, 3000)
  if (!name || (!message && !phone && !email)) return res.status(400).json({ ok: false })

  const text = `📩 <b>Portfolio: yangi xabar</b>\n\n<b>Ism:</b> ${esc(name)}\n<b>Telefon:</b> ${esc(phone || '—')}${email ? `\n<b>Email:</b> ${esc(email)}` : ''}\n\n${esc(message || '—')}`
  const r = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  })
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok })
}
