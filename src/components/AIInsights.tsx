import React, { useState } from 'react'

async function callSummarizeAPI(text: string){
  try{
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    if(!res.ok) throw new Error('API Error')
    const data = await res.json()
    return data
  }catch(err){
    return { error: 'No AI available. Falling back to local summarizer.', summary: localSummarize(text) }
  }
}

function localSummarize(text: string){
  // super simple local summarizer: return first 3 sentences
  const parts = text.split(/(?<=[.!?])\s+/).slice(0,3)
  return parts.join(' ')
}

export default function AIInsights(){
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  async function handleSummarize(){
    if(!input.trim()) return
    setLoading(true)
    const res = await callSummarizeAPI(input)
    if(res?.summary) setSummary(res.summary)
    else if(res?.error) setSummary(res.error)
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={6} className="w-full bg-slate-900 p-3 rounded-md text-sm" placeholder="Paste lecture notes or ideas to get a concise summary and action items"></textarea>
      <div className="flex gap-2">
        <button onClick={handleSummarize} disabled={loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white">{loading? 'Working...':'Summarize'}</button>
        <button onClick={()=>{ setInput(''); setSummary(null) }} className="px-4 py-2 rounded-md bg-slate-700 text-white">Clear</button>
      </div>

      {summary && (
        <div className="mt-2 bg-slate-900 p-3 rounded-md">
          <h4 className="font-semibold">AI Summary</h4>
          <p className="text-sm text-slate-300 mt-2">{summary}</p>
        </div>
      )}
    </div>
  )
}
