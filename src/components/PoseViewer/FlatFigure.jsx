// Pure SVG rendering — no animation state, no inline CSS.
// The parent (PoseAnimation) handles the idle float animation on a regular div.
//
// Joint indices:
//  0 HEAD  1 NECK  2 L_SHOULDER  3 R_SHOULDER  4 L_ELBOW  5 R_ELBOW
//  6 L_HAND  7 R_HAND  8 SPINE  9 L_HIP  10 R_HIP
//  11 L_KNEE  12 R_KNEE  13 L_FOOT  14 R_FOOT

const SKIN    = '#f0cbb0'
const SKIN_DK = '#d9a882'
const HAIR    = '#3d2b1f'
const TOP     = '#b9a7e8'
const TOP_DK  = '#8566c9'
const LEGS    = '#9fb8a3'
const LEGS_DK = '#6d9477'
const MAT     = '#c4856a'

const VW = 240
const VH = 300
const S  = 90
const OX = VW / 2
const OY = VH - 28

const wx = x => OX + x * S
const wy = y => OY - y * S

const LIMB_DEFS = [
  { a: 2,  b: 4,  w: 13, type: 'arm' },
  { a: 4,  b: 6,  w: 11, type: 'arm' },
  { a: 3,  b: 5,  w: 13, type: 'arm' },
  { a: 5,  b: 7,  w: 11, type: 'arm' },
  { a: 9,  b: 11, w: 18, type: 'leg' },
  { a: 11, b: 13, w: 15, type: 'leg' },
  { a: 10, b: 12, w: 18, type: 'leg' },
  { a: 12, b: 14, w: 15, type: 'leg' },
]

export default function FlatFigure({ joints: J }) {
  if (!J) return null

  const torsoZ = (J[2][2] + J[3][2] + J[9][2] + J[10][2]) / 4
  const queue = [
    ...LIMB_DEFS.map(l => ({
      kind: 'limb', ...l,
      z: (J[l.a][2] + J[l.b][2]) / 2,
    })),
    { kind: 'torso', z: torsoZ },
  ].sort((a, b) => a.z - b.z)

  const lsX = wx(J[2][0]),  lsY = wy(J[2][1])
  const rsX = wx(J[3][0]),  rsY = wy(J[3][1])
  const lhX = wx(J[9][0]),  lhY = wy(J[9][1])
  const rhX = wx(J[10][0]), rhY = wy(J[10][1])
  const midShX = (lsX + rsX) / 2
  const midShY = (lsY + rsY) / 2

  const hx = wx(J[0][0])
  const hy = wy(J[0][1])
  const ndx = hx - wx(J[1][0])
  const ndy = hy - wy(J[1][1])
  const nlen = Math.sqrt(ndx * ndx + ndy * ndy) || 1
  const bunX = hx + (ndx / nlen) * 14
  const bunY = hy + (ndy / nlen) * 14
  const faceAngle = Math.atan2(ndx, -ndy) * (180 / Math.PI)

  const footY = Math.max(wy(J[13][1]), wy(J[14][1]))

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id="pose-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%"   stopColor="#b9a7e8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#b9a7e8" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="mat-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#d59b7a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#d59b7a" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Ambient background glow */}
      <ellipse cx={OX} cy={VH * 0.55} rx={VW * 0.44} ry={VH * 0.38}
               fill="url(#pose-glow)" />

      {/* Yoga mat */}
      <rect x="20" y={footY + 6} width={VW - 40} height="16" rx="8"
            fill={MAT} opacity="0.75" />
      <line x1="28" y1={footY + 14} x2={VW - 28} y2={footY + 14}
            stroke="#e0ac8f" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />

      {/* Mat ambient glow */}
      <ellipse cx={OX} cy={footY + 14} rx={VW * 0.38} ry="10"
               fill="url(#mat-glow)" />

      {/* Ground shadow */}
      <ellipse cx={OX} cy={footY + 10} rx="28" ry="4" fill="#000" opacity="0.12" />

      {/* Limbs + torso in z-order */}
      {queue.map((item, i) => {
        if (item.kind === 'torso') {
          return (
            <g key="torso">
              <polygon
                points={`${lsX},${lsY} ${rsX},${rsY} ${rhX},${rhY} ${lhX},${lhY}`}
                fill={TOP}
              />
              <polygon
                points={`${midShX},${midShY} ${midShX},${midShY} ${rhX},${rhY} ${lhX},${lhY}`}
                fill={TOP_DK} opacity="0.32"
              />
            </g>
          )
        }
        const isBack = item.z < 0
        const stroke = item.type === 'leg'
          ? (isBack ? LEGS_DK : LEGS)
          : (isBack ? SKIN_DK : SKIN)
        return (
          <line key={i}
            x1={wx(J[item.a][0])} y1={wy(J[item.a][1])}
            x2={wx(J[item.b][0])} y2={wy(J[item.b][1])}
            stroke={stroke} strokeWidth={item.w} strokeLinecap="round"
          />
        )
      })}

      {/* Hair bun */}
      <circle cx={bunX} cy={bunY} r={10} fill={HAIR} />
      <circle cx={bunX - 2} cy={bunY - 2} r={3} fill="#5c3d2a" opacity="0.35" />

      {/* Head */}
      <circle cx={hx} cy={hy} r={18} fill={SKIN} />

      {/* Blush */}
      <circle cx={hx - 8} cy={hy + 4} r={5} fill="#e89080" opacity="0.18" />
      <circle cx={hx + 8} cy={hy + 4} r={5} fill="#e89080" opacity="0.18" />

      {/* Face */}
      <g transform={`rotate(${faceAngle},${hx},${hy})`}>
        <path d={`M${hx-9} ${hy-2} Q${hx-5.5} ${hy-7} ${hx-2} ${hy-2}`}
              stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={`M${hx+2} ${hy-2} Q${hx+5.5} ${hy-7} ${hx+9} ${hy-2}`}
              stroke={HAIR} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx={hx} cy={hy+4} r={1.5} fill="#c4705a" opacity="0.5" />
        <path d={`M${hx-6} ${hy+8} Q${hx} ${hy+14} ${hx+6} ${hy+8}`}
              stroke="#c4705a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
