import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function AdminLogin() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      showToast('Welcome back!', 'success')
      navigate('/admin/dashboard')
    } catch (err) {
      showToast(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-8 w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl mb-1">Admin Login</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-dim)' }}>Manage projects, skills, certificates &amp; messages.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
          <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
          <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center disabled:opacity-60">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
