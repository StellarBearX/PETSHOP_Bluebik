"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, showBadge = true, onOpen }) {
    const [isFavorite, setIsFavorite] = useState(false)
    const router = useRouter()

    const handleOpen = () => {
        if (typeof onOpen === 'function') {
            onOpen(product)
            return
        }
        if (product?.id) {
            router.push(`/product/${product.id}`)
        }
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleOpen}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpen()
                }
            }}
            className={styles.card}
            aria-label={`Open ${product?.name ?? 'product'}`}
        >
            {/* Product Image */}
            <div className={styles.imageContainer}>
                <img 
                    src={product.image || product.images?.[0] || "https://api.builder.io/api/v1/image/assets/TEMP/9f6f4a7ff45e59449140587baff701db77d4c33d"}
                    alt={product.name}
                    className="product-image"
                />
                
                {/* Badge */}
                {showBadge && (
                    <div className="product-badge">
                        <span className="product-badge-text">สินค้าขายดี</span>
                    </div>
                )}

                {/* Favorite Heart */}
                <button 
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsFavorite(!isFavorite)
                    }}
                    className={styles.favoriteButton}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <img 
                        src={isFavorite 
                            ? "https://api.builder.io/api/v1/image/assets/TEMP/8b9fb69db0ce7252d1bfdfc1c81f6180647a5a2d"
                            : "https://api.builder.io/api/v1/image/assets/TEMP/b5b05d0b81645500870018f47552cccbfd5fcbe1"
                        }
                        alt="Favorite"
                        className={styles.favoriteIcon}
                    />
                </button>
            </div>

            {/* Product Info */}
            <div className={styles.info}>
                <p className={styles.name}>
                    {product.name || "PURINA ONE เพียวริน่าวัน อาหารแมว"}
                </p>
                
                <div className={styles.footer}>
                    <span className="product-price">
                        ฿{product.price || "400"}
                    </span>
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/46d04e9038d25e8fdc4ca4283a89c8d955dccb3d"
                        alt="Rating"
                        className={styles.ratingImage}
                    />
                </div>
            </div>
        </div>
    )
}
