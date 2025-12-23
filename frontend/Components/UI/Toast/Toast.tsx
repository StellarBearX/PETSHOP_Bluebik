"use client"
import { useEffect } from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isOpen: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ 
  message, 
  type = 'info', 
  isOpen, 
  onClose, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className={styles.toastMessage}>{message}</span>
        <button 
          onClick={onClose}
          className={styles.toastClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}

