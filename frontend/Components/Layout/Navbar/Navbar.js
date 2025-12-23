"use client"
import Link from "next/link"
import { useState, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSearch, useAuth, useCatalog } from "@/app/providers"
import { CATEGORIES, BRANDS } from "@/lib/catalog"
import { IMAGES } from "@/lib/images"
import ProfileDropdown from "../../Profile/ProfileDropdown/ProfileDropdown"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { query, setQuery } = useSearch()
  const { handleLogout } = useAuth()
  const { products } = useCatalog()

  const closeMobileMenu = () => setShowMobileMenu(false)

  const isActive = (href) => pathname === href

  // Generate suggestions based on query
  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    
    const searchQuery = query.toLowerCase()
    const results = []
    
    // Search in products
    const matchingProducts = products
      .filter(product => product.name.toLowerCase().includes(searchQuery))
      .slice(0, 5)
      .map(product => ({ type: 'product', id: product.id, name: product.name, url: `/category?q=${encodeURIComponent(product.name)}` }))
    
    // Search in categories
    const matchingCategories = CATEGORIES
      .filter(category => category.name.toLowerCase().includes(searchQuery) && category.id !== 'all')
      .slice(0, 3)
      .map(category => ({ type: 'category', id: category.id, name: category.name, url: `/category?cat=${category.id}` }))
    
    // Search in brands
    const matchingBrands = BRANDS
      .filter(brand => brand.name.toLowerCase().includes(searchQuery))
      .slice(0, 3)
      .map(brand => ({ type: 'brand', id: brand.id, name: brand.name, url: `/category?q=${encodeURIComponent(brand.name)}` }))
    
    return [...matchingProducts, ...matchingCategories, ...matchingBrands].slice(0, 8)
  }, [query, products])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      const searchTerm = query.trim()
      setShowSuggestions(false)
      setQuery('') // Clear search input
      router.push(`/category?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false)
    setQuery('') // Clear search input
    router.push(suggestion.url)
  }

  return (
    <nav className={`gradient-navbar ${styles.navbar}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img
            src={IMAGES.logo}
            alt="Meow Meow Logo"
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={`${styles.navLinks} ${styles.desktopOnly}`}>
          <Link href="/" className={`nav-link ${isActive('/') ? styles.navLinkActive : ''}`}>
            <img
              src={IMAGES.nav.home}
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Home</span>
          </Link>

          <Link href="/notifications" className={`nav-link ${isActive('/notifications') ? styles.navLinkActive : ''}`}>
            <img
              src={IMAGES.nav.category}
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Notification</span>
          </Link>

          <Link href="/coupons" className={`nav-link ${isActive('/coupons') ? styles.navLinkActive : ''}`}>
            <img
              src={IMAGES.nav.shopee}
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Coupon</span>
          </Link>

          <Link href="/cart" className={`nav-link ${isActive('/cart') ? styles.navLinkActive : ''}`}>
            <img
              src={IMAGES.nav.coupon}
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Cart</span>
          </Link>

          <Link href="/favorite" className={`nav-link ${isActive('/favorite') ? styles.navLinkActive : ''}`}>
            <img
              src={IMAGES.nav.notification}
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Favorite</span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className={styles.rightActions}>
          {/* Desktop Search */}
          <div className={`${styles.searchContainer} ${styles.desktopOnly}`}>
            <input
              type="text"
              placeholder="ค้นหา..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onKeyDown={handleSearch}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={styles.searchInput}
              aria-label="Search"
            />
            <button
              type="button"
              onClick={() => {
                if (query.trim()) {
                  const searchTerm = query.trim()
                  setShowSuggestions(false)
                  setQuery('') // Clear search input
                  router.push(`/category?q=${encodeURIComponent(searchTerm)}`)
                }
              }}
              className={styles.searchButton}
            >
              <img
                src={IMAGES.searchIcon}
                alt="Search"
                className={styles.searchIcon}
              />
            </button>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className={styles.suggestionsDropdown}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.type}-${suggestion.id}-${index}`}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className={styles.suggestionIcon}>
                      {suggestion.type === 'product' && '🔍'}
                      {suggestion.type === 'category' && '📁'}
                      {suggestion.type === 'brand' && '🏷️'}
                    </span>
                    <span className={styles.suggestionText}>{suggestion.name}</span>
                    <span className={styles.suggestionType}>
                      {suggestion.type === 'product' && 'สินค้า'}
                      {suggestion.type === 'category' && 'หมวดหมู่'}
                      {suggestion.type === 'brand' && 'ยี่ห้อ'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Icon - Desktop */}
          <div className={`relative ${styles.desktopOnly}`}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={`${styles.profileButton} hover:opacity-80 transition-opacity`}
            >
              <img
                src={IMAGES.cartIcon}
                alt="Profile"
                className={styles.profileImage}
              />
            </button>
            <ProfileDropdown
              isOpen={showProfileDropdown}
              onClose={() => setShowProfileDropdown(false)}
              onLogout={handleLogout}
            />
          </div>

          {/* Burger Menu Button - Mobile Only */}
          <button
            className={styles.burgerButton}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            <div className={`${styles.burgerLine} ${showMobileMenu ? styles.open : ""}`}></div>
            <div className={`${styles.burgerLine} ${showMobileMenu ? styles.open : ""}`}></div>
            <div className={`${styles.burgerLine} ${showMobileMenu ? styles.open : ""}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {/* Search in Burger */}
            <div className={styles.mobileSearchContainer}>
              <div className={styles.mobileSearchPill}>
                <img
                  src={IMAGES.searchIcon}
                  alt="Search"
                  className={styles.mobileSearchIcon}
                />
                <input
                  type="text"
                  placeholder="ค้นหา..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      const searchTerm = query.trim()
                      closeMobileMenu()
                      setQuery('') // Clear search input
                      router.push(`/category?q=${encodeURIComponent(searchTerm)}`)
                    }
                  }}
                  className={styles.mobileSearchInput}
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Navigation Links - Mobile */}
            <div className={styles.mobileNavLinks}>
              <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src={IMAGES.nav.home}
                  alt=""
                  className="w-6 h-6"
                />
                <span>Home</span>
              </Link>

              <Link href="/notifications" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src={IMAGES.nav.category}
                  alt=""
                  className="w-6 h-6"
                />
                <span>Notification</span>
              </Link>

              <Link href="/coupons" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src={IMAGES.nav.shopee}
                  alt=""
                  className="w-6 h-6"
                />
                <span>Coupon</span>
              </Link>

              <Link href="/cart" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src={IMAGES.nav.coupon}
                  alt=""
                  className="w-6 h-6"
                />
                <span>Cart</span>
              </Link>

              <Link href="/favorite" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src={IMAGES.nav.notification}
                  alt=""
                  className="w-6 h-6"
                />
                <span>Favorite</span>
              </Link>

              <Link href="/profile" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src={IMAGES.cartIcon}
                  alt=""
                  className="w-6 h-6"
                />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
