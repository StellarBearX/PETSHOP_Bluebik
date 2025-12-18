"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileSidebar from '@/Components/ProfileSidebar'
import { useCoupons } from '@/contexts/CouponContext'
import type { Coupon } from '@/lib/coupon'
import styles from './page.module.css'

export default function ProfileCouponsPage() {
  const router = useRouter()
  const { 
    getMyCoupons,
    getMyStoreCoupons
  } = useCoupons()

  const [showModal, setShowModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  // Get all user's collected coupons
  const myCoupons = getMyCoupons()
  
  // Get user's collected store coupons (grouped by store)
  const myStoreCoupons = getMyStoreCoupons()
  
  // Get platform coupons (non-store coupons)
  const myPlatformCoupons = myCoupons.filter(c => c.type !== 'store')
  
  // Group store coupons by store
  const groupedStoreCoupons = myStoreCoupons.reduce((acc, coupon) => {
    const storeId = coupon.storeId || 'unknown'
    if (!acc[storeId]) {
      acc[storeId] = {
        storeName: coupon.storeName || 'Unknown Store',
        storeLogo: coupon.storeLogo,
        coupons: []
      }
    }
    acc[storeId].coupons.push(coupon)
    return acc
  }, {} as Record<string, { storeName: string; storeLogo?: string; coupons: typeof myStoreCoupons }>)

  const showConditions = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCoupon(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    })
  }

  const totalCoupons = myCoupons.length

  return (
    <main>
      <div className="container-responsive">
        <div className="flex gap-6 py-4 md:py-8">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Page Header */}
            <div className={styles.infoCard}>
              <h1 className="profile-section-title">โค้ดส่วนลดของฉัน</h1>
              <p className="profile-section-description">
                คูปองทั้งหมดที่คุณเก็บไว้ ({totalCoupons} คูปอง)
              </p>
            </div>

            {/* Empty State */}
            {totalCoupons === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🎟️</div>
                <h2 className={styles.emptyTitle}>ยังไม่มีคูปอง</h2>
                <p className={styles.emptyText}>
                  เริ่มเก็บคูปองเพื่อรับส่วนลดพิเศษ!
                </p>
                <button 
                  className={styles.emptyButton}
                  onClick={() => router.push('/coupons')}
                >
                  ไปหน้าคูปอง
                </button>
              </div>
            )}

            {/* Coupons List */}
            {totalCoupons > 0 && (
              <div className={styles.couponsList}>
                {/* Store Coupons Section */}
                {Object.keys(groupedStoreCoupons).length > 0 && (
                  <>
                    <h2 className="profile-section-title" style={{ marginTop: '1rem' }}>
                      คูปองร้านค้า
                    </h2>
                    
                    {Object.entries(groupedStoreCoupons).map(([storeId, storeData]) => (
                      <div key={storeId} className={styles.storeSection}>
                        {/* Store Header */}
                        <div className={styles.storeHeader}>
                          {storeData.storeLogo && (
                            <img 
                              src={storeData.storeLogo} 
                              alt={storeData.storeName}
                              className={styles.storeLogo}
                            />
                          )}
                          <h3 className={styles.storeName}>
                            {storeData.storeName}
                          </h3>
                        </div>

                        {/* Store Coupons */}
                        {storeData.coupons.map((coupon) => (
                          <div key={coupon.id} className={styles.couponCard}>
                            {/* Header */}
                            <div className={styles.couponHeader}>
                              <span className={`${styles.couponBadge} ${styles.couponBadgeStore}`}>
                                🏪 คูปองร้านค้า
                              </span>
                              <span className={styles.couponStatus}>
                                เก็บแล้ว
                              </span>
                            </div>

                            {/* Body */}
                            <div className={styles.couponBody}>
                              <div className={styles.couponDetails}>
                                <h3 className={styles.couponTitle}>
                                  {coupon.title}
                                </h3>
                                <p className={styles.couponAmount}>
                                  ส่วนลด ฿{coupon.discountAmount}
                                </p>
                                <p className={styles.couponMinSpend}>
                                  {coupon.minSpend > 0 
                                    ? `สั่งซื้อขั้นต่ำ ฿${coupon.minSpend}`
                                    : 'ไม่มีขั้นต่ำ'}
                                </p>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className={styles.couponFooter}>
                              <span className={styles.couponExpiry}>
                                ใช้ได้ถึง {formatDate(coupon.expiryDate)}
                              </span>
                              <div className={styles.couponActions}>
                                <button 
                                  className={`${styles.actionButton} ${styles.conditionsButton}`}
                                  onClick={() => showConditions(coupon)}
                                >
                                  ดูเงื่อนไข
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}

                {/* Platform Coupons Section */}
                {myPlatformCoupons.length > 0 && (
                  <>
                    <h2 className="profile-section-title" style={{ marginTop: '2rem' }}>
                      คูปอง Platform
                    </h2>
                    
                    {myPlatformCoupons.map((coupon) => (
                      <div key={coupon.id} className={styles.couponCard}>
                        {/* Header */}
                        <div className={styles.couponHeader}>
                          <span className={styles.couponBadge}>
                            {coupon.type === 'freeship' ? '🚚 ส่งฟรี' : '🎫 ส่วนลด'}
                          </span>
                          <span className={styles.couponStatus}>
                            เก็บแล้ว
                          </span>
                        </div>

                        {/* Body */}
                        <div className={styles.couponBody}>
                          <div className={styles.couponDetails}>
                            <h3 className={styles.couponTitle}>
                              {coupon.title}
                            </h3>
                            {coupon.discountAmount > 0 && (
                              <p className={styles.couponAmount}>
                                ส่วนลด ฿{coupon.discountAmount}
                              </p>
                            )}
                            <p className={styles.couponMinSpend}>
                              {coupon.minSpend > 0 
                                ? `สั่งซื้อขั้นต่ำ ฿${coupon.minSpend}`
                                : 'ไม่มีขั้นต่ำ'}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className={styles.couponFooter}>
                          <span className={styles.couponExpiry}>
                            ใช้ได้ถึง {formatDate(coupon.expiryDate)}
                          </span>
                          <div className={styles.couponActions}>
                            <button 
                              className={`${styles.actionButton} ${styles.conditionsButton}`}
                              onClick={() => showConditions(coupon)}
                            >
                              ดูเงื่อนไข
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conditions Modal */}
      {showModal && selectedCoupon && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                เงื่อนไข: {selectedCoupon.title}
              </h2>
              <button className={styles.modalClose} onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <ul className={styles.conditionsList}>
                {selectedCoupon.conditions.map((condition, index) => (
                  <li key={index} className={styles.conditionItem}>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalButton} onClick={closeModal}>
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
