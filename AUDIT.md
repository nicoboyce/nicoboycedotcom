# Site Audit

## Done

**Performance**
- [x] Large images resized — 62 files to max 800px at quality 82. Note: `skating.jpeg`, `cameras.jpeg`, `35mm/splash.jpeg`, `tfm-drecks.png` are unreferenced large files in `/img/` — can delete or leave.
- [x] 3 render-blocking CSS files → concatenated into `public/css/main.css`
- [x] `content-visibility: auto` removed from global `p` and `div` rules
- [x] `font-display: swap` added to all 4 Atkinson TTF `@font-face` declarations
- [x] TTF → WOFF2: `font-display: swap` done; full conversion needs `brew install woff2` then `woff2_compress` on each file
- [x] `estimation-tool.js` — already page-specific (loaded in `pirate-quest.md`), no change needed

**Accessibility**
- [x] `maximum-scale=1` — keeping; prevents iOS Safari auto-zoom on focus
- [x] Blockquote contrast — not used anywhere; if ever used, nudge `#7a7a7a` → `#8a8a8a`
- [x] `abbr` tag contrast — not used anywhere
- [x] `:focus-visible` outline added (`2px solid #d46e3a`)
- [x] Link underlines on keyboard focus — already worked; `:focus-visible` ring added on top
- [x] Missing `alt=""` on `delta.svg` in `post.html` and `episode.html`
- [x] `<em>` `line-height: 0.8` raised to `1.2`
- [x] Skip link — not needed

**SEO**
- [x] Canonical URL tag added
- [x] Open Graph tags added (og:type, og:title, og:description, og:url, og:site_name, og:image)
- [x] Twitter Card tags added (summary card with site image)
- [x] Meta description simplified — uses `page.description | default: site.description` (155 char limit). Posts can add `description:` to front matter for per-post copy.
- [x] `robots.txt` Sitemap directive added
- [x] `site.webmanifest` — name, start_url, theme_color (`#0e0518`) fixed
- [x] `gmpg.org` profile link upgraded HTTP → HTTPS

**HTML Semantics**
- [x] `<nav>` tag was already present; fixed unclosed `<span>` inside it; `aria-current="page"` added to active links
- [x] `<footer>` wrapper added in `info.html`
- [x] `"now" | date_to_string` fixed to `site.time | date_to_string`
- [x] External links `rel="noopener noreferrer"` — JS snippet in `default.html` applies at runtime

---

## Next: CSS Dead Code & Config

- [ ] **8 unused Base16 theme variants** — `.theme-base-08` through `.theme-base-0f` all defined in `main.css`; only `theme-base-09` is active on `<body>`
- [ ] **`.lead` defined twice** — once in the poole section and once in the hyde section of `main.css`
- [ ] **`MxPlus_Amstrad_PC-2y.ttf`** — loaded in `@font-face` in `hyde.css` but never referenced anywhere in CSS
- [ ] **`episode.html`** — identical duplicate of `post.html`; no posts use `layout: episode`
- [ ] **`okay: no`** in `_config.yml` — unknown key, does nothing
- [ ] **`lang="en-us"`** in `default.html` — content is British English, should be `en-gb`

---

## Low Priority

- [ ] **Sidebar image** loads from external URL `https://nicoboyce.com/public/img/pixel-nico-2.png` — single point of failure; copy is already in `/public/img/`
- [ ] **`_now` collection** configured in `_config.yml` with `output: false` — no apparent purpose
- [ ] **`excerpt_separator`** configured but excerpts not used in any layout
- [ ] **Animation project** — `ANIMATION-TODO.md` and `animation-notes.txt` suggest in-progress SVG work
