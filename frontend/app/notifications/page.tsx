"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

type PromotionType = {
  id: number
  image: string
  title: string
  isNew: boolean
  category?: string
  brand?: string
  promotionType?: string
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('promotion')
  const router = useRouter()

  const promotions: PromotionType[] = [
    {
      id: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/8151e0349402460e6ba5195dce270226f36ba8a4",
      title: "ส่วนลด สมาชิกใหม่",
      isNew: true,
      promotionType: "ส่วนลด สมาชิกใหม่"
    },
    {
      id: 2,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6723024e148c86b34fdc0adbac69f5a40b85f4cc",
      title: "Flash Sale",
      isNew: true,
      promotionType: "Flash Sale"
    },
    {
      id: 3,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3fc07f0b4daf5f29c83cbf6759ebf42f9c48a2a4",
      title: "ส่วนลด ส่งฟรี",
      isNew: false,
      promotionType: "ส่วนลด ส่งฟรี"
    },
    {
      id: 4,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/26b07e9b32f4d7aea69be409170252b8d4ea0db0",
      title: "ลดแรง ซื้อครั้งแรก",
      isNew: false,
      promotionType: "ลดแรง ซื้อครั้งแรก"
    },
    {
      id: 5,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5bf7f32e2ef6cce40d0a941c717b981adcdf5600",
      title: "ราคาดีที่สุด",
      isNew: true,
      promotionType: "ราคาดีที่สุด"
    },
    {
      id: 6,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/bb3a28ba9039618b69881db370b61e75f546b037",
      title: "จ่ายผ่านบัตร สะสมแต้ม",
      isNew: false,
      promotionType: "จ่ายผ่านบัตร สะสมแต้ม"
    },
    {
      id: 7,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/74f973b279dda068ab202a9895608f6509cf7647",
      title: "ส่วนลด 10%/15%/20%",
      isNew: false,
      promotionType: "ส่วนลด 10%/15%/20%"
    },
    {
      id: 8,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/44864f2efa986b73b671344ee16868c0bf260cca",
      title: "อาหารสัตว์",
      isNew: false,
      category: "food"
    }
  ]

  const handlePromotionClick = (promo: PromotionType) => {
    // Navigate to category page with promotion filter
    const params = new URLSearchParams()
    
    if (promo.category) {
      params.append('category', promo.category)
    }
    if (promo.brand) {
      params.append('brand', promo.brand)
    }
    if (promo.promotionType) {
      params.append('promotion', promo.promotionType)
    }
    
    router.push(`/category?${params.toString()}`)
  }

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
                {promotions.map((promo) => (
                  <div 
                    key={promo.id}
                    className={styles.promotionCard}
                    onClick={() => handlePromotionClick(promo)}
                  >
                    {promo.isNew && (
                      <div className={styles.newBadge}>NEW</div>
                    )}
                    <img 
                      src={promo.image}
                      alt={promo.title}
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
