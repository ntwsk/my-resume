# Nuttawut Sukaew — Resume Site

Personal resume landing page for **Nuttawut Sukaew** ([@ntwsk](https://github.com/ntwsk)), Salesforce Developer at ATA IT.

Live: **https://ntwsk.github.io/my-resume/**

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion 12 · GSAP 3 |
| Smooth scroll | Lenis |
| 3D tilt | react-parallax-tilt |
| Icons | lucide-react |
| Deploy | gh-pages → GitHub Pages |

---

## Commands

```bash
npm run dev       # dev server → http://localhost:5173/my-resume/
npm run build     # production build → dist/
npm run preview   # preview the dist build locally
npm run deploy    # build + push to gh-pages branch
```

Or use the deploy script:

```bash
./deploy.sh
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav — active section tracking via IntersectionObserver
│   ├── Hero.jsx            # Matrix rain canvas, typewriter terminal, floating avatar
│   ├── About.jsx           # Syntax-highlighted .ts code editor + stat cards
│   ├── Skills.jsx          # Skill badges grouped by category (no percentages)
│   ├── Experience.jsx      # Accordion timeline cards — ATA IT / Accenture / I&I Group
│   ├── Certifications.jsx  # Tilt cert cards + education block
│   ├── Contact.jsx         # Contact links + footer
│   └── Cursor.jsx          # Custom dot + ring cursor (desktop only)
├── data/
│   └── resume.js           # ← All content lives here (profile, skills, experience, certs)
├── hooks/
│   └── useLenis.js         # Lenis smooth-scroll initialisation
├── App.jsx                 # Root — wires Lenis + Cursor + all sections
└── index.css               # Tailwind v4 theme tokens, global styles, animations
```

**To update content**, only edit `src/data/resume.js`. No other files need to change.

---

## Vite Base Path

`vite.config.js` sets `base: '/my-resume/'` for GitHub Pages. Any file in `public/` must be referenced as:

```js
`${import.meta.env.BASE_URL}filename.ext`
// e.g. `${import.meta.env.BASE_URL}my-image.png`
```

Do **not** use absolute paths like `/my-image.png` — they will 404 under the base path.

---

## Deploying to GitHub Pages

1. Ensure the remote is `https://github.com/ntwsk/my-resume`
2. Run:

```bash
npm run deploy
```

This runs `vite build` then `gh-pages -d dist`, which pushes `dist/` to the `gh-pages` branch. GitHub Pages serves from that branch automatically.

---

## Design System

| Token | Value |
|---|---|
| Background | `#020305` |
| Surface | `#080b10` |
| Accent green | `#00ff88` |
| Accent blue | `#0ea5e9` |
| Accent purple | `#a855f7` |
| Text | `#8892a4` |
| Text bright | `#e2e8f0` |
| Font mono | JetBrains Mono |
| Font sans | Inter |

All tokens are defined in `src/index.css` under `@theme`.
