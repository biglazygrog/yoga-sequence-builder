import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Sparkles } from 'lucide-react'
import PoseViewer from './components/PoseViewer/PoseViewer'
import SequenceSelector from './components/SequenceSelector/SequenceSelector'
import { POSES } from './data/poses'
import { PREBUILT_SEQUENCES } from './data/sequences'
import { ease, FadeInSection, PoseChip } from './components/ui/animations'

const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

export default function App() {
  const [tab, setTab]                     = useState('choose')
  const [sequence, setSequence]           = useState([])
  const [selectedPose, setSelectedPose]   = useState(POSES[0])
  const [practiceIndex, setPracticeIndex] = useState(0)
  const progressRef = useRef(null)

  const practicePose = sequence[practiceIndex] ?? null

  useEffect(() => {
    if (!progressRef.current) return
    progressRef.current
      .querySelector('[data-active="true"]')
      ?.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' })
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
      style={{ background:'#1a1628' }}
    >

      {/* ── Header ────────────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between"
        style={{
          padding:'14px 20px',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
          background:'rgba(26,22,40,0.94)',
          backdropFilter:'blur(20px)',
          WebkitBackdropFilter:'blur(20px)',
        }}
      >
        <FadeInSection className="flex items-center gap-2.5">
          <Leaf size={17} style={{ color:'#a3c4a8' }} aria-hidden />
          <div>
            <h1 style={{ color:'#f0ece8', fontSize:'14px', fontWeight:600, lineHeight:1.2, letterSpacing:'-0.02em' }}>
              Rocket Yoga
            </h1>
            <p style={{ color:'#4a4560', fontSize:'9.5px', lineHeight:1, marginTop:'2px', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              Sequence Builder
            </p>
          </div>
        </FadeInSection>

        {/* Tab switcher */}
        <FadeInSection delay={0.05}>
          <nav
            className="flex gap-1 p-1"
            style={{ background:'rgba(255,255,255,0.05)', borderRadius:'999px', border:'1px solid rgba(255,255,255,0.07)' }}
            role="tablist"
          >
            {[['choose','Series'],['practice','Practice']].map(([key, label]) => (
              <motion.button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                style={{
                  padding:'6px 16px',
                  borderRadius:'999px',
                  fontSize:'13px',
                  fontWeight:500,
                  letterSpacing:'0.01em',
                  ...(tab === key
                    ? { background:'#c4b5fd', color:'#160f2a' }
                    : { color:'#6b6580' }
                  ),
                }}
                whileTap={{ scale:0.95 }}
                transition={{ duration:0.15 }}
              >
                {label}
              </motion.button>
            ))}
          </nav>
        </FadeInSection>
      </header>

      {/* ── Tab views — AnimatePresence for cross-fade slide ─────── */}
      <AnimatePresence mode="wait" initial={false}>

        {/* ── Choose tab ────────────────────────────────────────── */}
        {tab === 'choose' && (
          <motion.div
            key="choose"
            className="flex-1 flex flex-col overflow-hidden min-h-0"
            initial={{ opacity:0, x:-20 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:-20 }}
            transition={{ duration:0.28, ease }}
          >

            {/* Figure preview */}
            <FadeInSection
              className="flex-shrink-0 overflow-hidden"
              style={{
                margin:'14px 16px 0',
                borderRadius:'24px',
                background:'#231e34',
                border:'1px solid rgba(255,255,255,0.07)',
                height:'248px',
              }}
            >
              <PoseViewer
                pose={selectedPose}
                showTimer={false}
                onNext={() => {}}
                onPrev={() => {}}
              />
            </FadeInSection>

            {/* Pose name */}
            <AnimatePresence mode="wait">
              {selectedPose && (
                <motion.div
                  key={selectedPose.id}
                  initial={{ opacity:0, y:5 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-5 }}
                  transition={{ duration:0.22, ease }}
                  className="flex-shrink-0 text-center"
                  style={{ padding:'12px 16px 8px' }}
                >
                  <p style={{ color:'#f0ece8', fontSize:'16px', fontWeight:600, lineHeight:1.3, letterSpacing:'-0.01em' }}>
                    {selectedPose.englishName}
                  </p>
                  <p style={{ color:'#6b6580', fontSize:'11px', fontStyle:'italic', marginTop:'3px', letterSpacing:'0.02em' }}>
                    {selectedPose.sanskritName}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Series cards */}
            <main className="flex-1 overflow-hidden min-h-0" style={{ padding:'0 16px 16px' }} role="main">
              <SequenceSelector onSelect={loadPreset} />
            </main>
          </motion.div>
        )}

        {/* ── Practice tab ──────────────────────────────────────── */}
        {tab === 'practice' && (
          <motion.div
            key="practice"
            className="flex-1 flex flex-col overflow-hidden min-h-0"
            initial={{ opacity:0, x:20 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:20 }}
            transition={{ duration:0.28, ease }}
          >

            {/* Empty state */}
            {sequence.length === 0 && (
              <motion.div
                className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-8"
                initial={{ opacity:0, y:16 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.45, ease }}
              >
                <motion.div
                  style={{
                    width:'72px', height:'72px', borderRadius:'999px',
                    background:'rgba(196,181,253,0.1)',
                    border:'1px solid rgba(196,181,253,0.2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}
                  animate={{ scale:[1, 1.06, 1], opacity:[0.7, 1, 0.7] }}
                  transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
                >
                  <Sparkles size={28} style={{ color:'#c4b5fd' }} />
                </motion.div>

                <div>
                  <p style={{ color:'#f0ece8', fontSize:'18px', fontWeight:600, letterSpacing:'-0.01em', marginBottom:'8px' }}>
                    Ready to practice?
                  </p>
                  <p style={{ color:'#6b6580', fontSize:'13px', lineHeight:1.6 }}>
                    Choose a series to begin
                  </p>
                </div>

                <motion.button
                  onClick={() => setTab('choose')}
                  style={{
                    background:'#c4b5fd', color:'#160f2a', borderRadius:'999px',
                    padding:'13px 32px', fontSize:'14px', fontWeight:600, letterSpacing:'0.01em',
                    boxShadow:'0 4px 20px rgba(196,181,253,0.28)',
                  }}
                  whileHover={{ y:-2, boxShadow:'0 8px 28px rgba(196,181,253,0.42)', transition:{ duration:0.2, ease } }}
                  whileTap={{ scale:0.95 }}
                >
                  Choose Series
                </motion.button>
              </motion.div>
            )}

            {/* Practice mode */}
            {sequence.length > 0 && (
              <>
                {/* PoseViewer — absolute-fill guarantees height:100% resolves */}
                <div style={{ flex:'1 1 0', minHeight:0, position:'relative' }}>
                  <div style={{ position:'absolute', inset:0 }}>
                    <PoseViewer
                      pose={practicePose}
                      onNext={goNext}
                      onPrev={goPrev}
                      showTimer
                    />
                  </div>
                </div>

                {/* ── Progress strip — premium horizontal PoseChips ─ */}
                <motion.div
                  ref={progressRef}
                  className="flex-shrink-0 flex gap-2 overflow-x-auto"
                  style={{
                    background:'#120f1e',
                    borderTop:'1px solid rgba(255,255,255,0.06)',
                    padding:'10px 16px',
                    scrollbarWidth:'none',
                    WebkitOverflowScrolling:'touch',
                  }}
                  initial={{ opacity:0, y:12 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.4, ease, delay:0.15 }}
                >
                  {sequence.map((pose, i) => {
                    const isActive = i === practiceIndex
                    const isPast   = i < practiceIndex
                    return (
                      <PoseChip
                        key={i}
                        dataActive={isActive}
                        isActive={isActive}
                        isPast={isPast}
                        onClick={() => setPracticeIndex(i)}
                      >
                        {/* Dot */}
                        <span
                          className="flex-shrink-0 rounded-full"
                          style={{
                            width:'5px', height:'5px',
                            background: isActive ? '#c4b5fd' : isPast ? '#2e2a40' : '#3d3858',
                          }}
                        />
                        {/* Name */}
                        <span style={{
                          fontSize:'11px',
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? '#ddd6fe' : '#5c5870',
                          whiteSpace:'nowrap',
                          letterSpacing:'0.01em',
                        }}>
                          {pose.englishName}
                        </span>
                      </PoseChip>
                    )
                  })}
                </motion.div>

                {/* Pose counter */}
                <div style={{ background:'#120f1e', padding:'5px 0 8px' }}>
                  <p style={{ textAlign:'center', fontSize:'10px', color:'#3d3858', letterSpacing:'0.12em', textTransform:'uppercase' }}>
                    {practiceIndex + 1} of {sequence.length}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
