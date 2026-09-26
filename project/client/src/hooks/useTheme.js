import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('um-theme') || 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('um-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggleTheme }
}
