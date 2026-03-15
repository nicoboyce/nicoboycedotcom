# Site Audit

## Done

- [x] **Large images resized** — 62 files resized to max 800px wide at quality 82. Biggest wins: `fiorano.jpeg` 1265KB → 77KB, `camp.jpeg` 469KB → 237KB. 16 files were already ≤800px. Note: `skating.jpeg`, `cameras.jpeg`, `35mm/splash.jpeg`, `tfm-drecks.png` are large files sitting in `/img/` but not referenced in any post — can delete or leave.
- [x] **3 render-blocking CSS files** — concatenated into `public/css/main.css`, `head.html` updated to load one file. Individual source files (`poole.css`, `hyde.css`, `syntax.css`) kept for editing reference.
- [x] **`content-visibility: auto` on all `<p>` and `<div>`** — removed from `hyde.css`
- [x] **`estimation-tool.js`** — audit finding was wrong; script is loaded in `pirate-quest.md` only, not in any layout. No change needed.
- [x] **`font-display: swap` added** to all 4 Atkinson TTF `@font-face` declarations in `hyde.css`
- [x] **TTF → WOFF2** — `font-display: swap` done. WOFF2 conversion needs `brew install woff2` then `woff2_compress` on each TTF file. Low effort when ready.
- [x] **`maximum-scale=1`** — investigated, not changing. The value prevents iOS Safari auto-zoom on focus (triggered when inputs have `font-size < 16px`). Acceptable tradeoff given sparse form usage on the site.
- [x] **Blockquote contrast `#7a7a7a`** — not used anywhere in any post or page; irrelevant for now. If ever used, nudge to `#8a8a8a` to pass WCAG AA.
- [x] **`abbr` tag `#555`** — not used anywhere in any post or page; irrelevant.
- [x] **`:focus-visible` styles** — added `outline: 2px solid #d46e3a` with offset to `poole.css`
- [x] **Link underlines on keyboard focus** — already worked via `a:focus`; `:focus-visible` ring added on top
- [x] **Missing `alt=""` on `delta.svg`** — fixed in `post.html` and `episode.html`
- [x] **`<em>` `line-height: 0.8`** — raised to `1.2`
- [x] **No skip link** — not needed

---

### SEO

- [x] **Canonical URL tag** added to `head.html`
- [x] **Open Graph tags** added (og:type, og:title, og:description, og:url, og:site_name, og:image)
- [x] **Twitter Card tags** added (summary card)
- [x] **Meta description** simplified to `page.description | default: site.description`, truncated to 155 chars. Posts can now have a `description:` front matter field for per-post descriptions.
- [x] **`robots.txt`** Sitemap directive added
- [x] **`site.webmanifest`** fixed: name, start_url, theme_color (#0e0518), background_color

### HTML Semantics

- [x] **`<nav>` tag** — was already present; fixed unclosed `<span>` inside it
- [x] **`href="#top"` in nav** — valid per HTML spec (scrolls to top when no matching id exists); `aria-current="page"` added to active links
- [x] **`<footer>` tag** added to `info.html`
- [x] **`"now" | date_to_string`** fixed to `site.time | date_to_string`
- [x] **External links `rel="noopener noreferrer"`** — JS snippet added to `default.html` applies this to all external links at runtime, covering post content without manual per-link edits

### CSS Dead Code

- [ ] **8 Base16 theme variants defined** (`.theme-base-08` through `.theme-base-0f`) — only `theme-base-09` is used; others can be removed from `main.css`
- [ ] **`.lead` defined twice** — `poole.css:283` and `hyde.css:99`
- [ ] **`MxPlus_Amstrad_PC-2y.ttf`** loaded in `@font-face` but never referenced in any CSS rule
- [ ] **`episode.html` layout is a duplicate of `post.html`** — no posts use it

### Config

- [ ] **`okay: no`** in `_config.yml` — mystery key, does nothing
- [ ] **`lang="en-us"`** on HTML element — content is British English, should be `en-gb`
- [ ] **`profile` link in `head.html`** uses `http://gmpg.org/xfn/11` (HTTP not HTTPS)

---

## Low Priority

### Assets

- [ ] **Sidebar image loads from external URL** `https://nicoboyce.com/public/img/pixel-nico-2.png` — single point of failure, better to host locally
- [ ] **`_now` collection** configured with `output: false` — no apparent use
- [ ] **`excerpt_separator` configured** but excerpts aren't used anywhere in the layouts
- [ ] **`ANIMATION-TODO.md` and `animation-notes.txt`** suggest an in-progress SVG project — worth tracking
