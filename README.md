# SEND Diagnostic Tool

An interactive diagnostic tool for evaluating **SEND (Special Educational Needs and Disabilities)** provision across Multi-Academy Trusts and individual schools. Based on the SEND Code of Practice 2015 and Ofsted Framework 2025.

Originally authored as a [Claude](https://claude.ai) artifact and migrated to a runnable React project via [Emergent](https://emergent.sh).

## Features

- **Two diagnostic levels**
  - **Executive Level (ELD)** — 8 categories covering Trust-wide strategy, governance, resources, workforce, partnerships, QA, compliance and innovation.
  - **School Level (SLD)** — 11 categories covering identification, provision, curriculum, planning, SENDCO leadership, staffing, parental engagement, multi-agency working, transitions, safeguarding and statutory duties.
- **Live compliance scoring** — Real-time per-category and overall compliance percentages.
- **Completion tracking** — See how much of the assessment is done.
- **ELD ↔ SLD alignment** — School categories show which executive category they map to.
- **Trust / School info capture** — Context-aware form fields based on the selected diagnostic level.
- **Sticky sidebar navigation** with per-category status indicators.

## Tech Stack

- React 19
- Tailwind CSS 3
- lucide-react (icons)
- react-router-dom
- CRACO (build tooling)

## Project Structure

```
frontend/
├── src/
│   ├── App.js                          # Root: renders the diagnostic tool
│   ├── index.js                        # React entry point
│   ├── index.css                       # Global styles
│   ├── App.css                         # App styles
│   └── components/
│       └── SENDDiagnosticTool.jsx      # Main diagnostic component
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

Open http://localhost:3000.

## Build

```bash
cd frontend
yarn build
```

## Credits

Framework based on the **SEND Code of Practice 2015** and **Ofsted Framework 2025**. Originally authored in Claude.ai.
