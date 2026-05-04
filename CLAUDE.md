
# Working Agreement for Claude

## Read LEARN.md first — every session

Before making **any** change to this project, read **[LEARN.md](LEARN.md)** end-to-end. It is the single source of truth and contains:

- The purpose and architecture of every file
- All conventions, theme tokens, and patterns in use
- The polymorphic data shapes in `src/data/resume.js`
- The game-stage layer wiring (HUD, StageNav, StageToast, useGameProgress)
- The deploy pipeline and Pages base-path concerns

Reading LEARN.md first will save significant time and prevent breaking established patterns. Skipping it leads to duplicated work and inconsistent code.

## Update LEARN.md with every change

LEARN.md is a **living document**. Whenever you modify, add, or delete a file, update LEARN.md in the same change so future sessions stay in sync with reality.

Specifically:

| Change you made | LEARN.md section to update |
|---|---|
| New file | §5 File Index + §6 walkthrough block |
| Renamed / moved / deleted file | every reference + §5 + §6 |
| New skill / cert / experience entry / stage in `resume.js` | §6 data layer table (or §7 stages table) |
| New dependency in `package.json` | §4 Tech Stack table |
| Changed deploy or build flow | §4 + §9 |
| New repeatable workflow | §9 Common Tasks |

If you ship a code change without updating LEARN.md, you've left the project in a worse state than you found it.

## Editing rules

- **Content lives in `src/data/resume.js`.** Don't hard-code resume strings in components.
- **Theme colors are tokens** in `src/index.css` under `@theme`. Don't introduce ad-hoc hex values for theme-wide changes; component-local accent hexes (e.g. category colors in `Skills.jsx`) are fine.
- **Vite base path is `/my-resume/`.** Reference any `public/` asset with `${import.meta.env.BASE_URL}filename.ext` — never absolute paths.
- **Two experience shapes coexist** — `highlights: string[]` (flat) **or** `roles: [{ title, highlights }]` (grouped). The render logic in `Experience.jsx` already supports both. Don't break that branch.
- **Cards in Experience are scroll-driven.** They auto-expand (with stagger) when the section enters the viewport and collapse when it leaves. `sectionInView` is passed from `Experience` → `ExperienceCard` via `useInView`. Don't revert to a static default-open state.
- **No backwards-compatibility shims, dead code, or speculative abstractions** unless explicitly requested.

## Deploy contract

The live site is the contract. **After every code change, run `deploy.sh` to build and deploy automatically:**

```bash
bash deploy.sh
```

That runs `npm run build` then `npm run deploy` (`vite build` → `gh-pages -d dist`). After deploy, the user must hard-refresh (Cmd+Shift+R) to bypass the cache — mention this when reporting completion.

## Mobile must keep working

Several patterns exist purely for mobile:

- `useLenis` and `Cursor` short-circuit on `(hover: none)`.
- `GameHUD` collapses to a bottom bar with `env(safe-area-inset-bottom)` padding.
- `StageNav` is `hidden lg:flex` (desktop-only).
- `StageToast` uses `bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))]` so it clears the mobile HUD.

If you add a new fixed-position element, repeat these mobile considerations or document why they don't apply.
