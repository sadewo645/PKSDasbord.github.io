import { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DataTable from '../components/DataTable.jsx'
import { useSheetData } from '../hooks/useSheetData.js'
import { buildKeyDictionary, formatUpdatedAt, parseNumber, resolveKey } from '../utils/dataHelpers.js'

const fallbackRows = [
  {
    Stasiun: 'Sterilizer',
    'COD (mg/L)': 1820,
    'BOD (mg/L)': 680,
    Status: 'Normal',
  },
  {
    Stasiun: 'Press',
    'COD (mg/L)': 2050,
    'BOD (mg/L)': 720,
    Status: 'Normal',
  },
  {
    Stasiun: 'Clarification',
    'COD (mg/L)': 2400,
    'BOD (mg/L)': 790,
    Status: 'Perlu perhatian',
  },
  {
    Stasiun: 'Kernel',
    'COD (mg/L)': 1980,
    'BOD (mg/L)': 710,
    Status: 'Normal',
  },
  {
    Stasiun: 'Boiler',
    'COD (mg/L)': 2600,
    'BOD (mg/L)': 860,
    Status: 'Perlu tindakan',
  },
]

const Pabrik = () => {
  const { rows, loading, error, updatedAt, refresh } = useSheetData('Pabrik', fallbackRows)

  const chartData = useMemo(() => {
    if (!rows || rows.length === 0) return []
    const dictionary = buildKeyDictionary(rows)
    const stationKey = resolveKey(dictionary, ['stasiun', 'station', 'unit', 'nama stasiun'])
    const codKey = resolveKey(dictionary, ['cod', 'cod (mg/l)', 'nilai cod', 'kadar cod'])
    const bodKey = resolveKey(dictionary, ['bod', 'bod (mg/l)', 'nilai bod', 'kadar bod'])

    return rows
      .map((row) => {
        const station = stationKey ? row[stationKey] : row.Stasiun ?? row.Station
        const cod = parseNumber(codKey ? row[codKey] : row['COD (mg/L)'])
        const bod = parseNumber(bodKey ? row[bodKey] : row['BOD (mg/L)'])
        return {
          station,
          COD: cod,
          BOD: bod,
        }
      })
      .filter((item) => item.station && !Number.isNaN(item.COD) && !Number.isNaN(item.BOD))
  }, [rows])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-[#a21caf]/20 to-[#2563eb]/20 px-6 py-6 shadow-inner shadow-[#2563eb]/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Ringkasan Data Pabrik</h2>
          <p className="text-sm text-slate-300">Pantau kinerja stasiun pengolahan dan kolam limbah.</p>
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
          <h3 className="text-base font-semibold text-white">Kadar COD &amp; BOD per Stasiun</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">mg/L</span>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" />
              <XAxis dataKey="station" stroke="#cbd5f5" tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5f5" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(148,163,184,0.2)', color: '#e2e8f0' }}
              />
              <Legend iconType="circle" verticalAlign="top" wrapperStyle={{ paddingBottom: 16 }} />
              <Line type="monotone" dataKey="COD" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="BOD" stroke="#a21caf" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable rows={rows} loading={loading} error={error} emptyMessage="Belum ada data pabrik." />
    </section>
  )
}

export default Pabrik
