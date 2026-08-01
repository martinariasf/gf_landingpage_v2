# gfinnov.com — Design Critique & Suggested Changes

**Method:** dual-agent (A: design review `a547524abe761b655` · B: detector + browser evidence `a051d8867c6588739`)
**Date:** 2026-08-01
**Target:** `C:\Users\Admin\Documents\GitHub\gf_landingpage_v2` — live at https://www.gfinnov.com
**Surface mode:** Persuade (lead generation — book a call / apply to the pilot)

> ⚠️ **Read this first.** The deployed site is **ahead of this repo** on at least three pages (`index.html` live 86,397 B vs repo 84,967 B; `openclawd-agents.html` 22,235 vs 14,464; `webinar.html` 19,310 vs 16,092). Production has a Pilot section and `pilot.html`; the repo's `index.html` still has a Webinar nav link and no Pilot section. **Reconcile the working tree with production before applying any fix below**, or you will re-introduce deleted content. Line numbers cited are from the repo copy.

---

## Scores

### Design Health (Nielsen, 0–4 each)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | No nav active/scroll-spy state; `.accordion-toggle` (`index.html:1060`) is a `<button>` with no `aria-expanded`/`aria-controls`; every Calendly CTA is `target="_blank"` with no outbound indication |
| 2 | Match system / real world | 2 | "OpenClawd", "n8n", "VPS", "MVP", "Fractional CTO" aimed at a 4–50-person Mittelstand ops lead; English-first page served under `<html lang="de">` |
| 3 | User control and freedom | 3 | Lang toggle, hamburger auto-close and cookie "Customize" all work — but the lang toggle lives inside `.nav-menu`, which is `display:none` under 920px (`index.html:896`), so it is unreachable on mobile without opening the burger |
| 4 | Consistency and standards | 1 | Three design systems, three accent colours, three i18n engines with opposite defaults, **four** nav variants, one dead anchor shipped on 5 pages |
| 5 | Error prevention | 2 | Three "COMING SOON" cards styled as live content; the dead anchor fails silently; "Get a quote" → `#contact` lands on a tab widget, not a form |
| 6 | Recognition over recall | 2 | The free offer has three names — "Free AI Assessment", "Express (free AI scan)", "Process Screening Express (€0)" |
| 7 | Flexibility and efficiency | n/a | Single-visit persuade surface; no repeat-use workflow to accelerate |
| 8 | Aesthetic and minimalist | 1 | 12 sections, 16,379px scroll height, ~30 emoji icons, 5 fictional AI employees, an Ethics section, and a Resources section containing nothing |
| 9 | Error recovery | 2 | Few error surfaces exist, but the ones that do (dead anchor, empty accordions) fail without feedback |
| 10 | Help and documentation | 2 | `how-we-work.html`, `use-cases.html`, `resources.html` are genuinely good explainers — and **orphaned**; `index.html` links to none of them |
| **Total** | | **17 / 36** | **47% — Poor** (borderline Acceptable) |

Heuristic 7 scored `n/a` and the maximum renormalized to 36.

### Audit Health (technical, 0–4 each)

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2 | Alt text, link/button names and single-`h1` are clean — but 6 heading-level skips, 2 unlabeled cookie inputs, a 28×20px hamburger among 19 sub-44px targets, and **zero** `:focus`/`:focus-visible` rules, skip links, or `prefers-reduced-motion` guards site-wide |
| 2 | Performance | 2 | gzip on, zero 404s, zero console errors — but `startups.html` ships a **1.87 MB PNG** (2.3 MB page), the shared logo is a 227 KB PNG, and `loading="lazy"` + `width`/`height` appear **0 times across 12 files** |
| 3 | Responsive | 2 | Homepage and `how-we-work.html` clean at 375px; `startups.html` overflows **16px**; `startup-styles.css` has 2 breakpoints, `index.html` has 1 |
| 4 | Theming | 1 | Three disconnected token systems; `startup-styles.css:1-15` is a verbatim copy of `styles.css:1-15`; `index.html` defines a fourth, wholly different 16-token palette inline with ~20 hard-coded hexes outside it |
| 5 | Implementation integrity | 1 | Dead nav anchor on 5 pages, 4 incompatible nav variants, 31 `console.log` calls in production, live/source drift |
| **Total** | | **8 / 20** | **Poor — major overhaul** |

