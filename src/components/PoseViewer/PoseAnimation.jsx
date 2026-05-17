/**
 * AnimatedPoseVisual — wraps FlatFigure with:
 *   • BreathingAura  (three concentric radial glows, slow inhale/exhale)
 *   • Framer Motion float  (gentle 5.5 s y-oscillation, replaces CSS keyframes)
 *   • High-res image support  (falls back to SVG when source < 300 px)
 *
 * No Rive files required. Drop {pose.id}.riv into public/animations/ when ready
 * and add the useRive block — the rest of the fallback chain stays unchanged.
 */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FlatFigure from './FlatFigure'
import { BreathingAura } from '../ui/animations'

// Images below this pixel threshold will appear blurry when upscaled to
// the viewer size (250–500 px). Fall back to the infinitely sharp SVG.
const MIN_PX = 300

export default function PoseAnimation({ joints, poseId }) {
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    setImgSrc(null)
    if (!poseId) return
    const src = `/images/poses/${poseId}.png`
    const probe = new window.Image()
    probe.onload = () => {
      if (probe.naturalWidth >= MIN_PX && probe.naturalHeight >= MIN_PX) {
        setImgSrc(src)
      }
    }
    probe.src = src
  }, [poseId])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient breathing glow — always visible regardless of image/SVG */}
      <BreathingAura />

      {/* High-res photo (328 px+) — fade in on load */}
      {imgSrc && (
        <motion.div
          key={imgSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <img
            src={imgSrc}
            alt={poseId}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </motion.div>
      )}

      {/* SVG FlatFigure — infinite resolution, smooth Framer Motion float */}
      {!imgSrc && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
          animate={{ y: [0, -8, -5, -8, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.3, 0.5, 0.7, 1],
          }}
        >
          <FlatFigure joints={joints} />
        </motion.div>
      )}
    </div>
  )
}
