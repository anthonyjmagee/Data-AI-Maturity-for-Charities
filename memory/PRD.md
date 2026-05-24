# PRD — Claude Artifact Library (Claude → GitHub Bridge)

## Original Problem Statement
User wanted to move Claude artifacts into GitHub via Emergent. Direct Claude.ai → Emergent integration is not supported, so the workflow is: paste artifact → Emergent structures it into a runnable project → user pushes via "Save to GitHub".

## Artifacts Migrated (as of 2026-01)
1. **SEND Diagnostic Tool** (React/TSX → JSX)
2. **Enhanced Clinical Neurodivergent Assessment Platform** (React/TSX → JSX, uses Recharts)
3. **Data & AI Maturity Index — Charity Edition** (Standalone HTML with GA4)

## Architecture
- React 19 SPA (CRA + CRACO)
- Tailwind CSS 3, lucide-react, recharts
- react-router-dom for multi-artifact routing
- Standalone HTML served from `frontend/public/`

## Routes
- `/` — Artifact library landing page
- `/send-diagnostic` — SEND Diagnostic Tool
- `/neuro-assessment` — Clinical Neurodivergent Assessment Platform
- `/data-ai-maturity.html` — Static HTML artifact

## What's Implemented
- Migrated 3 Claude artifacts into the project
- Built a dark-themed artifact library landing page with card-based navigation
- Verified all routes load correctly via screenshot testing
- README updated to reflect all artifacts and structure
- Lint clean on all new component files

## Next Action Items
- User to click **Save to GitHub** in the chat input to push the repo
- Continue adding more Claude artifacts on request

## Backlog / Future
- P1: Persist assessment data (currently in-memory only on both React tools)
- P1: PDF / CSV export of completed diagnostics / assessments
- P2: Deploy as a live static site (Emergent deploy or Vercel)
- P2: Auth + multi-user support
- P2: Backend for saving and sharing reports
