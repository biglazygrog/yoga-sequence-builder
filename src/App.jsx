import { useState } from 'react'
import PoseViewer from './components/PoseViewer/PoseViewer'
import Timer from './components/Timer/Timer'
import SequenceBuilder from './components/SequenceBuilder/SequenceBuilder'
import { POSES } from './data/poses'

// The app has two top-level tabs:
//  "Build" — browse the library, preview poses in the 3D viewer, build a sequence
//  "Practice" — cycle through the sequence with the countdown timer

export default function App() {
  const [tab, setTab] = useState('build')
  const [sequence, setSequence]         = useState([])
  const [selectedPose, setSelectedPose] = useState(POSES[0])
  const [practiceIndex, setPracticeIndex] = useState(0)

  // The 3D viewer shows the selected browse pose in build mode,
  // or the current practice pose in practice mode
  const viewerPose = tab === 'practice' && sequence.length > 0
    ? sequence[practiceIndex]
    : selectedPose

  const goNext = () => {
    if (sequence.length === 0) return
    setPracticeIndex(i => (i + 1) % sequence.length)
  }

  const goPrev = () => {
    if (sequence.length === 0) return
    setPracticeIndex(i => (i - 1 + sequence.length) % sequence.length)
  }

  const startPractice = () => {
    setPracticeIndex(0)
    setTab('practice')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col max-h-screen overflow-hidden">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>🚀</span>
          <div>
            <h1 className="text-base font-bold leading-tight">Rocket Yoga</h1>
            <p className="text-[10px] text-slate-500 leading-none">Sequence Builder</p>
          </div>
        </div>

        <nav className="flex gap-1 bg-slate-800 rounded-xl p-1" role="tablist">
          {['build', 'practice'].map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors
                ${tab === t
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      {/* ── 3D Viewer (always visible) ─────────────────────────────────── */}
      <div className="flex-shrink-0 h-52 mx-4 mt-3 rounded-xl overflow-hidden bg-slate-950">
        <PoseViewer pose={viewerPose} />
      </div>

      {/* Pose name under the viewer */}
      {viewerPose && (
        <div className="flex-shrink-0 flex items-center justify-center gap-3 py-2 px-4">
          <span className="text-lg">{viewerPose.emoji}</span>
          <div className="text-center">
            <p className="text-sm font-semibold text-white leading-tight">{viewerPose.englishName}</p>
            <p className="text-xs text-slate-500 italic">{viewerPose.sanskritName}</p>
          </div>
        </div>
      )}

      {/* ── Tab content ───────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden px-4 pb-4" role="tabpanel">
        {tab === 'build' ? (
          <SequenceBuilder
            sequence={sequence}
            onSequenceChange={setSequence}
            onSelectPose={setSelectedPose}
            selectedPose={selectedPose}
            onPractice={startPractice}
          />
        ) : (
          /* ── Practice mode ─────────────────────────────────────────── */
          <div className="h-full flex flex-col overflow-y-auto">
            {sequence.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <div className="text-5xl">🧘</div>
                <p className="text-slate-400 text-sm">Build a sequence first</p>
                <button
                  onClick={() => setTab('build')}
                  className="px-4 py-2 bg-indigo-600 rounded-xl text-white text-sm font-medium hover:bg-indigo-500"
                >
                  Go to Builder →
                </button>
              </div>
            ) : (
              <>
                <Timer
                  pose={sequence[practiceIndex]}
                  onNext={goNext}
                  onPrev={goPrev}
                />

                {/* Progress dots — tap to jump to any pose */}
                <div className="flex gap-2 justify-center flex-wrap py-2">
                  {sequence.map((pose, i) => (
                    <button
                      key={i}
                      onClick={() => setPracticeIndex(i)}
                      title={pose.englishName}
                      className={`text-xl w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-200 border-2
                        ${i === practiceIndex
                          ? 'bg-indigo-600 border-indigo-400 scale-110'
                          : i < practiceIndex
                          ? 'bg-slate-800 border-slate-700 opacity-40'
                          : 'bg-slate-800 border-slate-700'
                        }`}
                    >
                      {pose.emoji}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
