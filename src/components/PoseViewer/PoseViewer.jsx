import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react'
import { useTimer } from '../../hooks/useTimer'
import PoseAnimation from './PoseAnimation'
import { ease } from '../ui/animations'

const LERP   = 0.1
const RADIUS = 40
const CIRC   = 2 * Math.PI * RADIUS

const STATUS_LABEL = {
  idle:    'ready',
  running: 'hold',
  paused:  'paused',
  done:    'complete',
}

export default function PoseViewer({ pose, onNext, onPrev, showTimer = true }) {
  const initJoints = () =>
    pose?.joints?.map(p => [...p]) ?? Array.from({ length: 15 }, () => [0, 0, 0])

  const currentRef = useRef(initJoints())
  const targetRef  = useRef(initJoints())
  const [joints, setJoints] = useState(initJoints)
  const snappedRef = useRef(!!pose?.joints)
  const rafRef     = useRef(null)

  const [holdDuration, setHoldDuration] = useState(30)
  const { timeLeft, status, progress, start, pause, reset } =
    useTimer(holdDuration, onNext)

  // Lerp animation loop
  useEffect(() => {
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      let moved = false
      const c = currentRef.current
      const t = targetRef.current
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 3; j++) {
          const d = t[i][j] - c[i][j]
          if (Math.abs(d) > 0.0008) { c[i][j] += d * LERP; moved = true }
          else c[i][j] = t[i][j]
        }
      }
      if (moved) setJoints(c.map(p => [...p]))
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Snap on first pose, lerp after
  useEffect(() => {
    if (!pose?.joints) return
    pose.joints.forEach((pos, i) => {
      targetRef.current[i] = [...pos]
      if (!snappedRef.current) currentRef.current[i] = [...pos]
    })
    if (!snappedRef.current) {
      setJoints(pose.joints.map(p => [...p]))
      snappedRef.current = true
    }
  }, [pose])

  // Reset timer on pose change
  const resetRef = useRef(reset)
  useEffect(() => { resetRef.current = reset }, [reset])
  useEffect(() => { resetRef.current() }, [pose?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const adjustHold = delta =>
    setHoldDuration(d => Math.min(60, Math.max(5, d + delta)))

  const minutes    = Math.floor(timeLeft / 60)
  const seconds    = timeLeft % 60
  const dashOffset = CIRC * (1 - progress)
  const ringColor  = status === 'done' ? '#a3c4a8' : '#c4b5fd'

  const glassBtn = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.11)',
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', width:'100%', height:'100%', background:'#1a1628' }}>

      {/* Figure */}
      <div style={{ flex:'1 1 0', minHeight:0 }}>
        <PoseAnimation joints={joints} poseId={pose?.id} />
      </div>

      {/* Bottom panel — slides up on mount */}
      <motion.div
        className="flex-shrink-0"
        style={{
          padding: showTimer ? '16px 20px' : '10px 20px 14px',
          paddingBottom: showTimer
            ? 'max(env(safe-area-inset-bottom, 0px), 20px)'
            : '14px',
          background: 'linear-gradient(to top, #120f1e 62%, transparent)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
      >

        {/* Pose name */}
        <div className="text-center">
          <motion.h2
            key={pose?.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{
              color: '#f0ece8',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              fontSize: showTimer ? '22px' : '16px',
            }}
          >
            {pose?.englishName ?? '—'}
          </motion.h2>
          <motion.p
            key={`${pose?.id}-sub`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease, delay: 0.08 }}
            style={{ color:'#6b6580', fontSize:'12px', fontStyle:'italic', marginTop:'4px', letterSpacing:'0.01em' }}
          >
            {pose?.sanskritName}
          </motion.p>
        </div>

        {showTimer && (
          <>
            {/* Timer row */}
            <div className="flex items-center justify-between" style={{ gap:'12px' }}>

              {/* −5 s */}
              <motion.button
                onClick={() => adjustHold(-5)}
                className="flex items-center justify-center"
                style={{ ...glassBtn, width:'46px', height:'46px', borderRadius:'999px', color:'#a3c4a8', flexShrink:0 }}
                whileHover={{ scale:1.08, y:-1, transition:{ duration:0.18, ease } }}
                whileTap={{ scale:0.9 }}
                aria-label="Decrease hold 5 seconds"
              >
                <Minus size={17} />
              </motion.button>

              {/* Ring */}
              <div className="relative flex-shrink-0" style={{ width:'128px', height:'128px' }}>
                {/* Breathing ring glow — Framer Motion, no CSS class */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background:`radial-gradient(circle, ${ringColor}38 0%, transparent 68%)` }}
                  animate={{ scale:[1, 1.14, 1], opacity:[0.4, 0.9, 0.4] }}
                  transition={{ duration:4, repeat:Infinity, ease:'easeInOut', repeatType:'mirror' }}
                />
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                  aria-label={`${minutes}:${String(seconds).padStart(2,'0')} remaining`}
                >
                  <circle cx="50" cy="50" r={RADIUS}
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6.5" />
                  <circle cx="50" cy="50" r={RADIUS}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={dashOffset}
                    style={{ transition:'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ color:'#f0ece8', fontSize:'24px', fontVariantNumeric:'tabular-nums', fontWeight:300, letterSpacing:'-0.03em', lineHeight:1, fontFamily:'system-ui, sans-serif' }}>
                    {String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}
                  </span>
                  <span style={{ color:ringColor, fontSize:'9px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', marginTop:'6px', opacity:0.9 }}>
                    {STATUS_LABEL[status]}
                  </span>
                  <span style={{ color:'#4a4560', fontSize:'9px', marginTop:'3px' }}>
                    {holdDuration}s
                  </span>
                </div>
              </div>

              {/* +5 s */}
              <motion.button
                onClick={() => adjustHold(+5)}
                className="flex items-center justify-center"
                style={{ ...glassBtn, width:'46px', height:'46px', borderRadius:'999px', color:'#a3c4a8', flexShrink:0 }}
                whileHover={{ scale:1.08, y:-1, transition:{ duration:0.18, ease } }}
                whileTap={{ scale:0.9 }}
                aria-label="Increase hold 5 seconds"
              >
                <Plus size={17} />
              </motion.button>
            </div>

            {/* Play / Pause / Reset */}
            <div className="flex items-center justify-center gap-3">
              <motion.button
                onClick={reset}
                className="flex items-center justify-center"
                style={{ ...glassBtn, width:'40px', height:'40px', borderRadius:'999px', color:'#6b6580' }}
                whileHover={{ scale:1.1, transition:{ duration:0.18, ease } }}
                whileTap={{ scale:0.88 }}
                aria-label="Reset timer"
              >
                <RotateCcw size={14} />
              </motion.button>

              <motion.button
                onClick={status === 'running' ? pause : start}
                className="flex items-center gap-2 font-semibold"
                style={{
                  background: '#c4b5fd',
                  color: '#160f2a',
                  borderRadius: '999px',
                  padding: '0 32px',
                  height: '44px',
                  fontSize: '14px',
                  letterSpacing: '0.01em',
                  boxShadow: '0 4px 18px rgba(196,181,253,0.28)',
                }}
                whileHover={{ y:-2, boxShadow:'0 8px 28px rgba(196,181,253,0.42)', transition:{ duration:0.2, ease } }}
                whileTap={{ scale:0.96 }}
                aria-label={status === 'running' ? 'Pause' : 'Start'}
              >
                {status === 'running'
                  ? <><Pause size={15}/> Pause</>
                  : <><Play  size={15}/> Start</>}
              </motion.button>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2.5">
              <motion.button
                onClick={onPrev}
                className="flex-1 flex items-center justify-center gap-1.5 font-medium"
                style={{ ...glassBtn, height:'44px', borderRadius:'999px', color:'#9d98a8', fontSize:'14px' }}
                whileHover={{ y:-1, transition:{ duration:0.18, ease } }}
                whileTap={{ scale:0.97 }}
                aria-label="Previous pose"
              >
                <ChevronLeft size={16} /> Prev
              </motion.button>

              <motion.button
                onClick={onNext}
                className="flex-1 flex items-center justify-center gap-1.5 font-semibold"
                style={{
                  background: 'rgba(196,181,253,0.14)',
                  border: '1px solid rgba(196,181,253,0.3)',
                  height: '44px',
                  borderRadius: '999px',
                  color: '#ddd6fe',
                  fontSize: '14px',
                }}
                whileHover={{ y:-1, background:'rgba(196,181,253,0.22)', transition:{ duration:0.18, ease } }}
                whileTap={{ scale:0.97 }}
                aria-label="Next pose"
              >
                Next <ChevronRight size={16} />
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
