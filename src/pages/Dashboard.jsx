import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Droplets, Sun, CloudRain, Gauge } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper.jsx'
import MetricCard from '../components/MetricCard.jsx'
import StatusCard from '../components/StatusCard.jsx'
import IndicatorGauge from '../components/IndicatorGauge.jsx'
import {
  harvestData,
  soilMetrics,
  millStations,
  wastewaterData,
  cpoProduction,
  qualityIndicators,
  businessSummary,
} from '../data/monitoringData.js'

const Dashboard = () => {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <SectionWrapper
        title="Monitoring Perkebunan"
        subtitle="Integrasi sensor lapangan untuk memastikan performa agronomis optimal"
        accent="from-primary-start to-primary-end"
      >
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="col-span-2 rounded-2xl border border-white/5 bg-white/5 p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Hasil Panen Bulanan</h3>
              <span className="text-xs uppercase tracking-wide text-white/60">TBS (ton)</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={harvestData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f107a3" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#7b2ff7" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.15)' }} />
                  <Bar dataKey="hasil" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="pH Tanah"
              value={soilMetrics.ph.value}
              status={soilMetrics.ph.status}
              icon={Droplets}
            />
            <MetricCard label="Kelembapan Tanah" value={soilMetrics.moisture} unit="%" icon={CloudRain} />
            <MetricCard label="Intensitas Cahaya" value={soilMetrics.light.toLocaleString()} unit="lux" icon={Sun} />
            <MetricCard label="Curah Hujan" value={soilMetrics.rainfall} unit="mm" icon={Gauge} />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Monitoring Pabrik"
        subtitle="Pantau kinerja stasiun pengolahan dan kualitas lingkungan secara real-time"
        accent="from-sky-500 to-blue-500"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {millStations.map((station) => (
              <StatusCard key={station.name} title={station.name} status={station.status} gradient={station.color} />
            ))}
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Monitoring Kolam Limbah</h3>
              <span className="text-xs uppercase tracking-wide text-white/60">COD / BOD</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wastewaterData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Line type="monotone" dataKey="COD" stroke="#f97316" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="BOD" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Monitoring Perusahaan"
        subtitle="Performa produksi, kualitas CPO, dan insight bisnis terbaru"
        accent="from-emerald-400 to-teal-400"
      >
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="col-span-2 rounded-2xl border border-white/5 bg-white/5 p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Produksi Bulanan CPO</h3>
              <span className="text-xs uppercase tracking-wide text-white/60">Ton</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cpoProduction}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#7b2ff7" stopOpacity={0.15} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderRadius: 12, border: '1px solid #1e293b' }} />
                  <Area type="monotone" dataKey="produksi" stroke="#38bdf8" strokeWidth={3} fill="url(#areaGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {qualityIndicators.map((indicator) => (
              <IndicatorGauge
                key={indicator.key}
                label={indicator.key}
                value={indicator.value}
                target={indicator.target}
                color={indicator.color}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-white/5 bg-gradient-to-r from-primary-start/40 to-primary-end/40 p-6 text-white shadow-inner shadow-primary-end/20">
          <h4 className="text-lg font-semibold">Ringkasan Bisnis</h4>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            Total produksi bulan ini: {businessSummary.totalProduction.toLocaleString()} ton
          </p>
          <p className="mt-2 text-sm text-white/80">{businessSummary.trend}</p>
          <p className="mt-2 text-sm text-white/70">{businessSummary.remarks}</p>
        </div>
      </SectionWrapper>
    </motion.div>
  )
}

export default Dashboard
