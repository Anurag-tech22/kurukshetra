import React, { useEffect, useState, useRef } from 'react'

export default function Timer(){
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(()=>{
    if(running){
      intervalRef.current = window.setInterval(()=>{
        setSeconds(s => Math.max(0, s-1))
      }, 1000)
    } else if(intervalRef.current){
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return ()=>{ if(intervalRef.current) clearInterval(intervalRef.current) }
  },[running])

  useEffect(()=>{
    if(seconds === 0){
      setRunning(false)
      // TODO: create a session record when timer ends
      alert('Session complete!')
    }
  },[seconds])

  const minutes = Math.floor(seconds/60).toString().padStart(2,'0')
  const secs = (seconds%60).toString().padStart(2,'0')

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-mono font-semibold">{minutes}:{secs}</div>
          <div className="mt-2 text-slate-400">Pomodoro • Focus mode</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={()=>setRunning(r=>!r)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">{running? 'Pause':'Start'}</button>
        <button onClick={()=>{ setRunning(false); setSeconds(25*60) }} className="px-4 py-2 rounded-lg bg-slate-700 text-white">Reset</button>
      </div>
    </div>
  )
}
