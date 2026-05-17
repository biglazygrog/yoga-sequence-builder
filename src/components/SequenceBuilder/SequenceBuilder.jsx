import { useState } from 'react'
import { PREBUILT_SEQUENCES } from '../../data/sequences'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AnimatePresence, motion } from 'framer-motion'
import { GripHorizontal, X } from 'lucide-react'
import PoseCard from '../PoseCard/PoseCard'
import { POSES, CATEGORIES, SERIES, SERIES_LABELS, SERIES_COLORS } from '../../data/poses'

// Build a lookup so prebuilt sequences can resolve pose objects quickly
const POSE_BY_ID = Object.fromEntries(POSES.map(p => [p.id, p]))

const MIN_DUR = 5
const MAX_DUR = 300
const STEP    = 5

// ── Draggable pose chip ──────────────────────────────────────────────────────
function SortablePoseChip({ pose, onSelect, onAdjust, onRemove }) {
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: pose.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.45 : 1,
        zIndex: isDragging ? 20 : undefined,
      }}
      className="flex-shrink-0 flex flex-col items-center gap-0.5 select-none"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-slate-600 hover:text-slate-400 touch-none cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripHorizontal size={14} />
      </button>

      {/* Emoji preview */}
      <button
        onClick={() => onSelect(pose)}
        title={pose.englishName}
        className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-2xl
          hover:bg-slate-600 active:scale-95 transition-all"
      >
        {pose.emoji}
      </button>

      {/* Duration stepper */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onAdjust(pose.id, -STEP)}
          className="w-4 h-4 rounded text-slate-400 hover:text-white hover:bg-slate-600
            flex items-center justify-center text-xs"
          aria-label="Decrease"
        >−</button>
        <span className="text-[10px] text-slate-400 w-7 text-center tabular-nums">
          {pose.duration}s
        </span>
        <button
          onClick={() => onAdjust(pose.id, +STEP)}
          className="w-4 h-4 rounded text-slate-400 hover:text-white hover:bg-slate-600
            flex items-center justify-center text-xs"
          aria-label="Increase"
        >+</button>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(pose.id)}
        className="text-slate-600 hover:text-rose-400 transition-colors"
        aria-label={`Remove ${pose.englishName}`}
      >
        <X size={12} />
      </button>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SequenceBuilder({
  sequence, onSequenceChange, onSelectPose, selectedPose, onPractice,
}) {
  const [category, setCategory]         = useState('all')
  const [series, setSeries]             = useState('all')
  const [search, setSearch]             = useState('')
  const [confirmPreset, setConfirmPreset] = useState(null) // preset id pending confirm

  // DnD sensors — small distance threshold so taps still register
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 180, tolerance: 6 } }),
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const from = sequence.findIndex(p => p.id === active.id)
    const to   = sequence.findIndex(p => p.id === over.id)
    onSequenceChange(arrayMove(sequence, from, to))
  }

  const filteredPoses = POSES.filter(pose => {
    const matchCat    = category === 'all' || pose.category === category
    const matchSeries = series === 'all'   || pose.series.includes(series)
    const q = search.toLowerCase()
    const matchSearch = !q
      || pose.englishName.toLowerCase().includes(q)
      || pose.sanskritName.toLowerCase().includes(q)
    return matchCat && matchSeries && matchSearch
  })

  const loadPreset = id => {
    const preset = PREBUILT_SEQUENCES.find(s => s.id === id)
    if (!preset) return
    const poses = preset.poseIds.map(pid => POSE_BY_ID[pid]).filter(Boolean)
    onSequenceChange(poses)
    setConfirmPreset(null)
  }

  const handlePresetClick = id => {
    if (sequence.length === 0) { loadPreset(id); return }
    setConfirmPreset(id)
  }

  const addPose    = pose => {
    if (!sequence.some(p => p.id === pose.id))
      onSequenceChange([...sequence, { ...pose }])
  }
  const removePose = id => onSequenceChange(sequence.filter(p => p.id !== id))
  const togglePose = pose => sequence.some(p => p.id === pose.id) ? removePose(pose.id) : addPose(pose)
  const adjustDur  = (id, delta) =>
    onSequenceChange(sequence.map(p =>
      p.id !== id ? p : {
        ...p,
        duration: Math.max(MIN_DUR, Math.min(MAX_DUR, p.duration + delta)),
      }
    ))

  const totalSecs = sequence.reduce((s, p) => s + p.duration, 0)
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60

  return (
    <div className="flex flex-col h-full gap-3 overflow-hidden">

      {/* ── Sequence strip ─────────────────────────────────────────────── */}
      {sequence.length > 0 && (
        <div className="flex-shrink-0 bg-slate-800/60 rounded-xl p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">
              {sequence.length} pose{sequence.length !== 1 ? 's' : ''} ·{' '}
              {mins > 0 ? `${mins}m ` : ''}{secs > 0 ? `${secs}s` : ''}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onSequenceChange([])}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
              >Clear</button>
              <button
                onClick={onPractice}
                className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg
                  hover:bg-indigo-500 font-medium"
              >Practice →</button>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sequence.map(p => p.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {sequence.map(pose => (
                  <SortablePoseChip
                    key={pose.id}
                    pose={pose}
                    onSelect={onSelectPose}
                    onAdjust={adjustDur}
                    onRemove={removePose}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* ── Preset sequences ───────────────────────────────────────────── */}
      <div className="flex-shrink-0">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Load preset</p>
        <div className="flex gap-2">
          {PREBUILT_SEQUENCES.map(preset => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset.id)}
              className={`flex-1 text-xs py-2 px-3 rounded-xl border font-medium transition-all
                ${preset.chipClass} hover:opacity-90 active:scale-95`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Inline confirmation */}
        {confirmPreset && (() => {
          const preset = PREBUILT_SEQUENCES.find(s => s.id === confirmPreset)
          return (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center justify-between bg-slate-800 border border-slate-600
                rounded-xl px-3 py-2"
            >
              <span className="text-xs text-slate-300">
                Replace sequence with <strong className="text-white">{preset?.name}</strong>?
              </span>
              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => setConfirmPreset(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >Cancel</button>
                <button
                  onClick={() => loadPreset(confirmPreset)}
                  className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 font-medium"
                >Load</button>
              </div>
            </motion.div>
          )
        })()}
      </div>

      {/* ── Series chips ────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 flex gap-1.5 overflow-x-auto pb-0.5"
        style={{ scrollbarWidth: 'none' }}
      >
        {SERIES.map(s => (
          <button
            key={s}
            onClick={() => setSeries(s)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all
              ${series === s
                ? s === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : SERIES_COLORS[s]
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
              }`}
          >
            {SERIES_LABELS[s]}
          </button>
        ))}
      </div>

      {/* ── Search + category ───────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex gap-2">
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search poses…"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
            text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-sm
            text-white focus:outline-none focus:border-indigo-500 capitalize"
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c} className="capitalize">{c}</option>
          ))}
        </select>
      </div>

      {/* ── Pose library ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {filteredPoses.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-slate-500 text-sm py-8"
            >
              No poses match your search.
            </motion.p>
          )}
          {filteredPoses.map(pose => (
            <motion.div
              key={pose.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="mb-2"
            >
              <PoseCard
                pose={pose}
                onSelect={onSelectPose}
                onAdd={togglePose}
                isSelected={selectedPose?.id === pose.id}
                isInSequence={sequence.some(p => p.id === pose.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
