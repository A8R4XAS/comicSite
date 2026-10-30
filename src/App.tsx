import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Viewer from './pages/Viewer'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comic/:id" element={<Viewer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}
