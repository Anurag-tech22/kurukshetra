type Session = {
  id: number
  title: string
  duration: number
  subject: string
  date: string
}

type Props = {
  sessions: Session[]
  onAddSession: (title: string, subject: string, duration: number) => void
}

export default function SessionList({ sessions, onAddSession }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') || '').trim()
    const subject = String(form.get('subject') || '').trim()
    const duration = Number(form.get('duration') || 0)

    if (!title || !subject || duration <= 0) return

    onAddSession(title, subject, duration)
    event.currentTarget.reset()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Planner</p>
          <h3 className="mt-2 text-xl font-semibold">Sessions</h3>
        </div>
        <span className="chip">{sessions.length} logged</span>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4">
        <input
          name="title"
          placeholder="Session title"
          className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400"
        />
        <input
          name="subject"
          placeholder="Subject"
          className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400"
        />
        <input
          name="duration"
          type="number"
          min={10}
          step={5}
          placeholder="Minutes"
          className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400"
        />
        <button type="submit" className="primary-btn">
          Add session
        </button>
      </form>

      <div className="space-y-3">
        {sessions.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
            <div>
              <div className="font-semibold text-slate-100">{item.title}</div>
              <div className="mt-1 text-xs text-slate-400">
                {item.subject} • {item.date}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-cyan-300">{item.duration} min</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">Focus</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
