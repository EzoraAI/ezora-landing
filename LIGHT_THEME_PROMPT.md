# EzoraAI Light Theme Conversion Prompt

Use this prompt to convert any remaining dark-themed EzoraAI page to the new light theme. The reference implementation is `index-light-v2.html`. The original dark-themed files are backed up in `_dark-theme-backup/`.

---

## Pages to convert

- `vision.html`
- `difference.html`
- `for-individuals.html`
- `for-businesses.html`
- `for-experts.html`
- `community.html`
- `privacy.html`
- `terms.html`

---

## Prompt

```
I need you to convert the following EzoraAI page to the new light theme. Read the file, apply all the CSS and HTML changes below, and write the updated file back to the same path.

FILE TO CONVERT: [paste path here, e.g. Website/vision.html]

REFERENCE FILE: Website/index-light-v2.html (read this first to see the completed light theme in action)

### 1. CSS Root Variables — Replace the existing :root block with:

:root{
  --navy:#0B1224;--dark:#FFFFFF;--card-bg:#FFFFFF;--card-border:#E2E8F0;
  --teal:#00C9A7;--purple:#7C3AED;--gold:#F5A623;
  --white:#0B1224;--gray:#64748B;--text:#1E293B;--mid:#94A3B8;
  --bg:#FAFBFC;--bg-alt:#F1F5F9;
}

### 2. Body — Change to:
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden}

### 3. Nav — Replace the full nav CSS block with:
nav{padding:14px 0;position:sticky;top:0;z-index:100;background:transparent;border-bottom:1px solid transparent;box-shadow:none;transition:background .3s,box-shadow .3s,border-bottom .3s,backdrop-filter .3s}
nav.nav-scrolled{background:rgba(250,251,252,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 1px 3px rgba(0,0,0,.06);border-bottom:1px solid rgba(0,0,0,.06)}
nav a.nav-link{color:var(--gray);...} — hover color becomes var(--navy)
nav a.nav-link::before background becomes rgba(0,0,0,.04) instead of rgba(255,255,255,.06)
nav a.nav-link.active::before background becomes rgba(0,0,0,.06) instead of rgba(255,255,255,.08)
nav a.nav-link.active color becomes var(--navy) instead of var(--white)
nav a.nav-link:hover color becomes var(--navy) instead of var(--white)
nav a.cta-nav{color:#fff;background:#1E293B;border-radius:20px} — hover: background:#0B1224;box-shadow:0 4px 16px rgba(0,0,0,.12)
nav a.cta-nav-outline{color:var(--navy);border:1.5px solid #CBD5E1;border-radius:20px} — hover: background:rgba(0,0,0,.04)

### 4. Logo in nav HTML — Two changes:
- Change the logo image src from `icon-512.png` to `icon-512-dark.png`
- Change the logo wordmark inline style color from `#F4F6FA` to `var(--navy)` (or just remove the color since body text is already dark)

### 5. All headings (h1, h2, h3) — Change from color:#fff to color:var(--navy)

### 6. Body text / descriptions — Change from color:var(--gray) (which was #94A3B8 on dark) to color:var(--gray) (which is now #64748B — this works automatically with the new variable values, but check any hardcoded #94A3B8 or #E2E8F0 text colors)

