"use client"
import Link from 'next/link'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  title: string
  showSeeMore?: boolean
  seeMoreHref?: string
}

export default function SectionHeader({ title, showSeeMore = false, seeMoreHref = '#' }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {showSeeMore && (
        <Link href={seeMoreHref} className={styles.seeMoreLink}>
          <span>see more</span>
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/ed7fa190b22aa590d38a45c97113e721f8fd4bf4" 
            alt="" 
            className={styles.seeMoreIcon}
          />
        </Link>
      )}
    </div>
  )
}

