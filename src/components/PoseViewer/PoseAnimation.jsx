// Rive-ready animation wrapper.
//
// To use real Rive files: drop {pose.id}.riv into public/animations/ then
// replace the FlatFigure render below with:
//
//   import { useRive } from '@rive-app/react-canvas'
//   const { RiveComponent, rive } = useRive({
//     src: `/animations/${pose?.id}.riv`,
//     stateMachines: 'State Machine 1',
//     autoplay: true,
//   })
//   if (rive) return <RiveComponent style={{ width:'100%', height:'100%' }} />
//
// The idle float animation (.fig-idle) is defined in index.css so it works on
// a plain div — no SVG transform-origin issues.

import { useState } from 'react'
import FlatFigure from './FlatFigure'

export default function PoseAnimation({ joints, poseId }) {
  const [imgFailed, setImgFailed] = useState(false)
  const imgSrc = poseId ? `/images/poses/${poseId}.png` : null

  if (imgSrc && !imgFailed) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={imgSrc}
          alt={poseId}
          onError={() => setImgFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    )
  }

  return (
    <div className="fig-idle" style={{ width: '100%', height: '100%' }}>
      <FlatFigure joints={joints} />
    </div>
  )
}
