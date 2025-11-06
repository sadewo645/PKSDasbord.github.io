import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DataTable from '../components/DataTable.jsx'
import { useSheetData } from '../hooks/useSheetData.js'
import { buildKeyDictionary, formatUpdatedAt, parseNumber, resolveKey } from '../utils/dataHelpers.js'

const fallbackRows = [
  {
    Bulan: 'Januari',
    'Hasil Panen (ton)': 1240,
    'pH Tanah': 6.3,
    'Kelembapan (%)': 68,
    'Intensitas Cahaya (lux)': 54000,
    'Curah Hujan (mm)': 210,
  },
  {
    Bulan: 'Februari',
    'Hasil Panen (ton)': 1310,
    'pH Tanah': 6.1,
    'Kelembapan (%)': 70,
    'Intensitas Cahaya (lux)': 52000,
    'Curah Hujan (mm)': 198,
  },
  {
    Bulan: 'Maret',
    'Hasil Panen (ton)': 1385,
    'pH Tanah': 6.4,
    'Kelembapan (%)': 65,
    'Intensitas Cahaya (lux)': 55000,
    'Curah Hujan (mm)': 180,
  },
]

const Perkebunan = () => {
  const { rows, loading, error, updatedAt, refresh } = useSheetData('Perkebunan', fallbackRows)

  const chartData = useMemo(() => {
    if (!rows || rows.length === 0) return []
    const dictionary = buildKeyDictionary(rows)
    const monthKey = resolveKey(dictionary, ['bulan', 'month', 'periode'])
    const valueKey = resolveKey(dictionary, ['hasil panen (ton)', 'hasil panen', 'hasil', 'produksi', 'total panen', 'tbs'])

    return rows
      .map((row) => {
        const month = monthKey ? row[monthKey] : row.Bulan ?? row.month
        const hasil = valueKey ? parseNumber(row[valueKey]) : parseNumber(row['Hasil Panen (ton)'])
        return {
          month,
          hasil,
        }
      })
      .filter((item) => item.month && !Number.isNaN(item.hasil))
  }, [rows])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-[#a21caf]/20 to-[#2563eb]/20 px-6 py-6 shadow-inner shadow-[#2563eb]/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Ringkasan Data Perkebunan</h2>
          <p className="text-sm text-slate-300">Terhubung ke Google Sheets melalui Google Apps Script.</p>
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
          <h3 className="text-base font-semibold text-white">Hasil Panen per Bulan</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">Ton TBS</span>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="perkebunanBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#a21caf" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#cbd5f5" tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5f5" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.15)' }}
                contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(148,163,184,0.2)', color: '#e2e8f0' }}
              />
              <Bar dataKey="hasil" fill="url(#perkebunanBar)" radius={[10, 10, 0, 0]}>
                <LabelList
                  dataKey="hasil"
                  position="top"
                  offset={8}
                  fill="#f8fafc"
                  fontSize={12}
                  formatter={(value) =>
                    value == null || Number.isNaN(value)
                      ? ''
                      : new Intl.NumberFormat('id-ID', {
                          maximumFractionDigits: value >= 100 ? 0 : 2,
                        }).format(value)
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable rows={rows} loading={loading} error={error} emptyMessage="Belum ada data perkebunan." />
    </section>
  )
}

export default Perkebunan
