import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react'
import { useTimer } from '../../hooks/useTimer'
import PoseAnimation from './PoseAnimation'

const LERP   = 0.1
const RADIUS = 40
const CIRC   = 2 * Math.PI * RADIUS

const STATUS_LABEL = {
  idle:    'ready',
  running: 'hold',
  paused:  'paused',
  done:    'complete',
}

// ── PoseViewer ──────────────────────────────────────────────────────────────
// Self-contained practice panel. Contains:
//   • animated flat illustration (via PoseAnimation)
//   • pose name + Sanskrit subtitle
//   • adjustable hold timer  (5–60 s, default 30 s, ±5 s buttons)
//   • play / pause / reset controls
//   • prev / next navigation
//
// Props
//   pose       – current pose object (from poses.js)
//   onNext     – called when Next is pressed or timer completes
//   onPrev     – called when Prev is pressed
//   showTimer  – set false to render figure + name only (choose-mode preview)

export default function PoseViewer({ pose, onNext, onPrev, showTimer = true }) {
  const initJoints = () =>
    pose?.joints?.map(p => [...p]) ?? Array.from({ length: 15 }, () => [0, 0, 0])

  const currentRef  = useRef(initJoints())
  const targetRef   = useRef(initJoints())
  const [joints, setJoints] = useState(initJoints)
  const snappedRef  = useRef(!!pose?.joints)
  const rafRef      = useRef(null)

  const [holdDuration, setHoldDuration] = useState(30)
  const { timeLeft, status, progress, start, pause, reset } =
    useTimer(holdDuration, onNext)

  // Animation loop (lerp current → target)
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

  // Snap on first pose, lerp on subsequent changes
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

  // Reset timer when navigating to a new pose
  const resetRef = useRef(reset)
  useEffect(() => { resetRef.current = reset }, [reset])
  useEffect(() => { resetRef.current() }, [pose?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const adjustHold = delta =>
    setHoldDuration(d => Math.min(60, Math.max(5, d + delta)))

  const minutes    = Math.floor(timeLeft / 60)
  const seconds    = timeLeft % 60
  const dashOffset = CIRC * (1 - progress)
  const ringColor  = status === 'done' ? '#9fb8a3' : '#b9a7e8'

  const glassBtn = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#1c1530' }}>

      {/* Animated figure */}
      <div style={{ flex: '1 1 0', minHeight: 0 }}>
        <PoseAnimation joints={joints} poseId={pose?.id} />
      </div>

      {/* Bottom panel */}
      <div
        className="flex-shrink-0 px-5 pt-3 space-y-3"
        style={{
          paddingBottom: showTimer ? 'max(env(safe-area-inset-bottom, 0px), 20px)' : '14px',
          background: 'linear-gradient(to top, #160f28 60%, transparent)',
        }}
      >
        {/* Pose name */}
        <div className="text-center">
          <h2 style={{
            color: '#f7f2ee',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            fontSize: showTimer ? '22px' : '16px',
          }}>
            {pose?.englishName ?? '—'}
          </h2>
          <p style={{ color: '#b9adbf', fontSize: '12px', fontStyle: 'italic', marginTop: '3px' }}>
            {pose?.sanskritName}
          </p>
        </div>

        {showTimer && (
          <>
            {/* Timer ring + ±5 s */}
            <div className="flex items-center justify-between gap-3">

              {/* −5 s */}
              <button
                onClick={() => adjustHold(-5)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ ...glassBtn, color: '#9fb8a3' }}
                aria-label="Decrease hold time 5 seconds"
              >
                <Minus size={18} />
              </button>

              {/* Timer ring */}
              <div className="relative w-32 h-32 flex-shrink-0">
                {/* Breathing ambient glow */}
                <div
                  className="breathe-glow absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${ringColor}28 0%, transparent 72%)` }}
                />
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"
                     aria-label={`${minutes}:${String(seconds).padStart(2, '0')} remaining`}>
                  {/* Track */}
                  <circle cx="50" cy="50" r={RADIUS}
                          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                  {/* Progress */}
                  <circle cx="50" cy="50" r={RADIUS}
                          fill="none"
                          stroke={ringColor}
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray={CIRC}
                          strokeDashoffset={dashOffset}
                          className="transition-all duration-1000 ease-linear" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                  <span style={{ color: '#f7f2ee', fontSize: '22px', fontFamily: 'monospace', fontWeight: 700, lineHeight: 1 }}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                  <span style={{ color: ringColor, fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>
                    {STATUS_LABEL[status]}
                  </span>
                  <span style={{ color: '#8a7d94', fontSize: '9px', marginTop: '1px' }}>{holdDuration}s</span>
                </div>
              </div>

              {/* +5 s */}
              <button
                onClick={() => adjustHold(+5)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ ...glassBtn, color: '#9fb8a3' }}
                aria-label="Increase hold time 5 seconds"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Play / Pause / Reset */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={reset}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95"
                style={{ ...glassBtn, color: '#b9adbf' }}
                aria-label="Reset timer"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={status === 'running' ? pause : start}
                className="flex items-center gap-2 px-8 h-10 rounded-full font-semibold text-sm transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #b9a7e8, #9b86d9)', color: '#1c1530' }}
                aria-label={status === 'running' ? 'Pause' : 'Start'}
              >
                {status === 'running'
                  ? <><Pause size={15} /> Pause</>
                  : <><Play  size={15} /> Start</>}
              </button>
            </div>
          </>
        )}

        {/* Prev / Next navigation */}
        {showTimer && (
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="flex-1 h-11 rounded-full flex items-center justify-center gap-1.5
                font-medium text-sm transition-all active:scale-[0.97]"
              style={{ ...glassBtn, color: '#b9adbf' }}
              aria-label="Previous pose"
            >
              <ChevronLeft size={17} />
              Prev
            </button>

            <button
              onClick={onNext}
              className="flex-1 h-11 rounded-full flex items-center justify-center gap-1.5
                font-semibold text-sm transition-all active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #b9a7e8, #9b86d9)', color: '#1c1530' }}
              aria-label="Next pose"
            >
              Next
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
