// Rive-ready animation wrapper.
//
// Resolution gate: images below MIN_PX on either dimension are discarded and
// the SVG FlatFigure is used instead — upscaling a 170 px thumbnail to 400 px
// produces visible blur, while the SVG is infinitely sharp at any size.
//
// To add Rive: drop {pose.id}.riv into public/animations/ and uncomment the
// useRive block below. The fallback chain stays the same.

import { useState, useEffect } from 'react'
import FlatFigure from './FlatFigure'

// Minimum source dimension for acceptable display quality.
// 170 px thumbnails rendered at 350+ px look blurry on every screen;
// 328 px images look fine on 1× and acceptable on 2× displays.
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
      // else: stay null → SVG fallback
    }
    probe.onerror = () => { /* stay null → SVG fallback */ }
    probe.src = src
  }, [poseId])

  if (imgSrc) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src={imgSrc}
          alt={poseId}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'auto',
          }}
        />
      </div>
    )
  }

  // SVG FlatFigure — vector, perfectly sharp at any resolution
  return (
    <div className="fig-idle" style={{ width: '100%', height: '100%' }}>
      <FlatFigure joints={joints} />
    </div>
  )
}
