import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react'
import { useTimer } from '../../hooks/useTimer'
import PoseAnimation from './PoseAnimation'

const LERP   = 0.1
const RADIUS = 40
const CIRC   = 2 * Math.PI * RADIUS

const STATUS_LABEL = {
  idle:    'READY',
  running: 'HOLD',
  paused:  'PAUSED',
  done:    'DONE ✓',
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
  // ── Lerp state — initialise from pose immediately so figure shows on frame 1
  const initJoints = () =>
    pose?.joints?.map(p => [...p]) ?? Array.from({ length: 15 }, () => [0, 0, 0])

  const currentRef  = useRef(initJoints())
  const targetRef   = useRef(initJoints())
  const [joints, setJoints] = useState(initJoints)
  const snappedRef  = useRef(!!pose?.joints)
  const rafRef      = useRef(null)

  // ── Timer state ────────────────────────────────────────────────────────
  const [holdDuration, setHoldDuration] = useState(30)
  const { timeLeft, status, progress, start, pause, reset } =
    useTimer(holdDuration, onNext)

  // ── Animation loop (lerp current → target) ────────────────────────────
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

  // ── Snap on first pose, lerp on subsequent changes ────────────────────
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

  // ── Reset timer when navigating to a new pose ─────────────────────────
  const resetRef = useRef(reset)
  useEffect(() => { resetRef.current = reset }, [reset])
  useEffect(() => { resetRef.current() }, [pose?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hold duration adjustment ───────────────────────────────────────────
  const adjustHold = delta =>
    setHoldDuration(d => Math.min(60, Math.max(5, d + delta)))

  const minutes    = Math.floor(timeLeft / 60)
  const seconds    = timeLeft % 60
  const dashOffset = CIRC * (1 - progress)
  const ringColor  = status === 'done' ? '#26C6DA' : '#9C6FFF'

  return (
    <div style={{ display:'flex', flexDirection:'column', width:'100%', height:'100%', background:'#1a1a2e' }}>

      {/* ── Animated figure ─────────────────────────────────────────── */}
      <div style={{ flex: '1 1 0', minHeight: 0 }}>
        <PoseAnimation joints={joints} poseId={pose?.id} />
      </div>

      {/* ── Bottom panel ────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-5 pt-2 space-y-3"
        style={{
          paddingBottom: showTimer ? 'max(env(safe-area-inset-bottom, 0px), 20px)' : '12px',
          background: 'linear-gradient(to top, #0d0d1e 60%, transparent)',
        }}
      >
        {/* Pose name */}
        <div className="text-center">
          <h2 className={`font-bold text-white leading-tight tracking-tight ${showTimer ? 'text-[22px]' : 'text-base'}`}>
            {pose?.englishName ?? '—'}
          </h2>
          <p className="text-xs text-slate-400 italic mt-0.5">{pose?.sanskritName}</p>
        </div>

        {showTimer && (
          <>
            {/* Timer ring + ±5 s adjustment */}
            <div className="flex items-center justify-between gap-3">

              {/* −5 s */}
              <button
                onClick={() => adjustHold(-5)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center
                  text-[#26C6DA] transition-all active:scale-95"
                style={{ background: '#16213e', border: '1.5px solid #2a2a5e' }}
                aria-label="Decrease hold time 5 seconds"
              >
                <Minus size={19} />
              </button>

              {/* Timer ring */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"
                     aria-label={`${minutes}:${String(seconds).padStart(2, '0')} remaining`}>
                  {/* Track */}
                  <circle cx="50" cy="50" r={RADIUS}
                          fill="none" stroke="#16213e" strokeWidth="8" />
                  {/* Progress */}
                  <circle cx="50" cy="50" r={RADIUS}
                          fill="none"
                          stroke={ringColor}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={CIRC}
                          strokeDashoffset={dashOffset}
                          className="transition-all duration-1000 ease-linear" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                  <span className="text-[22px] font-mono font-bold text-white tabular-nums leading-none">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-medium tracking-widest"
                        style={{ color: ringColor }}>
                    {STATUS_LABEL[status]}
                  </span>
                  <span className="text-[9px] text-slate-600">{holdDuration}s</span>
                </div>
              </div>

              {/* +5 s */}
              <button
                onClick={() => adjustHold(+5)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center
                  text-[#26C6DA] transition-all active:scale-95"
                style={{ background: '#16213e', border: '1.5px solid #2a2a5e' }}
                aria-label="Increase hold time 5 seconds"
              >
                <Plus size={19} />
              </button>
            </div>

            {/* Play / Pause / Reset */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={reset}
                className="w-10 h-10 rounded-xl flex items-center justify-center
                  text-slate-400 hover:text-white transition-all active:scale-95"
                style={{ background: '#16213e', border: '1.5px solid #2a2a5e' }}
                aria-label="Reset timer"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={status === 'running' ? pause : start}
                className="flex items-center gap-2 px-7 h-10 rounded-xl
                  text-white font-semibold text-sm transition-all active:scale-95"
                style={{ background: '#9C6FFF' }}
                aria-label={status === 'running' ? 'Pause' : 'Start'}
              >
                {status === 'running'
                  ? <><Pause size={16} /> Pause</>
                  : <><Play  size={16} /> Start</>}
              </button>
            </div>
          </>
        )}

        {/* Prev / Next navigation — hidden in preview mode */}
        {showTimer && <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="flex-1 h-11 rounded-2xl flex items-center justify-center gap-1.5
              text-slate-300 font-medium text-sm transition-all active:scale-[0.97]"
            style={{ background: '#16213e', border: '1.5px solid #2a2a5e' }}
            aria-label="Previous pose"
          >
            <ChevronLeft size={17} />
            Prev
          </button>

          <button
            onClick={onNext}
            className="flex-1 h-11 rounded-2xl flex items-center justify-center gap-1.5
              text-white font-semibold text-sm transition-all active:scale-[0.97]"
            style={{ background: '#9C6FFF' }}
            aria-label="Next pose"
          >
            Next
            <ChevronRight size={17} />
          </button>
        </div>}
      </div>
    </div>
  )
}
