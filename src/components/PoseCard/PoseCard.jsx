import { SERIES_LABELS, SERIES_COLORS } from '../../data/poses'

const DIFFICULTY = {
  beginner:     'bg-emerald-900/60 text-emerald-300',
  intermediate: 'bg-amber-900/60 text-amber-300',
  advanced:     'bg-rose-900/60 text-rose-300',
}

export default function PoseCard({ pose, onSelect, onAdd, isSelected, isInSequence }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(pose)}
      onKeyDown={e => e.key === 'Enter' && onSelect?.(pose)}
      className={`rounded-xl p-3 cursor-pointer transition-all duration-200 border-2 outline-none
        focus-visible:ring-2 focus-visible:ring-indigo-400
        ${isSelected
          ? 'border-indigo-400 bg-indigo-950/60'
          : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
        }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl select-none leading-none pt-0.5">{pose.emoji}</div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-snug">{pose.englishName}</h3>
          <p className="text-xs text-slate-400 italic mt-0.5">{pose.sanskritName}</p>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY[pose.difficulty]}`}>
              {pose.difficulty}
            </span>
            <span className="text-xs text-slate-500">{pose.duration}s</span>
            {pose.series.slice(0, 2).map(s => (
              <span
                key={s}
                className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${SERIES_COLORS[s]}`}
              >
                {SERIES_LABELS[s]}
              </span>
            ))}
          </div>
        </div>

        {/* Add / remove toggle */}
        <button
          onClick={e => { e.stopPropagation(); onAdd?.(pose) }}
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center
            transition-colors text-xs font-bold
            ${isInSequence
              ? 'border-indigo-400 bg-indigo-500 text-white hover:bg-rose-500 hover:border-rose-400'
              : 'border-slate-600 text-slate-400 hover:border-indigo-400 hover:text-indigo-400'
            }`}
          aria-label={isInSequence ? 'Remove from sequence' : 'Add to sequence'}
        >
          {isInSequence ? '✓' : '+'}
        </button>
      </div>

      {/* Cue preview when selected */}
      {isSelected && pose.cues?.[0] && (
        <p className="mt-2 text-xs text-indigo-300 italic border-t border-slate-700 pt-2">
          💬 {pose.cues[0]}
        </p>
      )}
    </div>
  )
}
