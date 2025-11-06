const DataTable = ({ rows, loading, error, emptyMessage = 'Tidak ada data tersedia.' }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
        Memuat data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-100">
        Terjadi kesalahan saat memuat data. Menampilkan data cadangan.
      </div>
    )
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
        {emptyMessage}
      </div>
    )
  }

  const headers = rows.reduce((acc, row) => {
    Object.keys(row ?? {}).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key)
      }
    })
    return acc
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">
      <div className="relative w-full overflow-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/70">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5">
                {headers.map((header) => (
                  <td key={header} className="whitespace-nowrap px-4 py-3 text-sm text-slate-100">
                    {String(row[header] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
