type StatProps = {
  label: string
  value: string
  accent: 'indigo' | 'cyan' | 'emerald'
}

const accentClasses = {
  indigo: 'from-indigo-500/20 to-indigo-400/5 text-indigo-200 border-indigo-500/30',
  cyan: 'from-cyan-500/20 to-cyan-400/5 text-cyan-200 border-cyan-500/30',
  emerald: 'from-emerald-500/20 to-emerald-400/5 text-emerald-200 border-emerald-500/30',
}

export default function StatCard({ label, value, accent }: StatProps) {
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 ${accentClasses[accent]}`}>
      <div className="text-xs uppercase tracking-[0.2em] text-slate-300">{label}</div>
      <div className="mt-3 text-3xl font-black tracking-tight">{value}</div>
    </div>
  )
}
