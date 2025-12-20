"use client"
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCatalog, useSearch, useFavorites } from '@/app/providers'
import { getProductPriceRange, type Product, CATEGORIES, BRANDS, CAT_AGES, PROMOTIONS } from '@/lib/catalog'
import { HeartIcon, StarRatingIcon, ChevronRightIcon } from '@/Components/Icons'
import ProductQuickViewModal from '@/Components/ProductQuickViewModal'
import SimpleBannerCarousel from '@/Components/SimpleBannerCarousel'
import styles from './page.module.css'

function CategoryPageContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const categoryParam = searchParams.get('cat') || ''
  
  const { products } = useCatalog()
  const { query } = useSearch()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  // Filter states
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedCatAge, setSelectedCatAge] = useState<string>('')
  const [priceSort, setPriceSort] = useState('low-to-high')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(5000)
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  // Staged filters for right panel (only apply when user clicks "ตกลง")
  const [stagedCategory, setStagedCategory] = useState(categoryParam || 'all')
  const [stagedBrand, setStagedBrand] = useState<string>('')
  const [stagedMinPrice, setStagedMinPrice] = useState(0)
  const [stagedMaxPrice, setStagedMaxPrice] = useState(5000)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  
  const itemsPerPage = 15
  
  const bannerImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/0bd2893a763071d0018d40ec3fd0ec2534c33120",
    "https://api.builder.io/api/v1/image/assets/TEMP/1fd37dc0a9f7a659bc9914b9218685930cf9200f",
    "https://api.builder.io/api/v1/image/assets/TEMP/abb7edfe50237f94aeaf1a789fa8f6fe60e61085",
  ]

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    // Search filter
    const searchTerm = searchQuery || query
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }
    
    // Brand filter
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand)
    }
    
    // Cat age filter
    if (selectedCatAge) {
      result = result.filter(p => p.catAge === selectedCatAge)
    }
    
    // Location filter
    if (selectedLocation !== 'all') {
      result = result.filter(p => p.location === selectedLocation)
    }
    
    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= minRating)
    }
    
    // Price filter
    result = result.filter(p => {
      const range = getProductPriceRange(p)
      return range.min >= minPrice && range.min <= maxPrice
    })
    
    // Sort
    if (priceSort === 'low-to-high') {
      result.sort((a, b) => getProductPriceRange(a).min - getProductPriceRange(b).min)
    } else {
      result.sort((a, b) => getProductPriceRange(b).min - getProductPriceRange(a).min)
    }
    
    return result
  }, [products, searchQuery, query, selectedCategory, selectedBrand, selectedCatAge, selectedLocation, minRating, minPrice, maxPrice, priceSort])
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // Get display title
  const getDisplayTitle = () => {
    if (searchQuery || query) return searchQuery || query
    const cat = CATEGORIES.find(c => c.id === selectedCategory)
    return cat?.name || 'สินค้าทั้งหมด'
  }

  // Reset page when filters change
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId)
    setCurrentPage(1)
  }

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId === selectedBrand ? '' : brandId)
    setCurrentPage(1)
  }

  const handleCatAgeChange = (ageId: string) => {
    setSelectedCatAge(ageId === selectedCatAge ? '' : ageId)
    setCurrentPage(1)
  }

  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? 0 : rating)
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSelectedCategory('all')
    setSelectedBrand('')
    setSelectedCatAge('')
    setSelectedLocation('all')
    setMinRating(0)
    setMinPrice(0)
    setMaxPrice(5000)
    setPriceSort('low-to-high')
    setCurrentPage(1)
  }

  // Apply staged filters from right panel
  const applyFilters = () => {
    setSelectedCategory(stagedCategory)
    setSelectedBrand(stagedBrand)
    setMinPrice(stagedMinPrice)
    setMaxPrice(stagedMaxPrice)
    setCurrentPage(1)
    // Don't scroll - keep user at current position
  }

  // Clear both staged and applied filters
  const clearStagedFilters = () => {
    // Clear staged values
    setStagedCategory('all')
    setStagedBrand('')
    setStagedMinPrice(0)
    setStagedMaxPrice(5000)
    setSelectedSizes([])
    
    // Clear applied values
    setSelectedCategory('all')
    setSelectedBrand('')
    setMinPrice(0)
    setMaxPrice(5000)
    setCurrentPage(1)
  }

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbText}>
          <Link href="/">Home</Link>
          <ChevronRightIcon className="inline-block w-4 h-4 mx-1 text-gray-400" />
          <span>{getDisplayTitle()}</span>
        </div>
      </div>

      {/* Banner Carousel */}
      <div className={styles.bannerContainer}>
        <SimpleBannerCarousel images={bannerImages} />
      </div>

      {/* Recommended Section */}
      <div className={styles.recommendedSection}>
        <div className={styles.recommendedHeader}>
          <h3 className={styles.recommendedTitle}>Recommended for you</h3>
        </div>
        <div className={styles.recommendedScroll}>
          {products.slice(0, 12).map((product) => {
            const range = getProductPriceRange(product)
            return (
              <div 
                key={product.id} 
                className={styles.recommendedCard}
                onClick={() => setQuickViewProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles.recommendedCardImage}
                />
                <div className={styles.recommendedCardInfo}>
                  <p className={styles.recommendedCardName}>{product.name}</p>
                  <span className={styles.recommendedCardPrice}>฿{range.min}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.flexContainer}>
          {/* Mobile Overlay */}
          {showMobileFilters && (
            <div 
              className={styles.mobileOverlay}
              onClick={() => setShowMobileFilters(false)}
            />
          )}

          {/* Left Sidebar - Filters */}
          <aside className={`${styles.sidebar} ${showMobileFilters ? styles.sidebarMobileOpen : ''}`}>
            {/* Close Button for Mobile */}
            <button 
              className={styles.mobileCloseBtn}
              onClick={() => setShowMobileFilters(false)}
            >
              ✕
            </button>

            {/* All Categories */}
            <div 
              className={`${styles.categoryBox} ${selectedCategory === 'all' ? styles.categoryBoxActive : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              <div className={styles.categoryTitle}>หมวดหมู่ทั้งหมด</div>
            </div>

            {/* Categories */}
            <div className={styles.categoryList}>
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <div 
                  key={cat.id}
                  className={`${styles.categoryItem} ${selectedCategory === cat.id ? styles.categoryItemActive : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </div>
              ))}
            </div>

            <div className={styles.divider}></div>

            {/* Brand */}
            <div className={styles.brandHeader}>
              <span className={styles.brandHeaderText}>ยี่ห้อ</span>
            </div>
            <div className={styles.categoryList}>
              {BRANDS.map((brand) => (
                <div 
                  key={brand.id}
                  className={`${styles.categoryItem} ${selectedBrand === brand.id ? styles.categoryItemActive : ''}`}
                  onClick={() => handleBrandChange(brand.id)}
                >
                  {brand.name}
                </div>
              ))}
            </div>

            <div className={styles.divider}></div>

            {/* Promotions */}
            <div className={styles.serviceHeader}>
              <span className={styles.serviceHeaderText}>บริการสินค้าและโปรโมชั่น</span>
            </div>
            <div className={styles.categoryList}>
              {PROMOTIONS.map((promo, i) => (
                <div key={i} className={styles.categoryItem}>{promo}</div>
              ))}
            </div>

            <div className={styles.divider}></div>

            {/* Cat Age */}
            <div className={styles.serviceHeader}>
              <span className={styles.serviceHeaderText}>วัยของแมว</span>
            </div>
            <div className={styles.categoryList}>
              {CAT_AGES.map((age) => (
                <div 
                  key={age.id}
                  className={`${styles.categoryItem} ${selectedCatAge === age.id ? styles.categoryItemActive : ''}`}
                  onClick={() => handleCatAgeChange(age.id)}
                >
                  {age.name}
                </div>
              ))}
            </div>

            <div className={styles.divider}></div>

            {/* Rating */}
            <div className={styles.sidebarTitle}>คะแนน</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { stars: 5, label: 'ดีเยี่ยม' },
                { stars: 4, label: 'ดี' },
                { stars: 3, label: 'ปานกลาง' },
                { stars: 2, label: 'พอใช้' },
                { stars: 1, label: 'ปรับปรุง' }
              ].map((rating) => (
                <div 
                  key={rating.stars}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                  onClick={() => handleRatingChange(rating.stars)}
                  className={minRating === rating.stars ? styles.categoryItemActive : ''}
                >
                  <StarRatingIcon rating={rating.stars} showScore={false} className="text-sm" />
                  <span style={{ fontSize: '11px', color: minRating === rating.stars ? '#FF4D00' : '#666' }}>{rating.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider}></div>

            {/* Clear Filters */}
            <button 
              className={styles.clearFiltersBtn}
              onClick={clearAllFilters}
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </aside>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Search Results Header */}
            {(searchQuery || query) && (
              <div className={styles.searchHeader}>
                <h2 className={styles.searchTitle}>ผลการค้นหา: &quot;{searchQuery || query}&quot;</h2>
                <p className={styles.searchCount}>พบ {filteredProducts.length} รายการ</p>
              </div>
            )}

            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>สินค้า</h2>
              <div className={styles.headerInfo}>
                <span>จำนวนรายการสินค้าทั้งหมด</span>
                <span className="font-semibold text-[#FF4D00]">{filteredProducts.length}</span>
                <span>รายการ</span>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              className={styles.mobileFilterToggle}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              🔍 ตัวกรองสินค้า
            </button>

            {/* Filter Bar - Synced with Sidebar */}
            <div className={styles.filterBar}>
              <div className={styles.filterGroup}>
                <select 
                  className={styles.filterSelect}
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                
                <select 
                  className={styles.filterSelect}
                  value={selectedCatAge}
                  onChange={(e) => setSelectedCatAge(e.target.value)}
                >
                  <option value="">วัยแมว: ทั้งหมด</option>
                  {CAT_AGES.map(age => (
                    <option key={age.id} value={age.id}>{age.name}</option>
                  ))}
                </select>
                
                <select 
                  className={styles.filterSelect}
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="all">สถานที่: ทั้งหมด</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                </select>
                
                <select 
                  className={styles.filterSelect}
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                >
                  <option value="low-to-high">ราคา: ต่ำไปสูง</option>
                  <option value="high-to-low">ราคา: สูงไปต่ำ</option>
                </select>
                
                <select 
                  className={styles.filterSelect}
                  value={`${minPrice}-${maxPrice}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setMinPrice(min)
                    setMaxPrice(max)
                  }}
                >
                  <option value="0-5000">ทุกช่วงราคา</option>
                  <option value="0-500">0 - 500</option>
                  <option value="500-1000">500 - 1,000</option>
                  <option value="1000-2000">1,000 - 2,000</option>
                  <option value="2000-5000">2,000+</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedBrand || selectedCatAge || minRating > 0) && (
              <div className={styles.activeFilters}>
                {selectedBrand && (
                  <span className={styles.filterTag}>
                    {BRANDS.find(b => b.id === selectedBrand)?.name}
                    <button onClick={() => setSelectedBrand('')}>×</button>
                  </span>
                )}
                {selectedCatAge && (
                  <span className={styles.filterTag}>
                    {CAT_AGES.find(a => a.id === selectedCatAge)?.name}
                    <button onClick={() => setSelectedCatAge('')}>×</button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className={styles.filterTag}>
                    {minRating}+ ดาว
                    <button onClick={() => setMinRating(0)}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            <div className={styles.productGrid}>
              {currentProducts.map((product) => {
                const range = getProductPriceRange(product)
                const favorited = isFavorite(product.id)
                
                return (
                  <div 
                    key={product.id} 
                    className={styles.productCard}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={styles.productImage}
                      />
                      {product.badges?.[0] && (
                        <div className={styles.bestSellerBadge}>{product.badges[0]}</div>
                      )}
                      <button 
                        className={styles.favoriteBtn}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                      >
                        <HeartIcon 
                          filled={favorited}
                          className={`w-3 h-3 ${favorited ? 'text-red-500' : 'text-gray-400'}`}
                        />
                      </button>
                    </div>

                    <div className={styles.productInfo}>
                      <p className={styles.productName}>{product.name}</p>
                      
                      <div className={styles.couponBadge}>
                        <span className={styles.couponText}>โค้ดส่วนลด</span>
                      </div>

                      <div className={styles.priceRow}>
                        <span className={styles.price}>฿{range.min}</span>
                        <StarRatingIcon rating={product.rating || 4.5} className="text-xs" />
                      </div>

                      <div className={styles.productDetails}>
                        <div>ยอดขาย {product.sold || 0} ชิ้น</div>
                        <div>{product.location}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {currentProducts.length === 0 && (
              <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>ไม่พบสินค้าที่ค้นหา</p>
                <p className={styles.emptySubtitle}>ลองค้นหาด้วยคำอื่น หรือเปลี่ยนตัวกรอง</p>
                <button 
                  className={styles.clearFiltersBtn}
                  onClick={clearAllFilters}
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <>
                <div className={styles.pagination}>
                  <button 
                    className={styles.pageBtn}
                    onClick={() => {
                      setCurrentPage(Math.max(1, currentPage - 1))
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    disabled={currentPage === 1}
                  >
                    <ChevronRightIcon className="w-3 h-3 rotate-180" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return pageNum
                  }).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                    >
                      {page}
                    </button>
                  ))}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className={styles.pageDots}>...</span>
                      <button
                        onClick={() => {
                          setCurrentPage(totalPages)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className={`${styles.pageBtn} ${currentPage === totalPages ? styles.pageBtnActive : ''}`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button 
                    className={styles.pageBtn}
                    onClick={() => {
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="w-3 h-3" />
                  </button>
                </div>

                <div className={styles.pageInfo}>
                  <span className={styles.pageInfoCurrent}>{currentPage}</span>
                  <span>/{totalPages}</span>
                </div>
              </>
            )}
          </div>

          {/* Right Panel - Filter Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.rightPanelBox}>
              {/* Category Dropdown */}
              <h4 className={styles.rightPanelTitle}>หมวดหมู่</h4>
              <select 
                className={styles.rightPanelSelect}
                value={stagedCategory}
                onChange={(e) => setStagedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              
              {/* Brand Dropdown */}
              <h4 className={styles.rightPanelTitle}>ยี่ห้อ</h4>
              <select 
                className={styles.rightPanelSelect}
                value={stagedBrand}
                onChange={(e) => setStagedBrand(e.target.value)}
              >
                <option value="">ทั้งหมด</option>
                {BRANDS.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
              
              {/* Price Range */}
              <h4 className={styles.rightPanelTitle}>ช่วงราคา</h4>
              <div className={styles.priceRange}>
                <input 
                  type="number" 
                  className={styles.priceInput}
                  placeholder="ต่ำสุด"
                  value={stagedMinPrice || ''}
                  onChange={(e) => setStagedMinPrice(Number(e.target.value) || 0)}
                />
                <span className={styles.priceSeparator}>-</span>
                <input 
                  type="number" 
                  className={styles.priceInput}
                  placeholder="สูงสุด"
                  value={stagedMaxPrice || ''}
                  onChange={(e) => setStagedMaxPrice(Number(e.target.value) || 5000)}
                />
              </div>

              {/* Size/Weight Options */}
              <h4 className={styles.rightPanelTitle}>ขนาด/น้ำหนัก</h4>
              <div className={styles.sizeOptions}>
                {['1 กก.', '2 กก.', '3 กก.', '5 กก.', '7 กก.', '10 กก.'].map((size) => (
                  <label key={size} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={selectedSizes.includes(size)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSizes([...selectedSizes, size])
                        } else {
                          setSelectedSizes(selectedSizes.filter(s => s !== size))
                        }
                      }}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
              
              {/* Apply Button */}
              <button 
                className={styles.applyButton}
                onClick={applyFilters}
              >
                ตกลง
              </button>
              
              {/* Clear Button */}
              <button 
                className={styles.clearButton}
                onClick={clearStagedFilters}
              >
                ล้างตัวกรอง
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  )
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">Loading...</div>}>
      <CategoryPageContent />
    </Suspense>
  )
}