---

## Design Specificity Verdict

**This is not one site. It is three sites wearing the same logo, and none of them was authored for this product.**

**LLM assessment.** The homepage is a competent but wholly category-interchangeable "AI agency" template: gradient hero → About → What Makes Us Different → Services grid → Trust badges → Team → Testimonials → CTA. Swap "AI agents" for "Salesforce migrations" and not one layout decision would need to change. The identity markers are all emoji (🤝 🚀 🌍 🛡️ 🔒 📊 ⚖️ ✅ 🤖 ⚙️) — the signature of a page where nobody commissioned an asset. The one genuinely product-specific thing on the page, OpenClawd, is rendered in the exact same card as "VR & Trade Fair Solutions", so the thing GF actually builds looks identical to the thing GF does on the side.

The homepage *copy* is specific — "companies of 4–50 people", "results from month one", "AVV signed before any engagement". Somebody who understands this business wrote those words. Nobody then designed a page around them. The design is a container that copy was poured into.

**Deterministic scan.** `detect.mjs` over 10 markup files: **exit 2, 14 findings, all `warning`, 0 false positives** (every cited line verified).

| Count | Rule | Location |
|---|---|---|
| 10 | `overused-font` | `index.html:8` (Inter) + 9 pages (Montserrat) — **the site loads two different typefaces** |
| 1 | `side-tab` | `index.html:663` — `.testimonial-card { border-left: 3px solid var(--green) }` |
| 1 | `dark-glow` | `index.html:104` — `.btn-primary:hover { box-shadow: 0 8px 24px rgba(34,197,94,.25) }` |
| 1 | `layout-transition` | `index.html:441` — `.accordion-body { transition: max-height .4s }` |
| 1 | `marketing-buzzword` | `index.html:974` — "frontier AI with enterprise-grade security" |

Where the two assessments converge is the important part: the detector's "two typefaces" finding and the design review's "three design systems" verdict are **the same defect seen from two ends**. That is the headline problem on this property.

**Visual overlays:** not available. The screenshot/injection path failed in the sub-agent context (`the Browser pane is not displayed, so the page is not compositing frames`). Substituted with live `getBoundingClientRect()` measurements, which give exact pixel offenders instead of an image. Contrast ratios below are computed from source colour values, **not** measured from a rendered composite.

---

## Overall Impression

The copy is doing all the lifting; the structure is actively leaking. There is real authorial judgment in exactly one place — the Trust & Compliance section — and it is buried under 16,379px of undifferentiated scroll. Meanwhile GF's core sales claim is *"we don't just advise, we implement"*, and the site is a live counter-demo of that claim: three design systems, three language engines with conflicting defaults, four nav variants, a dead anchor on five pages, and three orphaned pages that are better than most of what's linked.

**Single biggest opportunity:** unify the visual system and the navigation into one, then delete half the homepage. Everything else on this list is downstream of those two moves.

---

## What's Working

1. **The Trust & Compliance section (`index.html#trust`)** — every claim is *contractual, not adjectival*: "AVV signed before any engagement", "IP transfers to you on full payment", "30–60 day cancellation", "4h critical response". These are commitments a lawyer could enforce, not vibes, and they answer the exact four objections a German SME raises, in the order they raise them.
2. **The hero's segment gate** — "companies of 4–50 people" disqualifies the wrong reader in the first eight words. Most agency sites are terrified of narrowing; this one commits, and pairs it with the buyer's actual felt constraint ("no internal dev team required").
3. **Real accountability surface** — Stuttgart street address, phone number, `imprint.html`, named team members with individual bios. Anonymous AI consultancies are the norm; being findable is a genuine differentiator in DE.
4. **Clean technical baseline where it counts** — 0 console errors, 0 404s, gzip on, 12/12 images with alt text, 12/12 with a viewport meta, one `<h1>` per page, testimonials using real `<blockquote>`/`<cite>`.

