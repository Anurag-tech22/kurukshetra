import { useState } from 'react'

function localSummarize(text: string) {
  // Basic local summarizer: pick first 3 sentences and remove extra whitespace
  const sentences = text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const summary = sentences.slice(0, 3).join(' ')
  return summary || 'No summary could be generated from the input.'
}

function generateActionItems(text: string) {
  // Heuristic action items: identify key nouns/phrases by taking short phrases from sentences
  const sentences = text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean)
  const items: string[] = []

  // 1: Review the main topics (first sentence subjects)
  if (sentences[0]) items.push(`Review: ${sentences[0].slice(0, 80)}...`)
  // 2: Practice / implement something based on second sentence
  if (sentences[1]) items.push(`Practice: Turn "${sentences[1].slice(0, 60)}" into an example or exercise.`)
  // 3: Create quick notes / flashcards from a third sentence or key phrase
  if (sentences[2]) items.push(`Create flashcards from: "${sentences[2].slice(0, 60)}"`)

  // If less than 3 items, fill generic actions
  while (items.length < 3) {
    items.push('Revise notes and test with short exercises.')
  }

  return items
}

export default function AIInsights() {
  const [note, setNote] = useState('')
  const [summary, setSummary] = useState('')
  const [actions, setActions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!note.trim()) return
    setLoading(true)

    // Use the local summarizer and local action generator only (no external API)
    const s = localSummarize(note)
    const a = generateActionItems(note)

    // small delay to simulate processing
    await new Promise((r) => setTimeout(r, 450))

    setSummary(s)
    setActions(a)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">AI Assistant</p>
        <h3 className="mt-2 text-xl font-semibold">Study notes summarizer (local)</h3>
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
          {loading ? 'Processing...' : 'Summarize'}
        </button>
        <button onClick={() => { setNote(''); setSummary(''); setActions([]) }} className="secondary-btn">
          Clear
        </button>
      </div>

      {summary && (
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Summary</div>
          <p className="mt-3 text-sm leading-7 text-slate-200">{summary}</p>

          <div className="mt-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Action items</div>
            <ol className="mt-2 list-decimal pl-5 text-sm text-slate-100">
              {actions.map((it, i) => (
                <li key={i} className="mt-2">{it}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
