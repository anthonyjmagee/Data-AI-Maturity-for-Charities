# Data & AI Maturity Index — Charity Edition

An interactive **data and AI maturity assessment** designed for charities and non-profits. Self-contained single-page HTML application with built-in **Google Analytics 4 (GA4)** tracking, ready to embed in Wix, WordPress, or any static host.

Originally authored as a [Claude](https://claude.ai) artifact and migrated via [Emergent](https://emergent.sh).

## What it does

- Walks users through a multi-step **maturity assessment** across data, infrastructure, skills, governance and AI readiness.
- Calculates a **maturity score** and surfaces tailored recommendations.
- Sends **custom events to GA4** at each step so you can analyse drop-off and completion funnels in your analytics dashboard.
- Mobile-friendly responsive layout.

## How to use

### Option 1 — Direct browser
Just open `index.html` in any modern browser. No build step, no dependencies.

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Option 2 — Embed in Wix / WordPress / any site
Copy the contents of `index.html` into an **HTML embed / custom code** block. The file has no external dependencies beyond the GA4 script (loaded from Google) and Google Fonts via `-apple-system` fallbacks.

### Option 3 — Host on GitHub Pages
1. In this repository → **Settings → Pages**
2. Source: **Deploy from a branch** → branch `main`, folder `/ (root)`
3. Your tool is live at `https://<your-username>.github.io/<repo-name>/`

### Option 4 — Any static host (Netlify, Vercel, S3, Cloudflare Pages)
Drop the file in and you're done.

## Configuring GA4

The current GA4 Measurement ID is hard-coded near the top of `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GN42BFMLCM"></script>
<script>
    gtag('config', 'G-GN42BFMLCM', { ... });
```

To track events in **your** GA4 property, search the file for `G-GN42BFMLCM` and replace both occurrences with your own Measurement ID (format `G-XXXXXXXXXX`).

## File structure

```
.
├── index.html        # The entire tool — HTML + CSS + JS + GA4 in one file
├── README.md
└── .gitignore
```

## Credits

Originally authored in Claude.ai. Migrated for personal use.
