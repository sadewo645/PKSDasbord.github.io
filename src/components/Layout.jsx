import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

const routeMeta = {
  '/perkebunan': {
    title: 'Monitoring Perkebunan',
    description: 'Pantau hasil panen, kondisi tanah, dan iklim mikro kebun secara berkala.',
  },
  '/pabrik': {
    title: 'Monitoring Pabrik',
    description: 'Amati performa stasiun pengolahan dan kualitas kolam limbah real-time.',
  },
  '/perusahaan': {
    title: 'Monitoring Perusahaan',
    description: 'Analisis kualitas CPO dan insight bisnis terbaru perusahaan.',
  },
}

const Layout = () => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const meta = useMemo(() => routeMeta[location.pathname] ?? routeMeta['/perkebunan'], [location.pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex h-full flex-1 flex-col md:pl-72">
        <Navbar
          title={meta.title}
          description={meta.description}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto px-4 pb-10 pt-[112px] transition-all md:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-6xl space-y-8">
            <Outlet context={{ pageMeta: meta }} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
