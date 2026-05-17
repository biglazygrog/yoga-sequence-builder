import { motion } from 'framer-motion'
import { PREBUILT_SEQUENCES } from '../../data/sequences'
import { POSES } from '../../data/poses'

const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

const COLOR_MAP = {
  emerald: {
    card:  'border-emerald-700/60 bg-emerald-950/40 hover:border-emerald-500',
    badge: 'bg-emerald-900/60 text-emerald-300',
    btn:   'bg-emerald-600 hover:bg-emerald-500',
    dot:   'bg-emerald-500',
  },
  blue: {
    card:  'border-blue-700/60 bg-blue-950/40 hover:border-blue-500',
    badge: 'bg-blue-900/60 text-blue-300',
    btn:   'bg-blue-600 hover:bg-blue-500',
    dot:   'bg-blue-500',
  },
  purple: {
    card:  'border-purple-700/60 bg-purple-950/40 hover:border-purple-500',
    badge: 'bg-purple-900/60 text-purple-300',
    btn:   'bg-purple-600 hover:bg-purple-500',
    dot:   'bg-purple-500',
  },
}

export default function SequenceSelector({ onSelect }) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-full pb-4">
      <p className="text-xs text-slate-500 text-center pt-1">
        Choose a series to begin your practice
      </p>

      {PREBUILT_SEQUENCES.map((seq, idx) => {
        const c = COLOR_MAP[seq.color]
        const poses = seq.poseIds.map(id => POSE_BY_ID[id]).filter(Boolean)
        // Show a few preview emojis
        const preview = poses.slice(0, 6)

        return (
          <motion.button
            key={seq.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => onSelect(seq)}
            className={`w-full text-left rounded-2xl border-2 p-4 transition-all active:scale-[0.98] ${c.card}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.badge}`}>
                    {seq.name}
                  </span>
                </div>
                <p className="text-white font-semibold text-base leading-snug">{seq.subtitle}</p>
                <p className="text-xs text-slate-500 mt-0.5">{poses.length} poses</p>
              </div>
              <span className={`mt-0.5 text-xs px-3 py-1.5 rounded-xl text-white font-medium ${c.btn}`}>
                Start →
              </span>
            </div>

            {/* Pose emoji preview */}
            <div className="flex items-center gap-1.5 mt-3 flex-wrap">
              {preview.map(p => (
                <span key={p.id} title={p.englishName} className="text-xl">{p.emoji}</span>
              ))}
              {poses.length > 6 && (
                <span className="text-xs text-slate-500">+{poses.length - 6} more</span>
              )}
            </div>

            {/* First few English names as small tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {poses.slice(0, 5).map(p => (
                <span key={p.id} className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                  {p.englishName}
                </span>
              ))}
              {poses.length > 5 && (
                <span className="text-[10px] text-slate-500 px-1.5 py-0.5">…</span>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
