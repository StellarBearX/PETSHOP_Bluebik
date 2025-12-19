"use client"
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import SuccessModal from '@/Components/SuccessModal'
import CouponSelectionModal from '@/Components/CouponSelectionModal'
import PaymentCardModal from '@/Components/PaymentCardModal'
import { useCart } from '../providers'
import type { UserCoupon } from '@/lib/coupon'
import styles from './page.module.css'

interface Card {
  id: string
  type: 'visa' | 'mastercard' | 'jcb'
  last4: string
  name: string
}

export default function CheckoutPage() {
  const { subtotal, selectedCoupon, setSelectedCoupon, productDiscount, shippingDiscount } = useCart()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [showCardModal, setShowCardModal] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'qr'>('card')
  const [selectedCard, setSelectedCard] = useState<Card>({
    id: '1',
    type: 'visa',
    last4: '4747',
    name: 'บัตรเครดิต VISA'
  })
  const [qrExpiry, setQrExpiry] = useState(15 * 60) // 15 minutes in seconds

  const handleSelectCoupon = (coupon: UserCoupon | null) => {
    setSelectedCoupon(coupon)
  }

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCardDisplayName = (card: Card) => {
    const typeMap: Record<string, string> = {
      visa: 'VISA',
      mastercard: 'Mastercard',
      jcb: 'JCB'
    }
    return typeMap[card.type] || card.name
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

  // Use subtotal from Cart Context instead of calculating from mock data
  const orderSubtotal = subtotal
  const baseShipping = 10
  // Calculate actual shipping after discount
  const actualShipping = Math.max(0, baseShipping - shippingDiscount)
  const total = orderSubtotal - productDiscount + actualShipping

  // Generate QR Code data for PromptPay
  const qrCodeValue = useMemo(() => {
    if (paymentMethod === 'qr') {
      // Generate a realistic PromptPay QR code data
      // Format: PromptPay payment request with amount
      const amount = Math.round(total * 100) // Convert to satang
      const merchantId = '0812345678' // Mock phone number / tax ID
      
      // Create a payment data string that can be used with PromptPay apps
      // This is a simplified format - in production, you would use proper PromptPay QR standard
      const paymentData = {
        type: 'promptpay',
        merchantId: merchantId,
        amount: total,
        reference: `ORDER-${Date.now()}`,
        description: 'ชำระเงินออนไลน์'
      }
      
      // Return JSON string or use proper PromptPay format
      // For demo purposes, using a readable format that QR code scanners can interpret
      return JSON.stringify(paymentData)
    }
    return ''
  }, [paymentMethod, total])

  // Countdown timer for QR Code
  useEffect(() => {
    if (paymentMethod === 'qr' && qrExpiry > 0) {
      const timer = setInterval(() => {
        setQrExpiry((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    } else if (paymentMethod === 'qr') {
      setQrExpiry(15 * 60) // Reset when switching back to QR
    }
  }, [paymentMethod, qrExpiry])

  // Reset QR timer when switching to QR payment
  useEffect(() => {
    if (paymentMethod === 'qr') {
      setQrExpiry(15 * 60)
    }
  }, [paymentMethod])

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
              <div key={index} className={styles.orderItemCard}>
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
                <div 
                  className={styles.couponSection}
                  onClick={() => setShowCouponModal(true)}
                >
                  <div className={styles.couponIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM15.5 10C14.67 10 14 9.33 14 8.5C14 7.67 14.67 7 15.5 7C16.33 7 17 7.67 17 8.5C17 9.33 16.33 10 15.5 10ZM8.5 10C7.67 10 7 9.33 7 8.5C7 7.67 7.67 7 8.5 7C9.33 7 10 7.67 10 8.5C10 9.33 9.33 10 8.5 10ZM20 15H4V13H20V15ZM20 11H4V9H5C5.83 9 6.5 8.33 6.5 7.5C6.5 6.67 5.83 6 5 6H4V5H20V6H19C18.17 6 17.5 6.67 17.5 7.5C17.5 8.33 18.17 9 19 9H20V11Z" fill="#F7921E"/>
                    </svg>
                  </div>
                  <span className={styles.couponText}>
                    {selectedCoupon 
                      ? selectedCoupon.type === 'freeship'
                        ? `${selectedCoupon.title} - ส่งฟรี`
                        : `${selectedCoupon.title} - ลด ฿${productDiscount}`
                      : "เลือกคูปอง"}
                  </span>
                  <svg 
                    className={styles.couponChevron}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
          {paymentMethod === 'cod' && (
            <div className={styles.paymentInfoSection}>
              <div className={styles.paymentInfoHeader}>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/cd56be3f878321fa1cf48fd2996b12b69b9485f2"
                  alt="Payment"
                  className={styles.paymentInfoIcon}
                />
                <h3 className={styles.paymentInfoTitle}>ข้อมูลการชำระเงิน</h3>
              </div>
              <div className={styles.codInfo}>
                <div className={styles.codContent}>
                  <h4 className={styles.codTitle}>เก็บเงินปลายทาง</h4>
                  <p className={styles.codDescription}>
                    คุณจะชำระเงินเมื่อได้รับสินค้าแล้ว โดยจะมีการเรียกเก็บเงินจากผู้จัดส่ง
                  </p>
                  <div className={styles.codNote}>
                    <span className={styles.codNoteIcon}>ℹ️</span>
                    <span className={styles.codNoteText}>
                      กรุณาเตรียมเงินสดจำนวน {total.toLocaleString()} บาท สำหรับการชำระเงิน
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
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
                  <span className={styles.cardText}>{getCardDisplayName(selectedCard)}</span>
                  <span className={styles.cardNumber}>XXXX-XXXX-XXXX-{selectedCard.last4}</span>
                </div>
                <button 
                  className={styles.editButton}
                  onClick={() => setShowCardModal(true)}
                >
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/d83ca65e259bb78dd9793cd40aeae177c9bf6c4c"
                    alt="edit"
                    className={styles.editIcon}
                  />
                </button>
              </div>
            </div>
          )}

          {paymentMethod === 'qr' && (
            <div className={styles.paymentInfoSection}>
              <div className={styles.paymentInfoHeader}>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/cd56be3f878321fa1cf48fd2996b12b69b9485f2"
                  alt="Payment"
                  className={styles.paymentInfoIcon}
                />
                <h3 className={styles.paymentInfoTitle}>ข้อมูลการชำระเงิน</h3>
              </div>
              <div className={styles.qrInfo}>
                <div className={styles.qrCodeContainer}>
                  {qrExpiry > 0 ? (
                    <div className={styles.qrCodeWrapper}>
                      <QRCodeSVG
                        value={qrCodeValue}
                        size={250}
                        level="M"
                        includeMargin={true}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                      />
                    </div>
                  ) : (
                    <div className={styles.qrCodeExpired}>
                      <div className={styles.qrCodeExpiredIcon}>⏰</div>
                      <div className={styles.qrCodeExpiredText}>QR Code หมดอายุแล้ว</div>
                      <button
                        className={styles.qrRefreshButton}
                        onClick={() => setQrExpiry(15 * 60)}
                      >
                        สร้าง QR Code ใหม่
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.qrContent}>
                  <div className={styles.qrHeader}>
                    <h4 className={styles.qrTitle}>สแกน QR Code เพื่อชำระเงิน</h4>
                    {qrExpiry > 0 && (
                      <div className={styles.qrTimer}>
                        
                        <span className={styles.qrTimerText}>{formatTime(qrExpiry)}</span>
                      </div>
                    )}
                  </div>
                  <p className={styles.qrDescription}>
                    เปิดแอปพลิเคชันพร้อมเพย์ (PromptPay) และสแกน QR Code ด้านบนเพื่อทำการชำระเงิน
                  </p>
                  <div className={styles.qrAmount}>
                    <span className={styles.qrAmountLabel}>จำนวนเงิน</span>
                    <span className={styles.qrAmountValue}>฿{total.toLocaleString()}</span>
                  </div>
                  {qrExpiry > 0 && (
                    <div className={styles.qrNote}>
                      <span className={styles.qrNoteIcon}></span>
                      <span className={styles.qrNoteText}>
                        QR Code จะหมดอายุใน {formatTime(qrExpiry)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
              {selectedCoupon && productDiscount > 0 && (
                <div className={styles.summaryRow}>
                  <span>ส่วนลดสินค้า ({selectedCoupon.title})</span>
                  <span style={{ color: '#10b981' }}>-฿{productDiscount}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>การจัดส่ง</span>
                <span>
                  {shippingDiscount > 0 ? (
                    <>
                      <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '0.5rem' }}>
                        ฿{baseShipping}
                      </span>
                      <span>฿{actualShipping}</span>
                    </>
                  ) : (
                    `฿${baseShipping}`
                  )}
                </span>
              </div>
              {selectedCoupon && shippingDiscount > 0 && (
                <div className={styles.summaryRow}>
                  <span>ส่วนลดค่าส่ง ({selectedCoupon.title})</span>
                  <span style={{ color: '#10b981' }}>-฿{shippingDiscount}</span>
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

      {/* Payment Card Selection Modal */}
      <PaymentCardModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSelectCard={handleSelectCard}
        selectedCardId={selectedCard.id}
      />

    </>
  )
}