---

## Priority Issues

### [P0] The cookie banner buries both hero CTAs on mobile

**Location:** `#cookie-banner`, `index.html:1470-1485`; hero media query `index.html:896-920`

**Measured live at 375×812:** `#cookie-banner` occupies y 564→812 at `z-index:9999`. `.hero .btn-primary` ("Book Free AI Assessment") sits at 555→608 and `.btn-ghost` ("Apply for the Pilot") at 624→680. **Both primary conversion targets are fully occluded on every first mobile visit.**

**Why it matters:** Mobile is where a Mittelstand decision-maker opens a LinkedIn link. The most expensive pixels on the property are covered at first paint, and the user's first action is forced to be a compliance chore instead of an intent signal.

**Fix:** Restyle `#cookie-banner` to a compact bottom bar — `max-height:96px`, two buttons inline, "Customize" as a text link — and add `.hero { padding-bottom:120px }` inside the `@media (max-width:920px)` block. Shrink the banner; do not raise the CTAs above it.

**Suggested command:** `/impeccable adapt`

---

### [P0] Three design systems, four navs, three i18n engines, one dead anchor

**Locations:**
- `index.html:16-923` — self-contained inline `<style>`, **no external stylesheet at all**: Inter, `--green:#22c55e`, `--teal:#14b8a6`, 16px radii, 16 tokens
- `styles.css:1-15` — Montserrat, `--primary-blue:#8cbe7d` (a variable named *blue* holding *green*), `--innovation-green:#8BC07C`, 8px radii, 13 tokens
- `startup-styles.css:1-15` — **byte-identical copy** of `styles.css:1-15`, no shared import; `startups.html` then renders its hero CTA in `rgb(37,99,235)`, a third accent used nowhere else
- Three localStorage language keys coexist live: `site-lang=en`, `preferred-language=de`, `gf-pilot:lang=es`. Console on load: `No saved preference, defaulting to German`. Result: the homepage renders EN and `how-we-work.html` renders DE **in the same session**
- `how-we-work.html:24` (and 4 other pages) → `index.html#digital-workers`. The homepage id is `digital-team`. `grep` of `index.html` ids returns: `about, contact, digital-team, home, resources, services, team`. **Five pages ship a dead nav link.**
- Four nav variants total: A `index.html` · B the five explainer pages · C `webinar.html` (two adjacent links both pointing at bare `index.html`) · D `startups.html` · E `imprint`/`privacy` (logo only)
- `how-we-work.html`, `use-cases.html` and `resources.html` are linked from **nothing** in `index.html`
- The site has two different "Resources" destinations depending on which page you're on: `#resources` (in-page) vs `resources.html`

**Why it matters:** This is the single largest trust leak on the property, and it is invisible to anyone who only ships from the homepage. A prospect evaluating "can these people build software" has the answer rendered in front of them.

**Fix:**
1. Extract `index.html:16-923` into a shared `gf.css`; make its `:root` the single source of truth. Alias `--primary-blue`/`--innovation-green` in `styles.css:3-4` to the new tokens and stop using the misleading names.
2. Delete the duplicated `:root` in `startup-styles.css:1-15`; import the shared file.
3. Pick **one** typeface. Inter and Montserrat are both on the detector's overused list — a deliberate pairing (one display, one text) beats either default.
4. Extract the nav (`index.html:926-948`) into one partial used on every page. Add How We Work + Use Cases to it.
5. Delete the legacy language engine (`script.js:2, 167-238, 444-462`); reuse the inline toggle from `index.html:1608-1636` everywhere, keyed to `site-lang`.
6. Fix `how-we-work.html:24` → `#digital-team` (and the four sibling pages).

