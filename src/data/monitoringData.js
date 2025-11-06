export const harvestData = [
  { month: 'Jan', hasil: 950 },
  { month: 'Feb', hasil: 1020 },
  { month: 'Mar', hasil: 1100 },
  { month: 'Apr', hasil: 980 },
  { month: 'Mei', hasil: 1250 },
  { month: 'Jun', hasil: 1180 },
]

export const soilMetrics = {
  ph: { value: 6.2, status: 'Optimal' },
  moisture: 72,
  light: 14500,
  rainfall: 230,
}

export const millStations = [
  { name: 'Sterilizer', status: 'Optimal', color: 'from-green-400 to-emerald-500' },
  { name: 'Press', status: 'Maintenance', color: 'from-yellow-400 to-amber-500' },
  { name: 'Clarification', status: 'Optimal', color: 'from-green-400 to-emerald-500' },
  { name: 'Kernel', status: 'Perlu inspeksi', color: 'from-orange-400 to-rose-500' },
  { name: 'Boiler', status: 'Siaga', color: 'from-sky-400 to-blue-500' },
]

export const wastewaterData = [
  { month: 'Jan', COD: 250, BOD: 120 },
  { month: 'Feb', COD: 220, BOD: 105 },
  { month: 'Mar', COD: 210, BOD: 98 },
  { month: 'Apr', COD: 240, BOD: 115 },
  { month: 'Mei', COD: 195, BOD: 90 },
  { month: 'Jun', COD: 185, BOD: 88 },
]

export const cpoProduction = [
  { month: 'Jan', produksi: 1050 },
  { month: 'Feb', produksi: 1120 },
  { month: 'Mar', produksi: 1250 },
  { month: 'Apr', produksi: 1190 },
  { month: 'Mei', produksi: 1310 },
  { month: 'Jun', produksi: 1375 },
]

export const qualityIndicators = [
  { key: 'FFA', value: 3.2, target: 5, color: '#22d3ee' },
  { key: 'DOBI', value: 2.8, target: 3, color: '#a855f7' },
  { key: 'Kadar Air', value: 0.18, target: 0.25, color: '#f97316' },
  { key: 'PV', value: 4.1, target: 5, color: '#38bdf8' },
]

export const businessSummary = {
  totalProduction: 1250,
  trend: '+4.2% dibanding bulan lalu',
  remarks: 'Stok CPO stabil, optimalkan distribusi ke pabrik hilir.',
}

export const guideModules = [
  {
    title: 'Faktor Penentu Produktivitas',
    description:
      'Optimalkan varietas unggul, nutrisi seimbang, dan pengendalian hama untuk hasil maksimal.',
    accent: 'from-purple-500/80 to-pink-500/80',
  },
  {
    title: 'Pembibitan',
    description:
      'Seleksi kecambah berkualitas dan pemeliharaan nursery intensif sebagai fondasi kebun produktif.',
    accent: 'from-sky-500/80 to-indigo-500/80',
  },
  {
    title: 'Land Preparation',
    description:
      'Analisis lahan, perbaikan drainase, dan pengolahan tanah berkelanjutan.',
    accent: 'from-emerald-500/80 to-teal-500/80',
  },
  {
    title: 'Penanaman',
    description:
      'Gunakan pola tanam sesuai topografi dan pemupukan dasar yang tepat.',
    accent: 'from-amber-500/80 to-orange-500/80',
  },
  {
    title: 'Upkeep TBM/TM',
    description:
      'Lakukan sanitasi, pemupukan berkala, dan pemeliharaan jalan produksi.',
    accent: 'from-fuchsia-500/80 to-rose-500/80',
  },
  {
    title: 'Panen & Transportasi',
    description:
      'Atur rotasi panen efisien, kontrol kualitas TBS, dan distribusi cepat ke pabrik.',
    accent: 'from-lime-500/80 to-green-500/80',
  },
]

export const fetchData = async (url, setter) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Gagal memuat data')
    const data = await response.json()
    setter(data)
  } catch (error) {
    console.error('fetchData error:', error)
  }
}
