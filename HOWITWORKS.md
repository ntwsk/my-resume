# How It Works

A deep-dive into every technology used in this project and a step-by-step walkthrough of how the website comes to life.

---

## Table of Contents

1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Build System — Vite](#2-build-system--vite)
3. [UI Framework — React 19](#3-ui-framework--react-19)
4. [Styling — Tailwind CSS v4](#4-styling--tailwind-css-v4)
5. [Page Animations — Framer Motion](#5-page-animations--framer-motion)
6. [Scroll Animation — GSAP](#6-scroll-animation--gsap)
7. [Smooth Scrolling — Lenis](#7-smooth-scrolling--lenis)
8. [3D Tilt Effects — react-parallax-tilt](#8-3d-tilt-effects--react-parallax-tilt)
9. [Icons — lucide-react](#9-icons--lucide-react)
10. [Deployment — gh-pages](#10-deployment--gh-pages)
11. [How the Website Works Step by Step](#11-how-the-website-works-step-by-step)

---

## 1. Tech Stack Overview

```
Browser
  └── Static files served from GitHub Pages (gh-pages branch)
        └── index.html  ← entry point
              └── React 19 (SPA — single page application)
                    ├── Tailwind CSS v4     — utility-first styling
                    ├── Framer Motion 12    — component animations
                    ├── GSAP 3              — scroll-triggered animations
                    ├── Lenis               — smooth scroll engine
                    ├── react-parallax-tilt — 3D mouse-tilt effect
                    └── lucide-react        — SVG icon library
```

All of this is bundled at build time by **Vite 8** into a handful of static `.js` and `.css` files. No server is required — the final output is just files that any static host (GitHub Pages, Netlify, etc.) can serve.

---

## 2. Build System — Vite

**What it is:** Vite is the build tool that transforms the source code into browser-ready files.

**What it does in this project:**

- Starts a fast dev server (`npm run dev`) with Hot Module Replacement (HMR) — changes appear in the browser instantly without a full reload.
- Bundles everything for production (`npm run build`) into the `dist/` folder:
  - `dist/index.html` — the shell HTML
  - `dist/assets/index-[hash].js` — all JavaScript (React + libraries + your code)
  - `dist/assets/index-[hash].css` — all compiled CSS
- Applies the `base: '/my-resume/'` prefix to all asset URLs so the site works correctly under `https://ntwsk.github.io/my-resume/` (not just the root domain).

**Key config — `vite.config.js`:**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-resume/',
})
```

- `react()` — enables JSX transformation and React Fast Refresh (HMR for React).
- `tailwindcss()` — runs Tailwind directly as a Vite plugin (no PostCSS config needed in v4).
- `base` — prepends `/my-resume/` to every asset path in the built HTML.

---

## 3. UI Framework — React 19

**What it is:** React is the JavaScript library that builds the user interface as a tree of reusable components.

**How it works here:**

The entire page is one React app. `src/main.jsx` mounts it:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)
```

`App.jsx` is the root component. It calls the `useLenis` hook to start smooth scrolling, then renders every section in order:

```
App
├── Cursor       — custom mouse cursor (portal-like, fixed position)
├── Navbar       — fixed top navigation
└── <main>
    ├── Hero          — full-screen landing
    ├── About         — code editor + stat cards
    ├── Skills        — tech badge grid
    ├── Experience    — accordion timeline
    ├── Certifications — tilt cards + education
    └── Contact       — links + footer
```

**All resume content** lives in `src/data/resume.js` and is imported into the components that need it. No data fetching — everything is static at build time.

---

## 4. Styling — Tailwind CSS v4

**What it is:** Tailwind is a utility-first CSS framework. Instead of writing `.card { padding: 16px }` in a separate file, you write `className="p-4"` directly on the element.

**How v4 is different from v3:**

Tailwind v4 uses a Vite plugin (`@tailwindcss/vite`) instead of PostCSS. Theme tokens are defined in `src/index.css` using `@theme` instead of `tailwind.config.js`:

```css
@import "tailwindcss";

@theme {
  --color-accent: #00ff88;
  --font-mono: 'JetBrains Mono', monospace;
  /* ... */
}
```

**What lives in `index.css` beyond Tailwind:**

| Class / selector | Purpose |
|---|---|
| `.g-border` | Gradient border using CSS mask — the green→blue angled border on cards |
| `.dot-grid` | Repeating radial-gradient dots used as the section background |
| `.float` | CSS keyframe animation that bobs the avatar up and down |
| `.blink` | Blinking cursor (`_`) effect using step-end keyframes |
| `.scanline::after` | A slow sweep of faint light across the page |
| `.cursor-dot` / `.cursor-ring` | Styles for the custom cursor elements |
| `.tok-*` | Syntax token colours used inside the About code editor |
| `body::before` | SVG fractal-noise grain overlay for texture depth |

---

## 5. Page Animations — Framer Motion

**What it is:** Framer Motion is a React animation library. You animate React elements by replacing `<div>` with `<motion.div>` and passing animation props.

**Patterns used in this project:**

### Entrance animations (scroll-triggered)
Every section uses `whileInView` + `viewport={{ once: true }}` so elements animate in the first time they enter the viewport:

```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### Staggered children
The terminal lines, skill badges, and experience bullets use `delay: index * 0.04` to cascade in one after another instead of all at once.

### Spring layout animation (Navbar active pill)
The green highlight that slides between nav links uses `layoutId="nav-pill"`. React automatically animates the shared element between positions using a spring:

```jsx
{isActive && (
  <motion.span layoutId="nav-pill" ... />
)}
```

### AnimatePresence (accordion + mobile drawer)
`AnimatePresence` wraps elements that conditionally mount/unmount so they can animate out before being removed from the DOM:

```jsx
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>
```

This powers the accordion cards in the Experience section and the mobile nav drawer.

### Floating avatar
The avatar uses a CSS `float` animation (not Framer Motion) for performance — CSS animations run on the compositor thread without re-rendering React.

---

## 6. Scroll Animation — GSAP

**What it is:** GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library, known for precision and performance. It is installed and available (`import gsap from 'gsap'`) for future use with its `ScrollTrigger` plugin for timeline-based scroll animations.

**Current use:** GSAP is installed and ready. It can be added to any component for advanced sequenced animations triggered by scroll position — for example, animating text character by character as you scroll, or pinning a section while content transitions.

---

## 7. Smooth Scrolling — Lenis

**What it is:** Lenis intercepts the browser's native scroll and replaces it with a physically-simulated momentum scroll, making the page feel premium and buttery.

**How it works — `src/hooks/useLenis.js`:**

```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

1. `Lenis` is created with a `duration` of 1.2 seconds and an **exponential ease-out** — fast at first, decelerates smoothly.
2. A `requestAnimationFrame` loop calls `lenis.raf(time)` every frame (~60fps) so Lenis can interpolate the scroll position.
3. It is started in `App.jsx` via `useLenis()` so it covers the entire page.
4. On unmount, `lenis.destroy()` removes all event listeners cleanly.

---

## 8. 3D Tilt Effects — react-parallax-tilt

**What it is:** A React component wrapper that tracks mouse position over an element and applies a CSS 3D perspective transform, making cards appear to tilt toward the cursor.

**Used on:** Skill badges and Certification cards.

**Key props used:**

```jsx
<Tilt
  tiltMaxAngleX={8}       // max tilt degrees on X axis
  tiltMaxAngleY={8}       // max tilt degrees on Y axis
  glareEnable             // adds a light-reflection glare overlay
  glareMaxOpacity={0.05}  // very subtle — 5% opacity max
  glareColor="#00ff88"    // green tint matches the theme
  scale={1.04}            // card grows slightly on hover
  transitionSpeed={500}   // ms to return to flat after mouse leaves
>
```

---

## 9. Icons — lucide-react

**What it is:** Lucide is an open-source icon library. Each icon is a React component that renders a crisp SVG.

**Note on this version (v1.x):** The icons `Github` and `Linkedin` do not exist in v1.x. This project uses `GitFork` for the GitHub link and `Link2` for the LinkedIn link instead.

---

## 10. Deployment — gh-pages

**What it is:** `gh-pages` is an npm package that pushes a folder to the `gh-pages` branch of your GitHub repository, which GitHub Pages then serves as a static website.

**The deploy pipeline:**

```
npm run deploy
  │
  ├── [predeploy] npm run build
  │     └── Vite bundles everything → dist/
  │
  └── gh-pages -d dist
        └── pushes dist/ contents → gh-pages branch on GitHub
              └── GitHub Pages serves → https://ntwsk.github.io/my-resume/
```

**Why `base: '/my-resume/'` matters:**

GitHub Pages serves the site at `https://ntwsk.github.io/my-resume/`, not at the root `https://ntwsk.github.io/`. Without the base setting, the browser would request assets from `/assets/index.js` (root) instead of `/my-resume/assets/index.js`, causing a blank page.

---

## 11. How the Website Works Step by Step

### Step 1 — Browser requests the page
The user visits `https://ntwsk.github.io/my-resume/`. GitHub Pages returns `index.html` from the `gh-pages` branch.

### Step 2 — Browser loads the bundle
`index.html` contains a `<script type="module" src="/my-resume/assets/index-[hash].js">` tag. The browser downloads and executes the JavaScript bundle.

### Step 3 — React mounts
React calls `createRoot(document.getElementById('root')).render(<App />)`, replacing the empty `<div id="root">` with the full component tree.

### Step 4 — Lenis starts
`useLenis()` runs inside `App`. It creates a Lenis instance and starts a `requestAnimationFrame` loop. From this point, all scrolling is intercepted and smoothed.

### Step 5 — Custom cursor initialises
`Cursor.jsx` checks `window.matchMedia('(hover: none)')`. On a desktop (mouse device), it starts two loops:
- **Dot** — snaps to the exact mouse position instantly via `mousemove`.
- **Ring** — follows with linear interpolation (`lerp` at factor 0.12) — it lags behind slightly, creating the trailing effect.

### Step 6 — Navbar slides in
Framer Motion animates the `<header>` from `y: -100` to `y: 0`. An `IntersectionObserver` watches all five section IDs. As you scroll, whichever section occupies the middle 5% of the viewport becomes `active`, and the green pill animates to that nav link via `layoutId`.

### Step 7 — Hero section loads
Three things start simultaneously on mount:
1. **Matrix rain** — a `<canvas>` fills the background. `setInterval` at 60ms draws random characters (A–Z, 0–9, katakana) column by column. Each column's drop position is tracked in the `drops[]` array.
2. **Typewriter** — `setTimeout` calls staggered by the `delay` values in `TERMINAL_LINES` reveal each terminal line. The cleanup function cancels all pending timeouts to prevent double-firing in React StrictMode.
3. **Framer Motion entrance** — name, headline, bio, and buttons each fade+slide in with increasing delays.

### Step 8 — Scroll triggers section animations
As you scroll down into each section, Framer Motion's `whileInView` fires `initial → animate`:
- **About** — the code editor lines reveal one by one (opacity fade, 35ms stagger). The stat cards slide in from the right.
- **Skills** — badges scale in from `0.9 → 1.0` with a 40ms stagger per badge. Moving the mouse over a badge activates the Tilt component's 3D perspective and glare overlay.
- **Experience** — cards slide in from the left (`x: -40 → 0`). Clicking a card toggles `AnimatePresence` to expand/collapse the highlights list.
- **Certifications** — tilt cards fade up with stagger. Moving the mouse tilts each card up to 12°.
- **Contact** — cards fade up. On hover, `whileHover={{ y: -5 }}` lifts the card.

### Step 9 — Navigation between sections
Clicking a nav link fires a standard anchor scroll (`href="#about"`). Lenis intercepts the jump and animates it smoothly using its exponential easing curve over 1.2 seconds.

### Step 10 — Responsive layout
Tailwind's responsive prefixes (`lg:`, `sm:`) control layout breakpoints. On mobile:
- The two-column Hero grid becomes single-column.
- The desktop nav hides (`hidden md:flex`) and the hamburger button appears.
- Clicking the hamburger triggers `AnimatePresence` to fade in the mobile drawer menu.
- The custom cursor is disabled (the `(hover: none)` media query check in `Cursor.jsx`).
