import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EffectsLayer from './components/EffectsLayer.jsx'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

export default function App() {
  return (
    <div className="font-body transition-colors duration-500">
      <EffectsLayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}
