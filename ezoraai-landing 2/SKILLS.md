# SKILLS.md — EzoraAI Development Guide

## Overview

This document is your reference for building, modifying, and extending the EzoraAI website. It covers the current state, how to make changes, and the roadmap from static landing page to full platform. Written for manual coding in VS Code.

---

## Current State

The site is a **single static HTML file** (`index.html`) deployed at **ezora.ai**. No frameworks, no build tools, no backend. Everything — CSS, JS, and even the logo — is embedded in one file.

This was intentional for speed-to-launch, but you'll outgrow it. The skills below are organized by what you'll need first.

---

## Skill 1: Connect the Waitlist Form to a Backend

**Priority: Do this first.** Every email you miss is a lost early user.

### Option A: Formspree (Easiest — 5 minutes, free)

No backend needed. Formspree collects submissions and emails them to you.

1. Sign up at formspree.io (free tier: 50 submissions/month)
2. Create a form, get your endpoint URL
3. Replace the current `submitWaitlist()` function in `index.html`:

```javascript
async function submitWaitlist() {
  const email = document.getElementById('email').value;
  const role = document.querySelector('input[name=role]:checked').value;
  if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }

  const msg = document.getElementById('wl-msg');
  const btn = document.querySelector('.wl-form button');
  btn.textContent = 'Submitting...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role, source: 'ezora.ai' })
    });

    if (res.ok) {
      msg.style.display = 'block';
      msg.textContent = "You're on the list! We'll be in touch soon.";
      document.getElementById('email').value = '';
    } else {
      msg.style.display = 'block';
      msg.style.color = '#EF4444';
      msg.textContent = 'Something went wrong. Please try again.';
    }
  } catch (err) {
    msg.style.display = 'block';
    msg.style.color = '#EF4444';
    msg.textContent = 'Network error. Please try again.';
  }

  btn.textContent = 'Get early access';
  btn.disabled = false;
}
```

### Option B: Supabase (More control — 30 minutes, free tier)

Gives you a real database you can query, export, and build on later.

1. Create a project at supabase.com
2. Create a table called `waitlist`:

```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'ezora.ai'
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);
```

3. Get your project URL and anon key from Settings > API
4. Replace `submitWaitlist()`:

```javascript
async function submitWaitlist() {
  const email = document.getElementById('email').value;
  const role = document.querySelector('input[name=role]:checked').value;
  if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }

  const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
  const SUPABASE_KEY = 'YOUR_ANON_KEY';

  const btn = document.querySelector('.wl-form button');
  const msg = document.getElementById('wl-msg');
  btn.textContent = 'Submitting...';
  btn.disabled = true;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email, role })
    });

    if (res.ok) {
      msg.style.display = 'block';
      msg.style.color = '#00C9A7';
      msg.textContent = "You're on the list! We'll be in touch soon.";
      document.getElementById('email').value = '';
    } else if (res.status === 409) {
      msg.style.display = 'block';
      msg.style.color = '#F5A623';
      msg.textContent = "You're already on the list!";
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    msg.style.display = 'block';
    msg.style.color = '#EF4444';
    msg.textContent = 'Something went wrong. Please try again.';
  }

  btn.textContent = 'Get early access';
  btn.disabled = false;
}
```

### Option C: Google Sheets (Quick and dirty — 15 minutes)

Use a Google Apps Script as a webhook. Good for non-technical founders who want to see data in a spreadsheet.

1. Create a Google Sheet with columns: `email`, `role`, `timestamp`
2. Go to Extensions > Apps Script, paste:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.email, data.role, new Date().toISOString()]);
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy as web app (Execute as: Me, Access: Anyone)
4. Use the deployed URL in your fetch call

---

## Skill 2: Multi-Page Site Structure

When you're ready to move beyond a single HTML file, here's how to structure it.

### File Structure

```
ezora.ai/
├── index.html
├── about.html
├── pricing.html
├── blog/
│   ├── index.html
│   └── posts/
│       └── why-ai-now.html
├── forum/
│   └── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logo.png
│   ├── logo-web.png
│   └── og-image.png
├── CNAME
├── CLAUDE.md
├── SKILLS.md
└── README.md
```

### Extracting CSS and JS from index.html

Currently everything is inline. To extract:

