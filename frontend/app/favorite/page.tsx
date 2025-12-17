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
          <h1 className="text-white text-2xl md:text-[32px] font-bold font-['Inter'] overflow-wrap-break">รายการโปรด</h1>
        </div>
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded">
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-gray-500 text-lg">ยังไม่มีสินค้าในรายการโปรด</p>
                <p className="text-gray-400 text-sm mt-2">กดปุ่มหัวใจที่สินค้าที่คุณชอบเพื่อเพิ่มในรายการโปรด</p>
              </div>
            ) : (
            <div className="space-y-4 md:space-y-6 p-4 md:p-8">
              {favoriteProducts.map((product) => {
                const range = getProductPriceRange(product)

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setQuickViewProduct(product)}
                    className={styles.productItem}
                    aria-label={`Open ${product.name}`}
                  >
                    <div className={styles.productContent}>
                      <div className={styles.productImage}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>

                      <div className={styles.productInfo}>
                        <h3 className={styles.productName}>
                          {product.name}
                        </h3>

                        <div className={styles.productBadges}>
                          {(product.badges ?? []).slice(0, 1).map((badge) => (
                            <div key={badge} className="product-badge">
                              <span>{badge}</span>
                            </div>
                          ))}
                          <StarRatingIcon className="w-[42px] h-[42px]" />
                        </div>

                        <div className={styles.productPrice}>
                          <span className={styles.priceText}>
                            {formatPriceRangeTHB(range.min, range.max)}
                          </span>
                        </div>

                        <div className={styles.productMeta}>
                          <span className={styles.metaSales}>
                            ยอดขาย {(product.sold ?? 0).toLocaleString("th-TH")} ชิ้น
                          </span>
                          <span className={styles.metaLocation}>
                            {product.location ?? ""}
                          </span>
                        </div>

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
                            className="w-[24px] h-[22px] text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            )}
          </div>
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
