"use client"
import { useState } from 'react'
import styles from './page.module.css'

export default function CouponsPage() {
  const [savedCoupons, setSavedCoupons] = useState<number[]>([])

  const toggleSave = (id: number) => {
    if (savedCoupons.includes(id)) {
      setSavedCoupons(savedCoupons.filter(couponId => couponId !== id))
    } else {
      setSavedCoupons([...savedCoupons, id])
    }
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

          {/* Special Offers Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                ฉลองครบรอบ 100 ปีโค้ดสุดพิเศษ
              </h2>
            </div>

            <div className={styles.couponCard}>
              <div className={styles.couponContent}>
                {/* Badge */}
                <div className={styles.couponBadge}>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/40c595824b97fee337663ced1df45b782130fab1"
                    alt="Shop Badge"
                    className={styles.couponBadgeIcon}
                  />
                  <span className={styles.couponBadgeText}>ร้านโค้ดคุ้ม</span>
                </div>

                {/* Coupon Details */}
                <div className={styles.couponDetails}>
                  <h3 className={styles.couponDetailsTitle}>
                    รับไปเลย!!! ส่วนลด ฿100
                  </h3>
                  <p className={styles.couponDetailsMinimum}>
                    สั่งซื้อขั้นต่ำ ฿200
                  </p>
                  <div className={styles.couponDetailsInfo}>
                    <span className={styles.couponDetailsExpiry}>
                      ใช้ได้ถึง 20 ธันวาคม
                    </span>
                    <a href="#" className={styles.couponDetailsLink}>
                      เงื่อนไข
                    </a>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={() => toggleSave(1)}
                className={`${styles.saveBtn} ${
                  savedCoupons.includes(1) ? styles.saveBtnSaved : ''
                }`}
              >
                {savedCoupons.includes(1) ? 'บันทึกแล้ว' : 'เก็บ'}
              </button>
            </div>
          </div>

          {/* Free Shipping Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                โค้ดส่งฟรี
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Shipping Coupon 1 */}
              <div className={styles.couponCard}>
                <div className={styles.couponContent}>
                  <div className={`${styles.couponBadge} ${styles.couponBadgeGreen}`}>
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e"
                      alt="Free Shipping"
                      className={styles.couponBadgeIcon}
                    />
                    <span className={styles.couponBadgeText}>ส่งฟรี</span>
                  </div>

                  <div className={styles.couponDetails}>
                    <h3 className={styles.couponDetailsTitle}>
                      ส่งฟรี!!! เมื่อใช้คู่กับร้านโค้ดคุ้ม
                    </h3>
                    <p className={styles.couponDetailsMinimum}>
                      สั่งซื้อขั้นต่ำ ฿100
                    </p>
                    <div className={styles.couponDetailsInfo}>
                      <span className={styles.couponDetailsExpiry}>
                        ใช้ได้ถึง 20 ธันวาคม
                      </span>
                      <a href="#" className={styles.couponDetailsLink}>
                        เงื่อนไข
                      </a>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => toggleSave(2)}
                  className={`${styles.saveBtn} ${styles.saveBtnGreen} ${
                    savedCoupons.includes(2) ? styles.saveBtnSaved : ''
                  }`}
                >
                  {savedCoupons.includes(2) ? 'บันทึกแล้ว' : 'เก็บ'}
                </button>
              </div>

              {/* Expired Shipping Coupon */}
              <div className={`${styles.couponCard} ${styles.expiredCard}`}>
                <div className={styles.couponContent}>
                  <div className={`${styles.couponBadge} ${styles.couponBadgeGreen}`}>
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e"
                      alt="Free Shipping"
                      className={styles.couponBadgeIcon}
                    />
                    <span className={styles.couponBadgeText}>ส่งฟรี</span>
                  </div>

                  <div className={styles.couponDetails}>
                    <h3 className={styles.couponDetailsTitle}>
                      ส่งฟรี!!! เพียงวันนี้เท่านั้น
                    </h3>
                    <p className={styles.couponDetailsMinimum}>
                      สั่งซื้อขั้นต่ำ ฿0
                    </p>
                    <div className={styles.couponDetailsInfo}>
                      <span className={styles.couponDetailsExpiry}>
                        ใช้ได้ถึง 1 ธันวาคม
                      </span>
                      <a href="#" className={styles.couponDetailsLink}>
                        เงื่อนไข
                      </a>
                    </div>
                  </div>
                </div>

                <span className={styles.expiredText}>
                  โค้ดหมด!
                </span>
              </div>
            </div>
          </div>

          {/* Discount Section */}
          <div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                โค้ดส่วนลด
              </h2>
            </div>

            <div className={styles.couponCard}>
              <div className={styles.couponContent}>
                <div className={styles.couponBadge} style={{ padding: '0.5rem' }}>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e"
                    alt="Maew Logo"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className={styles.couponDetails}>
                  <h3 className={styles.couponDetailsTitle}>
                    ส่วนลด ฿500
                  </h3>
                  <p className={styles.couponDetailsMinimum}>
                    สั่งซื้อขั้นต่ำ ฿0
                  </p>
                  <div className={styles.couponDetailsInfo}>
                    <span className={styles.couponDetailsExpiry}>
                      ใช้ได้ถึง 30 ธันวาคม
                    </span>
                    <a href="#" className={styles.couponDetailsLink}>
                      เงื่อนไข
                    </a>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toggleSave(4)}
                className={`${styles.saveBtn} ${
                  savedCoupons.includes(4) ? styles.saveBtnSaved : ''
                }`}
              >
                {savedCoupons.includes(4) ? 'บันทึกแล้ว' : 'เก็บ'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
