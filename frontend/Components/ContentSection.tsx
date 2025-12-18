"use client"
import { ReactNode } from 'react'
import styles from './ContentSection.module.css'

interface ContentSectionProps {
  children: ReactNode
  className?: string
}

export default function ContentSection({ children, className = '' }: ContentSectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      {children}
    </section>
  )
}

