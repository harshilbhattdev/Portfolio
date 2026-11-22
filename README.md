# Harshil Bhatt — Portfolio Website

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-c8f135?style=for-the-badge&logo=github)](https://harshilbhatt.dev)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Build Tools](https://img.shields.io/badge/No%20Build%20Tools-Zero%20Dependencies-c8f135?style=for-the-badge)](.)

A fully custom, single-page portfolio website built entirely with **vanilla HTML, CSS, and JavaScript** — no frameworks, no npm, no build step. Opens from the file system or any static host.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [File Structure](#file-structure)
- [Pages](#pages)
  - [Home (index.html)](#home-indexhtml)
  - [Project 1 — Job Portal](#project-1--job-portal-with-resume-matching)
  - [Project 2 — Sales Forecasting Dashboard](#project-2--sales-forecasting-dashboard)
  - [Project 3 — Log Monitoring Tool](#project-3--log-monitoring-tool-with-cicd)
- [Design System](#design-system)
- [CSS Architecture](#css-architecture)
- [JavaScript Architecture](#javascript-architecture)
- [Cross-Device Compatibility](#cross-device-compatibility)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [How to Run Locally](#how-to-run-locally)
- [How to Deploy](#how-to-deploy)
- [Customisation Guide](#customisation-guide)
- [Browser Support](#browser-support)
- [Screenshots](#screenshots)

---

## Overview

This portfolio showcases three placement-level projects spanning full-stack web development, data science, and cloud/DevOps engineering. Every page is a self-contained HTML file with embedded styles and an inline interactive demo — no server required, no API calls, no dependencies.

**Goals:**
- Load instantly on any device or connection
- Look great on phones, tablets, and desktops
- Work correctly on Chrome, Safari, Firefox, and Edge — including iOS Safari
- Demonstrate technical depth through live in-browser project simulations

---

## Features

### Visual & Interaction
| Feature | Implementation |
|---------|---------------|
| Hue-cycling cursor glow | `requestAnimationFrame` lerp + `hsla()` hue rotation — desktop only |
| Custom dot + ring cursor | CSS `pointer: fine` guard so it never shows on touch devices |
| Animated hero grid background | CSS `background-size` animation + `mask-image` vignette |
| Project card spotlight effect | Per-card `mousemove` → CSS custom properties `--sx / --sy` |
| Skill card 3D tilt | `perspective()` + `rotateX/Y` on `mousemove` |
| Magnetic buttons | Cursor-offset `translate()` on hover |
| Scroll-driven reveal animations | `IntersectionObserver` with `translateY` + `opacity` |
| Animated counter numbers | `requestAnimationFrame` ease-out expo curve |
| Animated skill progress bars | `IntersectionObserver` triggers CSS `width` transition |
| Infinite ticker marquee | Pure CSS `@keyframes` animation |
| Smooth scroll navigation | `window.scrollTo({ behavior: 'smooth' })` with iOS fallback |
| Page loader | Shows only on first visit per session via `sessionStorage` |
| Hero name glitch effect | Periodic `filter: blur()` pulse — desktop only |

### Project Demo Interactivity
| Project | Live Demo Features |
|---------|-------------------|
| Job Portal (P1) | Full auth playground (register/login/JWT), job CRUD, apply flow with duplicate blocking, 403 ownership guards, skill matching engine with 150+ keywords, forecast API tabs |
| Sales Forecasting (P2) | Cleaning pipeline terminal simulator, Chart.js-style SVG charts, train.py simulator with animated test runner, forecast dropdown with CI band |
| Log Monitoring (P3) | Live log stream (start/stop/burst), traffic generator with progress bars, collector API playground with filter/stats tabs, alert system with banner, full CI/CD pipeline simulator |

---

## File Structure

```
portfolio/
├── index.html          # Main single-page portfolio (home)
├── style.css           # All styles for index.html
├── script.js           # All interactivity for index.html
├── project-1.html      # Job Portal — standalone detail page
├── project-2.html      # Sales Forecasting — standalone detail page
├── project-3.html      # Log Monitoring — standalone detail page
└── README.md           # This file
```

**Each project page is fully self-contained:**
- Inline `<style>` block (no external stylesheet dependency)
- Inline `<script>` block at the bottom
- Zero external JavaScript except Google Fonts

---

## Pages

### Home (`index.html`)

The main portfolio page. Single-page layout with smooth-scroll sections.

**Sections:**
1. **Hero** — Full-viewport animated intro with name, title, and CTA buttons
2. **Ticker** — Scrolling skills marquee
3. **About** — Bio, animated stat counters (Years Learning, Projects, Certifications)
4. **Skills** — 4 skill cards with 3D tilt and animated progress bars
5. **Education** — Timeline layout (Higher Secondary → B.Sc. IT)
6. **Certifications** — 3 cert cards (CSM, AWS SAA, OCP)
7. **Projects** — 3 cards with spotlight effect + modal previews
8. **Contact** — Email link with underline animation
9. **Footer** — Logo, copyright, links

**Modals:**  
Each project card has a quick-preview modal (overlay click) and an "Explore" button that navigates to the full project detail page.

---

### Project 1 — Job Portal with Resume Matching

**File:** `project-1.html`  
**Tech:** React + Vite, Node.js, Express, PostgreSQL, Prisma ORM, JWT, Docker  
**Accent color:** Lime green (`#c8f135`)

Built across **4 parts**, each showcased with its own interactive demo section:

| Part | Content |
|------|---------|
| **Part 1 — Auth** | Register/Login/GET-me tabs. Validates email, password strength, role. Stores to in-browser DB. JWT generation and decoding simulated. |
| **Part 2 — Jobs & Applications** | 6-tab portal: Post Job, My Jobs (close/delete), Browse (search + filter + pagination), Apply (blocked on closed/duplicate), My Applications (status badges), Applicants (match table, shortlist/reject). Full ownership guard simulation — 403 if wrong recruiter. |
| **Part 3 — Resume Matching** | Drag-and-drop upload zone, pdf-parse simulation, 150+ IT skill dictionary with word-boundary regex, extracted skills as removable tags, Recommended Jobs with coloured match % progress bars, Applicants table with match_% sorted descending, min_match slider filter. |
| **Part 4 — Production** | Interactive Jest test runner (39 tests, 4 suites), security checklist (Helmet, CORS, rate-limit, magic-byte PDF check), Docker service cards, docker-compose.yml code, CI/CD test runner (animated), ER diagram SVG, indexes table, scalability cards. |

---

### Project 2 — Sales Forecasting Dashboard

**File:** `project-2.html`  
**Tech:** Python 3.11, Pandas, Prophet/ARIMA, Streamlit, Plotly, pytest  
**Accent color:** Cyan (`#00d2ff`)

Built across **4 parts:**

| Part | Content |
|------|---------|
| **Part 1 — Data & EDA** | Superstore dataset info, file tree, 6 cleaning function cards with docstrings, pipeline flow diagram, `cleaning.py` code, animated terminal simulator for `run_cleaning.py` (with friendly FileNotFoundError demo), 6 SVG EDA charts (trend, top-10, region donut, seasonality, missing values, category bars), Jupyter notebook cell previews. |
| **Part 2 — Forecasting Models** | Time-series split diagram with explanation of why random split is wrong, 4 model cards (Moving Average, Seasonal Naive, Prophet✓, SARIMAX), `features.py` / `evaluate.py` / `models.py` code blocks, `train.py` terminal simulator with animated comparison table, `forecast(series, months)` API with 5 selectable series each showing 6 forecast rows with CI range visualisation. |
| **Part 3 — Streamlit Dashboard** | 4 clickable page tabs (Home/Overview/Products/Forecast) with working sidebar filters (`session_state` badge), live KPI cards, monthly/yearly toggle chart, region bar + category donut, product search with trend, forecast dropdown + slider + CI band chart + live CSV download. Code blocks for `Home.py`, `components.py`, `3_Forecast.py`. |
| **Part 4 — Tests, Docker, Docs** | Animated pytest runner (28 tests, 4 suites, coverage bars), Dockerfile + docker-compose code, `.dockerignore`, Makefile grid, type hints code block, README section cards, model comparison table with placeholders, limitations & next steps. |

---

### Project 3 — Log Monitoring Tool with CI/CD

**File:** `project-3.html`  
**Tech:** Node.js + Express, Winston, Python + FastAPI, SQLite, Chart.js, Docker, GitHub Actions, AWS EC2  
**Accent color:** Orange (`#ff6b35`)

Built across **4 parts:**

| Part | Content |
|------|---------|
| **Part 1 — Sample App & Logs** | 5 endpoint cards (GET/POST, log level badges), `logger.js` with daily-rotate-file, `app.js` request middleware, `server.js` graceful shutdown, log schema table (9 fields), live log stream simulator (start/stop/burst), traffic generator with RPS/duration sliders + endpoint breakdown bars, Jest test runner (21 tests). |
| **Part 2 — Collector API** | File tree, 6-step tail-f watcher pipeline diagram, `watcher.py` async tail with rotation/truncation detection, `parser.py` safe JSON parser (never throws), `routes/logs.py` with all filters and slowest-endpoints query, 3-table SQLite schema (logs/bad_lines/alerts), 6 API route cards, live collector playground (GET /logs with filters, Stats Summary KPI cards, errors-per-hour SVG bar chart, slowest endpoints table), pytest runner (24 tests). |
| **Part 3 — Dashboard & Alerts** | 3 alert rule cards (error spike, slow response, high error rate), `alert_checker.py` full async 30s loop with cooldown + auto-resolve + `alerts.log` write, live alert simulator with log stream and red banner + acknowledge, full interactive dashboard mock (KPIs, errors/hour SVG, donut chart, slowest bars, logs table with filters and load-more, alert banner slot), `api.js` code with connection-lost detection. |
| **Part 4 — Docker, CI/CD, AWS** | 4 Docker service cards, `docker-compose.yml` with shared `logs_data` volume, Dockerfiles, CI pipeline flow diagram (6 animated steps), `▶ Simulate CI Run` and `✗ Simulate Failure` buttons with streaming log terminal, `ci.yml` and `cd.yml` code blocks, 6-step AWS EC2 deployment guide with cost table, architecture SVG diagram (Mermaid-style), design decisions (SQLite vs PostgreSQL, file tail vs Kafka), scalability cards. |

---

## Design System

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#0a0a0a` | Page background |
| `--bg2` | `#111111` | Section backgrounds (About, Projects) |
| `--bg3` | `#161616` | Cards, code blocks |
| `--accent` | `#c8f135` | Primary accent — lime green |
| `--accent2` | `#a8d420` | Accent hover state |
| `--white` | `#ffffff` | Primary text |
| `--grey` | `#888888` | Secondary text, labels |
| `--grey2` | `#444444` | Muted elements |
| `--border` | `rgba(255,255,255,0.07)` | Card borders, dividers |

**Project page accent colors:**
- Project 1 (Job Portal): `#c8f135` (lime green) — same as home
- Project 2 (Sales Forecast): `#00d2ff` (cyan)
- Project 3 (Log Monitor): `#ff6b35` (orange)

### Typography

**Font:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts)  
Weights used: 300, 400, 500, 600, 700

| Use | Size | Weight |
|-----|------|--------|
| Hero name | `clamp(3.5rem, 14vw, 12rem)` | 900 |
| Section titles | `clamp(2.4rem, 5vw, 4.5rem)` | 900 |
| Body text | `1rem` – `1.2rem` | 400 |
| Labels / badges | `0.65rem` – `0.78rem` | 600–700 |
| Code blocks | `'Courier New', monospace` | 400 |

### Spacing & Layout

- **Max content width:** 1160px (`index.html`) / 1100px (project pages)
- **Section padding:** `120px 0` → `72px 0` on mobile
- **Container padding:** `40px` → `16px` on mobile
- **Border radius:** `20px` (cards) / `100px` (pills/buttons) / `16px` (smaller cards)

---

## CSS Architecture

`style.css` (for `index.html`) is a single flat file organised in this order:

```
1.  Reset & CSS variables
2.  Base (body, links, images)
3.  Custom cursor  (@media pointer: fine guard)
4.  Scrollbar
5.  Navbar + hamburger + mobile nav drawer
6.  Reveal animations + prefers-reduced-motion
7.  Cursor glow  (@media pointer: coarse → display:none)
8.  Hero section (bg grid, name, eyebrow, ctas, scroll hint)
9.  Buttons
10. Ticker marquee
11. Section commons (padding, container, section-label, section-title)
12. About
13. Skills
14. Education
15. Certifications
16. Projects (cards, spotlight, banner, overlay, body)
17. Project modals
18. Contact
19. Footer
20. Section divider accent line
21. Responsive breakpoints:
    - Tablet  ≤ 900px
    - Mobile  ≤ 560px
    - Small phones ≤ 380px
22. Page loader animation
```

Each project page (`project-1/2/3.html`) uses a self-contained `<style>` block following the same variable conventions but with a project-specific accent color.

---

## JavaScript Architecture

`script.js` is organised as a sequence of self-contained IIFEs and function blocks:

```
1.  Page loader (sessionStorage once-only gate)
2.  Touch/pointer detection (isMouse / isTouch)
3.  Custom cursor  — if (isMouse)
4.  Navbar scroll behaviour
5.  Hamburger / mobile nav
6.  IntersectionObserver blocks (with fallback for old browsers):
    - Scroll reveal
    - Skill bar animation
    - Counter animation
    - Cert card stagger
    - Active nav link highlight
7.  triggerHeroReveal()
8.  Smooth scroll
9.  Parallax hero grid  — if (isMouse)
10. Cursor glow  — if (isMouse)
11. Magnetic buttons  — if (isMouse)
12. Skill card 3D tilt  — if (isMouse)
13. Project card spotlight  — if (isMouse)
14. Project modals (open / close / keyboard / backdrop)
15. Hero glitch effect  — if (isMouse)
```

**Key principle:** Everything that uses `mousemove`, `requestAnimationFrame` for cursor tracking, or hover-specific transforms is wrapped in `if (isMouse)`. On phones and tablets none of these loops start — zero wasted CPU cycles.

---

## Cross-Device Compatibility

### What was specifically fixed for mobile/tablet/Safari:

**iOS Safari specifics:**
- `viewport-fit=cover` added so content fills the Dynamic Island / notch area
- `theme-color: #0a0a0a` meta matches the dark background in Safari's browser chrome
- `-webkit-tap-highlight-color: transparent` removes the grey flash on tap
- `touch-action: manipulation` removes the 300ms tap delay
- `-webkit-overflow-scrolling: touch` + `overscroll-behavior: contain` on the mobile nav drawer and modals
- `scrollTo({ behavior: 'smooth' })` has a plain `scrollTo(0, top)` fallback for iOS Safari < 15.4
- `sessionStorage` calls wrapped in `try/catch` (throws in Safari private browsing)
- All `clamp()` values have a plain `font-size` fallback line above them (iOS Safari < 13.4 doesn't support `clamp()`)

**Touch device UX:**
- Custom cursor, cursor glow, card tilt, spotlight, magnetic buttons, parallax — all disabled on `pointer: coarse`
- Project card "View Details" overlay is always slightly visible on touch (opacity: 1 at low alpha) so users know the card is tappable
- All interactive elements have `min-height: 44px` and `min-width: 44px` (Apple / Google touch target guidelines)
- Hamburger button has `min-width: 44px; min-height: 44px` padding

**Cross-browser CSS:**
- `backdrop-filter` has `-webkit-backdrop-filter` prefix everywhere and `@supports not` solid-color fallback
- `max-content` has `-webkit-max-content` fallback for older Safari
- `min()` CSS function has a plain width value fallback above it
- Both `-webkit-background-clip: text` and standard `background-clip: text` are set
- `color: var(--white)` fallback before gradient text clip rules (text visible even without clip support)
- `-webkit-mask-image` and `mask-image` both set on all masked elements

**Accessibility:**
- `@media (prefers-reduced-motion: reduce)` disables all animations and transitions instantly
- All animations set `animation-duration: 0.01ms` under reduced-motion
- `IntersectionObserver` has a full fallback — on unsupported browsers all `.reveal` elements are shown immediately so the page is not invisible

---

## Performance

| Technique | Detail |
|-----------|--------|
| Zero npm dependencies | No node_modules, no bundler, no build time |
| Zero external JS | Only Google Fonts CDN — one `<link>` tag |
| `requestAnimationFrame` loops only on desktop | Mouse-only code never runs on touch devices |
| `passive: true` on all scroll listeners | Eliminates scroll jank warning, improves scroll performance on mobile |
| `IntersectionObserver` for all scroll effects | No scroll event listeners for animations |
| `sessionStorage` loader gate | Loader never runs twice — no 1.7s wait on refresh |
| `will-change: transform` only on `#cursor-glow` | One composited layer for the glow — not applied broadly |
| SVG charts instead of Canvas | Project page charts are inline SVG — no library required, renders instantly |
| Self-contained project pages | No shared JS across pages — each page loads only what it needs |

---

## Accessibility

- Semantic HTML: `<nav>`, `<section>`, `<main>`, `<footer>`, `<h1>`–`<h3>` hierarchy
- All interactive elements are keyboard-focusable
- Modal close button receives `focus()` on open — keyboard navigation works inside modal
- `Escape` key closes any open modal
- `aria-label="Close"` on modal close button
- `aria-hidden="true"` on decorative elements (cursor glow, cursor dot/ring)
- `role="dialog"` and `aria-modal="true"` on project modals
- `@media (prefers-reduced-motion: reduce)` cuts all motion instantly
- Link and button color contrast meets WCAG AA on the dark background

---

## How to Run Locally

No build step required. Just open the files.

**Option 1 — Direct file open:**
```bash
# Clone or download the repo
git clone https://github.com/harshilbhatt/portfolio.git
cd portfolio

# Open in browser — macOS
open index.html

# Open in browser — Windows
start index.html
```

**Option 2 — Local dev server (recommended — avoids browser CORS on fonts):**
```bash
# Using Python
python3 -m http.server 3000
# Then open http://localhost:3000

# Using Node.js (npx)
npx serve .
# Then open the printed URL

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

**Option 3 — VS Code:**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

---

## How to Deploy

The site is pure static HTML/CSS/JS — deployable to any static host.

### GitHub Pages (Free, recommended)

```bash
# 1. Push to a GitHub repo
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main

# 2. Go to repo Settings → Pages → Source: main branch / root
# 3. Your site is live at https://YOUR_USERNAME.github.io
```

### Netlify (Free)

```bash
# Drag and drop the folder to https://app.netlify.com/drop
# Or connect GitHub repo for auto-deploy on every push
```

### Vercel (Free)

```bash
npx vercel
# Follow the prompts — select "Other" for framework
```

### Any web host (cPanel, shared hosting)

Upload all `.html`, `.css`, and `.js` files to the `public_html` folder via FTP. Ensure `index.html` is in the root.

---

## Customisation Guide

### Change your name and details
Edit `index.html` — search for `HARSHIL BHATT`, `Harshil Bhatt`, and `hrbhatt0202@gmail.com`.

### Change the accent color
In `style.css`, update `:root`:
```css
:root {
  --accent:  #c8f135;  /* change to your color */
  --accent2: #a8d420;  /* slightly darker for hover */
}
```
Also update the `cursor-glow` default color and the hero background gradient.

### Add a project
1. Duplicate `project-1.html` → rename to `project-4.html`
2. Add a new card in `index.html` inside `.projects-grid`
3. Add a new modal in `index.html`
4. Add `'4': 'project-4.html'` to the `projectPages` object in `script.js`
5. Add `.project-img-4 { background: ... }` in `style.css`

### Change the ticker text
In `index.html`, edit the `.ticker-track` div — the content is duplicated (first half + second half) to make the loop seamless.

### Remove the loader permanently
In `script.js`, delete the entire `createLoader` IIFE block.

### Disable the cursor glow
In `script.js`, remove the `initCursorGlow` IIFE. In `style.css`, remove the `#cursor-glow` block.

---

## Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome (desktop + Android) | 79+ | Full support |
| Safari (macOS) | 13+ | Full support |
| Safari (iOS) | 13+ | Full support — all specific fixes applied |
| Firefox | 103+ | Full support (`backdrop-filter` added in 103) |
| Edge (Chromium) | 80+ | Full support |
| Samsung Internet | 12+ | Full support |
| Opera | 66+ | Full support |
| Safari iOS < 13 | Partial | `clamp()` not supported — fallback px values used |
| Chrome < 79 | Partial | `clamp()` not supported — fallback px values used |
| IE11 | Not supported | `IntersectionObserver`, CSS Grid, `var()` not supported |

---

## Screenshots

> Add your own screenshots after deployment.

| Page | Screenshot |
|------|-----------|
| Home — Hero | `screenshots/home-hero.png` |
| Home — Projects | `screenshots/home-projects.png` |
| Project 1 — Auth Demo | `screenshots/p1-auth.png` |
| Project 1 — Jobs Demo | `screenshots/p1-jobs.png` |
| Project 2 — EDA Charts | `screenshots/p2-eda.png` |
| Project 2 — Dashboard | `screenshots/p2-dashboard.png` |
| Project 3 — Log Stream | `screenshots/p3-logs.png` |
| Project 3 — CI Pipeline | `screenshots/p3-cicd.png` |
| Mobile — Home | `screenshots/mobile-home.png` |
| Mobile — Project Modal | `screenshots/mobile-modal.png` |

---

## Project Details

### Project 1 — Job Portal with Resume Matching
- **Type:** Full-Stack Web Application
- **Stack:** React + Vite, Node.js, Express, PostgreSQL, Prisma ORM, JWT, bcrypt, multer, pdf-parse, Docker
- **Features:** JWT auth, role-based access (candidate/recruiter), job CRUD, search+filter+pagination, PDF resume upload with magic-byte verification, 150+ IT skill dictionary with word-boundary matching, match_percentage calculated at apply-time, recommended jobs sorted by match, 39 Jest+Supertest tests, 94% coverage, Helmet+CORS+rate-limiting, docker-compose with healthchecks

### Project 2 — Sales Forecasting Dashboard
- **Type:** Data Science / Machine Learning
- **Stack:** Python 3.11, Pandas, Prophet, Statsmodels (ARIMA), Streamlit, Plotly, pytest
- **Dataset:** Superstore Sales (9,994 rows, 2015–2018)
- **Features:** 5 modular cleaning functions, EDA with 6 Plotly charts, Prophet vs Seasonal Naive vs Moving Average comparison, 6.8% MAPE on test set, `forecast(series, months)` API for any category or region, 4-page Streamlit dashboard with shared sidebar filters via `session_state`, in-memory CSV export, 28 pytest tests, 92% coverage, Dockerfile + docker-compose

### Project 3 — Log Monitoring Tool with CI/CD
- **Type:** Cloud & DevOps
- **Stack:** Node.js + Express, Winston, Python + FastAPI, SQLAlchemy, SQLite, Chart.js, Docker, GitHub Actions, AWS EC2
- **Features:** Structured JSON logs (9 fields, Winston daily-rotate-file), `tail -f` async watcher with rotation/truncation detection, 100-line batch insert, safe JSON parser (never throws), dedup by request_id+timestamp, 6 collector API endpoints, 3 alert rules with 10-min cooldown + auto-resolve + `alerts.log`, dark-theme Chart.js dashboard with 5-s auto-refresh, GitHub Actions CI (lint + test + build) and CD (push to GHCR + EC2 SSH deploy + health check), DEPLOYMENT.md for beginners

---

## Author

**Harshil Bhatt**  
B.Sc. Information Technology — Gandhinagar University (2024–2028)  
📧 hrbhatt0202@gmail.com

---

## License

This project is open source under the [MIT License](LICENSE).  
Feel free to fork and customise for your own portfolio — a credit or star is appreciated!
