import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PREBUILT_SEQUENCES } from '../../data/sequences'
import { POSES } from '../../data/poses'
import { ease } from '../ui/animations'

const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

const STYLE_MAP = {
  emerald: {
    cardBg:    'linear-gradient(160deg, #1e2b22 0%, #1e1a2e 100%)',
    topBorder: 'rgba(163,196,168,0.55)',
    sideBorder:'rgba(255,255,255,0.07)',
    badge:     { background:'rgba(163,196,168,0.14)', color:'#a3c4a8' },
    btn:       { background:'#a3c4a8', color:'#152018' },
    chip:      { background:'rgba(163,196,168,0.1)', color:'#a3c4a8' },
  },
  blue: {
    cardBg:    'linear-gradient(160deg, #2b2218 0%, #1e1a2e 100%)',
    topBorder: 'rgba(219,184,154,0.55)',
    sideBorder:'rgba(255,255,255,0.07)',
    badge:     { background:'rgba(219,184,154,0.14)', color:'#dbb89a' },
    btn:       { background:'#dbb89a', color:'#201408' },
    chip:      { background:'rgba(219,184,154,0.1)', color:'#dbb89a' },
  },
  purple: {
    cardBg:    'linear-gradient(160deg, #221a32 0%, #1e1a2e 100%)',
    topBorder: 'rgba(196,181,253,0.55)',
    sideBorder:'rgba(255,255,255,0.07)',
    badge:     { background:'rgba(196,181,253,0.14)', color:'#c4b5fd' },
    btn:       { background:'#c4b5fd', color:'#160f2a' },
    chip:      { background:'rgba(196,181,253,0.1)', color:'#c4b5fd' },
  },
}

// Stagger container — children animate in sequence
const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.48, ease } },
}

export default function SequenceSelector({ onSelect }) {
  return (
    <motion.div
      className="flex flex-col gap-4 overflow-y-auto h-full pb-4"
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      <motion.p
        variants={cardVariants}
        style={{
          color:'#6b6580', fontSize:'12px', textAlign:'center',
          letterSpacing:'0.08em', textTransform:'uppercase', padding:'4px 0 2px',
        }}
      >
        Select a series
      </motion.p>

      {PREBUILT_SEQUENCES.map((seq) => {
        const c = STYLE_MAP[seq.color]
        const poses = seq.poseIds.map(id => POSE_BY_ID[id]).filter(Boolean)

        return (
          <motion.button
            key={seq.id}
            variants={cardVariants}
            onClick={() => onSelect(seq)}
            className="w-full text-left"
            style={{
              background: c.cardBg,
              borderRadius: '20px',
              borderTop:    `2px solid ${c.topBorder}`,
              borderLeft:   `1px solid ${c.sideBorder}`,
              borderRight:  `1px solid ${c.sideBorder}`,
              borderBottom: `1px solid ${c.sideBorder}`,
              padding: '20px',
              boxShadow: '0 4px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            whileHover={{ y:-5, boxShadow:'0 10px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)', transition:{ duration:0.22, ease } }}
            whileTap={{ scale:0.982 }}
          >
            {/* Top row */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <span style={{ ...c.badge, borderRadius:'999px', padding:'3px 11px', fontSize:'11px', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>
                {seq.name}
              </span>
              <span className="flex items-center gap-1.5 flex-shrink-0" style={{ ...c.btn, borderRadius:'999px', padding:'7px 16px', fontSize:'12px', fontWeight:600, letterSpacing:'0.02em' }}>
                Begin <ArrowRight size={13} />
              </span>
            </div>

            {/* Title */}
            <p style={{ color:'#f0ece8', fontWeight:600, fontSize:'18px', lineHeight:1.25, letterSpacing:'-0.02em' }}>
              {seq.subtitle}
            </p>
            <p style={{ color:'#6b6580', fontSize:'12px', marginTop:'5px', letterSpacing:'0.01em' }}>
              {poses.length} poses
            </p>

            {/* Pose name chips */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {poses.slice(0, 6).map(p => (
                <span key={p.id} style={{ ...c.chip, borderRadius:'999px', padding:'3px 10px', fontSize:'10.5px', letterSpacing:'0.01em' }}>
                  {p.englishName}
                </span>
              ))}
              {poses.length > 6 && (
                <span style={{ color:'#4a4560', fontSize:'10.5px', padding:'3px 6px' }}>
                  +{poses.length - 6} more
                </span>
              )}
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
