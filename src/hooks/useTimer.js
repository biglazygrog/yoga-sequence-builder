import { useState, useEffect, useRef, useCallback } from 'react'

// useTimer drives the per-pose countdown in practice mode.
// We use setInterval rather than requestAnimationFrame because we need
// wall-clock seconds, not animation frames, and we want to fire even
// when the tab is backgrounded.
export function useTimer(duration, onComplete) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [status, setStatus] = useState('idle') // 'idle' | 'running' | 'paused' | 'done'
  const onCompleteRef = useRef(onComplete)

  // Keep the callback ref fresh without restarting the interval
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  // Reset when the pose duration changes (i.e. a new pose is selected)
  useEffect(() => {
    setTimeLeft(duration)
    setStatus('idle')
  }, [duration])

  useEffect(() => {
    if (status !== 'running') return

    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('done')
          onCompleteRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [status])

  const start  = useCallback(() => setStatus('running'), [])
  const pause  = useCallback(() => setStatus('paused'), [])
  const reset  = useCallback(() => {
    setStatus('idle')
    setTimeLeft(duration)
  }, [duration])

  return {
    timeLeft,
    status,
    progress: duration > 0 ? 1 - timeLeft / duration : 0,
    start,
    pause,
    reset,
  }
}
