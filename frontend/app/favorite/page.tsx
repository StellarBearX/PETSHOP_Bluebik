"use client"

import { useMemo, useState } from "react"
import { IMAGES } from "@/lib/images";
import ProductQuickViewModal from "@/Components/Modals/ProductQuickViewModal/ProductQuickViewModal"
import { HeartIcon, StarRatingIcon } from "@/Components/UI/Icons/Icons"
import { useFavorites, useSearch } from "../providers"
import { getProductPriceRange, type Product } from "@/lib/catalog"
import { formatPriceRangeTHB } from "@/lib/format"
import styles from "./page.module.css"

export default function FavoritePage() {
  const { getFavorites, toggleFavorite } = useFavorites()
  const { query } = useSearch()

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const favoriteProducts = useMemo(() => {
    const favorites = getFavorites()
    const searchQuery = query.trim().toLowerCase()
    if (!searchQuery) return favorites
    return favorites.filter((product) => product.name.toLowerCase().includes(searchQuery) || product.shopName.toLowerCase().includes(searchQuery))
  }, [getFavorites, query])

  return (
    <main className={styles.pageMain}>
      <div className={`container-responsive ${styles.pageContainer}`}>
        <div className={styles.headerBanner}>
          <img
            src={IMAGES.nav.notification}
            alt="Favorite"
            className={styles.headerIcon}
          />
          <h1 className={styles.headerTitle}>รายการโปรด</h1>
        </div>
        <div className={styles.contentContainer}>
          {favoriteProducts.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              <p className={styles.emptyStateText}>ยังไม่มีสินค้าในรายการโปรด</p>
              <p className={styles.emptyStateSubtext}>กดปุ่มหัวใจที่สินค้าที่คุณชอบเพื่อเพิ่มในรายการโปรด</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {favoriteProducts.map((product) => {
                const range = getProductPriceRange(product)

                return (
                  <div
                    key={product.id}
                    className={styles.productCard}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <div className={styles.cardImageContainer}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={styles.cardImage}
                      />
                      <button
                        type="button"
                        className={styles.favoriteButton}
                        aria-label="Remove from favorites"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                      >
                        <HeartIcon 
                          filled={true}
                          className={styles.heartIcon}
                        />
                      </button>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.cardProductName}>
                        {product.name}
                      </h3>

                      <div className={styles.cardPrice}>
                        {formatPriceRangeTHB(range.min, range.max)}
                      </div>

                      <div className={styles.cardRating}>
                        <StarRatingIcon />
                      </div>

                      <div className={styles.cardLocation}>
                        {product.location ?? ""}
                      </div>

                      <button
                        type="button"
                        className={styles.buyButton}
                        onClick={(e) => {
                          e.stopPropagation()
                          setQuickViewProduct(product)
                        }}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <ProductQuickViewModal
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  )
}
