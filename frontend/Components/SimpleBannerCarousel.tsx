"use client"
import { useState, useEffect } from 'react'
import styles from './SimpleBannerCarousel.module.css'

interface SimpleBannerCarouselProps {
  images: string[]
  autoPlayInterval?: number
}

export default function SimpleBannerCarousel({ images, autoPlayInterval = 5000 }: SimpleBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, 300)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [images.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContainer}>
        <div className={styles.container}>
          {/* Dots Container */}
          <div className={styles.dotsContainer}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={index === currentIndex ? styles.dotActive : styles.dot}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className={`${styles.imageWrapper} ${isTransitioning ? styles.transitioning : ''}`}>
            <img 
              src={images[currentIndex]} 
              alt={`Banner ${currentIndex + 1}`}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  )
}





