import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Perkebunan from './pages/Perkebunan.jsx'
import Pabrik from './pages/Pabrik.jsx'
import Perusahaan from './pages/Perusahaan.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/perkebunan" replace />} />
          <Route path="/perkebunan" element={<Perkebunan />} />
          <Route path="/pabrik" element={<Pabrik />} />
          <Route path="/perusahaan" element={<Perusahaan />} />
          <Route path="*" element={<Navigate to="/perkebunan" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
