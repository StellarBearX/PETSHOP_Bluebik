"use client";
import { useMemo, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/Components/Product/ProductCard/ProductCard'
import ProductQuickViewModal from '@/Components/Modals/ProductQuickViewModal/ProductQuickViewModal'
import BannerCarousel from '@/Components/Carousels/BannerCarousel/BannerCarousel'
import PageHeader from '@/Components/UI/PageHeader/PageHeader'
import ContentSection from '@/Components/Content/ContentSection/ContentSection'
import SectionHeader from '@/Components/Content/SectionHeader/SectionHeader'
import SectionBody from '@/Components/Content/SectionBody/SectionBody'
import { useCatalog, useSearch } from './providers'
import { getProductPriceRange, type Product } from '@/lib/catalog'
import { banners, mall, categories } from '@/lib/images'
import styles from './page.module.css'

export default function Home() {
  const { products } = useCatalog()
  const { query } = useSearch()

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const bannerImages = [
    banners.banner1,
    banners.banner2,
    banners.banner3,
  ]

  const categoryItems = [
    { id: "meat-food", name: "อาหารชนิด\nเนื้อสัตว์", icon: categories.meatFood },
    { id: "fish-food", name: "อาหาร\nชนิดปลา", icon: categories.fishFood },
    { id: "vegetable-food", name: "อาหาร\nชนิดผัก", icon: categories.vegetableFood },
    { id: "pellet-food", name: "อาหาร\nชนิดเม็ด", icon: categories.pelletFood },
    { id: "clothing", name: "เสื้อผ้าและ\nอุปกรณ์", icon: categories.clothing },
    { id: "equipment", name: "อุปกรณ์\nสัตว์เลี้ยง", icon: categories.equipment },
    { id: "cleaning", name: "ทำความสะอาด\nและอาบน้ำ", icon: categories.cleaning },
  ]

  const recommendedProducts = useMemo(() => {
    if (query) {
      return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    }
    return products.slice(0, 10)
  }, [products, query])


  return (
    <>
      <BannerCarousel images={bannerImages} />

      <main className={styles.main}>
        <div className={`container-responsive ${styles.pageContainer}`}>
          {/* Shopping Mall Section */}
          <div className={styles.sectionWrapper}>
          <PageHeader title="Shopping Mall" seeMoreLink="/shopee-mall" />
          <ContentSection>
            <SectionBody padding="medium">
            <div className={styles.mallGrid}>
              <Link href="/category?cat=pellet-food" className={styles.mallImageLink}>
              <img 
                src={mall.pelletFood} 
                  alt="อาหารชนิดเม็ด" 
                className={styles.mallImage}
              />
              </Link>
              <Link href="/category?cat=clothing" className={styles.mallImageLink}>
              <img 
                src={mall.clothing} 
                  alt="เสื้อผ้าและอุปกรณ์" 
                className={styles.mallImage}
              />
              </Link>
              <Link href="/category?cat=equipment" className={styles.mallImageLink}>
              <img 
                src={mall.petEquipment} 
                  alt="อุปกรณ์สัตว์เลี้ยง" 
                className={styles.mallImage}
              />
              </Link>
              <Link href="/category?cat=cleaning" className={styles.mallImageLink}>
              <img 
                src={mall.cleaning} 
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
              {categoryItems.map((category, index) => (
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
