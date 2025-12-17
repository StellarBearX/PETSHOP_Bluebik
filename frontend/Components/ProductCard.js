"use client"
import { useRouter } from 'next/navigation'
import { useFavorites } from '@/app/providers'
import { HeartIcon, StarRatingIcon } from './Icons'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, showBadge = true, onOpen }) {
    const { isFavorite, toggleFavorite } = useFavorites()
    const router = useRouter()
    const currentFavoriteStatus = isFavorite(product.id)

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
                        toggleFavorite(product.id)
                    }}
                    className={styles.favoriteButton}
                    aria-label={currentFavoriteStatus ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <HeartIcon 
                        filled={currentFavoriteStatus}
                        className={`${styles.favoriteIcon} ${currentFavoriteStatus ? 'text-red-500' : 'text-gray-400'}`}
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
                    <StarRatingIcon rating={product.rating || 4.5} className={styles.ratingImage} />
                </div>
            </div>
        </div>
    )
}
