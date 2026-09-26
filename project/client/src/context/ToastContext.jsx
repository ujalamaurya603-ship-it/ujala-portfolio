import React, { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ x: 140, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 140, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="px-4.5 py-3.5 rounded-xl text-sm font-semibold text-white shadow-2xl"
              style={{
                background:
                  t.type === 'error'
                    ? 'linear-gradient(120deg,#ef4444,#f97316)'
                    : 'linear-gradient(120deg,#16b981,#0ea5e9)',
              }}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
