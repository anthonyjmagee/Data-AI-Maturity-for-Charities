# PRD — SEND Diagnostic Tool (Claude → GitHub Bridge)

## Original Problem Statement
User wanted to connect their personal Claude.ai account to Emergent in order to move Claude artifacts into GitHub. Direct Claude.ai connection isn't supported, so the workflow is: paste artifact → Emergent structures it into a runnable project → user pushes via "Save to GitHub".

## What Was Migrated
Artifact: **SEND Diagnostic Tool - Live Demo** (React + Tailwind + lucide-react)

## Architecture
- React 19 SPA (CRA + CRACO)
- Tailwind CSS 3
- lucide-react for icons
- react-router-dom (single route `/`)
- No backend required for this artifact

## What's Implemented (2026-01)
- Migrated artifact `.tsx` → `/app/frontend/src/components/SENDDiagnosticTool.jsx`
- Wired into `/app/frontend/src/App.js` as the root route
- Added `data-testid` attributes on all interactive elements
- Verified live preview loads at `REACT_APP_BACKEND_URL`
- Project README written at `/app/README.md`

## Features Working
- Executive (ELD) ↔ School (SLD) diagnostic level switching
- Trust/School info capture
- Per-category Yes/No assessment with clear option
- Live completion % and compliance % calculations
- Sticky sidebar navigation with per-category status indicators
- ELD ↔ SLD alignment indicators on school categories

## Next Action Items
- User to click **Save to GitHub** in the chat input to push to their repo
- (Optional) Add additional Claude artifacts the user wants migrated
- (Optional) Add export-to-PDF or save-to-backend functionality if desired

## Backlog / Future
- P1: Persist assessment data (currently in-memory only — refresh wipes answers)
- P1: PDF / CSV export of completed diagnostic
- P2: Multi-user support with auth
- P2: Compare reports across schools / over time
- P2: Email report sharing