1. Cut everything between `<style>` and `</style>` into `css/style.css`
2. Cut everything between `<script>` and `</script>` into `js/main.js`
3. Replace with links:

```html
<link rel="stylesheet" href="/css/style.css">
<!-- before </body>: -->
<script src="/js/main.js"></script>
```

### Shared Navigation

Create a consistent nav across all pages:

```html
<nav>
  <div class="container">
    <a href="/" class="logo"><img src="/images/logo-web.png" alt="ezora.ai" style="height:48px"></a>
    <div class="nav-links">
      <a href="/about.html" class="nav-link">Our vision</a>
      <a href="/pricing.html" class="nav-link">Pricing</a>
      <a href="/blog/" class="nav-link">Blog</a>
      <a href="/forum/" class="nav-link">Community</a>
      <a href="/#join" class="cta-nav">Join the waitlist</a>
    </div>
  </div>
</nav>
```

```css
.nav-links { display: flex; align-items: center; gap: 24px; }
.nav-link { color: var(--gray); font-size: 14px; font-weight: 500; text-decoration: none; transition: .2s; }
.nav-link:hover, .nav-link.active { color: var(--teal); }

@media (max-width: 768px) {
  .nav-links { display: none; flex-direction: column; position: absolute; top: 60px; left: 0; right: 0; background: var(--navy); padding: 20px; border-bottom: 1px solid rgba(255,255,255,.06); }
  .nav-links.open { display: flex; }
}
```

### SEO Essentials (Add to Every Page)

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EzoraAI — [Page Title] | The Central Hub for the AI Economy</title>
  <meta name="description" content="[150-160 char description]">
  <meta property="og:title" content="EzoraAI — [Page Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="https://ezora.ai/images/og-image.png">
  <meta property="og:url" content="https://ezora.ai/[page]">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="EzoraAI — [Page Title]">
  <meta name="twitter:description" content="[Description]">
  <meta name="twitter:image" content="https://ezora.ai/images/og-image.png">
  <link rel="icon" type="image/png" href="/images/favicon.png">
</head>
```

---

## Skill 3: Pricing Page

Create `pricing.html` with three tiers matching your model.

### Structure

```
Hero: "Simple pricing. Powerful access."
  ↓
Three tier cards (People / Business / Expert)
  ↓
Feature comparison table
  ↓
FAQ accordion
  ↓
CTA → waitlist
```

### Pricing Card Pattern

```html
<div class="pricing-card">
  <div class="pricing-accent" style="background: var(--purple)"></div>
  <h3>For people</h3>
  <div class="price">
    <span class="amount">$8.99</span>
    <span class="period">/month</span>
  </div>
  <ul class="features">
    <li>Access vetted AI expert profiles</li>
    <li>Browse blockchain-verified proof-of-work</li>
    <li>Direct messaging and booking</li>
    <li>Community access</li>
  </ul>
  <a href="/#join" class="btn-card">Get started</a>
</div>
```

### FAQ Accordion (Pure CSS + JS)

```html
<div class="faq-item">
  <button class="faq-q" onclick="this.parentElement.classList.toggle('open')">
    What happens after I subscribe?
    <span class="faq-arrow">+</span>
  </button>
  <div class="faq-a">
    <p>You get immediate access to browse all vetted AI expert profiles...</p>
  </div>
</div>
```

```css
.faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
.faq-item.open .faq-a { max-height: 500px; }
.faq-item.open .faq-arrow { transform: rotate(45deg); }
```

---

## Skill 4: Blog System

For a static site, keep blog posts as simple HTML files.

### Blog Post Template

```html
<article class="blog-post">
  <div class="container" style="max-width: 720px;">
    <div class="post-meta">
      <span class="post-date">March 25, 2026</span>
      <span class="post-tag">Workforce</span>
    </div>
    <h1>Why the White-Collar Workforce Needs EzoraAI</h1>
    <p class="post-lead">300M+ jobs are exposed to AI automation. Here's what that means.</p>
    <p>Your article content here...</p>
  </div>
