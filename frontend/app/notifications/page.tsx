"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IMAGES } from "@/lib/images";
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
      image: IMAGES.notifications.notif1,
      title: "ส่วนลด สมาชิกใหม่",
      isNew: true,
      promotionType: "ส่วนลด สมาชิกใหม่"
    },
    {
      id: 2,
      image: IMAGES.notifications.notif2,
      title: "Flash Sale",
      isNew: true,
      promotionType: "Flash Sale"
    },
    {
      id: 3,
      image: IMAGES.notifications.notif3,
      title: "ส่วนลด ส่งฟรี",
      isNew: false,
      promotionType: "ส่วนลด ส่งฟรี"
    },
    {
      id: 4,
      image: IMAGES.notifications.notif4,
      title: "ลดแรง ซื้อครั้งแรก",
      isNew: false,
      promotionType: "ลดแรง ซื้อครั้งแรก"
    },
    {
      id: 5,
      image: IMAGES.notifications.notif5,
      title: "ราคาดีที่สุด",
      isNew: true,
      promotionType: "ราคาดีที่สุด"
    },
    {
      id: 6,
      image: IMAGES.notifications.notif6,
      title: "จ่ายผ่านบัตร สะสมแต้ม",
      isNew: false,
      promotionType: "จ่ายผ่านบัตร สะสมแต้ม"
    },
    {
      id: 7,
      image: IMAGES.notifications.notif7,
      title: "ส่วนลด 10%/15%/20%",
      isNew: false,
      promotionType: "ส่วนลด 10%/15%/20%"
    },
    {
      id: 8,
      image: IMAGES.notifications.notif8,
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
