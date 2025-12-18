"use client"
import { useState } from 'react'
import Link from 'next/link'
import SuccessModal from '@/Components/SuccessModal'
import CouponSelectionModal from '@/Components/CouponSelectionModal'
import { useCart } from '../providers'
import type { UserCoupon } from '@/lib/coupon'
import styles from './page.module.css'

export default function CheckoutPage() {
  const { subtotal, selectedCoupon, setSelectedCoupon, discount, finalTotal } = useCart()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'qr'>('card')

  const handleSelectCoupon = (coupon: UserCoupon | null) => {
    setSelectedCoupon(coupon)
  }

  const orderItems = [
    {
      shop: "90s.shop",
      shopType: "recommended",
      name: "Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก",
      variant: "Urinary 8kg, แถมไม้แหย่แมว",
      price: 1190,
      quantity: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/66a9416979682534bcc31cf585b69c3ea91e4e97"
    },
    {
      shop: "Bite of Wild Official Shop",
      shopType: "mall",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด เหมาะสำหรับทุกช่วงวัย",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a9b9acd324c7adcbbdd98ac6bd64f51d5fbce990"
    }
  ]

  const orderSubtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 10
  const total = orderSubtotal + shipping - discount

  const handleBuyNow = () => {
    if (agreed) {
      setShowConfirmModal(true)
    }
  }

  const handleConfirm = () => {
    setShowConfirmModal(false)
    setShowSuccessModal(true)
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/470f79eeeab9db1552d26be46901547ffc5caa1b" 
              alt="Payment"
              className={styles.headerIcon}
            />
            <h1 className={styles.headerTitle}>ชำระเงิน</h1>
          </div>

          {/* Address Section */}
          <div className={styles.addressSection}>
            <div className={styles.addressHeader}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/b8ef727977f108caf154f7275db1c51b9e619bfe"
                alt="Home"
                className={styles.addressIcon}
              />
              <h2 className={styles.addressTitle}>ที่อยู่</h2>
            </div>
            <p className={styles.addressText}>
              บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 
              เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต 
              แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900
              <br/><br/>
              Bluebik Vulcan Company Limited (Head Office)<br/>
              Tax ID : 0105565196514 No.199 S-OASIS Building, 11th Floor, Unit no. 1103-1106, Vibhavadi Rangsit Road, Chomphon, Chatuchak, Bangkok 10900
            </p>
          </div>

          {/* Order Items */}
          <div className={styles.orderItems}>
            {orderItems.map((item, index) => (
              <div key={index}>
                {/* Section Header */}
                <h3 className={styles.orderTitle}>รายการสินค้าที่สั่งซื้อ</h3>

                {/* Shop Badge */}
                <div className={styles.shopBadge}>
                  <div className={styles.badge}>
                    <span className={styles.badgeText}>
                      {item.shopType === "recommended" ? "ร้านแนะนำ" : "Mall"}
                    </span>
                  </div>
                  <span className={styles.shopName}>{item.shop}</span>
                </div>

                {/* Table Headers */}
                <div className={styles.tableHeaders}>
                  <div style={{gridColumn: 'span 5'}}></div>
                  <div style={{gridColumn: 'span 2'}} className={styles.tableHeader}>ราคาต่อหน่วย</div>
                  <div style={{gridColumn: 'span 2'}} className={styles.tableHeader}>จำนวน</div>
                  <div style={{gridColumn: 'span 2'}} className={styles.tableHeader}>ราคารวม</div>
                </div>

                {/* Product Row */}
                <div className={styles.productRow}>
                  {/* Product Image & Info */}
                  <div className={styles.productInfo}>
                    <div className={styles.productImage}>
                      <img 
                        src={item.image}
                        alt={item.name}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <h4 className={styles.productName}>{item.name}</h4>
                      <div className={styles.variantSelector}>
                        <span className={styles.variantText}>{item.variant}</span>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/12fc36706518dfae295152ffa0b0fdb14dd2b5a2"
                          alt="dropdown"
                          className={styles.dropdownIcon}
                        />
                      </div>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/1a84f6dfdd398c7628939c37745abc70204d83ef"
                        alt="badges"
                        className={styles.badgeImage}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className={styles.price}>
                    ฿{item.price.toLocaleString()}
                  </div>

                  {/* Quantity */}
                  <div className={styles.quantity}>
                    {item.quantity}
                  </div>

                  {/* Total */}
                  <div className={styles.total}>
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Coupon Section */}
                <div className={styles.couponSection}>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/cc66f65bd5c29a6b8242142387c4db02eb904746"
                    alt="coupon"
                    className={styles.couponIcon}
                  />
                  <span className={styles.couponText}>
                    {selectedCoupon 
                      ? `${selectedCoupon.title} - ลด ฿${discount}` 
                      : "เลือกคูปอง"}
                  </span>
                  <button 
                    className={styles.changeButton}
                    onClick={() => setShowCouponModal(true)}
                  >
                    เปลี่ยน
                  </button>
                </div>

                {/* Divider */}
                {index < orderItems.length - 1 && (
                  <div className={styles.divider}></div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Method Selection */}
          <div className={styles.paymentSection}>
            <h3 className={styles.paymentTitle}>เลือกประเภทการชำระเงิน</h3>
            <div className={styles.paymentButtons}>
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`${styles.paymentButton} ${paymentMethod === 'cod' ? styles.paymentButtonActive : ''}`}
              >
                <span className={styles.paymentButtonText}>เก็บเงินปลายทาง</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`${styles.paymentButton} ${paymentMethod === 'card' ? styles.paymentButtonGradient : ''}`}
              >
                <span className={`${styles.paymentButtonText} ${paymentMethod === 'card' ? styles.paymentButtonTextWhite : ''}`}>
                  บัตรเครดิต/บัตรเดบิต
                </span>
              </button>
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`${styles.paymentButton} ${paymentMethod === 'qr' ? styles.paymentButtonActive : ''}`}
              >
                <span className={styles.paymentButtonText}>QR พร้อมเพย์</span>
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div className={styles.paymentInfoSection}>
            <div className={styles.paymentInfoHeader}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cd56be3f878321fa1cf48fd2996b12b69b9485f2"
                alt="Payment"
                className={styles.paymentInfoIcon}
              />
              <h3 className={styles.paymentInfoTitle}>ข้อมูลการชำระเงิน</h3>
            </div>

            <h4 className={styles.accountTitle}>เลือกบัญชีการชำระเงิน</h4>
            <div className={styles.accountInfo}>
              <div className={styles.cardIcon}>
                <div className={styles.cardIconGradient}>
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                    <path d="M25.3333 2.4V17.6C25.3333 18.2667 25.1 18.8333 24.6333 19.3C24.1667 19.7667 23.6 20 22.9333 20H2.4C1.73333 20 1.16667 19.7667 0.7 19.3C0.233333 18.8333 0 18.2667 0 17.6V2.4C0 1.73333 0.233333 1.16667 0.7 0.7C1.16667 0.233333 1.73333 0 2.4 0H22.9333C23.6 0 24.1667 0.233333 24.6333 0.7C25.1 1.16667 25.3333 1.73333 25.3333 2.4Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className={styles.cardText}>บัตรเครดิต VISA</span>
                <span className={styles.cardNumber}>XXXX-XXXX-XXXX-4747</span>
              </div>
              <button className={styles.editButton}>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d83ca65e259bb78dd9793cd40aeae177c9bf6c4c"
                  alt="edit"
                  className={styles.editIcon}
                />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.summarySection}>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>จำนวนสินค้า</span>
                <span>2 รายการ</span>
              </div>
              <div className={styles.summaryRow}>
                <span>รวมการสั่งซื้อ</span>
                <span>฿{orderSubtotal.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>การจัดส่ง</span>
                <span>฿{shipping}</span>
              </div>
              {selectedCoupon && discount > 0 && (
                <div className={styles.summaryRow}>
                  <span>ส่วนลด ({selectedCoupon.title})</span>
                  <span style={{ color: '#10b981' }}>-฿{discount}</span>
                </div>
              )}
              <div className={styles.summaryTotal}>
                <span>ยอดชำระเงินทั้งหมด</span>
                <span className={styles.summaryTotalAmount}>฿{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className={styles.agreement}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.agreementText}>
                ฉันได้อ่านและยินยอมข้อตกลงนโยบายการคืนเงินและสินค้า{' '}
                <a href="#" className={styles.link}>นโยบายสินค้า</a>
              </span>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuyNow}
              disabled={!agreed}
              className={styles.buyButton}
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalInner}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/6eab73d84e06b64781e693f78a66f72436d12186"
                alt="Warning"
                className={styles.modalIcon}
              />
              <p className={styles.modalText}>
                คุณแน่ใจที่จะทำรายการสั่งซื้อใช่หรือไม่
              </p>
              <div className={styles.modalButtons}>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className={styles.modalButtonCancel}
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleConfirm}
                  className={styles.modalButtonConfirm}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="ทำรายการสั่งซื้อสำเร็จ"
        redirectUrl="/profile-orders"
      />

      {/* Coupon Selection Modal */}
      <CouponSelectionModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onSelectCoupon={handleSelectCoupon}
        currentSubtotal={orderSubtotal}
        selectedCouponId={selectedCoupon?.id}
      />

    </>
  )
}
