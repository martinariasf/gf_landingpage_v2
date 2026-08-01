# gfinnov.com — Impeccable critique, pass 2

**Method:** dual-agent (A: design review `a8430598aa42a2562` · B: detector + browser evidence `a2ae8ce1aaeff8301`)
**Date:** 2026-08-01
**Branch:** `fix/impeccable-pass-2026-08-01` (commits `65d4364`, `9507c7b`)
**Surface mode:** Persuade (lead generation)

---

## Scores

| | Pass 1 | Pass 2 (as re-run) | After the post-run fixes |
|---|---|---|---|
| **Design Health** (Nielsen) | 17/36 · 47.2% | **19/40 · 47.5%** | unchanged — the remaining gap is structural, not craft |
| **Audit Health** (technical) | 8/20 | **10/20** | ~15/20 on the measured dimensions |

**The honest headline: the craft score barely moved, and that is the finding.**
Pass 1's failures were not craft failures. Contrast, focus rings, tap targets, reduced motion, heading order, meta tags and image weight were all fixed and verified — and the score moved 0.3 points, because what actually holds this site back is *structure, positioning and system*, and those are untouched.

---

## What the re-run verified as fixed

Measured across all 15 pages, with `body{overflow-x:hidden}` forcibly unmasked so nothing is concealed:

| Check | Before | After |
|---|---|---|
| Horizontal overflow at 375px | 3 pages | **0** |
| Contrast failures (solid grounds) | dozens per page | **0** |
| Heading-level skips | 6+ | **0** |
| Images missing `alt` | 0 | **0** (57 images) |
| Images missing intrinsic dimensions | 45 | **0** |
| Controls without accessible name | 0 | **0** (225 controls) |
| Form inputs without a label | 15 | **0** |
| Tap targets under 24×24 | 19 / 5 / 7 per page | **0** (1 honeypot field excluded) |
| Skip link | 0 pages | **15/15** |
| `:focus-visible` rules | 0 | present in all 5 stylesheets |
| `prefers-reduced-motion` | 0 | all 5 stylesheets, all 10 infinite animations guarded |
| Meta description / canonical / og / twitter | 0/15 | **15/15** |
| `console.*` in shipped JS | 52 | **0** |
| Dead nav anchors | 5 pages | **0** |

Weight: `vr_website.html` **51.28 MB → 1.36 MB**. `startups.html` background 1.87 MB → 76 KB. Homepage images 780 KB → 102 KB. The two new platform reels add 3.8 MB that never downloads until a visitor presses play.

---

## What pass 1 missed, and pass 2 fixed

Three findings were real misses, not new regressions:

1. **`styles.css` set `h1..h6 { color: var(--primary-blue) }` — a token named *blue* holding `#8cbe7d`, a green — at ~2.1:1 on white.** That governed every heading on ten pages, including `pilot.html`, the destination of the homepage hero's own CTA. Pass 1 recoloured a handful of individual spots and never touched the base rule.
2. **Both brand greens failed in *both* directions** — 2.15:1 as text on white, 2.12:1 as a ground under white text — and the codebase uses them for both jobs. Fixed at the token (`#3f6d35` / `#4a7a40`, same hue, 5.07:1 either way), with `--brand-green-light` retaining the original tint for decoration that carries no text.
3. **The accessibility fixes were applied to `index.html` and not propagated.** The cookie-consent labels, lazy loading, intrinsic dimensions and the logo-anchor fix each existed in one copy of three.

Also fixed after the re-run: 52 MB of GIFs → 1.2 MB of H.264 with a reduced-motion handler; `openclawd-agents.html`'s 4px overflow (masked, not fixed, by `overflow-x:hidden`); 15 unlabelled form inputs.

---

## What is still open — these need your decision, not more code

### [P0] The product section describes a calendar the visitor never sees

