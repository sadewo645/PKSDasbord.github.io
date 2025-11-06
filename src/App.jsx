import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, BookOpen } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Guide from './pages/Guide.jsx'

const App = () => {
  const [activePage, setActivePage] = useState('dashboard')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('perkebunan')

  const handleChangePage = (page, section) => {
    setActivePage(page)
    setActiveSection(section)
    setMobileNavOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar activePage={activePage === 'dashboard' ? activeSection : 'guide'} onChange={handleChangePage} />
      <div className="flex w-full flex-col">
        <div className="md:hidden">
          <div className="flex items-center justify-between border-b border-white/10 bg-sidebar-bg/80 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-start to-primary-end text-white shadow-lg">
                <LayoutDashboard size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">Sawit Insight</p>
                <p className="text-xs text-white/60">Dashboard Kelapa Sawit</p>
              </div>
            </div>
            <button
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {mobileNavOpen && (
            <div className="space-y-2 border-b border-white/10 bg-sidebar-bg/95 px-4 py-4">
              <button
                onClick={() => handleChangePage('dashboard', 'perkebunan')}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm ${
                  activePage === 'dashboard'
                    ? 'bg-gradient-to-r from-primary-start/80 to-primary-end/80 text-white'
                    : 'bg-white/5 text-white/70'
                }`}
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button
                onClick={() => handleChangePage('guide', 'guide')}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm ${
                  activePage === 'guide'
                    ? 'bg-gradient-to-r from-primary-start/80 to-primary-end/80 text-white'
                    : 'bg-white/5 text-white/70'
                }`}
              >
                <BookOpen size={18} /> Panduan Budidaya
              </button>
            </div>
          )}
        </div>

        <Navbar />

        <main className="flex-1 space-y-8 bg-slate-950 px-4 pb-10 pt-6 md:px-8 lg:px-10">
          <AnimatePresence mode="wait">
            {activePage === 'dashboard' ? <Dashboard key="dashboard" /> : <Guide key="guide" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
main
  )
}

export default App
