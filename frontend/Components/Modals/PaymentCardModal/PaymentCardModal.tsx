"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './PaymentCardModal.module.css'

interface Card {
  id: string
  type: 'visa' | 'mastercard' | 'jcb' | 'unionpay'
  last4: string
  name?: string
  cardholderName?: string
  expiryDate?: string
}

interface PaymentCardModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectCard: (card: Card) => void
  selectedCardId?: string
}

export default function PaymentCardModal({ isOpen, onClose, onSelectCard, selectedCardId }: PaymentCardModalProps) {
  const router = useRouter()
  const [cards, setCards] = useState<Card[]>([])

  // Function to load cards
  const loadCards = () => {
    const saved = localStorage.getItem('petshop_cards')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Map to Card format
          const mappedCards: Card[] = parsed.map((card: any) => ({
            id: card.id,
            type: card.type,
            last4: card.last4,
            name: getCardTypeName(card.type),
            cardholderName: card.cardholderName,
            expiryDate: card.expiryDate
          }))
          setCards(mappedCards)
        } else {
          setCards([])
        }
      } catch (e) {
        console.error('Error loading cards:', e)
        setCards([])
      }
    } else {
      setCards([])
    }
  }

  // Load cards from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      loadCards()
      
      // Poll for changes every 500ms when modal is open
      const interval = setInterval(() => {
        loadCards()
      }, 500)
      
      // Listen for storage events
      const handleStorageChange = () => {
        loadCards()
      }
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('cardsUpdated', handleStorageChange)
      
      return () => {
        clearInterval(interval)
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('cardsUpdated', handleStorageChange)
      }
    }
  }, [isOpen])

  // Get card type name
  const getCardTypeName = (type: string): string => {
    const names: Record<string, string> = {
      visa: 'บัตรเครดิต VISA',
      mastercard: 'บัตรเครดิต Mastercard',
      jcb: 'บัตรเครดิต JCB',
      unionpay: 'บัตรเครดิต UnionPay'
    }
    return names[type] || 'บัตรเครดิต'
  }

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

  const [loading, setLoading] = useState(false)

  const handleCardSelect = (card: Card) => {
    if (loading) return
    setLoading(true)
    onSelectCard(card)
    onClose()
    // component likely unmounts after onClose/navigation; no need to setLoading(false)
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>เลือกบัตรการชำระเงิน</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        {cards.length === 0 ? (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center',
            color: '#666'
          }}>
            <p style={{ marginBottom: '1rem' }}>ยังไม่มีบัตรที่บันทึกไว้</p>
            <p style={{ fontSize: '14px', color: '#999' }}>กรุณาเพิ่มบัตรในหน้า Profile</p>
          </div>
        ) : (
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
                  {card.cardholderName && (
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '0.25rem' }}>
                      {card.cardholderName}
                    </div>
                  )}
                </div>
                {selectedCardId === card.id && (
                  <div className={styles.selectedIndicator}>✓</div>
                )}
              </div>
            ))}
          </div>
        )}
        <button 
          className={`${styles.addCardButton} ${loading ? 'opacity-60 pointer-events-none' : ''}`}
          onClick={() => {
            if (loading) return
            setLoading(true)
            onClose()
            router.push('/profile/cards')
          }}
          disabled={loading}
        >
          {loading ? 'กำลังดำเนินการ...' : '+ เพิ่มบัตรใหม่'}
        </button>
      </div>
    </div>
  )
}