**Suggested command:** `/impeccable extract`, then `/impeccable harden`

---

### [P1] "Full pricing transparency" that shows zero prices

**Location:** `index.html:1075-1078` (the promise), `:1078-1093` (the delivery), `.tier-table` styles at `:444-460`, table instances at `:1062, :1080, :1103`

The copy promises "full pricing transparency". The accordion opens onto a `<table>` with a single `<th>Tier</th>` column and seven rows of tier *names*. `.tier-table` has no price-column styling at all — the column was never built, not merely emptied.

**Why it matters:** A German SME buyer's first unspoken question is what this costs. The page raises the question, opens a disclosure promising the answer, and hands back a glossary. That reads as evasive, and the promise and the reveal are eight pixels apart.

**Fix:** Add a second column with "ab €X" / "auf Anfrage" values to all four table instances. If prices genuinely aren't fixed, **delete the accordions** and replace with one line: "Projects start at €X. Free assessment first." A table is a promise of numbers; don't render one without them.

**Suggested command:** `/impeccable clarify`

---

### [P1] The primary CTA is among the lowest-contrast elements on the page — and it sits on a green background

**Locations:** `.btn-primary` `index.html:96-99` · hero gradient `:206` · `.hero-label` `:222-229` · `.section-tag` `:41-49` · `--gray-dim`

| Element | Colours | Approx ratio |
|---|---|---|
| `.btn-primary` | white on `#22c55e` | ~2.1:1 ❌ |
| `.hero-label` | `#22c55e` on `#1560B2` | ~3.1:1 ❌ |
| `.section-tag` | `#14b8a6` on white | ~2.8:1 ❌ |
| `--gray-dim` `#9ca3af` @12px | on white | ~2.4:1 ❌ |

In the hero the button sits on a gradient whose right terminus is `#8ECD8A` — green button on a green field.

**Why it matters:** WCAG AA (1.4.3) fails, but the bigger issue is commercial: a CTA that doesn't visually detach from its background doesn't get scanned. Every text colour on this site except `#1a1a1a` fails AA, and the worst offender is the button the business depends on.

**Fix:** Darken `--green` to `#15803d` (≈5.1:1 on white) at `index.html:22`; keep `#22c55e` for hover/accent fills only. In the hero, either flip `.hero .btn-primary` to a solid white background with `#15803d` text, or flatten the gradient's green terminus (`:206`) to blue-only. Bump `--gray-dim` → `#6b7280` and `--gray` → `#4b5563`. Ratios above are computed, not measured — verify with a contrast checker after the change.

**Suggested command:** `/impeccable colorize`

---

### [P1] Accessibility floor: no focus styles, no skip links, no reduced-motion

**Measured across the live site:**
- **Zero `:focus` or `:focus-visible` rules** in `styles.css`, `startup-styles.css`, or `index.html`'s inline block (`grep -c` = 0, 0, 0). Only the UA default ring exists — and it's invisible against several backgrounds.
- **Zero skip links** on any page.
- **Zero `prefers-reduced-motion`** occurrences anywhere, while 4 infinite animations run unguarded: `styles.css:547` `pulse 4s infinite`, `startup-styles.css:305` `rocket-pulse 3s infinite`, `:326` `orbit 10s linear infinite`, `index.html:239` `underlineGrow 2s infinite alternate`.
- **19 / 5 / 7 sub-44px touch targets** on `/`, `/how-we-work.html`, `/startups.html`. Worst: `button.nav-hamburger` at **28×20px** — the only navigation control on mobile.
- **2 unlabeled form inputs**: the cookie-consent toggles at `index.html:1505` and `:1512` — bare `<input type="checkbox">` inside `<div class="switch">`, no `<label>`, no `aria-label`.
- **6 heading-level skips** (`h2→h4`) across the three pages checked.
- `<html lang="de">` in all 12 source files, while JS mutates the homepage to `en` at runtime. Screen readers get German phonemes over English copy until JS lands.

