import { Menu, Search } from 'lucide-react'

const Navbar = ({ title, description, onToggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-30 bg-gradient-to-r from-[#a21caf] to-[#2563eb] text-white shadow-lg md:left-72">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-10 md:py-5 lg:px-12">
        <div className="flex flex-1 items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 md:hidden"
            aria-label="Buka navigasi"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Budidaya Kelapa Sawit</p>
            <h1 className="text-xl font-semibold leading-tight md:text-2xl">{title}</h1>
            {description ? <p className="text-sm text-white/80">{description}</p> : null}
          </div>
        </div>
        <div className="relative hidden max-w-xs flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={18} />
          <input
            type="search"
            placeholder="Cari laporan, modul, atau data..."
            className="w-full rounded-full border border-white/10 bg-white/15 py-2.5 pl-10 pr-4 text-sm placeholder:text-white/70 shadow-inner focus:border-white/30 focus:outline-none"
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar
