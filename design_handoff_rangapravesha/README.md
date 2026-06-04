# Handoff: Saanvi's Rangapravesha — Bharatanatyam Arangetram event site

## Overview
A single-page public event website for a Bharatanatyam **Arangetram** (a dancer's
solo stage debut, also called *Rangapravesha*). Guests open it from an invitation —
mostly on phones — to read about the event, browse the 9-piece **Margam** (the
program of dances), follow the dancer's journey, watch a **Live** feed that updates
in real time during the performance, and see the musician/credits team.

The site is celebratory, devotional, and editorial — deep ceremonial maroon and
antique gold over warm ivory, set in classical serif type with Sanskrit (Devanagari)
accents and lotus/kolam line ornaments.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** — a
working prototype that shows the intended look, layout, and behavior. They are
**not production code to ship directly**.

The task is to **recreate this design in the target codebase's environment**,
using its established patterns, component library, and conventions. If there is
no existing app yet, choose an appropriate stack (a static-friendly framework such
as **Astro, Next.js, or plain Vite + React** suits this content-driven single page
well) and implement the design there.

> Note on the attached "FleetDash" design system: it is a dark fleet-management
> dashboard kit and is **deliberately NOT used here** — its utilitarian dark-zinc
> aesthetic is the opposite of what a classical-dance celebration calls for. The
> tokens below are this project's own system. Ignore FleetDash for this build.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, ornaments, and interactions
are final. Recreate the UI faithfully. The only placeholders are:
- **Photos** — drag-and-drop image slots the family fills in (hero portraits, journey photo).
- **Date / venue** — currently "to be announced".
- **Brochure / Invitation PDFs** — cards are present but not yet linked.
- **Live feed** — currently runs a self-cycling demo (see *Interactions*); production
  needs a real data source.

---

## Screens / Views
It is one continuously-scrolling page with a sticky top nav. Sections in order:

### 1. Top nav (sticky)
- **Layout**: `height: 64px`, sticky to top, `z-index: 50`. Translucent page-bg with
  `backdrop-filter: blur(10px)` and a 1px bottom hairline (`--c-line`). Inner row is
  flex space-between inside a `max-width: 1180px` container with `28px` side padding.
- **Left — brand**: `✦` gold star + "Rangapravesha" (Cormorant Garamond, 24px, 600,
  color `--c-maroon`) + small tracked uppercase "Saanvi Lalwani" (Cormorant SC, 12px,
  letter-spacing `.26em`, `--c-ink-soft`).
- **Right — links**: Home · Margam · Journey · Live · Team. Cormorant SC, 15px,
  uppercase, letter-spacing `.14em`, `--c-ink-soft`. Hover → `--c-maroon`. Active link
  gets a 2px gold underline (`::after`, inset 14px L/R, bottom 2px). Active state is
  driven by scrollspy.
- **Mobile (≤820px)**: links collapse behind a hamburger button (42×38px, 1px border,
  `--c-maroon` icon). Open state animates a dropdown panel (`max-height` 0→380px,
  opacity 0→1, 0.35s). Active item gets a faint gold tint background instead of underline.

### 2. Hero (`#home`)
- **Layout**: dark ceremonial block, centered text. Padding `clamp(56px,9vw,104px)` top /
  `clamp(48px,7vw,88px)` bottom. Background is a radial gradient `--c-hero-bg-2 → --c-hero-bg`.
  A faint gold **mandala** of radiating lines sits behind the content via a `::before`
  using `repeating-conic-gradient` (hidden in "minimal" ornament mode).
- **Content stack (top→bottom)**:
  - Eyebrow "Bharatanatyam Arangetram" (Cormorant SC, 14px, letter-spacing `.32em`, `--c-hero-gold`).
  - Devanagari "रंगप्रवेश" (Tiro Devanagari Sanskrit, `clamp(20px,3.4vw,30px)`, `--c-hero-gold`).
  - **H1** "Ranga*pravesha*" — Cormorant Garamond, `clamp(44px,10vw,112px)`, 600, white,
    letter-spacing `-.02em`; the "pravesha" part is italic in `--c-hero-gold`.
  - Subtitle "Kum. Saanvi Lalwani" (Cormorant italic, `clamp(22px,3.4vw,34px)`).
  - Guru line "Disciple of Dr. Raksha Kartik" (Cormorant SC, uppercase, `.2em`, `--c-hero-gold`).
  - **Meta row**: calendar icon + "Date to be announced", a 1px vertical separator, map-pin
    icon + "Venue to be announced". Icons 17px, 1.4 stroke, `--c-hero-gold`.
  - **CTAs**: gold pill "View the Margam" (`.btn-gold`) + outline pill "Live updates"
    (`.btn-outline` with a broadcast icon).
  - **Portrait gallery**: 3-column grid `1fr 1.5fr 1fr`, `gap 16px`, bottom-aligned.
    Center is tall (`clamp(300px,42vw,460px)`), sides short (`clamp(220px,32vw,360px)`).
    Each is an image slot with a 1px gold-tinted border + soft shadow, and an uppercase
    gold caption below ("The Guru", "Kum. Saanvi Lalwani", "With Family"). On ≤720px it
    becomes 2-col with the center portrait spanning full width and ordered first.

### 3. What is an Arangetram (`#about`)
- **Layout**: ivory section. Centered section-head (eyebrow "The Debut Recital" + H2
  "What is an Arangetram?" in `--c-maroon`, `clamp(38px,6vw,68px)`, + a lotus divider).
- **Body**: a single readable column, `max-width: 660px`, ~4 paragraphs at 18px /1.7,
  `--c-ink-soft` with emphasized phrases in `--c-ink`. Final paragraph is italic.
- **Document cards** below: 2-col grid (1-col ≤560px), `max-width 760px`. Each card
  (`.doc-card`): surface bg, 1px line border, `--r-md` (12px) radius, 22×24px padding,
  flex row with a 48px gold-tinted icon tile + title (Cormorant 22px) + italic subtitle.
  Hover lifts `-2px`, border → gold, soft maroon shadow. → "Event Brochure", "Invitation".

### 4. The Margam (`#margam`) — primary content
- **Layout**: alt (slightly deeper ivory) section. Section-head: eyebrow "The Programme",
  H2 "The Margam", lead "Nine pieces, in the traditional order — from invocation to
  benediction. Tap any piece to read its meaning."
- **Accordion**: a top-bordered list; each of the 9 pieces is an `.acc-item` with a
  bottom hairline.
  - **Header row** (`.acc-head`, full-width button): big gold serif number ("01"–"09",
    `clamp(28px,4vw,44px)`, `--c-gold`) · title block (title Cormorant `clamp(22px,3.2vw,32px)`
    600, then italic meta line "{kind} · {raga/tala/composer}" 15px `--c-ink-soft`) ·
    a 34px circular "+" icon button that **rotates 45° to ×** and gold-tints when open.
  - **Body** (`.acc-body`): animates `max-height` 0 ↔ content over 0.5s. Inner content is
    indented to align under the title (`padding-left: calc(1.6em + 18px + 8px)`), paragraphs
    16px `--c-ink-soft`. Some pieces include a **sahityam** block — a gold left-border quote
    with a Devanagari/transliteration line (`--c-maroon`) + italic gloss — and `.subhead`
    mini-labels (uppercase gold tracked).
  - All copy is in `data.js` (`window.MARGAM`).

### 5. The Journey (`#journey`)
- **Layout**: 2-col grid `0.9fr 1.1fr`, `gap clamp(28px,5vw,64px)`, vertically centered
  (stacks to 1-col ≤780px). Left: a tall image slot (`clamp(320px,46vw,520px)`) with line
  border + maroon shadow. Right: text — first paragraph has a serif **drop-cap** (`::first-letter`,
  76px, `--c-maroon`, floated), 19px body.