**Why it matters:** Keyboard-only and screen-reader users cannot see where they are on this site. WCAG 2.4.7 (focus visible), 2.4.1 (bypass blocks), 2.5.5 (target size), 1.3.1 (info & relationships), 3.1.1 (language of page) all fail. For a company selling compliance-grade AI to German firms, an inaccessible site is a positioning problem as much as a legal one.

**Fix:** Add a global `:focus-visible { outline: 2px solid var(--green); outline-offset: 2px }`; add a skip link to each page; wrap the four infinite animations in `@media (prefers-reduced-motion: no-preference)`; raise `.nav-hamburger` to 44×44 with padding; label both cookie toggles; fix `h2→h4` jumps to `h3`; set `lang` server-side to match the rendered language.

**Suggested command:** `/impeccable harden`

---

### [P1] `startups.html` ships a 1.87 MB background and overflows on mobile

**Location:** `startups.html:76` (`background:url()`), `.growth-box` at `startup-styles.css:408-420`, positioned by `startup-script.js`

- `images/background_consulting_4.png` = **1,865,769 B**. Page total **2,311,307 B** — 5.4× the next heaviest page.
- `document.documentElement.scrollWidth` = **391 vs 375** clientWidth. Root cause: five `.growth-box` elements, `position:absolute`, `left` set as a percentage, each computed 220px wide. The fifth ("Skalierungsstrategie") lands at left 170 → right 390, **15px past the viewport**. The nav and cookie banner measuring 391 are consequences, not causes.
- Site-wide: `loading="lazy"` appears **0 times in 12 files**; `width`/`height` on `<img>` appears **0 times in 12 files** → unmitigated CLS everywhere. All assets are PNG/JPG, no WebP/AVIF. `gf-logo-white.png` is **227 KB** and loads on 10 pages. `background_consulting_3.png` (283 KB) is committed but referenced nowhere.
- `startups.html` is the one page with **no favicon**.

**Fix:** Convert `background_consulting_4.png` to WebP at display size (expect ~150 KB); convert both logos to SVG; add `loading="lazy"` + intrinsic `width`/`height` to every `<img>`; give `.growth-box` a width-aware clamp or stack them vertically under 768px; delete the unreferenced PNG; add the favicon link to `startups.html`.

**Suggested command:** `/impeccable optimize`, then `/impeccable adapt`

---

### [P2] A Resources section that contains no resources

**Location:** `index.html#resources` + nav link at `index.html:938`

Three cards, each stamped "COMING SOON", consuming a full 100px-padded section between Services and Trust — the exact scroll position where a prospect looks for evidence you've done this before. Meanwhile a real `resources.html` exists and is linked from nowhere on the homepage.

**Fix:** Delete the section and the nav link; point the nav at `resources.html`. If it must stay, collapse to one line with email capture: "Templates and toolkits, shipping Q4. Get notified."

**Suggested command:** `/impeccable distill`

---

### [P2] 31 `console.log` statements running in production

`script.js` 23, `startup-script.js` 8. Live output includes `Initializing website...`, `Found growth boxes: 0`, `Found modal: No`, `Box 1 has data-step: startup-clarity`.

The `Found growth boxes: 0` → `Found growth boxes: 5` sequence reveals that **both `script.js` and `startup-script.js` execute on `startups.html`**; the first one's journey initializer no-ops against elements it doesn't own. Strip the logs and stop loading `script.js` on `startups.html`.

**Suggested command:** `/impeccable harden`

---

### [P2] No meta description, no social cards, no canonical — on any page

| Tag | Pages having it (of 12) |
|---|---|
| `<title>` | 12 ✓ (all distinct) |
| `meta name="description"` | **0** |
| `og:*` | **0** |
| `twitter:*` | **0** |
| `rel="canonical"` | **0** |
| `rel="icon"` | 11 (`startups.html` missing) |

