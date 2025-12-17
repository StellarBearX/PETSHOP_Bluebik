"use client"
import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/Components/ProductCard'
import ProductQuickViewModal from '@/Components/ProductQuickViewModal'
import { ChevronRightIcon } from '@/Components/Icons'
import { useCatalog } from '@/app/providers'
import { getProductPriceRange, type Product } from '@/lib/catalog'

export default function ShopeeMallPage() {
  const { products } = useCatalog()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  
  // Show first 6 products
  const displayProducts = products.slice(0, 6)

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-[217px] py-6 text-[20px] font-['Inter']">
            <Link href="/" className="text-black hover:text-[#FF4D00]">Home</Link>
            <ChevronRightIcon className="w-[22px] h-[22px] text-gray-500" />
            <span className="text-[#FF4D00]">Shopee Mall</span>
          </div>

          {/* Flash Deal Banner */}
          <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] mx-[217px] rounded-xl h-[163px] flex flex-col items-center justify-center mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/83093067aa3555f0fa4daef7e8df7e8f9abe6c61"
                alt="Flash Deal"
                className="w-[83px] h-[83px]"
              />
              <h1 className="text-white text-[32px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">Flash Deal</h1>
            </div>
            <p className="text-white text-[20px] font-['Inter'] leading-normal -tracking-[0.333px]">00:00 | 12:00 | 18:00 |21:00 น.</p>
          </div>

          {/* Header */}
          <div className="mx-[217px]">
            <div className="bg-white h-[45px] flex items-center justify-between px-4 rounded-t mb-0 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
              <h2 className="text-[#FF4D00] text-[20px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">Shopee Mall</h2>
            </div>

            {/* Products Grid */}
            <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => {
                const range = getProductPriceRange(product)
                return (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, image: product.images[0], price: String(range.min) }}
                    onOpen={(p: Product) => setQuickViewProduct(p)}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Product Quick View Modal */}
        <ProductQuickViewModal
          isOpen={Boolean(quickViewProduct)}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </main>
  )
}
