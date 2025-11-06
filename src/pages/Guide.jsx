import { motion } from 'framer-motion'
import { guideModules } from '../data/monitoringData.js'

const Guide = () => {
  return (
    <motion.div
      key="guide"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-primary-start/70 to-primary-end/70 p-10 text-white shadow-xl shadow-primary-start/30">
        <h2 className="text-3xl font-semibold tracking-tight">Welcome to WebAgriculture</h2>
        <p className="mt-3 max-w-3xl text-sm text-white/80">
          Jelajahi modul pembelajaran yang dirancang untuk membantu praktisi kelapa sawit meningkatkan produktivitas secara
          berkelanjutan. Setiap modul dilengkapi panduan praktis, checklist, dan insight berbasis data.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {guideModules.map((module) => (
          <motion.div
            key={module.title}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`flex flex-col gap-3 rounded-3xl border border-white/10 bg-gradient-to-br ${module.accent} p-6 text-white shadow-lg shadow-black/20`}
          >
            <h3 className="text-xl font-semibold">{module.title}</h3>
            <p className="text-sm text-white/90">{module.description}</p>
            <button className="mt-4 w-max rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm transition hover:bg-white/30">
              Lihat Modul
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Guide
