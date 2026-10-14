import { useEffect, useMemo, useRef, useState } from 'react'

const presets = [25, 50, 90]

export default function Timer() {
  const [selectedMinutes, setSelectedMinutes] = useState(25)
  const [secondsLeft, setSecondsLeft] = useState(selectedMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setSecondsLeft(selectedMinutes * 60)
    setIsRunning(false)
  }, [selectedMinutes])

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const minutes = useMemo(() => Math.floor(secondsLeft / 60), [secondsLeft])
  const seconds = useMemo(() => secondsLeft % 60, [secondsLeft])

  const progress = ((selectedMinutes * 60 - secondsLeft) / (selectedMinutes * 60)) * 100

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {presets.map((value) => (
          <button
            key={value}
            onClick={() => setSelectedMinutes(value)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              selectedMinutes === value
                ? 'border-indigo-400 bg-indigo-500/10 text-indigo-200'
                : 'border-slate-700 bg-slate-800/80 text-slate-300'
            }`}
          >
            {value} min
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6">
        <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
          <span>Session progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all"
            style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
          />
        </div>

        <div className="text-center">
          <div className="font-mono text-5xl font-black tracking-tight md:text-6xl">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => setIsRunning((prev) => !prev)} className="primary-btn">
          {isRunning ? 'Pause' : 'Start'} session
        </button>
        <button
          onClick={() => {
            setIsRunning(false)
            setSecondsLeft(selectedMinutes * 60)
          }}
          className="secondary-btn"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
