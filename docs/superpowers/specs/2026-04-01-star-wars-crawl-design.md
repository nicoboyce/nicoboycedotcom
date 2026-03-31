# Star Wars Text Crawl Generator

**Date:** 01/04/2026
**Status:** Approved
**URL:** `nicoboyce.com/crawl`

## Summary

A shareable Star Wars-style opening text crawl generator. Users paste text (e.g. a mundane email), customise the intro line and title, and get a shareable link. Recipients click the link and see the text dramatically crawl up into a starfield. The humour comes from the contrast between the cinematic presentation and the banal content.

## User Flow

### Creator Mode (no hash in URL)

1. User visits `nicoboyce.com/crawl`
2. Sees a simple dark form with three fields:
   - **Intro line** (optional) — placeholder: "A long time ago in an office far, far away...."
   - **Title** (optional) — placeholder: "PRINTER WARS"
   - **Body text** (required) — textarea for the main crawl content
3. Clicks "Generate" — encodes fields into URL hash, displays shareable link with copy button
4. Can click "Preview" to watch the crawl without generating a link

### Playback Mode (hash present in URL)

Automatic, no controls, no UI chrome. Sequence:

1. **Starfield** fades in (~1s)
2. **Intro text** fades in centre-screen, holds, fades out (~4s total)
3. **Title** appears large centre-screen, shrinks into distance (~3s)
4. **Crawl** begins — yellow text, perspective-tilted, scrolling upward into vanishing point
5. **End** — text scrolls away, starfield remains

Fixed speed. Duration scales with text length so short texts don't drag.

## Technical Design

### Architecture

Single file: `crawl.md` with `layout: blank`. All HTML, CSS, and JS inline. No external dependencies, no server-side logic.

### Encoding

- JSON object with short keys: `{i: "intro", t: "title", b: "body"}`
- Empty/default values omitted to keep URLs short
- Base64-encoded using `btoa()`/`atob()`
- URL-safe: replace `+` with `-`, `/` with `_`, strip `=` padding
- Practical limit: ~1500 chars of decoded text (within ~2000 char URL limit)

### URL Structure

```
nicoboyce.com/crawl#eyJiIjoiRGVhci...
```

Hash fragment ensures text never reaches server logs or analytics.

### Visual Specification

**Colours:**
- Background: `#000`
- Crawl/title text: `#f5c500` (Star Wars yellow)
- Intro text: `#00bfff` (blue)
- Stars: `#fff` at varying opacities

**Fonts (system fonts only):**
- Title: `"Arial Black", "Helvetica Neue", Arial, sans-serif` — bold, uppercase
- Crawl body: `"Helvetica Neue", Arial, sans-serif` — bold
- Intro text: `"Times New Roman", Georgia, serif`

**Starfield:**
- CSS-only — multiple `box-shadow` layers on pseudo-elements at different sizes/positions
- Subtle twinkle via CSS animation

**Crawl effect:**
- Container with CSS `perspective` and `rotateX` transform
- Text scrolls upward via CSS `animation` (translateY from bottom to beyond top)
- Duration calculated from text length

### Creator Form

- Dark background, minimal styling
- White/light form elements on black
- "Generate" button produces URL, shows in readonly field with "Copy link" button
- "Preview" button hides form, plays crawl, provides way back to form

### File Structure

```
crawl.md          — Jekyll page (layout: blank), all code inline
```

No additional JS or CSS files needed.

## Out of Scope

- Audio (the John Williams theme would be fun but copyright)
- User accounts or saved crawls
- Custom colours/fonts
- Mobile-specific controls
- Server-side anything