Every link to gfinnov.com shared in LinkedIn, WhatsApp or email renders as a bare URL with no image, no title card, no description — for a company whose lead flow runs through exactly those channels. Google writes its own snippet from whatever it finds.

**Suggested command:** `/impeccable harden`

---

## Emotional Journey

- **Opening peak (genuine).** "Your first AI team without the hiring cost" + "4–50 people" + "from month one" is a strong three-beat. A 30-person Mittelstand owner reads that and feels seen.
- **First valley — Services.** "Full pricing transparency" → a table of names with no numbers. The promise and its contradiction are eight pixels apart.
- **Deepest valley — Resources.** Three "COMING SOON" badges, placed *before* Trust, Team and the closing CTA, so the doubt poisons everything downstream.
- **Second valley — Testimonials.** Two quotes: one first name ("Ira, Startup Founder"), one anonymous ("Client from Manufacturing Sector"). At the moment the page most needs proof, the anonymity implies the client wouldn't lend their name.
- **Recovery — Trust & Compliance.** The strongest section on the site. It should be the emotional peak and it's positioned as a footnote.
- **Flat ending.** The final CTA (`index.html:1418-1434`) is a two-tab widget and one green button. No duration ("30 min"), no "no obligation", no "auf Deutsch oder Englisch", no photo of who's on the other end, no "you'll speak directly to the CTO" — which *is* stated in the startup tab and dropped in the business tab. Peak-end says the last thing is disproportionately remembered. The last thing here is a button.

## Cognitive Load — 7 of 8 checks fail (severe)

| Check | Verdict |
|---|---|
| Single focus | **FAIL** — 14 CTA buttons across 5 destinations (Calendly, `pilot.html`, `#contact`, `process-screening.html`, `openclawd-agents.html`) |
| Chunking ≤4 | **FAIL** — 12 sections; 6 trust cards; 5 humans + 5 AI agents; a 7-row tier table |
| Grouping | **PASS** — section tags and the AI Automation / Complementary split are honest signposting |
| Visual hierarchy | **FAIL** — after the hero every section is byte-identical in weight: tag → title → subtitle → grid. Nothing is louder, so nothing is more important |
| One thing at a time | **FAIL** — hero presents two CTAs while a 248px cookie banner fires on top of them |
| ≤4 options per decision | **FAIL** — 8 nav items, 7 service cards, 7 accordion rows |
| Working memory | **FAIL** — no prices anywhere; the user carries "I still don't know what this costs" through 16,000px |
| Progressive disclosure | **FAIL** — the accordions disclose nothing |

## Persona Red Flags

**Jordan (first-timer, no AI vocabulary)**
- `OpenClawd AI Agents` (`index.html:1098-1100`) — an invented product name with no gloss. Is this GF's product, a partner's, or an industry term?
- `View tiers` (`:1078`) opens seven rows reading "Workflow Simple (<5 steps)" → "Workflow Complex (>15 steps)". Jordan doesn't know how many "steps" their invoice process is, so the disclosure makes them feel *less* qualified to buy.
- `Get a quote → #contact` (`:1096`) scrolls to a tab widget asking Jordan to self-classify as startup or established business, then offers a Calendly link. Jordan wanted a price and got an identity question.

**Riley (stress tester)**
- Clicks **DE** in the nav (writes `site-lang`), clicks through to `process-screening.html`, which reads `preferred-language` (`script.js:444-462`) — different key, independent default. Language choice silently doesn't persist across the two page families.
- Clicks **Digital Workers** from `how-we-work.html:24` → dead anchor, lands at the top of the homepage with no error.
- Opens the mobile burger and clicks `EN | DE`: the close handler (`index.html:1646-1652`) binds only `navMenu.querySelectorAll('a')` and the toggle is a `<button>`. Language switches; the menu stays open covering the page.
- Compares repo to production and finds them different (see the banner at the top of this document).

