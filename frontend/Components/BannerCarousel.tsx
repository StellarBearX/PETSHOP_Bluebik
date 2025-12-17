"use client"
import { useState } from 'react'
import styles from './BannerCarousel.module.css'

interface BannerCarouselProps {
  images: string[]
  autoPlayInterval?: number
}

export default function BannerCarousel({ images, autoPlayInterval }: BannerCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0)

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCenterIndex(index)
  }

  // Get circular indices for displaying prev, current, next
  const getCircularIndex = (offset: number) => {
    return (centerIndex + offset + images.length) % images.length
  }

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContainer}>
        {/* Carousel Track */}
        <div className={styles.carouselTrack}>
          {/* Previous Image */}
          <div 
            className={`${styles.carouselItem} ${styles.sideImage}`}
            onClick={prevSlide}
          >
            <img 
              src={images[getCircularIndex(-1)]} 
              alt="Previous"
              className={styles.image}
            />
          </div>

          {/* Center Image */}
          <div className={`${styles.carouselItem} ${styles.centerImage}`}>
            <img 
              src={images[centerIndex]} 
              alt={`Banner ${centerIndex + 1}`}
              className={styles.image}
            />
          </div>

          {/* Next Image */}
          <div 
            className={`${styles.carouselItem} ${styles.sideImage}`}
            onClick={nextSlide}
          >
            <img 
              src={images[getCircularIndex(1)]} 
              alt="Next"
              className={styles.image}
            />
          </div>
        </div>

        {/* Carousel Dots */}
        <div className={styles.dotsContainer}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={index === centerIndex ? styles.dotActive : styles.dot}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

