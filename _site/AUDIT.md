# Site Audit

## High Priority

### Performance

- [ ] **Large unoptimised images** — `splash.jpeg` 2.2MB, `skating.jpeg` 2.0MB, `cameras.jpeg` 1.3MB, `fiorano.jpeg` 1.2MB. No WebP/AVIF, no srcset
    resize to width 800 and make them a good but sensible quality and appropriate type. Might as well check all the images which are used in posts etc.
- [ ] **3 render-blocking CSS files** — no minification, concatenation, or deferral
    if this is straightfoward to fix, fix.
- [ ] **`content-visibility: auto` applied to all `<p>` and `<div>` globally** (`hyde.css:44-48`) — causes layout shifts, should be scoped to specific containers
    please do this yes
- [ ] **Heavy text-shadows on all headings and `<strong>`** (`poole.css:94, 98, 125, 368, 373`) — expensive to render, applied everywhere
    I don't care, this is just some daft design
- [ ] **`estimation-tool.js` (703 lines) loads on every page**, not just the pirate quest page
    fix it
- [ ] **TTF fonts served instead of WOFF2** for Atkinson-Hyperlegible — 4 variants, no `font-display` strategy
    is this a straightforward fix? You may do so.

### Accessibility

- [ ] **`maximum-scale=1` in viewport meta** — prevents user zoom
    I was having some weird problem that I fixed with this. I think it was rendering odd on phones? Investigate but do not make changes, I want further details
- [ ] **Blockquote text `#7a7a7a`** — contrast ratio 4:1, fails WCAG AA (needs 4.5:1)
    Suggest some alternatives for me. I don't think blockquotes are really used anywhere much - find an example
- [ ] **`abbr` tag `#555`** — contrast ratio 3.2:1, fails WCAG AA
    is this used anywhere
- [ ] **No `:focus-visible` styles** — keyboard users get no visible focus indicator
    make some suggestions
- [ ] **Link underlines only on hover** — invisible when keyboard-focused
    fix it
- [ ] **Missing `alt` on `delta.svg`** in `post.html:8` and `episode.html:8` — should be `alt=""` if decorative
    fix it
- [ ] **`<em>` font-size `0.8rem` with `line-height: 0.8`** — line-height below minimum, unreadable
    increase to the minimum
- [ ] **No skip link** — sidebar is fixed left, keyboard navigation could be awkward
    no it's fine

---

## Medium Priority

### SEO

- [ ] **No canonical URL tag** — important for Jekyll's pretty URLs to avoid duplicate content
- [ ] **No Open Graph tags** — social sharing will look poor
- [ ] **No Twitter Card tags**
- [ ] **Meta description template** often exceeds 160 chars (will be truncated in SERPs)
- [ ] **`robots.txt`** has no `Sitemap:` directive pointing to the auto-generated sitemap
- [ ] **`site.webmanifest`** has wrong `theme_color: #ffffff` (site is dark `#0e0518`), empty site name, no `start_url`

### HTML Semantics

- [ ] **Nav links not wrapped in `<nav>` tag** (`nav.html`)
- [ ] **Footer not wrapped in `<footer>` tag** (`info.html`)
- [ ] **`href="#top"` links in nav** but no `id="top"` exists in the HTML
- [ ] **`"now" | date_to_string`** in `info.html` — `"now"` is not valid Jekyll input, should be `site.time`
- [ ] **External links missing `rel="noopener noreferrer"`** inconsistently

### CSS Dead Code

- [ ] **8 Base16 theme variants defined** (`.theme-base-08` through `.theme-base-0f`) — only `theme-base-09` is used
- [ ] **`.lead` defined twice** — `poole.css:283` and `hyde.css:99`
- [ ] **`MxPlus_Amstrad_PC-2y.ttf`** loaded in font-face but never referenced in any CSS rule
- [ ] **`episode.html` layout is a duplicate of `post.html`** — no posts use it

### Config

- [ ] **`okay: no`** in `_config.yml` — mystery key, does nothing
- [ ] **`lang="en-us"`** on HTML element — content is British English, should be `en-gb`
- [ ] **`profile` link in `head.html:2`** uses `http://gmpg.org/xfn/11` (HTTP not HTTPS)

---

## Low Priority

### Assets

- [ ] **Sidebar image loads from external URL** `https://nicoboyce.com/public/img/pixel-nico-2.png` — single point of failure, better to host locally
- [ ] **`_now` collection** configured with `output: false` — no apparent use
- [ ] **`excerpt_separator` configured** but excerpts aren't used anywhere in the layouts
- [ ] **`ANIMATION-TODO.md` and `animation-notes.txt`** suggest an in-progress SVG project — worth tracking
