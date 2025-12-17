"use client";
import { useMemo, useState } from 'react'
import LoginModal from '@/Components/LoginModal'
import RegisterModal from '@/Components/RegisterModal'
import SuccessModal from '@/Components/SuccessModal'
import ProductCard from '@/Components/ProductCard'
import ProductQuickViewModal from '@/Components/ProductQuickViewModal'
import BannerCarousel from '@/Components/BannerCarousel'
import PageHeader from '@/Components/PageHeader'
import ContentSection from '@/Components/ContentSection'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import { useCatalog, useSearch, useAuth } from './providers'
import { getProductPriceRange, type Product } from '@/lib/catalog'
import styles from './page.module.css'

export default function Home() {
  const { isLoggedIn, showLogin, setShowLogin } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSwitchToRegister = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
    setShowSuccess(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    // Optionally redirect or perform other actions
  }

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
    { name: "Animal\nfood", icon: "https://api.builder.io/api/v1/image/assets/TEMP/6d1edec1969de036e58d4ce6f5779ebb80350538" },
    { name: "pet\nsupplies", icon: "https://api.builder.io/api/v1/image/assets/TEMP/7271d343953f252b7a42d884cae36bb9d5469f47" },
    { name: "Clothes and\naccessories", icon: "https://api.builder.io/api/v1/image/assets/TEMP/a34d75e49f456032094a4b5ff46e0609ed5463ac" },
    { name: "Cleaning\nequipment", icon: "https://api.builder.io/api/v1/image/assets/TEMP/929fe5c8f3f0dc09a3ad8ec925bcebaaf8fb5227" },
    { name: "sand and\nbathroom", icon: "https://api.builder.io/api/v1/image/assets/TEMP/79f556957c403ba99f5d15360f964cdfa9950b4c" },
    { name: "Hygiene\ncare", icon: "https://api.builder.io/api/v1/image/assets/TEMP/004d3d0b2ac2c5d00c635a02511f937edc4882bf" },
    { name: "Cat\nsnacks", icon: "https://api.builder.io/api/v1/image/assets/TEMP/b8a79e732389849e0a47627c6632dd6c41546d62" },
    { name: "Cat\nexercise", icon: "https://api.builder.io/api/v1/image/assets/TEMP/d78aa07115d10be4a643985db44560ecfbf7cb06" },
  ]


  return (
    <>
      <BannerCarousel images={bannerImages} />

      <main className={styles.main}>
        <div className="container-responsive max-w-[1440px] py-4 md:py-8">
          {/* Shopping Mall Section */}
          <div className={styles.sectionWrapper}>
          <PageHeader title="Shopping Mall" seeMoreLink="/shopee-mall" />
          <ContentSection>
            <SectionBody padding="medium">
            <div className={styles.mallGrid}>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/abb7edfe50237f94aeaf1a789fa8f6fe60e61085" 
                alt="Product 1" 
                className={styles.mallImage}
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/fd8662dce488a82f6ce120d647d6110ea222dc0b" 
                alt="Product 2" 
                className={styles.mallImage}
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/50109194e77f1ca8695d89b25c2f6e64fb211b23" 
                alt="Product 3" 
                className={styles.mallImage}
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ae71c0de8f2b0bbb13cec9d98c66ae3627f6ae17" 
                alt="Product 4" 
                className={styles.mallImage}
              />
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
                <div key={index} className={styles.categoryCard}>
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className={styles.categoryIcon}
                  />
                  <span className={styles.categoryText}>
                    {category.name}
                  </span>
                </div>
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
              <button className={styles.seeMoreButton}>
                See more
              </button>
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

      {/* Modals */}
      <LoginModal 
        isOpen={!isLoggedIn && showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal 
        isOpen={!isLoggedIn && showRegister} 
        onClose={() => setShowRegister(false)}
        onSuccess={handleRegisterSuccess}
      />
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={handleCloseSuccess}
      />
    </>
  )
}
