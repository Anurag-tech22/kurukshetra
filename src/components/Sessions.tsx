import React from 'react'

export default function Sessions(){
  // placeholder; real app will persist sessions in localStorage / backend
  const sample = [
    { id:1, title:'Algorithms - Graphs', duration:'25m' },
    { id:2, title:'Database - SQL', duration:'50m' }
  ]
  return (
    <div className="space-y-3">
      {sample.map(s=> (
        <div key={s.id} className="p-3 bg-slate-900 rounded-lg flex justify-between items-center">
          <div>
            <div className="font-semibold">{s.title}</div>
            <div className="text-xs text-slate-400">Tags: Practice • Medium</div>
          </div>
          <div className="text-sm text-slate-300">{s.duration}</div>
        </div>
      ))}
    </div>
  )
}
