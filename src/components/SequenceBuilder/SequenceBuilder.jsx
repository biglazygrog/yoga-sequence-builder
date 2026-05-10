import { useState } from 'react'
import PoseCard from '../PoseCard/PoseCard'
import { POSES, CATEGORIES, SERIES, SERIES_LABELS, SERIES_COLORS } from '../../data/poses'

const MIN_DURATION = 5
const MAX_DURATION = 300
const STEP = 5

export default function SequenceBuilder({ sequence, onSequenceChange, onSelectPose, selectedPose, onPractice }) {
  const [category, setCategory] = useState('all')
  const [series, setSeries]     = useState('all')
  const [search, setSearch]     = useState('')

  const filteredPoses = POSES.filter(pose => {
    const matchCat    = category === 'all' || pose.category === category
    const matchSeries = series === 'all'   || pose.series.includes(series)
    const q = search.toLowerCase()
    const matchSearch = !q
      || pose.englishName.toLowerCase().includes(q)
      || pose.sanskritName.toLowerCase().includes(q)
    return matchCat && matchSeries && matchSearch
  })

  const addPose = pose => {
    if (sequence.some(p => p.id === pose.id)) return
    onSequenceChange([...sequence, { ...pose }]) // copy so duration is mutable
  }

  const removePose = id => onSequenceChange(sequence.filter(p => p.id !== id))

  const togglePose = pose => {
    if (sequence.some(p => p.id === pose.id)) removePose(pose.id)
    else addPose(pose)
  }

  const setDuration = (id, delta) => {
    onSequenceChange(sequence.map(p =>
      p.id !== id ? p : {
        ...p,
        duration: Math.max(MIN_DURATION, Math.min(MAX_DURATION, p.duration + delta)),
      }
    ))
  }

  const totalSecs = sequence.reduce((s, p) => s + p.duration, 0)
  const totalMins = Math.floor(totalSecs / 60)
  const totalSec2 = totalSecs % 60

  return (
    <div className="flex flex-col h-full gap-3 overflow-hidden">

      {/* ── Sequence strip ──────────────────────────────────────────────── */}
      {sequence.length > 0 && (
        <div className="flex-shrink-0 bg-slate-800/60 rounded-xl p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">
              {sequence.length} pose{sequence.length !== 1 ? 's' : ''} ·{' '}
              {totalMins > 0 ? `${totalMins}m ` : ''}{totalSec2 > 0 ? `${totalSec2}s` : ''}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onSequenceChange([])}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={onPractice}
                className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 font-medium"
              >
                Practice →
              </button>
            </div>
          </div>

          {/* Horizontally scrollable pose chips with duration controls */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {sequence.map((pose, i) => (
              <div key={`${pose.id}-${i}`} className="flex-shrink-0 flex flex-col items-center gap-0.5">
                {/* Emoji preview */}
                <button
                  onClick={() => onSelectPose(pose)}
                  title={pose.englishName}
                  className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-2xl
                    hover:bg-slate-600 active:scale-95 transition-all"
                >
                  {pose.emoji}
                </button>

                {/* Duration stepper */}
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setDuration(pose.id, -STEP)}
                    className="w-4 h-4 rounded text-slate-400 hover:text-white hover:bg-slate-600
                      flex items-center justify-center text-xs leading-none"
                    aria-label="Decrease duration"
                  >−</button>
                  <span className="text-[10px] text-slate-400 w-7 text-center tabular-nums">
                    {pose.duration}s
                  </span>
                  <button
                    onClick={() => setDuration(pose.id, +STEP)}
                    className="w-4 h-4 rounded text-slate-400 hover:text-white hover:bg-slate-600
                      flex items-center justify-center text-xs leading-none"
                    aria-label="Increase duration"
                  >+</button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removePose(pose.id)}
                  className="text-[10px] text-slate-600 hover:text-rose-400 leading-none"
                  aria-label={`Remove ${pose.englishName}`}
                >✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Series chips ────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
        {SERIES.map(s => (
          <button
            key={s}
            onClick={() => setSeries(s)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all
              ${series === s
                ? s === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : SERIES_COLORS[s]
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
              }`}
          >
            {SERIES_LABELS[s]}
          </button>
        ))}
      </div>

      {/* ── Search + category ───────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex gap-2">
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search poses…"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
            text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-sm
            text-white focus:outline-none focus:border-indigo-500 capitalize"
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c} className="capitalize">{c}</option>
          ))}
        </select>
      </div>

      {/* ── Pose library ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {filteredPoses.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-8">No poses match your search.</p>
        )}
        {filteredPoses.map(pose => (
          <PoseCard
            key={pose.id}
            pose={pose}
            onSelect={onSelectPose}
            onAdd={togglePose}
            isSelected={selectedPose?.id === pose.id}
            isInSequence={sequence.some(p => p.id === pose.id)}
          />
        ))}
      </div>
    </div>
  )
}