`#platform` promises "Alle Posts eines Kunden liegen in einem Content-Kalender", then shows a WhatsApp mockup reel and an abstract launch ad ending on a slogan. `grep -c "<img"` inside the section returns **0**. There is no link to `marketing.gfinnov.com` anywhere in the repo.

An agency owner evaluating a content tool has one question — *what does this look like when my client opens it?* — and the section answers it with a motion graphic.

**What I need from you:** a screenshot or screen recording of the actual calendar / client-approval view. I can wire it in immediately. Reel 1 (chat → post) earns its place; reel 2 is advertising the product to someone already reading the product page.

### [P0] The conversion path switches from `Sie` to `du` mid-click

The homepage is formal throughout. `index.html` breaks it in the pilot band ("**Teste** unsere KI-Marketing-Plattform … für **dein** Feedback"), and `pilot.html` is informal throughout — 10 `du`/`dein`/`dir` strings against 1 `Sie`.

In German B2B this is not a style preference. A reader addressed as `Sie` for 10,000px and then as `du` at the point of application concludes the page was written for someone else.

**Decision:** formal everywhere, or informal everywhere for the agency audience? Either is defensible; the current state is neither.

### [P1] Two design systems survived both passes

The homepage is Inter with its own inline token set. Every other page is Montserrat + `styles.css`. The hero's own secondary CTA — "Für den Piloten bewerben" → `pilot.html` — changes typeface, green, nav, and language-toggle format in one click.

I unified the tokens' *contrast behaviour* and the nav structure, but merging the two systems properly is a half-day refactor that changes how ten pages look. **Not something to do without you seeing it first.**

### [P1] The product is buried

`#platform` starts at 4,207px on desktop, 7,187px on mobile — behind two self-description sections. Meanwhile the hero already asks visitors to apply for the pilot, 4,000px before it is explained. The homepage runs 12 sections; About, "Was uns unterscheidet", Trust and Ethics say versions of the same four things.

**Recommendation:** move `#platform` directly after the hero and merge About + "Was uns unterscheidet". Say the word and I'll do it.

### [P1] No persistent CTA on mobile

The nav CTA is inside `.nav-menu`, which is `display:none` under 920px. Between the hero buttons and the platform CTA there is no visible call to action for roughly 9,000px. A sticky bottom bar is the standard fix.

### [P2] Proof

Two testimonials, one first-name-only, one anonymous. Zero named clients, zero logos, zero numbers on the homepage — while `pilot.html` contains the best sentence on the site, *"From ~4.5 hours to ~12 minutes per cycle"*, which appears nowhere on the homepage.

---

## Judgement calls I made, flag them if you disagree

- **Kept** the pulsing green dot on `openclawd-agents.html`. The detector flags it as a "dark glow"; it is a literal status LED next to "workforce active", which is an established convention. I softened it (0.95 → 0.55 alpha) and stopped the pulse under reduced motion. The detector still flags it.
- **Deleted** the three "COMING SOON" Resources cards rather than keeping placeholder content in prime scroll position. `resources.html` is now linked from the footer.
- **Deleted** the tier accordions and put the real Process Screening prices (free / from €1,000 / from €1,600) on the homepage card, since those numbers are already public on `process-screening.html`.
- **Did not delete** 57 MB of now-unreferenced source assets (the original GIFs, `background_consulting_4.png`, the old logos). They cost visitors nothing — they are not downloaded — so this is repo hygiene, and removing source files is your call.
- **Left** the `ai-agents-workshop/` directory alone; it was outside the audited set.

---

## Detector state

`detect.mjs` over 15 files: 25 findings, 24 warnings + 1 advisory. The dominant rule is `overused-font` (15 hits) — Inter and Montserrat are both on the tool's overused list. That is the same "two typefaces" finding as the design review's "two design systems", seen from the other end, and it resolves when the systems merge.

One verified false positive: `flat-type-hierarchy` on `vr_website.html:269` reads three inline `font-size` values and cannot see the external 2:1 type scale in `styles-vr.css:42-44`.

---

Re-run `/impeccable critique` after the structural decisions land.
