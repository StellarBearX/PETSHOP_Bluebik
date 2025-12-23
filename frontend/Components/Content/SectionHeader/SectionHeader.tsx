"use client"
import Link from 'next/link'
import styles from './SectionHeader.module.css'
import { IMAGES } from '@/lib/images';
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
            src={IMAGES.rightArrowIcon} 
            alt="" 
            className={styles.seeMoreIcon}
          />
        </Link>
      )}
    </div>
  )
}