</article>
```

```css
.blog-post { padding: 80px 0; }
.blog-post h1 { font-family: 'Instrument Serif', serif; font-size: 36px; color: #fff; margin-bottom: 16px; line-height: 1.2; }
.post-lead { font-size: 18px; color: var(--gray); margin-bottom: 32px; line-height: 1.6; }
.post-meta { margin-bottom: 16px; font-size: 13px; color: var(--mid); }
.post-tag { background: rgba(0,201,167,.12); color: var(--teal); padding: 2px 10px; border-radius: 4px; margin-left: 8px; }
.blog-post p { font-size: 16px; color: var(--text); line-height: 1.8; margin-bottom: 20px; }
```

### First Blog Post Ideas

1. "Why 78% of Companies Are Replacing SaaS With Custom AI in 2026"
2. "The AI Literacy Crisis: Why YouTube Won't Save Your Career"
3. "What Blockchain Proof-of-Work Means for AI Expert Credibility"
4. "We're Two PE Operators Building the Infrastructure for AI's Workforce Shift"

Each post ends with a CTA back to the waitlist.

### When You Outgrow Static Posts

Move to a static site generator: **Hugo** (fastest), **Astro** (modern), or **11ty** (flexible). These let you write in Markdown and auto-generate listings and RSS feeds.

---

## Skill 5: Animations and Mobile Polish

### Scroll-Triggered Fade-Ins (Already Implemented)

Add to any new element:

```html
<div class="fade-in delay-2">Your content</div>
```

Delays: `delay-1` (0.15s), `delay-2` (0.3s), `delay-3` (0.45s), `delay-4` (0.6s).

### Stats Counter Animation

```javascript
function animateCounter(element, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

### Additional Animation Classes

```css
.slide-left {
  opacity: 0; transform: translateX(-40px);
  animation: slideLeft .8s ease forwards;
}
@keyframes slideLeft { to { opacity: 1; transform: translateX(0); } }

.scale-in {
  opacity: 0; transform: scale(0.9);
  animation: scaleIn .6s ease forwards;
}
@keyframes scaleIn { to { opacity: 1; transform: scale(1); } }
```

### Mobile Breakpoints to Test

- **375px** — iPhone SE (smallest common)
- **390px** — iPhone 14
- **768px** — iPad / tablet
- **1024px** — small laptop
- **1440px** — desktop

### Key Mobile Fixes

```css
@media (max-width: 768px) {
  .hero-ctas { flex-direction: column; align-items: center; }
  .hero-ctas a { width: 100%; max-width: 300px; text-align: center; }
  .hero { padding: 48px 0 32px; }
  section { padding: 48px 0; }
  .hero h1 { font-size: 32px; }
}
```

---

## Skill 6: Forum / Community Section

### Recommended Approach by Stage

| Stage | Users | Solution |
|-------|-------|----------|
| Now (0-50) | Pre-launch | Discord server with invite link on site |
| Early (50-200) | Waitlist | Discord with structured channels per topic |
| Growing (200-1000) | Active users | Discourse (self-hosted or $50/mo hosted) |
| Scaled (1000+) | Paying users | Custom-built forum integrated into platform |

### For Now: Discord Embed

```html
<section class="community">
  <div class="container" style="text-align: center;">
    <h2>Join the community</h2>
    <p class="sub">Connect with AI experts and learners.</p>
    <a href="https://discord.gg/YOUR_INVITE" class="btn-teal" target="_blank">
      Join Discord
    </a>
  </div>
</section>
```

### Later: On-Site Forum Categories

```html
<div class="forum-categories">
  <a href="#" class="forum-cat">
    <div class="cat-icon" style="background: var(--teal)">AI</div>
    <div>
      <h4>AI Tools and Workflows</h4>
      <span>Share and discover AI automation techniques</span>
    </div>
  </a>
  <a href="#" class="forum-cat">
    <div class="cat-icon" style="background: var(--purple)">Learn</div>
    <div>
      <h4>Learning and Reskilling</h4>
      <span>Resources for AI education and career transition</span>
    </div>
  </a>
  <a href="#" class="forum-cat">
    <div class="cat-icon" style="background: var(--gold)">Build</div>
    <div>
      <h4>Build vs. Buy</h4>
      <span>Replacing SaaS with custom AI solutions</span>
    </div>
  </a>
</div>
```

---

## Skill 7: Platform Foundation (Future)

### Recommended Stack

```
Frontend:  Next.js (React) on Vercel
Backend:   Supabase (PostgreSQL + Auth + Storage)
Payments:  Stripe Connect (subscriptions + expert payouts)
Email:     Resend or SendGrid
```

### Core Database Schema

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'expert', 'business')),
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  subscription_tier TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE expert_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id),
  specialties TEXT[],
  hourly_rate INTEGER,
  session_types JSONB,
  blockchain_pow_hash TEXT,
  verified BOOLEAN DEFAULT FALSE,
  rating_avg DECIMAL(3,2),
  rating_count INTEGER DEFAULT 0
);