- **Stats row**: three items "8+ / Years of training", "9 / Pieces in the Margam",
  "1 / Unforgettable evening". Number is Cormorant 46px gold; label is Cormorant SC 12px
  uppercase tracked `--c-ink-soft`.

### 6. Live (`#live`)
- **Layout**: dark ceremonial block (same radial bg as hero). Section-head H2 "Live" in
  white, eyebrow "On Stage Now", gold lead "Updates appear here in real time during the
  performance."
- **Live card** (`.live-card`, `max-width 620px`, centered, 1px gold-tint border, `--r-lg`
  20px radius, faint white-3% fill):
  - "Live" badge with a **pulsing red dot** (`@keyframes pulse`, expanding box-shadow ring,
    1.8s; disabled under reduced-motion).
  - `liveNow` — small uppercase gold status ("Welcome" / "Now performing · 03").
  - `liveTitle` — big white Cormorant `clamp(32px,6vw,52px)` (the piece title).
  - `liveMeta` — italic gold-fg detail line.
  - **Progress dots** — one 22×4px pill per Margam piece; done = solid gold, current = red.
  - Italic hint "This page updates itself — no need to refresh."

### 7. The Team (`#team`)
- **Layout**: alt section. Section-head: eyebrow "The Ensemble", H2 "The Team", lead about
  the live orchestra.
- **Ensemble grid**: 3-col (2-col ≤760px, 1-col ≤460px), `gap 16px`. Each `.team-card`:
  surface bg, line border, `--r-md`, 24px padding; role (Cormorant SC 12px uppercase gold
  tracked) + name (Cormorant 23px); some have an italic honorific sub-line. Hover lifts/golds.
- **Credits**: centered "Credits & Acknowledgements" H3 + lotus divider, then a responsive
  grid (`auto-fit minmax(190px,1fr)`) of role/name pairs separated by top hairlines.

### 8. Footer
- Maroon-deep block, centered. Devanagari "शुभमस्तु" in gold, an italic gratitude line,
  and a small tracked credit line.

---

## Interactions & Behavior
- **Scrollspy**: an `IntersectionObserver` (`rootMargin: -45% 0 -50%`) marks the nav link
  for the section nearest mid-viewport as `.active`.
- **Mobile menu**: hamburger toggles `.menu-open` on the nav; clicking any link closes it.
- **Accordion**: click toggles `.open`. Open = measure `scrollHeight`, animate `max-height`
  to it, then set `max-height: none` on `transitionend` (so it reflows). Close = set explicit
  height, then `0` next frame. Multiple items may be open at once.
- **Scroll reveal**: elements get `.reveal` then `.in` via an `IntersectionObserver`
  (translateY 22px + fade, 0.7s). Disabled under `prefers-reduced-motion`.
- **Live feed (DEMO)**: `app.js` cycles a `steps` array (Welcome → each of 9 pieces →
  Thank you) every 4.2s, cross-fading the text and advancing the progress dots.
  **For production**: replace this interval with a real data source — e.g. poll a small
  JSON endpoint or subscribe via WebSocket/SSE that an operator updates from backstage
  ("current step index"). The render function (`renderLive`) can stay; just feed it remote state.
- **Doc cards**: currently a no-op "nudge" on click — wire to real PDF URLs.
- **Hover**: cards lift `-2px` with border→gold; buttons shift fill/shadow; all transitions
  use `--ease: cubic-bezier(.22,.61,.36,1)`, ~0.22s.
- **Responsive breakpoints**: 820 (nav), 780 (journey), 760 (team→2col), 720 (hero gallery),
  600 (accordion), 560 (doc cards), 460 (team→1col).

## State Management
Minimal — this is a content site. State needed:
- `liveState` — current step index for the Live feed (the only truly dynamic data; from a
  remote source in production).
