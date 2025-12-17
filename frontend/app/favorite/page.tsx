"use client"

import { useMemo, useState } from "react"
import ProductQuickViewModal from "@/Components/ProductQuickViewModal"
import { HeartIcon, StarRatingIcon } from "@/Components/Icons"
import { useFavorites, useSearch } from "../providers"
import { getProductPriceRange, type Product } from "@/lib/catalog"
import { formatPriceRangeTHB } from "@/lib/format"

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
    <main className="min-h-screen bg-[#F5F5F5] overflow-auto">
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
                    className="w-full text-left bg-white border-[2px] border-gray-200 rounded-[2px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] hover:shadow-lg transition-shadow"
                    aria-label={`Open ${product.name}`}
                  >
                    <div className="flex gap-4 p-3">
                      <div className="w-[90px] h-[90px] flex-shrink-0 rounded overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between relative">
                        <h3 className="text-[12px] font-['Inter'] text-black leading-normal -tracking-[0.333px] pr-8 mt-1 overflow-wrap-break">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">
                          {(product.badges ?? []).slice(0, 1).map((badge) => (
                            <div key={badge} className="bg-[#FF4D00] rounded w-fit px-2 py-0.5">
                              <span className="text-white text-[8px] font-['Inter'] leading-normal -tracking-[0.333px]">
                                {badge}
                              </span>
                            </div>
                          ))}
                          <StarRatingIcon className="w-[42px] h-[42px]" />
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[#FA7D27] text-[12px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">
                            {formatPriceRangeTHB(range.min, range.max)}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-black text-[8px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            ยอดขาย {(product.sold ?? 0).toLocaleString("th-TH")} ชิ้น
                          </span>
                          <span className="text-black text-[10px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            {product.location ?? ""}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="absolute top-0 right-0"
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
