# LEARN — Project Deep-Dive Guide

> **Read this file first.** It is the single source of truth for understanding every part of this project. Whether you are the owner returning after months away, a recruiter peeking at the codebase, or an AI assistant being asked to make a change, this guide is the fastest path from zero to confident.

---

## Table of Contents

1. [Why This File Exists](#1-why-this-file-exists)
2. [How to Use This Guide](#2-how-to-use-this-guide)
3. [Project at a Glance](#3-project-at-a-glance)
4. [Tech Stack & Why](#4-tech-stack--why)
5. [Project File Index](#5-project-file-index)
6. [File-by-File Walkthrough](#6-file-by-file-walkthrough)
7. [Game-Stage System](#7-game-stage-system)
8. [How the Website Comes to Life — Step by Step](#8-how-the-website-comes-to-life--step-by-step)
9. [Common Tasks (Recipes)](#9-common-tasks-recipes)
10. [Skill Path: Beginner → Advanced](#10-skill-path-beginner--advanced)
11. [Maintenance Contract](#11-maintenance-contract)

---

## 1. Why This File Exists

This is a personal resume site for **Nuttawut Sukaew** (Salesforce Developer @ ATA IT Limited / National Bank of Canada group). It looks like a hacker-cyberpunk landing page with a soft "game-stage" overlay (HUD, side nav, XP bar, transition toasts) layered on top of a recruiter-readable resume.

**Reading goals for this guide:**

- A first-time reader can clone the repo and ship a content change in under 30 minutes.
- A developer can understand every architectural decision without opening more than this file.
- An AI assistant can answer "where does X live?" or "how do I add Y?" without re-exploring the codebase.

**Self-improvement goal for the owner (you, Nuttawut):** Reading this front-to-back should take you from beginner familiarity (React, Tailwind) all the way to an advanced understanding of scroll-driven UI, intersection observers, custom hooks, animation libraries, and static-site deployment.

---

## 2. How to Use This Guide

- **Owner / contributor:** read sections 3–6 once, then jump to section 9 when making changes.
- **Recruiter / curious developer:** sections 3, 4, 7 are enough to understand what makes the site interesting.
- **AI assistant (Claude / others):** read everything end-to-end before any code change. See `CLAUDE.md` for the project working agreement.

---

## 3. Project at a Glance

```
                  ┌──────────────────────────────────────┐
                  │       Browser (any device)           │
                  └─────────────┬────────────────────────┘
                                │  HTTPS GET /my-resume/
                                ▼
                  ┌──────────────────────────────────────┐
                  │   GitHub Pages (gh-pages branch)     │
                  │   serves dist/ as static files       │
                  └─────────────┬────────────────────────┘
                                │  index.html + index-[hash].js + CSS
                                ▼
                  ┌──────────────────────────────────────┐
                  │  React 19 SPA mounts into <div #root>│
                  │                                      │
                  │  Lenis (smooth scroll)               │
                  │  Framer Motion (UI animation)        │
                  │  GSAP (reserve)                      │
                  │  Tailwind v4 (styling)               │
                  │  IntersectionObserver (stage tracking)│
                  └──────────────────────────────────────┘
```

Six scrolled sections, three persistent overlays (HUD, side stage nav, transition toasts), one custom cursor, all driven by a single shared progress hook.

---

## 4. Tech Stack & Why

| Layer | Tech | Why this choice |
|---|---|---|
| Build tool | **Vite 8** | Sub-second dev start, native ESM, first-class React HMR, single Tailwind plugin install |
| UI framework | **React 19** | Familiar component model; everything is one SPA |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | Utility-first; v4's `@theme` lives in CSS so we get tokenised colours without a JS config |
| UI animation | **Framer Motion 12** | `whileInView`, `layoutId`, `AnimatePresence` — all the moves we need |
| Scroll polish | **Lenis** | Buttery momentum scroll on desktop |
| Reserve animator | **GSAP 3** | Installed for future scroll-trigger work |
| Tilt cards | **react-parallax-tilt** | 3D mouse-tilt on Skills + Cert cards |
| Icons | **lucide-react** (v1.x) | SVG icons, tree-shakable |
| Deploy | **gh-pages** | One-command push to GitHub Pages |
| Host | **GitHub Pages** | Free, fast, the only thing this static site needs |

No backend, no database, no API. Every byte the visitor sees is generated at build time.

---

## 5. Project File Index

Every file outside `node_modules` and `dist`, with a one-line purpose. Detailed walkthroughs follow in section 6.

### Root configuration

| File | Purpose |
|---|---|
| `package.json` | Dependencies + npm scripts (dev / build / preview / deploy) |
| `vite.config.js` | Vite plugin setup + GitHub Pages base path (`/my-resume/`) |
| `eslint.config.js` | Lint rules — React + hooks + refresh plugin |
| `index.html` | Static HTML shell. Contains `<div id="root">`, viewport meta, theme color |
| `deploy.sh` | Convenience wrapper around `npm run deploy` |
| `.gitignore` | Standard Node + Vite ignores |
| `README.md` | Short top-level overview; points readers here |
| `LEARN.md` | **This file** |
| `CLAUDE.md` | Working agreement for AI assistants editing this repo |

### Public assets

| File | Purpose |
|---|---|
| `public/my-image.png` | The avatar image rendered in `Hero.jsx` (loaded via `import.meta.env.BASE_URL`) |

### Source — entry & root composition

| File | Purpose |
|---|---|
| `src/main.jsx` | React entry. Calls `createRoot(...).render(<App />)` |
| `src/App.jsx` | Root composition. Wires Lenis hook, custom cursor, navbar, game-stage overlays, and all six sections |
| `src/index.css` | Tailwind v4 import, theme tokens, every global utility class (`.g-border`, `.dot-grid`, `.float`, etc.), keyframes, mobile rules |

### Source — components

| File | Section / Purpose |
|---|---|
| `src/components/Navbar.jsx` | Fixed top nav with scroll-spy + mobile drawer |
| `src/components/Hero.jsx` | Landing hero — matrix-rain canvas, avatar with orbit ring, typewriter terminal, badge, CTA buttons, stage label |
| `src/components/About.jsx` | "About me" — fake macOS code editor showing a JSON-like profile |
| `src/components/Skills.jsx` | Tech stack badges grouped by category, with tilt + glare |
| `src/components/Experience.jsx` | Career timeline accordion (always-open by default), supports flat or nested-`roles` data shapes |
| `src/components/Certifications.jsx` | Tilt cert cards grouped by issuer, plus the education block |
| `src/components/Contact.jsx` | Contact cards (email / GitHub / LinkedIn) + footer with credit + stack list |
| `src/components/Cursor.jsx` | Custom dot + ring cursor (desktop only — disabled on touch) |
| `src/components/GameHUD.jsx` | Persistent HUD overlay — current stage codename + animated XP bar |
| `src/components/StageNav.jsx` | Fixed left-side game-style stage list (CLEARED / ACTIVE / LOCKED) |
| `src/components/StageToast.jsx` | Bottom-right toast popups when crossing stage boundaries |

### Source — data & hooks

| File | Purpose |
|---|---|
| `src/data/resume.js` | **Single source of truth for content.** Profile, skills, experience, certifications, education, stages, aboutJson |
| `src/hooks/useLenis.js` | Initialise Lenis smooth scroll; skipped on touch devices |
| `src/hooks/useGameProgress.js` | IntersectionObserver-driven stage tracking + XP calculation, used by HUD / StageNav / StageToast |

---

## 6. File-by-File Walkthrough

For each file: **what it is**, **what it does**, **where it's used**, **key concepts to learn from it**.

### `package.json`

**What** — Lists dependencies and the four npm scripts (`dev`, `build`, `preview`, `deploy`).

**Highlights:**
- `"deploy": "gh-pages -d dist"` with a `predeploy` that runs `vite build` first — so `npm run deploy` is the only command you ever need to ship.
- Runtime deps: `react`, `react-dom`, `framer-motion`, `gsap`, `@studio-freight/lenis` (Lenis), `react-parallax-tilt`, `lucide-react`.
- Dev deps: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `gh-pages`, `eslint` + plugins.

**Learn from this file:** how `predeploy`/`deploy` script chaining works, how Vite v8 vs Tailwind v4 are paired without a PostCSS config.

### `vite.config.js`

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-resume/',
})
```

**What** — Vite configuration.

**Why `base` matters** — GitHub Pages serves the site at `https://ntwsk.github.io/my-resume/`, not the apex domain. Without `base`, every script tag would point to `/assets/...` and 404. With it, every URL gets `/my-resume/` prepended at build time.

**Learn:** how a single line of config decides whether your site loads or shows a blank page on Pages.

### `eslint.config.js`

Standard React + hooks + react-refresh ruleset. Run with `npx eslint .` — there's no npm script for it.

### `index.html`

**What** — The HTML shell that Vite injects the bundle into.

**Notes:**
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` — `viewport-fit=cover` is necessary for `env(safe-area-inset-bottom)` to work on iPhone (so the mobile HUD bar doesn't get covered by the home indicator).
- `<meta name="theme-color" content="#020305">` — sets the iOS/Android browser chrome to match the dark theme.
- `<div id="root"></div>` is where React mounts.

### `deploy.sh`

A short bash wrapper that runs `npm run deploy`. Convenience only — `npm run deploy` does the same thing.

### `src/main.jsx`

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)
```

**What** — The React entry point. Mounts `<App />` into the `#root` div in `index.html`. Wraps in `StrictMode` so React double-invokes effects in dev (catches cleanup bugs).

**Learn:** how `createRoot` replaced the old `ReactDOM.render` API in React 18+, and why StrictMode-induced double invocations are a feature, not a bug.

### `src/App.jsx`

The composition root. Nothing renders without going through here.

**Renders, in order:**
1. `<Cursor />` — fixed-position custom cursor (no-op on touch).
2. `<Navbar />` — fixed top nav.
3. `<GameHUD />` — persistent stage/XP overlay.
4. `<StageNav />` — desktop-only side stage list.
5. `<StageToast />` — toast queue for stage transitions.
6. `<main>` containing `Hero`, `About`, `Skills`, `Experience`, `Certifications`, `Contact`.

**Initialisation:** calls `useLenis()` to start smooth-scroll. That's the only side-effect this file owns.

### `src/index.css`

The styling spine. Three things live here:

1. **Tailwind v4 import & theme tokens** — `@import "tailwindcss";` and an `@theme { --color-..., --font-... }` block.
2. **Custom utility classes** — gradient-border (`g-border`), dot grid background (`dot-grid`), avatar float (`float`), terminal cursor blink (`blink`), scanline overlay, `tok-*` colors for the About code editor, and `cursor-dot` / `cursor-ring` for `Cursor.jsx`.
3. **Mobile rules** — a `@media (hover: none)` block that hides the custom cursor and reserves bottom padding on `<main>` so the mobile HUD bar (with iPhone safe-area) doesn't cover content.

**Learn:** how Tailwind v4's CSS-first theme works, why `mask`-based gradient borders look better than `border-image`, how to handle iPhone safe areas without JS.

### `src/data/resume.js`

**The single source of truth for content.** Every component imports from here. To update the resume, you edit this file and nothing else.

**Exports:**

| Export | Shape | Used by |
|---|---|---|
| `profile` | `{ name, role, company, headline, subheadline, location, email, github, linkedin, bio, ... }` | Hero, Contact, Navbar |
| `skills` | `[{ name, category }]` — categories: `salesforce` / `cloud` / `ai` / `dev` / `automation` | Skills |
| `experience` | `[{ id, company, role, period, type, highlights? OR roles[] }]` | Experience |
| `certifications` | `[{ id, name, issuer, year, color, icon, link }]` | Certifications |
| `education` | `{ degree, university, period, location }` | Certifications |
| `stages` | `[{ id, num, codename, xp, desc }]` × 6 | useGameProgress, GameHUD, StageNav, StageToast |
| `aboutJson` | Curated JSON-style object for the About code editor | About |

**Two experience shapes** — entries can either have a flat `highlights: [string]` array (legacy, used by old jobs) **or** a nested `roles: [{ title, highlights }]` array for jobs with multiple sub-roles or projects. `Experience.jsx` renders whichever shape it finds.

**Stage XP totals 8,400.** Stage 1 (`hero`) is pre-credited on load so the HUD reads `XP 500 / 8,400` immediately.

### `src/hooks/useLenis.js`

```js
useEffect(() => {
  if (window.matchMedia('(hover: none)').matches) return // skip on touch
  const lenis = new Lenis({ duration: 1.2, easing: ... })
  function raf(t) { lenis.raf(t); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
  return () => lenis.destroy()
}, [])
```

**Learn:**
- How a `requestAnimationFrame` loop drives an external animation engine.
- Why we skip Lenis on touch devices (it fights the OS's native momentum scroll).
- How effect cleanup (`lenis.destroy()`) prevents leaks under StrictMode's double-invoke.

### `src/hooks/useGameProgress.js`

Used by `GameHUD`, `StageNav`, and `StageToast` independently. Each consumer creates its own observer — three observers across six target elements is cheap.

**Returns:**
- `currentStage` (1–6) — derived from which section is in the IntersectionObserver detection band.
- `currentStageId` — string id (e.g. `'hero'`).
- `xpEarned` — sum of `stages[i].xp` for every id in `unlockedIds`.
- `xpTotal` — fixed 8,400.
- `unlockedIds` — `Set<string>`. Monotonic — once an id is added, it stays. This is what keeps "CLEARED" stages marked when scrolling back up.

**Detection band** — `rootMargin: '-40% 0px -55% 0px'` means a section becomes "current" when its top crosses the line 40% from the top of the viewport. Same pattern as `Navbar.jsx`'s scroll-spy.

### `src/components/Navbar.jsx`

Fixed top nav, six links (`profile / origins / arsenal / quests / trophies / boss` mapped to the section ids).

**Key patterns:**
- Same IntersectionObserver scroll-spy pattern that `useGameProgress` uses.
- Active link gets a green pill that **animates between links** using Framer Motion's `layoutId="nav-pill"`. The first time you see this, it feels magical — Framer remembers the bounding box of the element with that layoutId across re-renders and springs the new position from the old.
- Mobile drawer uses `AnimatePresence` for clean enter/exit on the slide-down panel.

### `src/components/Hero.jsx`

The landing screen. Several things happen here at once.

1. **Matrix rain background** — an HTMLCanvas filled by a `setInterval` loop drawing random katakana / Latin / digits dripping down columns. Stored in `drops[]` per column.
2. **Floating particles** — a few absolutely-positioned `motion.div`s with `y: [-10, 10, -10]` infinite animation.
3. **Avatar** with an orbit ring (rotated by `motion.div animate={{ rotate: 360 }}`) and CSS `float` keyframe for a gentle bob.
4. **Terminal widget** — a fake macOS terminal whose lines are typed via staggered `setTimeout` calls (`TERMINAL_LINES` array). Lines are grouped: `whoami` → name; `cat role.txt` → role + company; `cat experience.txt` → years summary; `cat stack.txt` → four labeled skill groups (Salesforce Platform / Web & Modern Dev / Cloud & AI / Process & Automation).
5. **CTA buttons** — Email (mailto link), GitHub, LinkedIn.
6. **STAGE 01 — PROFILE** stage label so the game framing starts immediately.

The avatar URL is built with `${import.meta.env.BASE_URL}my-image.png` so it resolves correctly under the `/my-resume/` Pages base.

### `src/components/About.jsx`

A fake editor window (red/yellow/green chrome dots, two tabs) showing the user as a JSON-like object — `name`, `role`, `currentCompany`, `previousCompanies`, `skills`, `certifications`, `education`, `location`. Lines reveal one-by-one with a 35ms stagger using `useInView`.

The data comes from `aboutJson` in `resume.js`. The syntax-token colors come from `.tok-*` classes in `index.css`.

### `src/components/Skills.jsx`

Skill badges grouped by `categoryMeta`:
- `salesforce` → "Salesforce Platform" (cyan)
- `cloud` → "Cloud" (orange)
- `ai` → "AI" (cyan-teal)
- `dev` → "Development" (green)
- `automation` → "Process & Automation" (purple)

Each badge wraps a `react-parallax-tilt` Tilt with a tinted glare. The grid is responsive: 2 cols → 3 → 4 → 5 across breakpoints.

### `src/components/Experience.jsx`

Accordion timeline of three jobs. Each card defaults to `open=true` (we used to default only the first one open).

**The polymorphism here matters:**

```jsx
{job.roles ? (
  <div>{job.roles.map(roleGroup => (
    <div>
      <h4>{roleGroup.title}</h4>
      <ul>{roleGroup.highlights.map(...)}</ul>
    </div>
  ))}</div>
) : (
  <ul>{job.highlights.map(...)}</ul>
)}
```

This lets ATA IT, Accenture, and I&I Group all use a `roles` sub-structure with named projects/positions inside them, while preserving the simpler flat shape for any future entry that doesn't need sub-roles.

### `src/components/Certifications.jsx`

Tilt cards grouped by issuer (Amazon Web Services / Salesforce). Per-issuer:
- Header row with issuer name + count badge + a single "Verify" link (Credly for AWS, Trailhead for Salesforce).
- Card grid (2/3/4 cols by breakpoint).

The total count is dynamic (`{certs.length}` per group). Below the cards, the **Education block** renders university/degree/period from `education` in `resume.js`.

### `src/components/Contact.jsx`

Three contact cards (Email / GitHub / LinkedIn) and a footer with:
- "Built end-to-end by Nuttawut Sukaew"
- "100% vibe-coded with Claude Code — zero lines written" (purple)
- `Tech Stacks: React · Vite · Tailwind · GitHub Pages`

### `src/components/Cursor.jsx`

Two absolutely-positioned divs (`cursor-dot`, `cursor-ring`). On desktop:
- The dot snaps to `mousemove` immediately.
- The ring linearly interpolates (`lerp` factor 0.12) toward the cursor, creating a trailing effect.

**Mobile guard:** `useState(() => window.matchMedia('(hover: none)').matches)` — if true, `return null` and render nothing. The `index.css` `@media (hover: none)` block is a belt-and-suspenders backup.

### `src/components/GameHUD.jsx`

Fixed top-right panel on desktop, thin bottom bar on mobile.
- Heading: `NUTTAWUT.exe` + `● ONLINE` indicator.
- `STAGE XX/06 — CODENAME` line.
- Animated XP bar — `motion.div` with green→blue gradient, width animated via spring.
- Mobile bottom-bar uses `paddingBottom: env(safe-area-inset-bottom)` to dodge the iPhone home indicator.

### `src/components/StageNav.jsx`

Fixed left-side panel, **desktop only** (`hidden lg:flex`).
- Each stage row is an anchor (`<a href="#hero">`) — Lenis smooths the scroll.
- Active row has a sliding green pill via `layoutId="stage-active-bg"`.
- Three states: `CLEARED` (✓ green), `ACTIVE` (◉ pulsing), `LOCKED` (◯ dim).

### `src/components/StageToast.jsx`

Toast queue at bottom-right (or above the mobile HUD). When `currentStage > prev`, push a toast with the new stage info; auto-dismiss after 3.2s.
- `prevRef = useRef(currentStage)` — stable comparison across renders.
- Position: `bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:bottom-4` — clears the mobile HUD bar plus iPhone safe-area; pinned to a normal `bottom-4` on desktop.
- `AnimatePresence` handles the slide-in-from-right + fade-out.

---

## 7. Game-Stage System

The "game" is a thin overlay on top of the existing six sections. The resume content stays untouched — only three persistent UI elements (HUD, side nav, toast) and one shared hook were added.

### The six stages

| # | Section | Codename | XP | Description |
|---|---|---|---|---|
| 1 | `#hero` | PROFILE | 500 | Identify the operator |
| 2 | `#about` | ORIGINS | 700 | Read background lore |
| 3 | `#skills` | ARSENAL | 1,200 | Inventory unlocked tools |
| 4 | `#experience` | QUESTS | 2,400 | Mission history |
| 5 | `#certifications` | TROPHIES | 1,800 | Earned achievements |
| 6 | `#contact` | BOSS | 1,800 | Initiate contact protocol |

Total XP: **8,400**.

### Why three independent IntersectionObservers?

The naive worry: "Three components calling `useGameProgress` means three observers — wasteful." In practice it's fine — `IntersectionObserver` is a browser-native primitive observing six elements. Three observers are still essentially free. Avoiding a module-level singleton keeps the hook pure-React and avoids stale-state bugs under StrictMode.

### Recruiter-safety

The game layer is purely additive — never hides, replaces, or reorders resume content. A recruiter who never engages with the HUD can still read every job title, date, skill, and contact link in the standard top-to-bottom flow.

---

## 8. How the Website Comes to Life — Step by Step

1. **Browser hits `https://ntwsk.github.io/my-resume/`.** GitHub Pages returns `index.html` from the `gh-pages` branch.
2. **Bundle loads.** `<script type="module" src="/my-resume/assets/index-[hash].js">` downloads and executes.
3. **React mounts.** `createRoot(...).render(<App />)` replaces the empty `#root`.
4. **Lenis starts.** `useLenis()` boots a `requestAnimationFrame` loop that smooths every subsequent scroll event (skipped on touch).
5. **Custom cursor initialises.** `Cursor.jsx` checks `(hover: none)` — if mouse-capable, two loops drive the dot (instant) and ring (lerp).
6. **Navbar slides in.** Framer Motion `y: -100 → 0`. An IntersectionObserver watches all six section IDs.
7. **Hero animates.** Matrix rain, typewriter, particles, avatar entrance, CTA fade-ins all start at once with staggered Framer delays.
8. **Scroll triggers section animations.** Each section has `whileInView` + `viewport={{ once: true }}` so its entrance plays exactly once when it enters the viewport.
9. **Stage tracking updates.** As you scroll, `useGameProgress` advances `currentStage`. HUD codename + XP bar update; StageNav rolls new states; StageToast slides in if `currentStage > prev`.
10. **Click any nav or stage row.** Standard anchor jump → Lenis smooths it over 1.2s with exponential ease-out.
11. **Reach the bottom.** All six stages cleared, XP 8,400 / 8,400, footer credits visible.
12. **Resize / mobile.** Tailwind breakpoints flip layouts; custom cursor disappears on touch; HUD becomes a bottom bar with iPhone safe-area padding; StageNav hides; toasts reposition.

---

## 9. Common Tasks (Recipes)

### Update text content (most common change)

Almost everything you'd want to change lives in **`src/data/resume.js`**. Touch nothing else.

| You want to change… | Edit this export |
|---|---|
| Name, role, company, bio, links | `profile` |
| Skills shown in the Skills section | `skills` (array — set `category` to `salesforce`/`cloud`/`ai`/`dev`/`automation`) |
| The terminal "stack" lines in Hero | `TERMINAL_LINES` in `src/components/Hero.jsx` |
| A job, dates, sub-roles, bullets | `experience` |
| Certifications | `certifications` |
| Education block | `education` |
| About code-editor JSON | `aboutJson` |
| Stage codenames or XP values | `stages` |

After editing, run `npm run deploy`, wait ~1 minute, hard-refresh (Cmd+Shift+R / Ctrl+Shift+R).

### Add a new section

1. Pick an `id` (e.g. `projects`).
2. Add it to `stages` in `resume.js` with a unique `num`, `codename`, `xp`, `desc`. Update other XP totals if you want them to add up to a round number.
3. Create `src/components/Projects.jsx` with `<section id="projects">` at the top.
4. Add `<Projects />` to `App.jsx` in the desired order.
5. Add a Navbar link in `Navbar.jsx`'s `LINKS` array.
6. Update **this file** (LEARN.md) — section 5 (file index), section 6 (walkthrough), section 7 (stages table).

### Change theme colors

Edit `@theme { --color-... }` tokens in `src/index.css`. Inline `style={{ color: '#00ff88' }}` instances in components are intentional — they are component-local accent colors. Search-replace if you want to change one.

### Tweak animations

- **Speed of section fade-ins:** `transition={{ duration: ... }}` on the `motion.div`s.
- **Staggered children delay:** `delay: index * 0.04` style on each child.
- **Lenis scroll feel:** `duration` and `easing` in `src/hooks/useLenis.js`.
- **Stage detection band:** `rootMargin` in `src/hooks/useGameProgress.js`.

### Deploy

```bash
npm run deploy
```

That's it. `predeploy` runs `vite build`, then `gh-pages -d dist` pushes the `dist/` folder to the `gh-pages` branch. GitHub Pages serves it within ~1 minute. Always hard-refresh after deploying — the old bundle is aggressively cached.

### Run locally

```bash
npm install     # first time only
npm run dev     # http://localhost:5173/my-resume/
```

Notice the URL has `/my-resume/`. That is the Vite `base` path. Direct `localhost:5173/` returns a 404 in dev too — this is intentional and matches production.

---

## 10. Skill Path: Beginner → Advanced

This is the personal-growth track. Read the relevant sources after each milestone.

### Beginner

- ✏️ Edit a string in `resume.js` and ship it (`npm run deploy`). You've now done a full deploy cycle.
- 🎨 Change one theme token in `index.css` (e.g. `--color-accent: #ff0066`). Watch the whole site re-skin.
- 🧱 Read `src/main.jsx` and `src/App.jsx`. Understand how a React app boots.

### Intermediate

- 🪝 Read `useLenis.js`. Understand `useEffect` cleanup and `requestAnimationFrame`.
- 👀 Read `Navbar.jsx`'s scroll-spy. Understand `IntersectionObserver` and `rootMargin`.
- 🎬 Read any `motion.div` block. Understand `initial / animate / whileInView / transition`.
- 🧬 Read `Experience.jsx`'s polymorphic render — the `job.roles ? ... : ...` branch. Understand why supporting both shapes matters.
- 🧵 Read `useGameProgress.js`. Understand `Set` immutability (`new Set([...prev, id])`) and why `unlockedIds` is monotonic.

### Advanced

- 🌀 Read Framer Motion's `layoutId` usage in `Navbar.jsx` and `StageNav.jsx`. Understand FLIP-style shared-element animation.
- 📐 Read `index.css` `.g-border`. Understand mask-based gradient borders.
- 📱 Read the `(hover: none)` mobile rules in `Cursor.jsx`, `useLenis.js`, and `index.css`. Understand graceful degradation.
- 🛡 Read `safe-area-inset-bottom` usage in `GameHUD.jsx` and `StageToast.jsx`. Understand iPhone notch handling.
- 🚀 Read `vite.config.js` and `package.json` deploy chain. Understand how `base` and `gh-pages` cooperate.
- 🎮 Read all three game-stage components (`GameHUD`, `StageNav`, `StageToast`). Understand the shared-hook + multiple-observers architecture, and why the alternative (singleton + pub/sub) was rejected.

You're advanced once you can answer: "If I want to add sound effects on stage transitions, where do I add the listener and where do I keep the audio assets?" Hint: subscribe inside `StageToast.jsx`'s effect, store assets in `public/`, reference via `import.meta.env.BASE_URL`.

---

## 11. Maintenance Contract

**This file must always reflect the current state of the project.**

When any change ships:
- New file? → Add a row to section 5 and a walkthrough block to section 6.
- Renamed/moved/deleted file? → Update every reference here.
- New skill / cert / experience / stage / data export? → Mention it in the relevant table.
- New dependency? → Update section 4.
- Changed deploy or build flow? → Update section 4 and section 9.
- New common task pattern? → Add a recipe to section 9.

If LEARN.md drifts behind reality, every future reader (you, or an AI helping you) loses time re-discovering things that should already be written down. Treat it as code: review and update it with every PR.

For AI assistants: see `CLAUDE.md` for the working agreement that mirrors this contract.
