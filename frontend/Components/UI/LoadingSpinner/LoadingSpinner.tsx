"use client"
import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  fullScreen?: boolean
}

export default function LoadingSpinner({ size = 'medium', fullScreen = false }: LoadingSpinnerProps) {
  const sizeClass = styles[size]
  
  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <div className={`${styles.spinner} ${sizeClass}`}></div>
      </div>
    )
  }
  
  return <div className={`${styles.spinner} ${sizeClass}`}></div>
}

