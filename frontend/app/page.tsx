"use client";
import { useMemo, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/Components/ProductCard'
import ProductQuickViewModal from '@/Components/ProductQuickViewModal'
import BannerCarousel from '@/Components/BannerCarousel'
import PageHeader from '@/Components/PageHeader'
import ContentSection from '@/Components/ContentSection'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import { useCatalog, useSearch } from './providers'
import { getProductPriceRange, type Product } from '@/lib/catalog'
import styles from './page.module.css'

export default function Home() {
  const { products } = useCatalog()
  const { query } = useSearch()

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  
  const bannerImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/1fd37dc0a9f7a659bc9914b9218685930cf9200f",
    "https://api.builder.io/api/v1/image/assets/TEMP/abb7edfe50237f94aeaf1a789fa8f6fe60e61085",
    "https://api.builder.io/api/v1/image/assets/TEMP/fd8662dce488a82f6ce120d647d6110ea222dc0b",
  ]

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q))
  }, [products, query])

  const recommendedProducts = useMemo(() => filteredProducts.slice(0, 10), [filteredProducts])

  const categories = [
    { id: "food", name: "อาหาร\nสัตว์", icon: "https://api.builder.io/api/v1/image/assets/TEMP/6d1edec1969de036e58d4ce6f5779ebb80350538" },
    { id: "meat-food", name: "อาหารชนิด\nเนื้อสัตว์", icon: "https://api.builder.io/api/v1/image/assets/TEMP/7271d343953f252b7a42d884cae36bb9d5469f47" },
    { id: "fish-food", name: "อาหาร\nชนิดปลา", icon: "https://api.builder.io/api/v1/image/assets/TEMP/a34d75e49f456032094a4b5ff46e0609ed5463ac" },
    { id: "vegetable-food", name: "อาหาร\nชนิดผัก", icon: "https://api.builder.io/api/v1/image/assets/TEMP/929fe5c8f3f0dc09a3ad8ec925bcebaaf8fb5227" },
    { id: "pellet-food", name: "อาหาร\nชนิดเม็ด", icon: "https://api.builder.io/api/v1/image/assets/TEMP/79f556957c403ba99f5d15360f964cdfa9950b4c" },
    { id: "clothing", name: "เสื้อผ้าและ\nอุปกรณ์", icon: "https://api.builder.io/api/v1/image/assets/TEMP/004d3d0b2ac2c5d00c635a02511f937edc4882bf" },
    { id: "equipment", name: "อุปกรณ์\nสัตว์เลี้ยง", icon: "https://api.builder.io/api/v1/image/assets/TEMP/b8a79e732389849e0a47627c6632dd6c41546d62" },
    { id: "cleaning", name: "ทำความสะอาด\nและอาบน้ำ", icon: "https://api.builder.io/api/v1/image/assets/TEMP/d78aa07115d10be4a643985db44560ecfbf7cb06" },
  ]


  return (
    <>
      <BannerCarousel images={bannerImages} />

      <main className={styles.main}>
        <div className="container-responsive max-w-[1440px]">
          {/* Shopping Mall Section */}
          <div className={styles.sectionWrapper}>
          <PageHeader title="Shopping Mall" seeMoreLink="/shopee-mall" />
          <ContentSection>
            <SectionBody padding="medium">
            <div className={styles.mallGrid}>
              <Link href="/category?cat=pellet-food" className={styles.mallImageLink}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/abb7edfe50237f94aeaf1a789fa8f6fe60e61085" 
                  alt="อาหารชนิดเม็ด" 
                className={styles.mallImage}
              />
              </Link>
              <Link href="/category?cat=clothing" className={styles.mallImageLink}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/fd8662dce488a82f6ce120d647d6110ea222dc0b" 
                  alt="เสื้อผ้าและอุปกรณ์" 
                className={styles.mallImage}
              />
              </Link>
              <Link href="/category?cat=equipment" className={styles.mallImageLink}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/50109194e77f1ca8695d89b25c2f6e64fb211b23" 
                  alt="อุปกรณ์สัตว์เลี้ยง" 
                className={styles.mallImage}
              />
              </Link>
              <Link href="/category?cat=cleaning" className={styles.mallImageLink}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ae71c0de8f2b0bbb13cec9d98c66ae3627f6ae17" 
                  alt="อุปกรณ์ทำความสะอาด" 
                className={styles.mallImage}
              />
              </Link>
            </div>
            </SectionBody>
          </ContentSection>
          </div>

          {/* Category Section */}
          <div className={styles.sectionWrapper}>
          <PageHeader title="Category" />
          <ContentSection>
            <SectionBody padding="medium">
            <div className={styles.categoryGrid}>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category?cat=${category.id}`}
                  className={styles.categoryCard}
                >
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className={styles.categoryIcon}
                  />
                  <span className={styles.categoryText}>
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
            </SectionBody>
          </ContentSection>
          </div>

          {/* Recommended Section */}
          <div className={styles.sectionWrapper}>
          <PageHeader title="Recommended" />
          <ContentSection>
            <SectionBody padding="large">
            <div className={styles.productGrid}>
              {recommendedProducts.map((product) => {
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
            
            {/* See More Button */}
            <div className={styles.seeMoreButtonWrapper}>
              <Link href="/category" className={styles.seeMoreButton}>
                See more
              </Link>
            </div>
            </SectionBody>
          </ContentSection>
          </div>
        </div>
      </main>

      <ProductQuickViewModal
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  )
}
