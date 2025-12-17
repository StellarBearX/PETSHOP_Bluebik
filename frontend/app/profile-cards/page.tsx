"use client"
import { useState } from 'react'
import ProfileSidebar from '@/Components/ProfileSidebar'
import styles from './page.module.css'

export default function ProfileCardsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  })

  return (
    <main className={styles.main}>
      <div className="container-responsive">
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>
              My Profile
            </h1>
          </div>

          <div className={styles.flexContainer}>
            {/* Sidebar */}
            <ProfileSidebar />

            {/* Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.contentHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>บัตรเครดิต / บัตรเดบิต</h2>
                  <p className={styles.sectionDescription}>
                    บัตรจะแสดงเมื่อคุณเลือกชำระเงินผ่านช่องทางบัตรเครดิต/บัตรเดบิต หรือผ่อนชำระผ่านบัตรเครดิต
                  </p>
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className={styles.addButton}
                >
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/85456dbddef44f1ec86f5e003221c58a31f1e87a"
                    alt=""
                    className="w-[15px] h-[15px]"
                  />
                  เพิ่มบัตร
                </button>
              </div>

              <div className={styles.divider}></div>

              {/* Empty State */}
              <div className={styles.emptyState}>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/25c4dd6c2c65fbf58a458ec192aeb30986f74667"
                  alt="No cards"
                  className={styles.emptyIcon}
                />
                <p className={styles.emptyText}>
                  ไม่มีตัวเลือกการชำระเงิน
                </p>
              </div>

              {/* Save Button */}
              <div className={styles.saveButtonContainer}>
                <button className={styles.saveButton}>
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent}>
              <button
                onClick={() => setShowAddModal(false)}
                className={styles.closeButton}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f628a52ade3ea5a382954063075f79b0164ddd9c"
                  alt="Close"
                  className={styles.closeIcon}
                />
              </button>

              <div className={styles.modalHeader}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/45f2260ea667bf4e0f39c8e4969ecc384b910e31"
                  alt="Card"
                  className={styles.modalIcon}
                />
                <h2 className={styles.modalTitle}>
                  เพิ่มบัตรเครดิต / บัตรเดบิต
                </h2>
              </div>

              <div className={styles.cardLogos}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d32d6972ead0919d933be1bb396a8b4cf8fa49f4"
                  alt="Mastercard"
                  className={`${styles.cardLogo} w-[42px] h-[42px]`}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2c8e8ed1a87be23179d489a05d810279d00399d7"
                  alt="JCB"
                  className={`${styles.cardLogo} w-[34px] h-[34px] mt-1`}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/15af96c3363b6443f5991cacd07535827f16f3c8"
                  alt="Visa"
                  className={`${styles.cardLogo} w-[49px] h-[49px]`}
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/25c4dd6c2c65fbf58a458ec192aeb30986f74667"
                  alt="UnionPay"
                  className={`${styles.cardLogo} w-[41px] h-[41px]`}
                />
              </div>

              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span className={styles.required}>* </span>หมายเลขบัตร
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    className={styles.formInput}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span className={styles.required}>* </span>ชื่อบนบัตร
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                    className={styles.formInput}
                    placeholder="JOHN DOE"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroupHalf}>
                    <label className={styles.formLabel}>
                      <span className={styles.required}>* </span>วันหมดอายุ (ดด/ปป)
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className={styles.formInput}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className={styles.formGroupCvv}>
                    <label className={styles.formLabel}>
                      <span className={styles.required}>* </span>CVV
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      className={styles.formInput}
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className={styles.cancelButton}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                  >
                    บันทึก
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
