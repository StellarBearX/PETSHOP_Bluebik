"use client"
import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '@/Components/Toast'

interface ToastContextValue {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
    isOpen: boolean
  }>({
    message: '',
    type: 'info',
    isOpen: false
  })

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type, isOpen: true })
  }, [])

  const closeToast = useCallback(() => {
    setToast(prev => ({ ...prev, isOpen: false }))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isOpen={toast.isOpen}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  )
}

