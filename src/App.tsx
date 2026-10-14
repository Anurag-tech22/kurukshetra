import { useEffect, useMemo, useState } from 'react'
import Timer from './components/Timer'
import SessionList from './components/SessionList'
import AIInsights from './components/AIInsights'
import StatCard from './components/StatCard'

export type SessionItem = {
  id: number
  title: string
  duration: number
  subject: string
  date: string
}

const defaultSessions: SessionItem[] = [
  { id: 1, title: 'Algorithms practice', duration: 45, subject: 'Math', date: 'Today' },
  { id: 2, title: 'Data structures recap', duration: 35, subject: 'CS', date: 'Today' },
  { id: 3, title: 'Biology revision', duration: 60, subject: 'Science', date: 'Yesterday' },
]

const storageKey = 'kurukshetra-sessions'

export default function App() {
  const [sessions, setSessions] = useState<SessionItem[]>(() => {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return defaultSessions
    try {
      return JSON.parse(raw)
    } catch {
      return defaultSessions
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sessions))
  }, [sessions])

  const totalFocus = useMemo(
    () => sessions.reduce((sum, item) => sum + item.duration, 0),
    [sessions]
  )

  const streak = Math.min(12, Math.max(4, Math.round(totalFocus / 90)))

  const handleAddSession = (title: string, subject: string, duration: number) => {
    setSessions((prev) => [
      {
        id: Date.now(),
        title,
        duration,
        subject,
        date: 'Now',
      },
      ...prev,
    ])
  }

  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-700/70 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-lg font-black text-white shadow-lg shadow-indigo-500/30">
              K
            </div>
            <div>
              <div className="text-xl font-black tracking-tight">Kurukshetra</div>
              <div className="text-xs text-slate-400">Smart Study Planner</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#dashboard" className="text-slate-300 transition hover:text-white">Dashboard</a>
            <a href="#planner" className="text-slate-300 transition hover:text-white">Planner</a>
            <a href="#insights" className="text-slate-300 transition hover:text-white">AI Insights</a>
          </nav>

          <button className="primary-btn">Upgrade plan</button>
        </div>
      </header>

      <main id="dashboard" className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <StatCard label="Focus today" value={`${Math.min(6, Math.floor(totalFocus / 60))}h ${totalFocus % 60}m`} accent="indigo" />
          <StatCard label="Study streak" value={`${streak} days`} accent="cyan" />
          <StatCard label="Sessions logged" value={`${sessions.length}`} accent="emerald" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Focus mode</p>
                  <h2 className="mt-2 text-2xl font-bold">Pomodoro timer</h2>
                </div>
                <span className="chip">Deep work</span>
              </div>

              <Timer />
            </div>

            <div id="planner" className="glass-card p-6">
              <SessionList onAddSession={handleAddSession} sessions={sessions} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Performance</p>
              <h3 className="mt-2 text-xl font-semibold">This week</h3>
              <div className="mt-6 grid grid-cols-5 gap-2">
                {[55, 70, 90, 60, 88, 75, 98].map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="flex h-24 w-full items-end rounded-xl bg-slate-800 p-1">
                      <div
                        className="w-full rounded-lg bg-gradient-to-t from-indigo-500 to-cyan-400"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-[10px] uppercase text-slate-400">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div id="insights" className="glass-card p-6">
              <AIInsights />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
