"use client"
import Link from 'next/link'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  seeMoreLink?: string
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

export default function PageHeader({ title, seeMoreLink }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {seeMoreLink && (
        <Link href={seeMoreLink} className={styles.seeMore}>
          See more
          <ChevronRightIcon className={styles.seeMoreIcon} />
        </Link>
      )}
    </div>
  )
}

