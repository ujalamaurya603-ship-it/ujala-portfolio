import React, { createContext, useContext, useState } from 'react'
import api from '../utils/api.js'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('um-admin-token'))

  const login = async (email, password) => {
    const data = await api.login({ email, password })
    localStorage.setItem('um-admin-token', data.token)
    setToken(data.token)
    return data
  }

  const logout = () => {
    localStorage.removeItem('um-admin-token')
    setToken(null)
  }

  return (
    <AuthCtx.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
