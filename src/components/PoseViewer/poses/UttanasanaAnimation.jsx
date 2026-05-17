import { motion } from 'framer-motion'

export default function UttanasanaAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#6b4a2f] overflow-hidden relative">

      {/* Glow */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-orange-200 blur-3xl"
        animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Animated figure */}
      <motion.img
        src="/gpt/uttanasana.png"
        alt="Uttanasana"
        className="relative z-10 w-[340px] max-w-full drop-shadow-2xl"
        animate={{
          scale: [1, 1.01, 1.03, 1.01, 1],
          y: [0, -2, -4, -2, 0],
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />
    </div>
  )
}