### 7. Cards and surfaces — Everywhere you see:
- background:var(--dark) → change to background:var(--card-bg) (which is #FFFFFF)
- border:1px solid rgba(255,255,255,.06) → change to border:1.5px solid var(--card-border) (which is #E2E8F0)
- box-shadow with rgba(0,0,0,.25+) → soften to rgba(0,0,0,.08)
- Hover states: subtle lift (transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.08))

### 8. All border/divider lines:
- border-top/bottom:1px solid rgba(255,255,255,.06) → border:1px solid #E2E8F0
- Dividers between elements: rgba(255,255,255,.1) → #E2E8F0

### 9. All rgba(255,255,255,...) references:
- These were for light effects on dark backgrounds. Convert them to rgba(0,0,0,...) equivalents:
  - rgba(255,255,255,.06) → rgba(0,0,0,.06) or #E2E8F0
  - rgba(255,255,255,.08) → rgba(0,0,0,.04)
  - rgba(255,255,255,.1) → rgba(0,0,0,.06)
  - rgba(255,255,255,.12) → #E2E8F0 (for borders)
  - rgba(255,255,255,.15) → rgba(0,0,0,.08)

### 10. Form inputs (if the page has any):
- background:var(--dark) → background:#fff
- border:1px solid rgba(255,255,255,.12) → border:1.5px solid #E2E8F0
- color:#fff → color:var(--navy)
- ::placeholder color:var(--mid) (stays the same — variable is already light-friendly)
- :focus border-color:var(--teal);box-shadow:0 0 0 3px rgba(0,201,167,.12)
- select option{background:#fff;color:var(--navy)}

### 11. Buttons:
- Primary CTA buttons: background:#1E293B;color:#fff;border-radius:24px (dark pill style)
- Hover: background:#0B1224;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.12)
- Teal action buttons (submit, join waitlist): background:var(--teal);color:#fff;border-radius:24px
- Ghost/outline buttons: background:#fff;color:var(--navy);border:1.5px solid #CBD5E1;border-radius:24px

### 12. Footer — Same pattern:
- border-top:1px solid #E2E8F0
- Footer logo text: color:var(--navy) (.ai stays teal)
- Footer tagline/links: color:var(--mid), hover color:var(--teal)
- Footer heading (h4): color:var(--gray)
- Footer bottom border: 1px solid #E2E8F0

### 13. Section backgrounds:
- Main sections: background:var(--bg) (off-white)
- Alternate sections (for visual rhythm): background:var(--bg-alt) (#F1F5F9)
- Sections that had background:rgba(255,255,255,.02) or rgba(0,201,167,.04) → use var(--bg-alt)

### 14. "Back to top" button (if present):
- background:var(--navy);color:#fff — hover: background:#1E293B

### 15. Bottom banner (if present):
- background:#fff;border-top:2px solid var(--teal);box-shadow:0 -4px 24px rgba(0,0,0,.08)
- Text inside: color:var(--navy)
- Close button: color:var(--mid), hover color:var(--navy)

### 16. Mobile / responsive nav:
- Hamburger icon: color:var(--navy) instead of var(--white)
- Mobile menu background: implicit white from body
- Mobile menu link borders: rgba(0,0,0,.06) instead of rgba(255,255,255,.05)
- Close button: color:var(--navy) instead of var(--white)
- Hover backgrounds: rgba(0,0,0,.04) instead of rgba(255,255,255,.08)

### 17. Inline styles in HTML:
- Any inline style="color:#fff" or style="color:var(--white)" on text → change to style="color:var(--navy)"
- Any inline style="color:#F4F6FA" → change to style="color:var(--navy)"
- Any inline background:var(--dark) → change to background:var(--card-bg)

### 18. Accent colors — KEEP these unchanged:
- var(--teal) #00C9A7 — for primary accent, B2B elements, stat numbers
- var(--purple) #7C3AED — for B2C/consumer elements
- var(--gold) #F5A623 — for expert elements
- These pop even better on light backgrounds

### 19. Stat numbers: Keep color:var(--teal) — teal numbers on white look great

### 20. Increased whitespace: Where section padding was 80px 0, increase to 100px 0. Card padding can go up by 4-6px.

IMPORTANT: Do NOT change any JavaScript logic, form action URLs, or HTML structure. Only CSS values and inline style colors.
```

---

## Quick checklist after converting each page

- [ ] Page background is off-white (#FAFBFC), not dark navy
- [ ] Nav logo uses `icon-512-dark.png`
- [ ] Nav text is dark, scrolled state is white frosted glass
- [ ] All headings are navy, not white
- [ ] Cards are white with thin gray borders
- [ ] No remaining rgba(255,255,255,...) backgrounds or borders
- [ ] Buttons are dark pills (border-radius: 24px)
- [ ] Footer is light with gray text
- [ ] Mobile hamburger menu works and is styled for light theme
- [ ] Teal/purple/gold accents are still present and pop on light bg
