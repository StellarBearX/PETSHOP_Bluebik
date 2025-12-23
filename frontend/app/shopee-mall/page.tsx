"use client"
import { useState } from 'react'
import { IMAGES } from "@/lib/images";
import Link from 'next/link'
import ProductCard from '@/Components/Product/ProductCard/ProductCard'
import ProductQuickViewModal from '@/Components/Modals/ProductQuickViewModal/ProductQuickViewModal'
import { ChevronRightIcon } from '@/Components/UI/Icons/Icons'
import { useCatalog } from '@/app/providers'
import { getProductPriceRange, type Product } from '@/lib/catalog'
import styles from './page.module.css'

export default function ShopeeMallPage() {
  const { products } = useCatalog()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  
  // Show first 6 products
  const displayProducts = products.slice(0, 6)

  return (
    <main className={styles.pageMain}>
      <div className={styles.pageContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRightIcon className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbCurrent}>Shopee Mall</span>
        </div>

        {/* Flash Deal Banner - Separated Section */}
        <div className={styles.bannerSection}>
          <div className={styles.bannerContainer}>
            <div className={styles.bannerContent}>
              <img 
                src={IMAGES.mallBannerIcon}
                alt="Flash Deal"
                className={styles.bannerIcon}
              />
              <h1 className={styles.bannerTitle}>
                Flash Deal
              </h1>
            </div>
            <p className={styles.bannerSubtitle}>
              00:00 | 12:00 | 18:00 | 21:00 น.
            </p>
          </div>
        </div>

        {/* Shopee Mall Products Section - Separated */}
        <div className={styles.productsSection}>
          {/* Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Shopee Mall สินค้าขายดี
            </h2>
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
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
