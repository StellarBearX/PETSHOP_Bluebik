"use client"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSearch, useAuth } from "@/app/providers"
import ProfileDropdown from "./ProfileDropdown"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()

  const { query, setQuery } = useSearch()
  const { handleLogout } = useAuth()

  const closeMobileMenu = () => setShowMobileMenu(false)

  const isActive = (href) => pathname === href

  return (
    <nav className={`gradient-navbar ${styles.navbar}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e"
            alt="Meow Meow Logo"
            className={styles.logoImage}
          />
        </div>

        {/* Desktop Navigation */}
        <div className={`${styles.navLinks} ${styles.desktopOnly}`}>
          <Link href="/" className={`nav-link ${isActive('/') ? styles.navLinkActive : ''}`}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a4d5c457cadca55671963e132cba2bdd395881a9"
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Home</span>
          </Link>

          <Link href="/notifications" className={`nav-link ${isActive('/notifications') ? styles.navLinkActive : ''}`}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/f34acdfaa4d915c3708eed128c269e53490186e0"
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Notification</span>
          </Link>

          <Link href="/coupons" className={`nav-link ${isActive('/coupons') ? styles.navLinkActive : ''}`}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/5bd10c6b52e96ab682118e91c3fa2c5c3f9b7574"
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Coupon</span>
          </Link>

          <Link href="/cart" className={`nav-link ${isActive('/cart') ? styles.navLinkActive : ''}`}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/2901bf89fcba411386dac60c3d561a559f5223b6"
              alt=""
              className="nav-icon"
            />
            <span className="nav-text">Cart</span>
          </Link>

          <Link href="/favorite" className={`nav-link ${isActive('/favorite') ? styles.navLinkActive : ''}`}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b80de9f65b94d83c27755ef14a0def9a5307a069"
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
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b153ae714e010a92b4a556df09e4b7be58cdd427"
              alt="Search"
              className={styles.searchIcon}
            />
          </div>

          {/* Profile Icon - Desktop */}
          <div className={`relative ${styles.desktopOnly}`}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={`${styles.profileButton} hover:opacity-80 transition-opacity`}
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/f64983e622fbed261da071b7b1de4cdcfb40f6df"
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
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b153ae714e010a92b4a556df09e4b7be58cdd427"
                  alt="Search"
                  className={styles.mobileSearchIcon}
                />
                <input
                  type="text"
                  placeholder="ค้นหา..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.mobileSearchInput}
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Navigation Links - Mobile */}
            <div className={styles.mobileNavLinks}>
              <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/a4d5c457cadca55671963e132cba2bdd395881a9"
                  alt=""
                  className="w-6 h-6"
                />
                <span>Home</span>
              </Link>

              <Link href="/notifications" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f34acdfaa4d915c3708eed128c269e53490186e0"
                  alt=""
                  className="w-6 h-6"
                />
                <span>Notification</span>
              </Link>

              <Link href="/coupons" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5bd10c6b52e96ab682118e91c3fa2c5c3f9b7574"
                  alt=""
                  className="w-6 h-6"
                />
                <span>Coupon</span>
              </Link>

              <Link href="/cart" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2901bf89fcba411386dac60c3d561a559f5223b6"
                  alt=""
                  className="w-6 h-6"
                />
                <span>Cart</span>
              </Link>

              <Link href="/favorite" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b80de9f65b94d83c27755ef14a0def9a5307a069"
                  alt=""
                  className="w-6 h-6"
                />
                <span>Favorite</span>
              </Link>

              <Link href="/profile" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f64983e622fbed261da071b7b1de4cdcfb40f6df"
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