**Casey (distracted, mobile, one thumb)**
- Both hero CTAs under the cookie banner. First tap forced onto a consent button.
- `.nav-hamburger` is **28×20px** against a 44×44 minimum — misses it, taps the logo.
- `#lang-toggle` has width 0 on mobile (inside the hidden `.nav-menu`). A German-speaking Casey landing on the English homepage has no visible way to switch.
- `.digital-grid` becomes `repeat(2,1fr)` under 920px (`:911`) for **five** AI team members — the last card orphans alone on row three, reading as a rendering bug.
- 16,379px and 12 sections separate Casey from the closing CTA, with no sticky mobile CTA bar. Once the hero scrolls away, the only conversion path is behind the 28px burger.

## Minor Observations

- `.hero-label::after` runs an infinite 2s `underlineGrow` (`index.html:232-243`) — a perpetually pulsing underline three lines above the headline, competing with the CTA forever.
- `<p class="section-subtitle" style="margin-bottom:32px;"></p>` — an empty paragraph shipping 32px of dead space in Testimonials (`index.html:882`).
- `styles.css`, `script.js`, `script-vr.js`, `styles-vr.css` total ~90 KB that `index.html` never loads. `use-cases.html` carries 30 inline `style="` attributes, `openclawd-agents.html` 39, `vr_website.html` 37 — the subpages are hand-styled one-offs with no system.
- Footer "Services" links three of four items to the same `#services` anchor.
- `imprint.html` is titled "Imprint", not **Impressum**. German visitors scan the footer for that exact word; it's a legal term of art, not a translatable label.
- The Digital Team section gives five AI agents human first names and job titles. Charming internally, ambiguous externally: is the prospect buying *these* agents, or being shown GF's own stack?
- `transition: all` used 5× in `index.html` plus `--transition: all 0.3s ease` in both CSS files — animates every property including layout ones.
- `Cache-Control: max-age=600` on everything (GitHub Pages default); no long-lived immutable caching for static images.

## Questions to Consider

1. You sell "we implement, we don't just advise" — so why does your own site run three design systems, three language engines with conflicting defaults, and three orphaned pages? Which artifact should a prospect believe: the sentence or the site?
2. If a 35-person Stuttgart Mittelstand firm is the buyer, why does the page open in English with the DE switch hidden behind a 28×20px hamburger? Who is the English default serving — the buyer, or the founders?
3. You have two testimonials, one anonymous, and five fictional AI employees with names and job descriptions. What does it mean that the fictional staff got more design real estate than the real customers?
4. The Resources section says COMING SOON three times, exactly where a prospect looks for evidence. What is that section worth versus the cost of the doubt it plants?
5. If you deleted eight of the twelve homepage sections and kept only Hero, Services-with-prices, Trust, and a reassured CTA — what would you actually lose? Name the buyer who would have converted on the section you're defending.

---

## Recommended Sequence

0. **Reconcile repo ↔ production** before touching anything (not an Impeccable command — a git task).
1. **`/impeccable extract`** — one `gf.css`, one token set, one typeface, one nav partial. Kills the P0 consistency defect and unblocks everything below.
2. **`/impeccable adapt`** — cookie banner on mobile, 44px touch targets, `startups.html` overflow, the 5-card orphan row, a sticky mobile CTA.
3. **`/impeccable harden`** — focus styles, skip links, reduced-motion, cookie-toggle labels, heading order, `lang`, meta/OG tags, strip the 31 `console.log`s, fix the dead anchor.
4. **`/impeccable colorize`** — darken `--green`, fix the four failing text colours, give the CTA a field to stand on.
5. **`/impeccable clarify`** — prices in the tier tables (or delete them), one name for the free offer, reassurance copy at the closing CTA.
6. **`/impeccable optimize`** — WebP/SVG conversion, lazy loading, intrinsic dimensions, drop the unreferenced PNG.
7. **`/impeccable distill`** — cut the homepage from 12 sections to 5-6; delete the empty Resources section; surface the orphaned explainer pages.
8. **`/impeccable polish`** — final pass.

Re-run `/impeccable critique` after fixes to see the score move.
