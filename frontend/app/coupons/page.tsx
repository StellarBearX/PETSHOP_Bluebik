"use client"
import { useState } from 'react'
import styles from './page.module.css'
import { useCoupons } from '@/contexts/CouponContext'
import type { Coupon } from '@/lib/coupon'

export default function CouponsPage() {
  const { 
    getPlatformCoupons, 
    collectCoupon, 
    isCouponCollected,
    removeCoupon
  } = useCoupons()
  
  const [showModal, setShowModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  // Get all platform coupons (available for everyone to collect)
  const platformCoupons = getPlatformCoupons()

  const toggleCollect = (couponId: string) => {
    if (isCouponCollected(couponId)) {
      removeCoupon(couponId)
    } else {
      collectCoupon(couponId)
    }
  }

  const showConditions = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCoupon(null)
  }

  return (
    <main className={styles.main}>
      <div className="container-responsive">
        <div className={styles.container}>
          {/* Hero Banner */}
          <div className={styles.heroBanner}>
            <div className={styles.heroBannerContent}>
              <h1 className={styles.heroBannerTitle}>
                ฉลองครบรอบ 100 ปี ส่งฟรี!!!
              </h1>
              <p className={styles.heroBannerSubtitle}>
                พร้อมโค้ดส่วนลดพิเศษอีกมากมาย
              </p>
            </div>
            <div className={styles.heroBannerDate}>
              เริ่ม 1 ธันวาคม - 25 ธันวาคม
            </div>
          </div>

          {/* Platform Coupons - Available for everyone to collect */}
          {platformCoupons.map((coupon) => {
            const isCollected = isCouponCollected(coupon.id)
            const isExpired = coupon.status === 'expired'
            const expiryDate = new Date(coupon.expiryDate).toLocaleDateString('th-TH', { 
              day: 'numeric', 
              month: 'long' 
            })

            return (
              <div key={coupon.id} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    {coupon.type === 'freeship' ? 'โค้ดส่งฟรี' : 'โค้ดส่วนลด'}
                  </h2>
                </div>

                <div className={`${styles.couponCard} ${isExpired ? styles.expiredCard : ''}`}>
                  <div className={styles.couponContent}>
                    {/* Badge */}
                    <div className={`${styles.couponBadge} ${
                      coupon.type === 'freeship' ? styles.couponBadgeGreen : ''
                    }`}>
                      {coupon.badgeIcon && (
                        <img 
                          src={coupon.badgeIcon}
                          alt={coupon.type}
                          className={styles.couponBadgeIcon}
                        />
                      )}
                      <span className={styles.couponBadgeText}>
                        {coupon.type === 'freeship' ? 'ส่งฟรี' : 'ส่วนลด'}
                      </span>
                    </div>

                    {/* Coupon Details */}
                    <div className={styles.couponDetails}>
                      <h3 className={styles.couponDetailsTitle}>
                        {coupon.title}
                      </h3>
                      <p className={styles.couponDetailsMinimum}>
                        {coupon.minSpend > 0 
                          ? `สั่งซื้อขั้นต่ำ ฿${coupon.minSpend}`
                          : 'ไม่มีขั้นต่ำ'}
                      </p>
                      <div className={styles.couponDetailsInfo}>
                        <span className={styles.couponDetailsExpiry}>
                          ใช้ได้ถึง {expiryDate}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            showConditions(coupon)
                          }}
                          className={styles.couponDetailsLink}
                        >
                          เงื่อนไข
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {isExpired ? (
                    <span className={styles.expiredText}>
                      โค้ดหมด!
                    </span>
                  ) : (
                    <button 
                      onClick={() => toggleCollect(coupon.id)}
                      className={`${styles.saveBtn} ${
                        coupon.type === 'freeship' ? styles.saveBtnGreen : ''
                      } ${isCollected ? styles.saveBtnSaved : ''}`}
                    >
                      {isCollected ? 'บันทึกแล้ว' : 'เก็บ'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
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
