/**
 * AnimatedPoseVisual
 *
 * Priority chain per pose:
 *   1. /public/lottie/{poseId}.json      — pose-specific Lottie
 *   2. /public/lottie/{series}.json      — series-level Lottie (e.g. "surya", "rocket1")
 *   3. /public/lottie/default.json       — global fallback Lottie
 *   4. POSE_COMPONENTS[poseId]           — custom React component for this pose
 *   5. /public/images/poses/{poseId}.png — high-res photo (≥300 px)
 *   6. FlatFigure SVG                    — always available, lerp-animated
 *
 * Drop any .json file from LottieFiles into public/lottie/ and it is picked
 * up automatically — no code changes required.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// lottie-react is lazy-loaded the first time a .json animation file is found.
// If no Lottie files exist in public/lottie/, this library is never fetched.
import FlatFigure from './FlatFigure'
import { BreathingAura } from '../ui/animations'
import TadasanaAnimation              from './poses/TadasanaAnimation'
import UttanasanaAnimation            from './poses/UttanasanaAnimation'
import ArdhaUttanasanaAnimation       from './poses/ArdhaUttanasanaAnimation'
import PhalakasanaAnimation           from './poses/PhalakasanaAnimation'
import ChaturangaAnimation            from './poses/ChaturangaAnimation'
import UrdhvaMukhaSvanasanaAnimation  from './poses/UrdhvaMukhaSvanasanaAnimation'

// Add a component here to override the fallback for any pose.
const POSE_COMPONENTS = {
  'tadasana':                TadasanaAnimation,
  'uttanasana':              UttanasanaAnimation,
  'ardha-uttanasana':        ArdhaUttanasanaAnimation,
  'phalakasana':             PhalakasanaAnimation,
  'chaturanga-dandasana':    ChaturangaAnimation,
  'urdhva-mukha-svanasana':  UrdhvaMukhaSvanasanaAnimation,
}

const MIN_PX = 300
const ease   = [0.25, 0.46, 0.45, 0.94]

// Module-level cache: path → JSON data | NOT_FOUND sentinel
const NOT_FOUND = Symbol()
const cache     = new Map()

async function loadLottie(poseId, seriesArr) {
  const series = Array.isArray(seriesArr) ? seriesArr[0] : seriesArr
  const paths  = [
    poseId && `/lottie/${poseId}.json`,
    series && `/lottie/${series}.json`,
    '/lottie/default.json',
  ].filter(Boolean)

  for (const path of paths) {
    if (cache.has(path)) {
      const hit = cache.get(path)
      if (hit !== NOT_FOUND) return hit
      continue
    }
    try {
      const res = await fetch(path)
      if (res.ok) {
        const data = await res.json()
        cache.set(path, data)
        return data
      }
      cache.set(path, NOT_FOUND)
    } catch {
      cache.set(path, NOT_FOUND)
    }
  }
  return null
}

export default function AnimatedPoseVisual({ joints, poseId, series }) {
  const [lottieData, setLottieData] = useState(null)
  const [LottieComp, setLottieComp] = useState(null) // lazy-loaded lottie-react default export
  const [imgSrc,     setImgSrc]     = useState(null)

  // Fetch Lottie JSON + lazy-load the Lottie library in parallel when data is found
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const data = await loadLottie(poseId, series)
      if (cancelled) return

      if (data) {
        // Same object reference = same series file — skip re-render
        setLottieData(prev => (prev === data ? prev : data))
        setImgSrc(null)

        // Load the Lottie library once (stays loaded afterwards)
        if (!LottieComp) {
          import('lottie-react').then(mod => {
            if (!cancelled) setLottieComp(() => mod.default)
          })
        }
        return
      }

      // No Lottie found — clear and try PNG
      setLottieData(null)
      setImgSrc(null)
      if (!poseId) return

      const src   = `/images/poses/${poseId}.png`
      const probe = new window.Image()
      probe.onload = () => {
        if (!cancelled && probe.naturalWidth >= MIN_PX && probe.naturalHeight >= MIN_PX) {
          setImgSrc(src)
        }
      }
      probe.src = src
    })()

    return () => { cancelled = true }
  }, [poseId, series]) // eslint-disable-line react-hooks/exhaustive-deps

  const showLottie     = lottieData && LottieComp
  const CustomPose     = POSE_COMPONENTS[poseId] ?? null
  const showCustomPose = !showLottie && CustomPose

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient breathing aura — always behind the figure */}
      <BreathingAura />

      <AnimatePresence mode="sync">
        {/* ── Lottie animation (only when library + data are both ready) ── */}
        {showLottie && (
          <motion.div
            key="lottie"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -18, scale: 1.02 }}
            transition={{ duration: 0.55, ease }}
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <LottieComp
              animationData={lottieData}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        )}

        {/* ── Custom React pose component ─────────────────────── */}
        {showCustomPose && (
          <motion.div
            key={`custom-${poseId}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -18, scale: 1.02 }}
            transition={{ duration: 0.55, ease }}
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            <CustomPose />
          </motion.div>
        )}

        {/* ── High-res PNG (≥300 px) ───────────────────────────── */}
        {imgSrc && !showLottie && !showCustomPose && (
          <motion.div
            key={imgSrc}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -18, scale: 1.02 }}
            transition={{ duration: 0.55, ease }}
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <img
              src={imgSrc}
              alt={poseId}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>
        )}

        {/* ── FlatFigure SVG fallback ──────────────────────────── */}
        {!showLottie && !showCustomPose && !imgSrc && (
          <motion.div
            key="svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            {/* Inner div owns the float — decoupled from enter/exit opacity */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
