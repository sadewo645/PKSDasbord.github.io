import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import DataTable from '../components/DataTable.jsx'
import { useSheetData } from '../hooks/useSheetData.js'
import { buildKeyDictionary, formatUpdatedAt, parseNumber, resolveKey } from '../utils/dataHelpers.js'

const fallbackRows = [
  {
    Bulan: 'Januari',
    'Produksi CPO (ton)': 980,
    FFA: 3.1,
    DOBI: 2.62,
    'Kadar Air (%)': 0.22,
    PV: 3.4,
  },
  {
    Bulan: 'Februari',
    'Produksi CPO (ton)': 1040,
    FFA: 3.0,
    DOBI: 2.7,
    'Kadar Air (%)': 0.25,
    PV: 3.6,
  },
  {
    Bulan: 'Maret',
    'Produksi CPO (ton)': 1125,
    FFA: 2.9,
    DOBI: 2.8,
    'Kadar Air (%)': 0.23,
    PV: 3.5,
  },
]

const getValue = (row, resolvedKey, fallbackKey) => {
  if (!row) return undefined
  if (resolvedKey && row[resolvedKey] != null) return row[resolvedKey]
  if (fallbackKey && row[fallbackKey] != null) return row[fallbackKey]
  return undefined
}

const formatNumber = (value, options = {}) => {
  if (value == null || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('id-ID', options).format(value)
}

const Perusahaan = () => {
  const { rows, loading, error, updatedAt, refresh } = useSheetData('Perusahaan', fallbackRows)

  const { chartData, latestSummary, indicatorCards } = useMemo(() => {
    if (!rows || rows.length === 0) {
      return { chartData: [], latestSummary: null, indicatorCards: [] }
    }

    const dictionary = buildKeyDictionary(rows)
    const monthKey = resolveKey(dictionary, ['bulan', 'month', 'periode'])
    const productionKey = resolveKey(dictionary, [
      'produksi',
      'produksi cpo (ton)',
      'cpo (ton)',
      'total produksi',
      'produksi bulan ini',
    ])
    const indicatorKeys = {
      ffa: resolveKey(dictionary, ['ffa']),
      dobi: resolveKey(dictionary, ['dobi']),
      moisture: resolveKey(dictionary, ['kadar air (%)', 'kadar air', 'moisture', 'moisture (%)']),
      pv: resolveKey(dictionary, ['pv', 'peroxide value', 'nilai pv']),
    }

    const chartPoints = rows
      .map((row) => {
        const month = monthKey ? row[monthKey] : row.Bulan ?? row.month
        return {
          month,
          FFA: parseNumber(getValue(row, indicatorKeys.ffa, 'FFA')),
          DOBI: parseNumber(getValue(row, indicatorKeys.dobi, 'DOBI')),
          KadarAir: parseNumber(getValue(row, indicatorKeys.moisture, 'Kadar Air (%)')),
          PV: parseNumber(getValue(row, indicatorKeys.pv, 'PV')),
        }
      })
      .filter((item) => item.month)

    const latestRow = rows[rows.length - 1]
    const latestMonth = monthKey ? latestRow?.[monthKey] : latestRow?.Bulan ?? latestRow?.month
    const productionValue = parseNumber(getValue(latestRow, productionKey, 'Produksi CPO (ton)'))

    const cards = [
      {
        key: 'FFA',
        label: 'FFA',
        value: parseNumber(getValue(latestRow, indicatorKeys.ffa, 'FFA')),
        unit: '%',
      },
      {
        key: 'DOBI',
        label: 'DOBI',
        value: parseNumber(getValue(latestRow, indicatorKeys.dobi, 'DOBI')),
        unit: '',
      },
      {
        key: 'KadarAir',
        label: 'Kadar Air',
        value: parseNumber(getValue(latestRow, indicatorKeys.moisture, 'Kadar Air (%)')),
        unit: '%',
      },
      {
        key: 'PV',
        label: 'PV',
        value: parseNumber(getValue(latestRow, indicatorKeys.pv, 'PV')),
        unit: 'meq/kg',
      },
    ]

    return {
      chartData: chartPoints,
      latestSummary: {
        month: latestMonth,
        production: productionValue,
      },
      indicatorCards: cards,
    }
  }, [rows])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-[#a21caf]/20 to-[#2563eb]/20 px-6 py-6 shadow-inner shadow-[#2563eb]/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Ringkasan Data Perusahaan</h2>
          <p className="text-sm text-slate-300">Analisis kualitas CPO dan kinerja produksi bulanan.</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-200">
          <span>Terakhir diperbarui: {formatUpdatedAt(updatedAt)}</span>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[#a21caf] to-[#2563eb] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
          >
            Muat ulang
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Tren Kualitas CPO</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">Nilai per bulan</span>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#cbd5f5" tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5f5" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(148,163,184,0.2)', color: '#e2e8f0' }}
              />
              <Legend iconType="circle" verticalAlign="top" wrapperStyle={{ paddingBottom: 16 }} />
              <Line type="monotone" dataKey="FFA" stroke="#a21caf" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="DOBI" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="KadarAir" stroke="#f97316" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="PV" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {latestSummary ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-slate-200 shadow-inner shadow-[#2563eb]/10">
          <p className="text-base font-semibold text-white">Ringkasan Produksi Terbaru</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {latestSummary.month ? `Periode ${latestSummary.month}` : 'Periode terbaru'}:
            <span className="ml-2 font-bold text-[#b5c7ff]">
              {formatNumber(latestSummary.production, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ton
            </span>
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indicatorCards.map((card) => (
          <div
            key={card.key}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#a21caf]/25 to-[#2563eb]/25 p-5 text-white shadow-inner shadow-[#2563eb]/20"
          >
            <p className="text-sm text-slate-200">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatNumber(card.value, { maximumFractionDigits: 2 })}
              {card.unit ? <span className="ml-1 text-sm font-normal text-slate-200">{card.unit}</span> : null}
            </p>
          </div>
        ))}
      </div>

      <DataTable rows={rows} loading={loading} error={error} emptyMessage="Belum ada data perusahaan." />
    </section>
  )
}

export default Perusahaan
