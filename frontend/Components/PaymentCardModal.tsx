"use client"
import { useState } from 'react'
import styles from './PaymentCardModal.module.css'

interface Card {
  id: string
  type: 'visa' | 'mastercard' | 'jcb'
  last4: string
  name: string
}

interface PaymentCardModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectCard: (card: Card) => void
  selectedCardId?: string
}

export default function PaymentCardModal({ isOpen, onClose, onSelectCard, selectedCardId }: PaymentCardModalProps) {
  const [cards] = useState<Card[]>([
    { id: '1', type: 'visa', last4: '4747', name: 'บัตรเครดิต VISA' },
    { id: '2', type: 'mastercard', last4: '8888', name: 'บัตรเครดิต Mastercard' },
    { id: '3', type: 'jcb', last4: '1234', name: 'บัตรเครดิต JCB' },
  ])

  if (!isOpen) return null

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳'
      case 'mastercard':
        return '💳'
      case 'jcb':
        return '💳'
      default:
        return '💳'
    }
  }

  const handleCardSelect = (card: Card) => {
    onSelectCard(card)
    onClose()
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>เลือกบัตรการชำระเงิน</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.cardList}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.cardItem} ${selectedCardId === card.id ? styles.cardItemSelected : ''}`}
              onClick={() => handleCardSelect(card)}
            >
              <div className={styles.cardIcon}>{getCardIcon(card.type)}</div>
              <div className={styles.cardInfo}>
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardNumber}>XXXX-XXXX-XXXX-{card.last4}</div>
              </div>
              {selectedCardId === card.id && (
                <div className={styles.selectedIndicator}>✓</div>
              )}
            </div>
          ))}
        </div>
        <button className={styles.addCardButton}>
          + เพิ่มบัตรใหม่
        </button>
      </div>
    </div>
  )
}

