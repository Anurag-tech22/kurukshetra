import React from 'react'
import Timer from './components/Timer'
import AIInsights from './components/AIInsights'
import Sessions from './components/Sessions'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-950/60 backdrop-blur sticky top-0 z-30 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">Kurukshetra</div>
            <div className="text-sm text-slate-400">Smart Study Planner</div>
          </div>
          <nav className="flex items-center gap-3">
            <a href="#" className="text-slate-300 hover:text-white">Dashboard</a>
            <a href="#projects" className="text-slate-300 hover:text-white">Planner</a>
            <a href="#contact" className="text-slate-300 hover:text-white">Settings</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Focus Timer</h2>
              <Timer />
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Study Sessions</h2>
              <Sessions />
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">AI Insights (Summarize / Action Items)</h2>
              <AIInsights />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold">Quick Stats</h3>
              <div className="mt-4 text-slate-300">Total Focus Time: <strong>3h 40m</strong></div>
              <div className="mt-2 text-slate-300">Streak: <strong>5 days</strong></div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold">Presets</h3>
              <div className="mt-3 flex flex-col gap-2">
                <button className="btn-brand text-white px-4 py-2 rounded-lg">Pomodoro 25/5</button>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-lg">Long Focus 50/10</button>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-4">
        <div className="container mx-auto px-4 text-sm text-slate-400">© 2026 Anurag Nitin Thopate — Kurukshetra</div>
      </footer>
    </div>
  )
}
