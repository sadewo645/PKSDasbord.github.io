import { Building2, Factory, Leaf, BookOpen } from 'lucide-react'
import clsx from 'clsx'

const menu = [
  {
    title: 'DASHBOARD',
    items: [
      { key: 'perkebunan', label: 'Monitoring Perkebunan', icon: Leaf },
      { key: 'pabrik', label: 'Monitoring Pabrik', icon: Factory },
      { key: 'perusahaan', label: 'Monitoring Perusahaan', icon: Building2 },
    ],
  },
  {
    title: 'PANDUAN',
    items: [{ key: 'guide', label: 'Panduan Budidaya', icon: BookOpen }],
  },
]

const Sidebar = ({ activePage, onChange }) => {
  return (
    <aside className="hidden md:flex md:flex-col w-72 bg-sidebar-bg/95 text-slate-100 border-r border-white/5 backdrop-blur-lg">
      <div className="px-6 py-8">
        <div className="text-lg font-semibold tracking-wide text-white">Sawit Insight</div>
        <p className="text-sm text-slate-400 mt-1">
          Analitik real-time untuk budidaya kelapa sawit berkelanjutan.
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto pb-8">
        {menu.map((section) => (
          <div key={section.title}>
            <h4 className="px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {section.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = activePage === item.key || (activePage === 'dashboard' && item.key === 'perkebunan')

                return (
                  <li key={item.key}>
                    <button
                      onClick={() => onChange(item.key === 'guide' ? 'guide' : 'dashboard', item.key)}
                      className={clsx(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all',
                        isActive
                          ? 'bg-gradient-to-r from-primary-start/80 to-primary-end/80 text-white shadow-lg shadow-primary-start/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-primary-start">
                        <Icon size={18} />
                      </span>
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/5 px-6 py-6 text-xs text-slate-500">
        © {new Date().getFullYear()} Sawit Insight. Semua hak dilindungi.
      </div>
    </aside>
main
  )
}

export default Sidebar
