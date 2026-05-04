# Nuttawut Sukaew — Resume Site

Personal resume landing page for **Nuttawut Sukaew** ([@ntwsk](https://github.com/ntwsk)), Software Engineer at ATA IT Limited.

Live: **https://ntwsk.github.io/my-resume/**

> **Built with 100% vibe coding** — every component, hook, animation, and deployment was crafted through AI-assisted development with Claude. Zero lines written the boring way. This is what happens when curiosity meets a great AI and a terminal that never sleeps.

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
│   ├── Cursor.jsx          # Custom dot + ring cursor (desktop only)
│   ├── GameHUD.jsx         # Game HUD — stage name + XP bar (top-right / bottom bar on mobile)
│   ├── StageNav.jsx        # Vertical stage list — CLEARED / ACTIVE / LOCKED (desktop only)
│   └── StageToast.jsx      # Toast notifications when crossing stage boundaries
├── data/
│   └── resume.js           # ← All content lives here (profile, skills, experience, certs, stages)
├── hooks/
│   ├── useLenis.js         # Lenis smooth-scroll initialisation
│   └── useGameProgress.js  # IntersectionObserver-driven stage tracking + XP calc
├── App.jsx                 # Root — wires Lenis + Cursor + Game HUD + all sections
└── index.css               # Tailwind v4 theme tokens, global styles, animations
```

**To update content**, only edit `src/data/resume.js`. No other files need to change.

---

## Game-Stage Layer

The site is framed as a six-stage game. As you scroll, a HUD tracks progress, a side nav shows which stages are CLEARED/ACTIVE/LOCKED, and toast pop-ups celebrate each stage advance — without removing or hiding any resume content (recruiter-safe).

| # | Section | Codename | XP |
|---|---|---|---|
| 1 | `#hero` | PROFILE | 500 |
| 2 | `#about` | ORIGINS | 700 |
| 3 | `#skills` | ARSENAL | 1,200 |
| 4 | `#experience` | QUESTS | 2,400 |
| 5 | `#certifications` | TROPHIES | 1,800 |
| 6 | `#contact` | BOSS | 1,800 |

Total: **8,400 XP**. Stages, codenames, and XP values are configured in `src/data/resume.js` under the `stages` export.

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

> **Important:** The live site serves from the `gh-pages` branch, not from your local files. Every time you make changes, you must run `npm run deploy` again to update the live site. Local edits will never appear on GitHub Pages until you redeploy.

After deploying, wait ~1 minute then hard-refresh the live URL with **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows) to bypass the browser cache.

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
