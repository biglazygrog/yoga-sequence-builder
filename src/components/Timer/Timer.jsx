import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react'
import { useTimer } from '../../hooks/useTimer'

const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Timer({ pose, onNext, onPrev }) {
  const { timeLeft, status, progress, start, pause, reset } = useTimer(
    pose?.duration ?? 30,
    onNext,
  )

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const statusLabel = { idle: 'ready', running: 'hold', paused: 'paused', done: 'done ✓' }[status]

  return (
    <div className="flex flex-col items-center gap-5 py-4">

      {/* SVG ring */}
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100"
          aria-label={`${minutes}:${String(seconds).padStart(2, '0')} remaining`}>
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="7" />
          <circle cx="50" cy="50" r={RADIUS} fill="none"
            stroke={status === 'done' ? '#34d399' : '#818cf8'}
            strokeWidth="7" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-3xl font-mono font-bold text-white tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest">{statusLabel}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={onPrev}
          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700
            flex items-center justify-center transition-colors"
          aria-label="Previous pose">
          <ChevronLeft size={20} />
        </button>

        <button onClick={reset}
          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700
            flex items-center justify-center transition-colors"
          aria-label="Reset timer">
          <RotateCcw size={17} />
        </button>

        <button
          onClick={status === 'running' ? pause : start}
          className={`w-14 h-10 rounded-xl text-white font-semibold flex items-center justify-center
            gap-1.5 transition-colors
            ${status === 'running' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          aria-label={status === 'running' ? 'Pause' : 'Start'}>
          {status === 'running' ? <Pause size={17} /> : <Play size={17} />}
        </button>

        <button onClick={onNext}
          className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700
            flex items-center justify-center transition-colors"
          aria-label="Next pose">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pose name + cues */}
      {pose && (
        <div className="text-center px-4 max-w-xs">
          <h2 className="text-lg font-bold text-white">{pose.englishName}</h2>
          <p className="text-sm text-slate-400 italic">{pose.sanskritName}</p>
          {pose.cues && (
            <ul className="mt-3 space-y-1">
              {pose.cues.map((cue, i) => (
                <li key={i} className="text-xs text-slate-500">• {cue}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
