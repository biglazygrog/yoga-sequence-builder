import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import PoseViewer from './components/PoseViewer/PoseViewer'
import SequenceSelector from './components/SequenceSelector/SequenceSelector'
import { POSES } from './data/poses'
import { PREBUILT_SEQUENCES } from './data/sequences'

const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

// ── App ─────────────────────────────────────────────────────────────────────
// Mobile-first layout. Dark background #1a1a2e. Two views:
//   'choose'   — compact figure preview (no timer) + sequence cards
//   'practice' — full-screen PoseViewer (timer + nav) + scrollable progress strip

export default function App() {
  const [tab, setTab]                     = useState('choose')
  const [sequence, setSequence]           = useState([])
  const [selectedPose, setSelectedPose]   = useState(POSES[0])
  const [practiceIndex, setPracticeIndex] = useState(0)
  const progressRef = useRef(null)

  const practicePose = sequence[practiceIndex] ?? null

  // Scroll active chip into view
  useEffect(() => {
    if (!progressRef.current) return
    progressRef.current
      .querySelector('[data-active="true"]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [practiceIndex])

  const goNext = () => {
    if (!sequence.length) return
    setPracticeIndex(i => (i + 1) % sequence.length)
  }
  const goPrev = () => {
    if (!sequence.length) return
    setPracticeIndex(i => (i - 1 + sequence.length) % sequence.length)
  }

  const loadPreset = preset => {
    const poses = preset.poseIds.map(id => POSE_BY_ID[id]).filter(Boolean)
    setSequence(poses)
    setSelectedPose(poses[0])
    setPracticeIndex(0)
    setTab('practice')
  }

  return (
    <div
      className="flex flex-col min-h-screen max-h-screen overflow-hidden"
      style={{ background: '#1a1a2e' }}
    >

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid #2a2a5e' }}
      >
        <div className="flex items-center gap-2">
          <Rocket size={20} className="text-[#9C6FFF]" aria-hidden />
          <div>
            <h1 className="text-sm font-bold leading-tight text-white">Rocket Yoga</h1>
            <p className="text-[10px] leading-none" style={{ color: '#6a6a9e' }}>
              Sequence Builder
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <nav
          className="flex gap-1 rounded-xl p-1"
          style={{ background: '#16213e' }}
          role="tablist"
        >
          {[['choose', 'Series'], ['practice', 'Practice']].map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                tab === key
                  ? { background: '#9C6FFF', color: '#fff' }
                  : { color: '#8888a8' }
              }
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Choose tab ──────────────────────────────────────────────── */}
      {tab === 'choose' && (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">

          {/* Compact figure preview — no timer */}
          <div
            className="flex-shrink-0 mx-4 mt-3 rounded-2xl overflow-hidden"
            style={{ background: '#16213e', height: '256px' }}
          >
            <PoseViewer
              pose={selectedPose}
              showTimer={false}
              onNext={() => {}}
              onPrev={() => {}}
            />
          </div>

          {/* Pose name under the preview */}
          <AnimatePresence mode="wait">
            {selectedPose && (
              <motion.div
                key={selectedPose.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="flex-shrink-0 text-center py-2 px-4"
              >
                <p className="text-sm font-semibold text-white leading-tight">
                  {selectedPose.englishName}
                </p>
                <p className="text-xs italic mt-0.5" style={{ color: '#6a6a9e' }}>
                  {selectedPose.sanskritName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Series cards */}
          <main className="flex-1 overflow-hidden px-4 pb-4 min-h-0" role="main">
            <SequenceSelector onSelect={loadPreset} />
          </main>
        </div>
      )}

      {/* ── Practice tab ────────────────────────────────────────────── */}
      {tab === 'practice' && (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">

          {/* Empty state */}
          {sequence.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center px-6">
              <div className="text-6xl">🧘</div>
              <p className="text-slate-400 text-sm">Choose a series to begin your practice</p>
              <button
                onClick={() => setTab('choose')}
                className="px-6 py-2.5 rounded-2xl text-white text-sm font-semibold
                  transition-all active:scale-95"
                style={{ background: '#9C6FFF' }}
              >
                Choose Series →
              </button>
            </div>
          )}

          {/* Practice mode */}
          {sequence.length > 0 && (
            <>
              {/* PoseViewer fills available space */}
              <div style={{ flex: '1 1 0', minHeight: 0 }}>
                <PoseViewer
                  pose={practicePose}
                  onNext={goNext}
                  onPrev={goPrev}
                  showTimer
                />
              </div>

              {/* ── Progress strip ───────────────────────────────── */}
              <div
                ref={progressRef}
                className="flex-shrink-0 flex gap-2 overflow-x-auto px-4 py-2"
                style={{
                  background: '#0d0d1e',
                  borderTop: '1px solid #2a2a5e',
                  scrollbarWidth: 'none',
                }}
              >
                {sequence.map((pose, i) => (
                  <button
                    key={i}
                    data-active={i === practiceIndex}
                    onClick={() => setPracticeIndex(i)}
                    className="flex-shrink-0 flex flex-col items-center gap-0.5
                      px-2 py-1.5 rounded-xl min-w-[52px] max-w-[64px]
                      border-2 transition-all duration-200"
                    style={
                      i === practiceIndex
                        ? { background: 'rgba(156,111,255,0.25)', borderColor: '#9C6FFF', transform: 'scale(1.06)' }
                        : i < practiceIndex
                        ? { background: '#16213e', borderColor: '#2a2a5e', opacity: 0.4 }
                        : { background: '#16213e', borderColor: '#2a2a5e' }
                    }
                  >
                    <span className="text-lg leading-none">{pose.emoji}</span>
                    <span
                      className="text-[9px] text-center leading-tight w-full line-clamp-2 mt-0.5"
                      style={{ color: i === practiceIndex ? '#c4aaff' : '#8888a8' }}
                    >
                      {pose.englishName}
                    </span>
                  </button>
                ))}
              </div>

              {/* Pose counter */}
              <p
                className="flex-shrink-0 text-center text-[10px] py-1"
                style={{ background: '#0d0d1e', color: '#4a4a7e' }}
              >
                {practiceIndex + 1} / {sequence.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
