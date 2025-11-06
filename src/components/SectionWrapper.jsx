const SectionWrapper = ({ title, subtitle, children, accent = 'from-white/10 to-white/5' }) => {
  return (
    <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-xl shadow-black/20 backdrop-blur">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${accent}`} />
      </div>
      {children}
    </section>
  )
}

export default SectionWrapper
