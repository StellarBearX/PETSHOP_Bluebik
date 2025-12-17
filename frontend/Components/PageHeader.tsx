"use client"
import Link from 'next/link'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  seeMoreLink?: string
}

export default function PageHeader({ title, seeMoreLink }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {seeMoreLink && (
        <Link href={seeMoreLink} className={styles.seeMore}>
          See more
        </Link>
      )}
    </div>
  )
}

