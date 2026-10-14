import { useState } from 'react'

function localSummarize(text: string) {
  const sentences = text.split(/(?<=[.!?])\s+/).slice(0, 3)
  return sentences.join(' ') || 'Your notes are ready for review.'
}

async function summarizeNotes(text: string) {
  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error('fetch failed')
    }

    const data = await response.json()
    return data.summary || localSummarize(text)
  } catch {
    return localSummarize(text)
  }
}

export default function AIInsights() {
  const [note, setNote] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!note.trim()) return
    setLoading(true)
    const result = await summarizeNotes(note)
    setSummary(result)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">AI Assistant</p>
        <h3 className="mt-2 text-xl font-semibold">Study notes summarizer</h3>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={7}
        placeholder="Paste lecture notes, a chapter summary, or your ideas here..."
        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
      />

      <div className="flex flex-wrap gap-3">
        <button onClick={handleSummarize} disabled={loading} className="primary-btn disabled:opacity-60">
          {loading ? 'Thinking...' : 'Summarize'}
        </button>
        <button onClick={() => { setNote(''); setSummary('') }} className="secondary-btn">
          Clear
        </button>
      </div>

      {summary && (
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Summary</div>
          <p className="mt-3 text-sm leading-7 text-slate-200">{summary}</p>
        </div>
      )}
    </div>
  )
}
