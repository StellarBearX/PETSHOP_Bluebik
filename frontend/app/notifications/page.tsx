"use client"
import { useState } from 'react'
import styles from './page.module.css'

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('promotion')

  const promotions = [
    "https://api.builder.io/api/v1/image/assets/TEMP/8151e0349402460e6ba5195dce270226f36ba8a4",
    "https://api.builder.io/api/v1/image/assets/TEMP/6723024e148c86b34fdc0adbac69f5a40b85f4cc",
    "https://api.builder.io/api/v1/image/assets/TEMP/3fc07f0b4daf5f29c83cbf6759ebf42f9c48a2a4",
    "https://api.builder.io/api/v1/image/assets/TEMP/26b07e9b32f4d7aea69be409170252b8d4ea0db0",
    "https://api.builder.io/api/v1/image/assets/TEMP/5bf7f32e2ef6cce40d0a941c717b981adcdf5600",
    "https://api.builder.io/api/v1/image/assets/TEMP/bb3a28ba9039618b69881db370b61e75f546b037",
    "https://api.builder.io/api/v1/image/assets/TEMP/74f973b279dda068ab202a9895608f6509cf7647",
    "https://api.builder.io/api/v1/image/assets/TEMP/44864f2efa986b73b671344ee16868c0bf260cca"
  ]

  return (
    <main className={styles.main}>
      <div className="container-responsive">
        <div className={styles.container}>
          {/* Header Tabs */}
          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab('promotion')}
              className={`${styles.tab} ${styles.tabLeft} ${
                activeTab === 'promotion' ? styles.tabActive : styles.tabInactive
              }`}
            >
              Promotion
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`${styles.tab} ${styles.tabRight} ${
                activeTab === 'news' ? styles.tabActive : styles.tabInactiveRight
              }`}
            >
              News
            </button>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {activeTab === 'promotion' && (
              <div className={styles.promotionGrid}>
                {promotions.map((promo, index) => (
                  <div 
                    key={index}
                    className={styles.promotionCard}
                  >
                    <img 
                      src={promo}
                      alt={`Promotion ${index + 1}`}
                      className={styles.promotionImage}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'news' && (
              <p className={styles.emptyState}>
                ไม่มีข่าวสารในขณะนี้
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
