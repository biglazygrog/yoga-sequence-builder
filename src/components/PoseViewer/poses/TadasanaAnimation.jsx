import { motion } from 'framer-motion'

export default function TadasanaAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      >
        {/* Head */}
        <div className="w-16 h-16 rounded-full bg-orange-200 mb-1" />

        {/* Body */}
        <div className="w-20 h-40 bg-orange-400 rounded-t-3xl rounded-b-xl relative">
          {/* Arms */}
          <div className="absolute -left-5 top-4 w-4 h-28 bg-orange-200 rounded-full" />
          <div className="absolute -right-5 top-4 w-4 h-28 bg-orange-200 rounded-full" />
        </div>

        {/* Legs */}
        <div className="flex gap-4 mt-1">
          <div className="w-6 h-36 bg-gray-800 rounded-full" />
          <div className="w-6 h-36 bg-gray-800 rounded-full" />
        </div>

        {/* Feet */}
        <div className="flex gap-6 mt-1">
          <div className="w-10 h-3 bg-orange-200 rounded-full" />
          <div className="w-10 h-3 bg-orange-200 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
