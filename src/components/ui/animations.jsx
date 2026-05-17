/**
 * Shared Framer Motion animation primitives.
 * All animations are transform-only — no layout thrashing, safe for 60 fps mobile.
 */
import { motion } from 'framer-motion'

// ── Shared easing ────────────────────────────────────────────────────────────
export const ease = [0.25, 0.46, 0.45, 0.94]

// ── FadeInSection ─────────────────────────────────────────────────────────────
// Fade + subtle slide-up on mount. Use delay to stagger siblings.

export function FadeInSection({ children, delay = 0, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

// ── AnimatedButton ────────────────────────────────────────────────────────────
// Drop-in replacement for <button> with soft hover lift + tap scale.

export function AnimatedButton({
  children, className, style, onClick, 'aria-label': ariaLabel, type = 'button',
}) {
  return (
    <motion.button
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ y: -2, transition: { duration: 0.18, ease } }}
      whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
    >
      {children}
    </motion.button>
  )
}

// ── FloatingCard ──────────────────────────────────────────────────────────────
// Card that enters with fade+slide and lifts on hover. Use as a button wrapper.

export function FloatingCard({
  children, className, style, onClick, delay = 0, tag = 'div',
}) {
  const Tag = tag === 'button' ? motion.button : motion.div
  return (
    <Tag
      className={className}
      style={style}
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease } }}
      whileTap={{ scale: 0.982 }}
    >
      {children}
    </Tag>
  )
}

// ── PoseChip ──────────────────────────────────────────────────────────────────
// Horizontal pill for the practice progress strip.
// Active chip gets a soft border pulse; inactive chips lift on hover.

export function PoseChip({ children, isActive, isPast, onClick, dataActive }) {
  return (
    <motion.button
      data-active={dataActive}
      onClick={onClick}
      className="flex-shrink-0 flex items-center gap-2"
      style={{
        height: '34px',
        padding: '0 12px',
        borderRadius: '999px',
        border: '1px solid',
        position: 'relative',
        overflow: 'hidden',
        ...(isActive ? {
          background: 'rgba(196,181,253,0.14)',
          borderColor: 'rgba(196,181,253,0.38)',
        } : isPast ? {
          background: 'transparent',
          borderColor: 'rgba(255,255,255,0.05)',
          opacity: 0.35,
        } : {
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.07)',
        }),
      }}
      whileHover={!isActive && !isPast ? { y: -2, transition: { duration: 0.15 } } : {}}
      whileTap={{ scale: 0.94 }}
    >
      {/* Subtle pulse ring on the active chip */}
      {isActive && (
        <motion.span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '999px',
            border: '1px solid rgba(196,181,253,0.5)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Content sits above the pulse ring */}
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </motion.button>
  )
}

// ── BreathingAura ─────────────────────────────────────────────────────────────
// Three concentric radial glows that breathe at different rates.
// Uses only transform + opacity — no CSS filter, safe for mobile GPU.
// Place as position:absolute inside a position:relative container.

export function BreathingAura() {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {/* Inner — violet, 4 s */}
      <motion.div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          width: '54%',
          height: '54%',
          top: '23%',
          left: '23%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(196,181,253,0.3) 0%, rgba(196,181,253,0.06) 55%, transparent 72%)',
        }}
        animate={{ scale: [1, 1.30, 1], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
      />

      {/* Mid — clay, 5.5 s, offset start */}
      <motion.div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          width: '70%',
          height: '70%',
          top: '15%',
          left: '15%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(219,184,154,0.14) 0%, transparent 65%)',
        }}
        animate={{ scale: [1, 1.16, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.3, repeatType: 'mirror' }}
      />

      {/* Outer — sage, 7 s, late start */}
      <motion.div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          width: '88%',
          height: '88%',
          top: '6%',
          left: '6%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(163,196,168,0.09) 0%, transparent 62%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.32, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.8, repeatType: 'mirror' }}
      />
    </div>
  )
}
