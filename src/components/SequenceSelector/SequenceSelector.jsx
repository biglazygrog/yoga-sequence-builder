import { motion } from 'framer-motion'
import { PREBUILT_SEQUENCES } from '../../data/sequences'
import { POSES } from '../../data/poses'

const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

const STYLE_MAP = {
  emerald: {
    cardBg:   'linear-gradient(145deg, #243028 0%, #201c30 100%)',
    border:   'rgba(159,184,163,0.28)',
    badge:    { background: 'rgba(159,184,163,0.18)', color: '#9fb8a3' },
    btn:      { background: 'linear-gradient(135deg, #9fb8a3, #7da382)', color: '#1a2820' },
    tag:      { background: 'rgba(159,184,163,0.12)', color: '#9fb8a3' },
    accent:   '#9fb8a3',
  },
  blue: {
    cardBg:   'linear-gradient(145deg, #302418 0%, #201c30 100%)',
    border:   'rgba(213,155,122,0.28)',
    badge:    { background: 'rgba(213,155,122,0.18)', color: '#d59b7a' },
    btn:      { background: 'linear-gradient(135deg, #d59b7a, #b87c59)', color: '#281c10' },
    tag:      { background: 'rgba(213,155,122,0.12)', color: '#d59b7a' },
    accent:   '#d59b7a',
  },
  purple: {
    cardBg:   'linear-gradient(145deg, #281e38 0%, #201c30 100%)',
    border:   'rgba(185,167,232,0.28)',
    badge:    { background: 'rgba(185,167,232,0.18)', color: '#b9a7e8' },
    btn:      { background: 'linear-gradient(135deg, #b9a7e8, #9b86d9)', color: '#1a1430' },
    tag:      { background: 'rgba(185,167,232,0.12)', color: '#b9a7e8' },
    accent:   '#b9a7e8',
  },
}

export default function SequenceSelector({ onSelect }) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto h-full pb-4">
      <p style={{ color: '#b9adbf', fontSize: '13px', textAlign: 'center', padding: '2px 0 6px' }}>
        Choose a series to begin your practice
      </p>

      {PREBUILT_SEQUENCES.map((seq, idx) => {
        const c = STYLE_MAP[seq.color]
        const poses = seq.poseIds.map(id => POSE_BY_ID[id]).filter(Boolean)
        const preview = poses.slice(0, 6)

        return (
          <motion.button
            key={seq.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect(seq)}
            className="w-full text-left"
            style={{
              background: c.cardBg,
              border: `1px solid ${c.border}`,
              borderRadius: '20px',
              padding: '18px 20px',
              boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{
                    ...c.badge,
                    borderRadius: '999px',
                    padding: '2px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}>
                    {seq.name}
                  </span>
                </div>
                <p style={{ color: '#f7f2ee', fontWeight: 600, fontSize: '16px', lineHeight: '1.3' }}>
                  {seq.subtitle}
                </p>
                <p style={{ color: '#b9adbf', fontSize: '12px', marginTop: '3px' }}>
                  {poses.length} poses
                </p>
              </div>

              <span style={{
                ...c.btn,
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                marginTop: '2px',
              }}>
                Begin →
              </span>
            </div>

            {/* Emoji preview */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {preview.map(p => (
                <span key={p.id} title={p.englishName} style={{ fontSize: '20px', lineHeight: 1 }}>
                  {p.emoji}
                </span>
              ))}
              {poses.length > 6 && (
                <span style={{ color: '#b9adbf', fontSize: '11px' }}>+{poses.length - 6}</span>
              )}
            </div>

            {/* Pose name tags */}
            <div className="flex flex-wrap gap-1 mt-2.5">
              {poses.slice(0, 5).map(p => (
                <span key={p.id} style={{
                  ...c.tag,
                  borderRadius: '999px',
                  padding: '2px 9px',
                  fontSize: '10px',
                  letterSpacing: '0.02em',
                }}>
                  {p.englishName}
                </span>
              ))}
              {poses.length > 5 && (
                <span style={{ color: '#b9adbf', fontSize: '10px', padding: '2px 4px' }}>…</span>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
