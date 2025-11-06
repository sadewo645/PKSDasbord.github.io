const StatusCard = ({ title, status, gradient }) => {
  return (
    <div className={`flex flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br ${gradient} p-4 text-white shadow-xl shadow-primary-start/20`}>
      <div className="text-sm text-white/80">{title}</div>
      <div className="mt-4 text-lg font-semibold">{status}</div>
    </div>
  )
}

export default StatusCard
