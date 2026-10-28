# Doston Daminov — Portfolio

Personal portfolio site. React + Vite + Tailwind CSS, animations with GSAP and Lenis smooth scroll. Two languages (UZ / EN).

## Edit content

- **Texts, services, projects, contacts:** `src/content.ts` (both languages side by side).
- **Images:** `public/img/`. Each project has `<id>.jpg` (cover, 16:9) and `<id>-full.jpg` (full layout shown when the project is opened).
- **Character / avatar images:** `public/img/avatar-glasses.webp` (hero), `avatar-hoodie.webp` (about), `contact-figure.jpg` (contact).

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Every push to `main` builds and publishes the site to GitHub Pages via `.github/workflows/deploy.yml`:
https://acerrog12-ui.github.io/portfolio/
