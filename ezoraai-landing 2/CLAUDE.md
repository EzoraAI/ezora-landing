# CLAUDE.md — EzoraAI Website

## Project Overview

EzoraAI is the central hub for the AI economy — a dual-sided subscription marketplace connecting AI experts with individuals and businesses who need AI expertise. The website serves as the primary landing page, waitlist collection tool, and eventually the full platform.

**Live site:** https://ezora.ai
**Repo:** ezoraai-landing

## Brand Identity

### Colors
- **Navy (primary background):** `#0B1224`
- **Dark blue (cards/surfaces):** `#131D3B`
- **Teal (primary accent):** `#00C9A7`
- **Purple (B2C/consumer accent):** `#7C3AED`
- **Gold (expert/third accent):** `#F5A623`
- **White text:** `#F4F6FA`
- **Gray text:** `#94A3B8`
- **Mid gray:** `#64748b`

### Typography
- **Display/headings:** Instrument Serif (Google Fonts)
- **Body/UI:** DM Sans (Google Fonts)
- **Logo wordmark:** The logo uses a custom "e" mark with two orbital dots + "ezora.ai" wordmark. The ".ai" portion is always teal (#00C9A7). The rest is white on dark backgrounds.

### Logo Files
- `logo.png` — Full resolution, transparent background (452x612)
- `logo-web.png` — Web optimized (500x676)
- Logo is also embedded as base64 in index.html for zero-dependency deployment

### Tone & Voice
- Confident but not arrogant
- Urgent but not alarmist
- Technical credibility without jargon
- Always frame AI displacement as an opportunity, not doom
- Key phrase: "Adapt or be left behind. EzoraAI ensures no one gets left behind."

## Architecture

### Current State (Landing Page)
Single-file static HTML (`index.html`). No build step, no frameworks, no dependencies beyond Google Fonts CDN.

```
ezoraai-landing/
├── index.html          # Full landing page (self-contained, ~460KB with embedded logo)
├── logo.png            # Full-res transparent logo
├── logo-web.png        # Web-optimized logo
├── CNAME               # Custom domain: ezora.ai
├── .gitignore
└── README.md
```

### Key Sections in index.html
1. **Nav** — Logo + "Our vision" overlay trigger + "Join the waitlist" CTA
2. **Hero** — Large logo, headline ("AI is changing everything. Find your expert."), four CTA buttons
3. **Stats bar** — 300M+ jobs, $100B+ market, 78% replacing SaaS, $8.99/mo
4. **Problem** — 2x2 grid: B2B problems (teal accents) vs B2C problems (purple accents)
5. **How it works** — 3-step flow (browse → choose → results)
6. **Audience cards** — Three cards: People ($8.99), Businesses ($45.99), Experts ($17.99)
7. **Workforce shift** — Displacement vs EzoraAI answer (side-by-side dark cards)
8. **Blockchain POW** — Three feature cards explaining on-chain verification
9. **Waitlist form** — Email + role radio buttons (learner/business/expert) + submit
10. **Vision overlay** — Full-page overlay triggered by "Our vision" nav link, contains founder story and platform vision
11. **Footer** — Logo + tagline + copyright

### Vision Overlay
The "Our Vision" section is a `position: fixed` overlay (`#visionOverlay`) that opens on click and closes with × button or Escape key. It contains the full founder narrative, platform vision, and mission statement without revealing founder names.

## Business Context

### Three Audiences (always maintain this hierarchy)
1. **Individuals/Consumers** (purple accent) — People learning AI, displaced professionals reskilling. Entry: $8.99/mo subscription.
2. **Businesses** (teal accent) — SMBs and mid-market companies seeking AI talent for projects and SaaS replacement. Entry: $45.99/mo.
3. **AI Experts** (gold accent) — Builders, coaches, consultants monetizing their skills. Entry: $17.99/mo (intro) → $24.99/mo ongoing.

### Key Differentiators (always emphasize)
- **Blockchain proof-of-work** — Every expert's track record is immutable, on-chain, and verifiable
- **Dual B2B + B2C** — Serves both businesses AND everyday people (unlike Toptal, which is enterprise-only)
- **AI-native focus** — Not a generalist freelance marketplace; built specifically for the AI economy
- **Pricing transparency** — Published take rates (15-25%) vs Toptal's hidden 40-60% markup
- **Workforce displacement angle** — Positioned as "critical infrastructure for the largest workforce transition in modern history"

### Revenue Model
- Subscriptions (floor): Users $8.99/mo, Experts $17.99-$49.99/mo, Businesses $45.99-$99.99/mo
- Transaction take rate (ceiling): 15-25% on coaching sessions, projects, AI agent sales
- Premium tools: Featured listings, analytics, blockchain badges
- Enterprise licensing: White-label AI hubs, custom pricing

### Competitive Positioning
- vs **Toptal**: More accessible, transparent pricing, B2C coaching, blockchain POW, AI-native
- vs **Fiverr/Upwork**: Curated quality, verified credentials, AI-specific, subscription model
- vs **LinkedIn**: Execution layer (not just profiles), blockchain verification, marketplace
- vs **Udemy/Coursera**: 1-on-1 personalized (not generic courses), expert-led, practical

## Development Guidelines

### Design Principles
- Dark theme dominant (navy `#0B1224` base)
- Teal accent for primary actions and B2B
- Purple accent for B2C/consumer elements
- Gold accent for expert/supply-side elements
- Cards use `#131D3B` background with subtle shadows
- Generous whitespace, no clutter
- Scroll-triggered fade-in animations (CSS `@keyframes fadeUp`)
- Mobile responsive (single-column below 768px)

### CSS Conventions
- CSS variables defined in `:root` for all brand colors
- BEM-like class naming (`.hero-ctas`, `.p-card`, `.aud-card`)
- Animations use `IntersectionObserver` for scroll-triggered reveals
- All interactive elements have hover transitions (0.2s-0.3s)

### When Modifying the Landing Page
- Keep it as a single HTML file for simplicity — no build tools
- Logo is base64-embedded; if updating the logo, re-encode and replace the data URI
- The waitlist form currently shows a client-side confirmation message only — no backend. When adding a backend, replace the `submitWaitlist()` function
- Google Fonts are loaded via CDN link in `<head>`

### Future Platform Development
When building the actual platform (post-validation), the planned stack direction is:
- **Frontend:** React or Next.js
- **Backend:** To be determined based on founding team's build path (no-code, outsourced, or vibe-coded)
- **Database:** PostgreSQL or similar
- **Auth:** Standard OAuth/SSO
- **Payments:** Stripe
- **Blockchain:** Chain TBD for proof-of-work credential layer
- **Hosting:** Vercel, AWS, or similar

### Content Rules
- Never reveal founder names on the public site (use "two co-founders" or "our founding team")
- Always include the workforce displacement framing when describing the mission
- Pricing must match: $8.99 (users), $17.99 intro / $24.99 ongoing (experts), $45.99 (businesses)
- Take rate is 15-25% (NOT 20-30% — this was updated)
- The period in "ezora.ai" is part of the brand — always use lowercase "ezora.ai" in body text

## Waitlist Data

The current waitlist form collects:
- **Email address**
- **Role** (one of: "I want to learn AI" / "I run a business" / "I'm an AI expert")

No backend is connected yet. When connecting a backend:
- Store email + role + timestamp + UTM params if available
- Send a confirmation email
- Segment into three lists for targeted follow-up
- Consider Mailchimp, ConvertKit, or a simple Supabase table

## Files Reference

### Deliverables Created
- `EzoraAI_Pitch_Deck_v4_Final.pptx` — 16-slide investor deck
- `EzoraAI_90_Day_Plan.docx` — Phase-by-phase action plan
- `EzoraAI_Pricing_Revenue_Model.docx` — Full pricing and unit economics
- `EzoraAI_B2C_Strategy_Outreach_LandingPage.docx` — Consumer strategy + outreach messages + landing page copy
- `EzoraAI_Launch_Playbook.docx` — LinkedIn posts + Week 1 daily checklist
- `EzoraAI_LinkedIn_Company_Page.docx` — Company page setup guide
- `linkedin_banner.png` — LinkedIn banner image (2256x382)
- `ezoraai-logo-transparent.png` — Logo with transparent background
- `ezoraai-logo-web.png` — Web-optimized logo

## Quick Commands

```bash
# Deploy to Netlify (drag-and-drop alternative)
npx netlify-cli deploy --prod --dir=.

# Local preview
open index.html
# or
python3 -m http.server 8000

# Check file size
wc -c index.html
```