CREATE TABLE sessions (
  id BIGSERIAL PRIMARY KEY,
  expert_id UUID REFERENCES profiles(id),
  client_id UUID REFERENCES profiles(id),
  session_type TEXT,
  status TEXT DEFAULT 'pending',
  price_cents INTEGER,
  platform_fee_cents INTEGER,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  rating INTEGER,
  review TEXT,
  blockchain_tx_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Build Order

```
Phase 1 (Now):              Static landing + waitlist         ✅ DONE
Phase 2 (After 5 matches):  Auth + expert profiles + booking
Phase 3 (After 20 users):   Payments + reviews + messaging
Phase 4 (After revenue):    Search/filters + dashboards
Phase 5 (After PMF):        Blockchain POW + agent marketplace
Phase 6 (Scaling):          Forum + CMS + mobile app
```

Don't jump to Phase 2 until you've manually matched at least 5 expert-client pairs.

---

## VS Code Setup

### Recommended Extensions

- **Live Server** — preview changes instantly
- **Prettier** — auto-format on save
- **HTML CSS Support** — class autocomplete
- **Auto Rename Tag** — rename opening/closing tags together
- **Color Highlight** — visualize hex colors inline
- **GitLens** — git history per line

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "liveServer.settings.port": 3000,
  "files.associations": { "*.html": "html" }
}
```

### Terminal Commands

```bash
# Local preview
python3 -m http.server 8000

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=.

# Git workflow
git add .
git commit -m "description of change"
git push origin main

# Validate HTML
npx html-validate index.html

# Check file sizes
ls -lh *.html css/ js/ images/
```

---

## Common Patterns

### Adding a New Section

```html
<section class="your-section">
  <div class="container">
    <h2 class="fade-in">Section title</h2>
    <p class="sub fade-in delay-1">Subtitle here.</p>
    <div class="your-content fade-in delay-2">
      <!-- Content -->
    </div>
  </div>
</section>
```

```css
.your-section { padding: 80px 0; }
.your-section h2 {
  font-size: clamp(32px, 4vw, 48px);
  color: #fff;
  text-align: center;
  margin-bottom: 12px;
  letter-spacing: -1px;
}
.your-section .sub {
  text-align: center;
  color: var(--mid);
  font-size: 16px;
  margin-bottom: 48px;
  max-width: 650px;
  margin: 0 auto 48px;
}
```

### Card Component

```css
.card {
  background: #131D3B;
  border-radius: 12px;
  padding: 28px 24px;
  transition: transform .3s;
}
.card:hover { transform: translateY(-4px); }
```

### Button Reference

| Class | Use | Style |
|-------|-----|-------|
| `.btn-teal` | Primary CTA | Solid teal bg, navy text |
| `.btn-purple` | B2C action | Solid purple bg, white text |
| `.btn-ghost` | Soft/secondary | Near-invisible border, gray text |
| `.btn-outline` | Tertiary | Gray border, gray text |

### Color Coding (Always Follow)

| Color | Hex | Audience |
|-------|-----|----------|
| Teal | `#00C9A7` | Businesses (B2B) |
| Purple | `#7C3AED` | Individuals (B2C) |
| Gold | `#F5A623` | AI Experts (supply) |

---

## Checklist: What to Do Next

In priority order:

1. ☐ Connect waitlist form to backend (Skill 1)
2. ☐ Add SEO meta tags and og:image (Skill 2)
3. ☐ Extract CSS/JS into separate files (Skill 2)
4. ☐ Create Discord server for community (Skill 6)
5. ☐ Create pricing page (Skill 3)
6. ☐ Write first blog post (Skill 4)
7. ☐ Improve mobile experience (Skill 5)
8. ☐ Add analytics (Google Analytics or Plausible)
9. ☐ Set up email drip sequence (ConvertKit or Mailchimp)
10. ☐ Begin platform buildout after 5+ validated matches (Skill 7)
