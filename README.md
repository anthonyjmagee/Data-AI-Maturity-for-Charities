# Claude Artifact Library

A collection of [Claude](https://claude.ai) artifacts migrated into a single runnable React project, ready to push to GitHub via [Emergent](https://emergent.sh).

## Artifacts

| # | Artifact | Type | Route |
|---|----------|------|-------|
| 1 | **SEND Diagnostic Tool** | React component | `/send-diagnostic` |
| 2 | **Enhanced Clinical Neurodivergent Assessment** | React + Recharts | `/neuro-assessment` |
| 3 | **Data & AI Maturity Index (Charity Edition)** | Standalone HTML w/ GA4 | `/data-ai-maturity.html` |

A simple landing page at `/` links to all three.

### 1. SEND Diagnostic Tool
MAT-level diagnostic for Special Educational Needs provision. Executive (ELD) and School (SLD) frameworks aligned to the SEND Code of Practice 2015 + Ofsted Framework 2025. Includes live compliance scoring, completion tracking and ELD↔SLD alignment indicators.

### 2. Enhanced Clinical Neurodivergent Assessment Platform
Clinical assessment platform with patient records (demographics, diagnoses, medications, care team), ASRS questionnaire, outcomes tracking (GAF, CGAS, functional assessments) and visual dashboards built on Recharts. Demo login accepts any username/password.

### 3. Data & AI Maturity Index (Charity Edition)
Self-contained interactive maturity assessment for charities. Includes Google Analytics 4 tracking (GA4) and is designed to be embedded in Wix or any host site. No build step required — just serve the HTML.

## Tech Stack

- React 19, react-router-dom 7
- Tailwind CSS 3
- lucide-react (icons)
- recharts (charts)
- CRACO build tooling

## Project Structure

```
frontend/
├── public/
│   └── data-ai-maturity.html              # Standalone HTML artifact
├── src/
│   ├── App.js                             # Routes
│   ├── index.js                           # React entry
│   └── components/
│       ├── Landing.jsx                    # Artifact library landing page
│       ├── SENDDiagnosticTool.jsx
│       └── NeurodivergentAssessment.jsx
├── tailwind.config.js
└── package.json
```

## Local Development

```bash
cd frontend
yarn install
yarn start
```

Open http://localhost:3000.

## Build

```bash
cd frontend
yarn build
```

## License

Artifact source code authored in Claude.ai. Migrated for personal use.
