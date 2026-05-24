# Enhanced Clinical Neurodivergent Assessment Platform

A comprehensive clinical platform for **neurodivergent assessment and management** — patient records, validated screeners (ASRS), outcomes tracking and reporting dashboards. Built as a React single-page application.

Originally authored as a [Claude](https://claude.ai) artifact and migrated to a runnable React project via [Emergent](https://emergent.sh).

> **Demo login:** any username/password is accepted in the sign-in screen.

## Features

- **Role-based sign-in** — Healthcare Provider / Patient / Administrator personas.
- **Patient records** — Demographics, emergency contacts, primary diagnoses, comorbidities, medications, allergies, insurance, care team.
- **Validated screeners** — Adult ADHD Self-Report Scale (ASRS-v1.1) and extensible question banks.
- **Outcomes tracking** — GAF, CGAS, and functional assessment domains (work/school, social, family, self-care).
- **Visual dashboards** — Built with [Recharts](https://recharts.org) for line, bar, area, pie, scatter and radial views.
- **Accessibility-aware UI** — Theme/font/zoom toggles via lucide-react icons.

## Tech Stack

- React 19
- Tailwind CSS 3
- lucide-react (icons)
- recharts (charts and visualisations)
- CRACO (build tooling)

## Project Structure

```
frontend/
├── src/
│   ├── App.js                                  # Root: renders the platform
│   ├── index.js                                # React entry point
│   ├── index.css                               # Global styles
│   ├── App.css                                 # App styles
│   └── components/
│       └── NeurodivergentAssessment.jsx        # Main clinical platform
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Local Development

```bash
cd frontend
yarn install
yarn start
```

Open http://localhost:3000 and sign in with any credentials.

## Build

```bash
cd frontend
yarn build
```

## Disclaimer

This is a **demonstration platform**. It is **not** a certified medical device, does not store data securely, and must not be used for live clinical decision-making without appropriate validation, security review and regulatory approval.

## Credits

Originally authored in Claude.ai.
