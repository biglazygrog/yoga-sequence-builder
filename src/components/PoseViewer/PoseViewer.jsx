import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// HEAD=0 NECK=1 L_SHOULDER=2 R_SHOULDER=3 L_ELBOW=4 R_ELBOW=5
// L_HAND=6 R_HAND=7 SPINE=8 L_HIP=9 R_HIP=10 L_KNEE=11 R_KNEE=12
// L_FOOT=13 R_FOOT=14

const CONNECTIONS = [
  [0, 1],   // head → neck
  [1, 2],   // neck → L shoulder
  [1, 3],   // neck → R shoulder
  [2, 3],   // shoulder bar
  [2, 4],   // L shoulder → L elbow
  [3, 5],   // R shoulder → R elbow
  [4, 6],   // L elbow → L hand
  [5, 7],   // R elbow → R hand
  [1, 8],   // neck → spine
  [8, 9],   // spine → L hip
  [8, 10],  // spine → R hip
  [9, 10],  // hip bar
  [9, 11],  // L hip → L knee
  [10, 12], // R hip → R knee
  [11, 13], // L knee → L foot
  [12, 14], // R knee → R foot
]

// Limb radii — vary by body section
const LIMB_RADIUS = [
  0.04,  // head-neck
  0.045, // neck-Lshoulder
  0.045, // neck-Rshoulder
  0.04,  // shoulder bar
  0.038, // Lshoulder-Lelbow
  0.038, // Rshoulder-Relbow
  0.032, // Lelbow-Lhand
  0.032, // Relbow-Rhand
  0.055, // neck-spine (torso)
  0.05,  // spine-Lhip
  0.05,  // spine-Rhip
  0.045, // hip bar
  0.05,  // Lhip-Lknee
  0.05,  // Rhip-Rknee
  0.042, // Lknee-Lfoot
  0.042, // Rknee-Rfoot
]

// Pre-allocate vectors so the animation loop creates no garbage
const _vA  = new THREE.Vector3()
const _vB  = new THREE.Vector3()
const _dir = new THREE.Vector3()
const _up  = new THREE.Vector3(0, 1, 0)

function buildFigure(scene) {
  const jointMat = new THREE.MeshStandardMaterial({
    color: 0x818cf8,
    emissive: 0x6366f1,
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.1,
  })
  const limbMat = new THREE.MeshStandardMaterial({
    color: 0xa5b4fc,
    emissive: 0x4f46e5,
    emissiveIntensity: 0.25,
    roughness: 0.4,
    metalness: 0.05,
  })

  // Joint spheres
  const joints = Array.from({ length: 15 }, (_, i) => {
    const r = i === 0 ? 0.115 : 0.058 // head bigger
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 14, 10),
      jointMat,
    )
    scene.add(mesh)
    return mesh
  })

  // Cylinder limbs — created with height=1, scaled each frame
  const limbs = CONNECTIONS.map(([a, b], idx) => {
    const r = LIMB_RADIUS[idx] ?? 0.04
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 1, 8, 1),
      limbMat,
    )
    scene.add(mesh)
    return { mesh, a, b }
  })

  return { joints, limbs }
}

function applyJoints(joints, limbs, positions) {
  // Update joint positions
  positions.forEach((pos, i) => joints[i].position.set(...pos))

  // Refit each cylinder between its two joints
  limbs.forEach(({ mesh, a, b }) => {
    _vA.copy(joints[a].position)
    _vB.copy(joints[b].position)
    _dir.subVectors(_vB, _vA)
    const len = _dir.length()
    if (len < 0.01) { mesh.visible = false; return }
    mesh.visible = true
    mesh.scale.y = len
    _dir.divideScalar(len) // normalise in-place
    mesh.position.addVectors(_vA, _vB).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(_up, _dir)
  })
}

export default function PoseViewer({ pose }) {
  const mountRef = useRef(null)
  const stateRef = useRef(null)

  // Build the Three.js scene once on mount
  useEffect(() => {
    const mount = mountRef.current
    const w = mount.clientWidth
    const h = mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x060e1a)
    scene.fog = new THREE.Fog(0x060e1a, 9, 22)

    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
    camera.position.set(0, 1.4, 5.2)
    camera.lookAt(0, 1.2, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a2f4f, 3))

    const key = new THREE.DirectionalLight(0x818cf8, 4)
    key.position.set(3, 7, 4)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0x38bdf8, 1.5)
    fill.position.set(-4, 2, -3)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xc084fc, 1.2)
    rim.position.set(0, 3, -5)
    scene.add(rim)

    // Floor grid
    const grid = new THREE.GridHelper(8, 24, 0x1e293b, 0x1e293b)
    scene.add(grid)

    // Subtle floor disc glow
    const discGeo = new THREE.CircleGeometry(0.6, 32)
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.12,
    })
    const disc = new THREE.Mesh(discGeo, discMat)
    disc.rotation.x = -Math.PI / 2
    disc.position.y = 0.005
    scene.add(disc)

    const pivot = new THREE.Group()
    scene.add(pivot)
    const { joints, limbs } = buildFigure(pivot)

    const current = Array.from({ length: 15 }, () => [0, 0, 0])
    const target  = Array.from({ length: 15 }, () => [0, 0, 0])

    // Drag-to-rotate
    let isDragging = false, prevX = 0, prevY = 0

    const onPointerDown = e => {
      isDragging = true
      prevX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
      prevY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    }
    const onPointerMove = e => {
      if (!isDragging) return
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? prevX
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? prevY
      pivot.rotation.y += (cx - prevX) * 0.01
      pivot.rotation.x += (cy - prevY) * 0.005
      pivot.rotation.x = Math.max(-0.6, Math.min(0.6, pivot.rotation.x))
      prevX = cx; prevY = cy
    }
    const onPointerUp = () => { isDragging = false }

    const canvas = renderer.domElement
    canvas.addEventListener('mousedown',  onPointerDown)
    canvas.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('mousemove',  onPointerMove)
    window.addEventListener('touchmove',  onPointerMove, { passive: true })
    window.addEventListener('mouseup',    onPointerUp)
    window.addEventListener('touchend',   onPointerUp)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isDragging) pivot.rotation.y += 0.003

      // Lerp current joints toward target
      let moving = false
      current.forEach((pos, i) => {
        for (let j = 0; j < 3; j++) {
          const d = target[i][j] - pos[j]
          if (Math.abs(d) > 0.0008) { pos[j] += d * 0.08; moving = true }
          else pos[j] = target[i][j]
        }
      })
      if (moving) applyJoints(joints, limbs, current)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w2 = mount.clientWidth, h2 = mount.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    stateRef.current = { renderer, current, target, joints, limbs }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onPointerMove)
      window.removeEventListener('touchmove',  onPointerMove)
      window.removeEventListener('mouseup',    onPointerUp)
      window.removeEventListener('touchend',   onPointerUp)
      window.removeEventListener('resize',     onResize)
      renderer.dispose()
      if (mount.contains(canvas)) mount.removeChild(canvas)
      stateRef.current = null
    }
  }, [])

  // Update target pose when prop changes
  useEffect(() => {
    const s = stateRef.current
    if (!s || !pose?.joints) return
    pose.joints.forEach((pos, i) => { s.target[i] = [...pos] })
  }, [pose])

  return (
    <div
      ref={mountRef}
      className="w-full h-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  )
}
