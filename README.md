# EzoraAI Landing Page

The central hub for the AI economy — connecting experts to the people and businesses that need them most.

## Quick Start

This is a static HTML landing page. No build step required.

### Option 1: Open locally
```bash
open index.html
```

### Option 2: Deploy to GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main** branch, root folder
4. Your site will be live at `https://yourusername.github.io/ezoraai-landing/`

### Option 3: Deploy to Netlify
1. Drag and drop the project folder onto [netlify.com/drop](https://app.netlify.com/drop)
2. Live in seconds — free

### Option 4: Deploy to Vercel
```bash
npx vercel
```

## Project Structure

```
ezoraai-landing/
├── index.html          # Full landing page (self-contained)
├── logo.png            # Full-res transparent logo
├── logo-web.png        # Web-optimized logo (500px)
├── README.md           # This file
├── .gitignore          # Git ignore rules
└── CNAME               # Custom domain (edit with your domain)
```

## Custom Domain

To use a custom domain (e.g., `ezora.ai`):

1. Edit the `CNAME` file with your domain
2. In your domain registrar, add:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `www` → `yourusername.github.io`

## Tech Stack

- Pure HTML/CSS/JS — no frameworks, no build tools
- Google Fonts (DM Sans + Instrument Serif)
- Logo embedded as base64 (no external image dependencies)
- Fully responsive (mobile + desktop)
- Dark theme with teal (#00C9A7) accent

## License

Proprietary — EzoraAI © 2026. All rights reserved.
