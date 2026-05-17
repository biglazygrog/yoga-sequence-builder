# yoga-sequence-builder — project memory

## What this is
A React PWA Rocket yoga sequence builder with flat illustrated pose
animations (Rive-ready), English pose names, and an adjustable hold
timer. Mobile-first, designed for phone use primarily, wider public
eventually.

## Tech stack
- React + Vite
- **@rive-app/react-canvas** (Rive animation runtime — Three.js removed)
- Framer Motion (UI transitions)
- Tailwind CSS v4
- Vite PWA plugin
- Hosting: Vercel (planned)
- Backend: Supabase (planned, Phase 3)

## Animation approach
### Current (placeholder)
`FlatFigure.jsx` renders a vibrant SVG character directly from the 15
joint positions stored in `poses.js`. Colours: purple top (#9C6FFF),
teal leggings (#26C6DA), peach skin (#F5C5A3). CSS keyframes provide
a looping float + sway idle animation.

### When Rive files are ready
Drop `.riv` files into `public/animations/{pose.id}.riv`.  
Then in `PoseAnimation.jsx`, uncomment the `useRive` block — it will
automatically load the Rive file and fall back to `FlatFigure` if the
file is missing. No other changes required.

## Current status
- Full Rocket I / II / III pose library (45 poses with joint data)
- Flat illustrated SVG figure in PoseViewer (CSS idle animation, smooth lerp between poses)
- Series selector (choose a preset sequence → enters practice mode)
- Adjustable hold timer in PoseViewer: 5–60 s, default 30 s, ±5 s buttons
- Countdown ring timer with play / pause / reset in practice mode
- Prev / Next navigation built into PoseViewer
- Mobile-first full-screen practice layout; compact preview in choose mode
- Dark theme: #1a1a2e background, #9C6FFF purple + #26C6DA teal accents

## Known issues / solutions
- Codespace times out after inactivity — just run `claude` in terminal
  to restart, no reinstall needed
- localhost OAuth redirect fails — paste the claude.ai URL directly
  into browser instead

## Planned phases
- Phase 1: Single pose displaying with figure + timer ✅
- Phase 2: Full Rocket series, sequence builder ✅
- Phase 2.5: Rive animation swap-in (sourcing .riv files) ← current
- Phase 3: User accounts (Supabase), share sequences, public launch

## Rocket yoga poses
- Source: Rocket I, II, III (Larry Schultz system)
- All pose names in English (Sanskrit shown as subtitle)
- Joint positions hand-authored in src/data/poses.js (15 joints per pose)
- series field on each pose: 'surya' | 'rocket1' | 'rocket2' | 'rocket3'

## Repo structure
yoga-sequence-builder/
├── public/
│   └── animations/          ← drop {pose.id}.riv files here when ready
├── src/
│   ├── components/
│   │   ├── PoseViewer/
│   │   │   ├── PoseViewer.jsx    ← full panel: figure + timer + nav
│   │   │   ├── PoseAnimation.jsx ← Rive wrapper (SVG fallback)
│   │   │   └── FlatFigure.jsx    ← illustrated SVG character
│   │   ├── Timer/            ← standalone timer (kept, not used in main flow)
│   │   ├── SequenceSelector/ ← preset series cards
│   │   ├── SequenceBuilder/  ← custom sequence builder (not wired to App yet)
│   │   └── PoseCard/         ← single pose row with series badges
│   ├── data/
│   │   ├── poses.js          ← 45 poses, SERIES_LABELS, SERIES_COLORS
│   │   └── sequences.js      ← pre-built Rocket I / II / III sequences
│   ├── hooks/
│   │   └── useTimer.js
│   ├── App.jsx
│   └── main.jsx
