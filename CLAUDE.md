# yoga-sequence-builder — project memory

## What this is
A React PWA Rocket yoga sequence builder with 3D realistic human pose
animations, English pose names, and adjustable hold timers.
Mobile-first, designed for phone use primarily, wider public
eventually.

## Tech stack
- React + Vite
- Three.js (3D pose animations)
- Tailwind CSS v4
- Vite PWA plugin
- Hosting: Vercel (planned)
- Backend: Supabase (planned, Phase 3)

## Current status
- Full Rocket I / II / III pose library (45 poses with joint data)
- 3D cylinder-limb figure in PoseViewer (drag to rotate, auto-spin)
- Series filter chips (Surya A/B, Rocket I, II, III) + category dropdown
- Per-pose adjustable hold timer in sequence strip (±5s steps)
- Countdown ring timer in practice mode with prev/next controls

## Known issues / solutions
- Codespace times out after inactivity — just run `claude` in terminal
  to restart, no reinstall needed
- localhost OAuth redirect fails — paste the claude.ai URL directly
  into browser instead

## Planned phases
- Phase 1: Single pose displaying with 3D figure + timer ✅
- Phase 2: Full Rocket series, sequence builder ✅
- Phase 3: User accounts (Supabase), share sequences, public launch

## Rocket yoga poses
- Source: Rocket I, II, III (Larry Schultz system)
- All pose names in English (Sanskrit shown as subtitle)
- Joint positions hand-authored in src/data/poses.js (15 joints per pose)
- series field on each pose: 'surya' | 'rocket1' | 'rocket2' | 'rocket3'

## Repo structure
yoga-sequence-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── PoseViewer/   ← Three.js cylinder skeleton viewer
│   │   ├── Timer/        ← SVG ring countdown
│   │   ├── SequenceBuilder/  ← library browse + sequence strip
│   │   └── PoseCard/     ← single pose row with series badges
│   ├── data/
│   │   └── poses.js      ← 45 poses, SERIES_LABELS, SERIES_COLORS
│   ├── hooks/
│   │   └── useTimer.js
│   ├── App.jsx
│   └── main.jsx
