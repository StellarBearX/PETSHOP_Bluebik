"use client"
import { ReactNode } from 'react'
import styles from './SectionBody.module.css'

interface SectionBodyProps {
  children: ReactNode
  padding?: 'small' | 'medium' | 'large'
}

export default function SectionBody({ children, padding = 'medium' }: SectionBodyProps) {
  const paddingClass = {
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  }[padding]

  return (
    <div className={`${styles.body} ${paddingClass}`}>
      {children}
    </div>
  )
}

