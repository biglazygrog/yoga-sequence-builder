import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import PoseViewer from './components/PoseViewer/PoseViewer'
import SequenceSelector from './components/SequenceSelector/SequenceSelector'
import { POSES } from './data/poses'
import { PREBUILT_SEQUENCES } from './data/sequences'

const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

// ── App ─────────────────────────────────────────────────────────────────────
// Mobile-first layout. Warm dark background #17131f. Two views:
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

  const glassPanel = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  }

  return (
    <div
      className="flex flex-col min-h-screen max-h-screen overflow-hidden"
      style={{ background: '#17131f' }}
    >

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5 py-4"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(23,19,31,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <Leaf size={18} style={{ color: '#9fb8a3' }} aria-hidden />
          <div>
            <h1 style={{ color: '#f7f2ee', fontSize: '14px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              Rocket Yoga
            </h1>
            <p style={{ color: '#b9adbf', fontSize: '10px', lineHeight: 1, marginTop: '1px', letterSpacing: '0.06em' }}>
              SEQUENCE BUILDER
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <nav
          className="flex gap-1 rounded-full p-1"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          role="tablist"
        >
          {[['choose', 'Series'], ['practice', 'Practice']].map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                tab === key
                  ? { background: '#b9a7e8', color: '#17131f' }
                  : { color: '#b9adbf' }
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

          {/* Compact figure preview */}
          <div
            className="flex-shrink-0 mx-4 mt-3 rounded-3xl overflow-hidden"
            style={{ ...glassPanel, height: '256px' }}
          >
            <PoseViewer
              pose={selectedPose}
              showTimer={false}
              onNext={() => {}}
              onPrev={() => {}}
            />
          </div>

          {/* Pose name under preview */}
          <AnimatePresence mode="wait">
            {selectedPose && (
              <motion.div
                key={selectedPose.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex-shrink-0 text-center py-2.5 px-4"
              >
                <p style={{ color: '#f7f2ee', fontSize: '15px', fontWeight: 600, lineHeight: 1.3 }}>
                  {selectedPose.englishName}
                </p>
                <p style={{ color: '#b9adbf', fontSize: '11px', fontStyle: 'italic', marginTop: '2px' }}>
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
            <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center px-8">
              <div style={{ fontSize: '56px' }}>🧘</div>
              <p style={{ color: '#b9adbf', fontSize: '14px', lineHeight: 1.6 }}>
                Choose a series to begin your practice
              </p>
              <button
                onClick={() => setTab('choose')}
                className="transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #b9a7e8, #9b86d9)',
                  color: '#17131f',
                  borderRadius: '999px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
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

              {/* ── Progress strip (meditation beads) ──────────────── */}
              <div
                ref={progressRef}
                className="flex-shrink-0 flex gap-2 overflow-x-auto px-4 py-3"
                style={{
                  background: '#120e1a',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  scrollbarWidth: 'none',
                }}
              >
                {sequence.map((pose, i) => (
                  <button
                    key={i}
                    data-active={i === practiceIndex}
                    onClick={() => setPracticeIndex(i)}
                    className="flex-shrink-0 flex flex-col items-center gap-0.5
                      px-2 py-1.5 rounded-2xl min-w-[52px] max-w-[64px]
                      border transition-all duration-300"
                    style={
                      i === practiceIndex
                        ? {
                            background: 'rgba(185,167,232,0.18)',
                            borderColor: 'rgba(185,167,232,0.45)',
                            transform: 'scale(1.08)',
                            boxShadow: '0 0 14px rgba(185,167,232,0.22)',
                          }
                        : i < practiceIndex
                        ? {
                            background: 'rgba(255,255,255,0.025)',
                            borderColor: 'rgba(255,255,255,0.05)',
                            opacity: 0.32,
                          }
                        : {
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.08)',
                          }
                    }
                  >
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>{pose.emoji}</span>
                    <span
                      className="text-[9px] text-center leading-tight w-full line-clamp-2 mt-0.5"
                      style={{ color: i === practiceIndex ? '#d0c4f5' : '#8a7d94' }}
                    >
                      {pose.englishName}
                    </span>
                  </button>
                ))}
              </div>

              {/* Pose counter */}
              <p
                className="flex-shrink-0 text-center text-[10px] py-1"
                style={{ background: '#120e1a', color: 'rgba(185,167,232,0.38)', letterSpacing: '0.08em' }}
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
