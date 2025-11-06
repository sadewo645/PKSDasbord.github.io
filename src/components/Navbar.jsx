import { Search } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 flex flex-col gap-4 border-b border-white/5 bg-gradient-to-r from-primary-start to-primary-end/90 px-6 py-5 text-white shadow-lg shadow-primary-start/30">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Budidaya Kelapa Sawit</h1>
          <p className="text-sm text-white/80">
            Dashboard interaktif untuk memonitor kebun, pabrik, dan kinerja perusahaan.
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
          <input
            type="text"
            placeholder="Cari laporan, modul, atau data..."
            className="w-full rounded-full bg-white/10 py-2.5 pl-10 pr-4 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar
