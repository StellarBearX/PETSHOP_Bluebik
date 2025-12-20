"use client"

import { useMemo, useState } from "react"
import ProductQuickViewModal from "@/Components/ProductQuickViewModal"
import { HeartIcon, StarRatingIcon } from "@/Components/Icons"
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
    const q = query.trim().toLowerCase()
    if (!q) return favorites
    return favorites.filter((p) => p.name.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q))
  }, [getFavorites, query])

  return (
    <main className="min-h-screen bg-[#F7F7F7] overflow-auto">
      <div className="container-responsive max-w-[1440px] py-4 md:py-8">
        <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg p-4 mb-6 md:mb-8 flex items-center gap-4">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b80de9f65b94d83c27755ef14a0def9a5307a069"
            alt="Favorite"
            className="w-10 h-10 md:w-[50px] md:h-[50px]"
          />
          <h1 className="text-white text-2xl md:text-[32px] font-bold font-['Kanit'] overflow-wrap-break">รายการโปรด</h1>
        </div>
        <div className="max-w-[1200px] mx-auto px-4">
          {favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">ยังไม่มีสินค้าในรายการโปรด</p>
              <p className="text-gray-400 text-sm mt-2">กดปุ่มหัวใจที่สินค้าที่คุณชอบเพื่อเพิ่มในรายการโปรด</p>
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
                          className="w-5 h-5 text-red-500"
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