- Nav: `activeSection` (scrollspy) and `menuOpen` (mobile).
- Accordion: open/closed per item (local).
- Photos & event details (date, venue, PDF links, photo URLs) are **content**, best pulled
  from a CMS or a config/data file rather than hard-coded — see `data.js` as the content model.

## Design Tokens
Defined as CSS custom properties in `styles.css`. Light "Temple" palette is default;
`html.is-dark` provides a cinematic dark variant (the prototype also ships alternate
palettes via the Tweaks panel — see `tweaks.jsx`; treat those as optional themes).

**Colors — surfaces**
- `--c-bg` #f7efe0 (warm ivory page) · `--c-bg-2` #f1e6d2 (deeper ivory band) · `--c-surface` #fffaf1 (card/paper)
- `--c-ink` #3a241c (text) · `--c-ink-soft` #6f5848 (secondary) · `--c-line` #e0d0b3 (hairline)

**Colors — ceremonial**
- `--c-maroon` #6e1023 · `--c-maroon-deep` #2c0810
- `--c-gold` #b6862c · `--c-gold-soft` #d6ab57 · `--c-gold-bright` #e9c873 · `--c-accent` #b5532e (vermillion)

**Colors — hero/live dark block**
- `--c-hero-bg` #2c0810 · `--c-hero-bg-2` #4a0f1d · `--c-hero-fg` #f4e3c4 · `--c-hero-gold` #e3bd6a
- Live "now" dot red: #e0563f

**Typography** (Google Fonts)
- Display headings: **Cormorant Garamond** (`--font-display`)
- Body: **Spectral** (`--font-body`), 18px /1.7 base
- Tracked uppercase labels: **Cormorant SC** (`--font-label`)
- Sanskrit/Devanagari: **Tiro Devanagari Sanskrit** (`--font-deva`)
- (Alt theme fonts available: Marcellus, Playfair Display, EB Garamond)

**Radius**: `--r-sm` 6px · `--r-md` 12px · `--r-lg` 20px · pills 999px
**Layout**: `--maxw` 1180px (page) · `--readw` 660px (reading column) · `--nav-h` 64px
**Easing**: `--ease` cubic-bezier(.22,.61,.36,1)
**Section padding**: `clamp(64px, 9vw, 116px)` top/bottom

## Assets
- **Fonts**: Google Fonts — Cormorant Garamond, Cormorant SC, Spectral, Tiro Devanagari
  Sanskrit (+ Marcellus, Playfair Display, EB Garamond for alt themes). Self-host in production.
- **Icons**: inline SVG (calendar, map-pin, broadcast, plus, file, hamburger, lotus divider).
  Stroke-based; swap for the codebase's icon set (e.g. Lucide) keeping the lotus as a custom SVG.
- **Lotus / mandala / kolam ornaments**: pure CSS + inline SVG — no image files.
- **Photos**: NONE included — the family supplies hero portraits + a journey photo. The
  prototype uses `image-slot.js` (drag-and-drop placeholders); in production these become
  normal `<img>`/`<picture>` from a CMS or asset folder.

## Files
In this bundle (under `design_handoff_rangapravesha/`):
- `index.html` — page structure / markup
- `styles.css` — the full visual system (all tokens + every component)
- `app.js` — rendering of Margam/team from data, accordion, scrollspy, mobile menu,
  scroll reveal, and the Live demo loop
- `data.js` — **content model**: `window.MARGAM` (9 pieces w/ raga/tala/composer + descriptions +
  sahityam), `window.ENSEMBLE`, `window.CREDITS`
- `tweaks.jsx` / `tweaks-panel.jsx` — the optional in-prototype theme switcher (palette,
  fonts, ornament density). **Not part of the public site** — reference only, for the
  alternate palettes.
- `image-slot.js` — the drag-drop photo placeholder used in the prototype (replace with real images)

Open `index.html` in a browser to see the working reference.
