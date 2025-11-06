const MetricCard = ({ label, value, unit, status, icon }) => {
  const Icon = icon
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-white shadow-inner shadow-primary-start/10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/70">{label}</p>
        {Icon && (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-primary-end">
            <Icon size={18} />
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold tracking-tight">
        {value}
        {unit && <span className="ml-1 text-base text-white/70">{unit}</span>}
      </div>
      {status && <span className="text-xs font-medium uppercase tracking-wide text-emerald-300">{status}</span>}
    </div>
  )
}

export default MetricCard
