import { Building2, Factory, Leaf } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  {
    to: '/perkebunan',
    label: 'Perkebunan',
    description: 'Hasil panen & kondisi kebun',
    icon: Leaf,
  },
  {
    to: '/pabrik',
    label: 'Pabrik',
    description: 'Stasiun pengolahan & limbah',
    icon: Factory,
  },
  {
    to: '/perusahaan',
    label: 'Perusahaan',
    description: 'Produksi & kualitas CPO',
    icon: Building2,
  },
]

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-6 pb-6 pt-10">
          <div className="text-lg font-semibold tracking-wide text-white">Sawit Insight</div>
          <p className="mt-1 text-sm text-slate-400">Dashboard terpadu budidaya kelapa sawit.</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-10">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative mb-2 flex items-start gap-3 rounded-2xl border border-white/5 px-4 py-4 transition-all hover:border-white/20 hover:bg-white/5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#a21caf]/90 to-[#2563eb]/90 text-white shadow-lg shadow-[#2563eb]/20'
                      : 'text-slate-300'
                  }`
                }
              >
                <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#a21caf] group-hover:bg-white/15">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-base font-semibold">{item.label}</span>
                  <span className="text-sm text-slate-400 group-hover:text-slate-200">{item.description}</span>
                </span>
              </NavLink>
            )
          })}
        </nav>
        <div className="border-t border-white/5 px-6 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Sawit Insight. Semua hak dilindungi.
        </div>
      </aside>
    </>
  )
}

export default Sidebar
