"use client"
import { useState, useEffect } from 'react'
import ProfileSidebar from '@/Components/Profile/ProfileSidebar/ProfileSidebar'
import { useToast } from '@/contexts/ToastContext'
import { IMAGES } from "@/lib/images";
import LoadingSpinner from '@/Components/UI/LoadingSpinner/LoadingSpinner'
import styles from './page.module.css'

interface Card {
  id: string
  cardNumber: string
  cardholderName: string
  expiryDate: string
  cvv: string
  type: 'visa' | 'mastercard' | 'jcb' | 'unionpay'
  last4: string
}

export default function ProfileCardsPage() {
  const { showToast } = useToast()
  const [showAddModal, setShowAddModal] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  })

  // Load cards from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('petshop_cards')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCards(parsed)
        }
      } catch (e) {
        console.error('Error loading cards:', e)
      }
    }
  }, [])

  // Save cards to localStorage whenever cards change
  useEffect(() => {
    // Always save, even if empty array (to clear data if needed)
    localStorage.setItem('petshop_cards', JSON.stringify(cards))
  }, [cards])

  // Detect card type from card number
  const detectCardType = (cardNumber: string): 'visa' | 'mastercard' | 'jcb' | 'unionpay' => {
    const cleaned = cardNumber.replace(/\s/g, '')
    if (cleaned.startsWith('4')) return 'visa'
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'mastercard'
    if (cleaned.startsWith('35')) return 'jcb'
    return 'unionpay'
  }

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleaned
  }

  // Format expiry date
  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Card Number: 13-19 digits
    const cardNumber = formData.cardNumber.replace(/\s/g, '')
    if (!cardNumber) {
      newErrors.cardNumber = 'กรุณากรอกหมายเลขบัตร'
    } else if (!/^\d{13,19}$/.test(cardNumber)) {
      newErrors.cardNumber = 'กรุณากรอกหมายเลขบัตรที่ถูกต้อง (13-19 หลัก)'
    }

    // Cardholder Name
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'กรุณากรอกชื่อบนบัตร'
    }

    // Expiry Date: MM/YY format and not expired
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'กรุณากรอกวันหมดอายุ'
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'กรุณากรอกวันหมดอายุในรูปแบบ MM/YY'
    } else {
      const [month, year] = formData.expiryDate.split('/').map(Number)
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100
      const currentMonth = currentDate.getMonth() + 1
      
      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'เดือนไม่ถูกต้อง'
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = 'บัตรหมดอายุแล้ว'
      }
    }

    // CVV: 3-4 digits
    if (!formData.cvv) {
      newErrors.cvv = 'กรุณากรอก CVV'
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'กรุณากรอก CVV ที่ถูกต้อง (3-4 หลัก)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Create new card
    const cardNumber = formData.cardNumber.replace(/\s/g, '')
    const newCard: Card = {
      id: Date.now().toString(),
      cardNumber: cardNumber,
      cardholderName: formData.cardholderName.trim(),
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      type: detectCardType(cardNumber),
      last4: cardNumber.slice(-4)
    }

    // Add to cards list and save immediately
    const updatedCards = [...cards, newCard]
    setCards(updatedCards)
    
    // Save to localStorage immediately
    localStorage.setItem('petshop_cards', JSON.stringify(updatedCards))
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cardsUpdated'))

    // Reset form
    setFormData({
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: ''
    })
    setErrors({})
    setIsLoading(false)
    setShowAddModal(false)
    showToast('เพิ่มบัตรสำเร็จ', 'success')
  }

  // Handle delete card
  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบบัตรนี้หรือไม่?')) {
      const updatedCards = cards.filter(card => card.id !== id)
      setCards(updatedCards)
      // Save to localStorage immediately
      localStorage.setItem('petshop_cards', JSON.stringify(updatedCards))
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('cardsUpdated'))
      showToast('ลบบัตรสำเร็จ', 'success')
    }
  }

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData({ ...formData, cardNumber: formatted })
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: '' })
    }
  }

  // Handle expiry date input
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    setFormData({ ...formData, expiryDate: formatted })
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: '' })
    }
  }

  // Get card type name
  const getCardTypeName = (type: string): string => {
    const names: Record<string, string> = {
      visa: 'VISA',
      mastercard: 'Mastercard',
      jcb: 'JCB',
      unionpay: 'UnionPay'
    }
    return names[type] || 'บัตรเครดิต'
  }

  // Handle save button (main page)
  const handleSave = () => {
    // Cards are already saved to localStorage via useEffect
    showToast('บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
  }

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
                  onClick={() => {
                    setShowAddModal(true)
                    setFormData({ cardNumber: '', cardholderName: '', expiryDate: '', cvv: '' })
                    setErrors({})
                  }}
                  className={styles.addButton}
                >
                  <img 
                    src={IMAGES.addIcon}
                    alt=""
                    className={styles.addIcon}
                  />
                  เพิ่มบัตร
                </button>
              </div>

              <div className={styles.divider}></div>

              {/* Cards List or Empty State */}
              {cards.length === 0 ? (
                <div className={styles.emptyState}>
                  <img 
                    src={IMAGES.deleteIcon}
                    alt="No cards"
                    className={styles.emptyIcon}
                  />
                  <p className={styles.emptyText}>
                    ไม่มีตัวเลือกการชำระเงิน
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {cards.map((card) => (
                    <div 
                      key={card.id}
                      style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '50px',
                          height: '35px',
                          background: card.type === 'visa' ? '#1A1F71' : 
                                     card.type === 'mastercard' ? '#EB001B' :
                                     card.type === 'jcb' ? '#0066CC' : '#E21836',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          {getCardTypeName(card.type).charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: '#666666' }}>
                            {getCardTypeName(card.type)}
                          </div>
                          <div style={{ color: '#666', fontSize: '14px' }}>
                            XXXX-XXXX-XXXX-{card.last4}
                          </div>
                          <div style={{ color: '#999', fontSize: '12px', marginTop: '0.25rem' }}>
                            {card.cardholderName} • หมดอายุ {card.expiryDate}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(card.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#ff4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        ลบ
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Save Button */}
              <div className={styles.saveButtonContainer}>
                <button 
                  onClick={handleSave}
                  className={styles.saveButton}
                >
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
                  src={IMAGES.cards.visaIcon}
                  alt="Close"
                  className={styles.closeIcon}
                />
              </button>

              <div className={styles.modalHeader}>
                <img
                  src={IMAGES.addressIcon}
                  alt="Card"
                  className={styles.modalIcon}
                />
                <h2 className={styles.modalTitle}>
                  เพิ่มบัตรเครดิต / บัตรเดบิต
                </h2>
              </div>

              <div className={styles.cardLogos}>
                <img
                  src={IMAGES.cards.mastercardIcon}
                  alt="Mastercard"
                  className={`${styles.cardLogo} w-[42px] h-[42px]`}
                />
                <img
                  src={IMAGES.cards.jcbIcon}
                  alt="JCB"
                  className={`${styles.cardLogo} w-[34px] h-[34px] mt-1`}
                />
                <img
                  src={IMAGES.cards.amexIcon}
                  alt="Visa"
                  className={`${styles.cardLogo} w-[49px] h-[49px]`}
                />
                <img
                  src={IMAGES.deleteIcon}
                  alt="UnionPay"
                  className={`${styles.cardLogo} w-[41px] h-[41px]`}
                />
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span className={styles.required}>* </span>หมายเลขบัตร
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={styles.formInput}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                      {errors.cardNumber}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <span className={styles.required}>* </span>ชื่อบนบัตร
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => {
                      setFormData({...formData, cardholderName: e.target.value})
                      if (errors.cardholderName) {
                        setErrors({ ...errors, cardholderName: '' })
                      }
                    }}
                    className={styles.formInput}
                    placeholder="JOHN DOE"
                  />
                  {errors.cardholderName && (
                    <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                      {errors.cardholderName}
                    </span>
                  )}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroupHalf}>
                    <label className={styles.formLabel}>
                      <span className={styles.required}>* </span>วันหมดอายุ (ดด/ปป)
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      className={styles.formInput}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                        {errors.expiryDate}
                      </span>
                    )}
                  </div>
                  <div className={styles.formGroupCvv}>
                    <label className={styles.formLabel}>
                      <span className={styles.required}>* </span>CVV
                    </label>
                    <input
                      type="password"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                        setFormData({...formData, cvv: value})
                        if (errors.cvv) {
                          setErrors({ ...errors, cvv: '' })
                        }
                      }}
                      className={styles.formInput}
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                        {errors.cvv}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className={styles.cancelButton}
                    disabled={isLoading}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LoadingSpinner size="small" />
                        กำลังบันทึก...
                      </span>
                    ) : 'บันทึก'}
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
