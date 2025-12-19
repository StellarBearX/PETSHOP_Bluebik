"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from './Icons'
import styles from './ProfileDropdown.module.css'

export default function ProfileDropdown({ isOpen, onClose, onLogout }) {
    const [profileName, setProfileName] = useState('Meow Meow')
    const [profileImage, setProfileImage] = useState('https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa')

    // Function to load profile data
    const loadProfileData = () => {
        const saved = localStorage.getItem('petshop_profile')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (parsed.firstName && parsed.lastName) {
                    const fullName = `${parsed.firstName} ${parsed.lastName}`
                    setProfileName(fullName)
                }
            } catch (e) {
                console.error('Error loading profile:', e)
            }
        } else {
            // Reset to default if no saved data
            setProfileName('Meow Meow')
        }
        
        const savedImage = localStorage.getItem('petshop_profile_image')
        if (savedImage) {
            setProfileImage(savedImage)
        } else {
            // Reset to default if no saved image
            setProfileImage('https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa')
        }
    }

    // Load profile data on mount and when dropdown opens
    useEffect(() => {
        loadProfileData()
    }, [isOpen])

    // Listen for storage changes and custom events
    useEffect(() => {
        const handleStorageChange = () => {
            loadProfileData()
        }

        // Listen for storage event (cross-tab)
        window.addEventListener('storage', handleStorageChange)
        
        // Listen for custom event (same-tab)
        window.addEventListener('profileUpdated', handleStorageChange)
        
        // Poll localStorage every 500ms when dropdown is open (for same-tab updates)
        let interval = null
        if (isOpen) {
            interval = setInterval(() => {
                loadProfileData()
            }, 500)
        }
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('profileUpdated', handleStorageChange)
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleLogout = () => {
        onClose()
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.dropdown}>
                {/* Profile Header */}
                <div className={styles.header}>
                    <img 
                        src={profileImage}
                        alt="Profile" 
                        className={styles.profileImage}
                    />
                    <span className={styles.username}>
                        {profileName}
                    </span>
                </div>

                {/* Menu Items */}
                <div className={styles.menu}>
                    {/* บัญชี */}
                    <Link href="/profile" onClick={onClose}>
                        <div className={styles.menuItem}>
                            <span className={styles.menuText}>
                                บัญชี
                            </span>
                            <ChevronRightIcon className={styles.arrow} />
                        </div>
                    </Link>

                    {/* การสั่งซื้อล่าสุด */}
                    <Link href="/profile-orders" onClick={onClose}>
                        <div className={styles.menuItem}>
                            <span className={`${styles.menuText} ${styles.menuTextSmall}`}>
                                การสั่งซื้อล่าสุด
                            </span>
                            <ChevronRightIcon className={styles.arrow} />
                        </div>
                    </Link>

                    {/* ที่อยู่ที่บันทึกไว้ */}
                    <Link href="/profile-address" onClick={onClose}>
                        <div className={styles.menuItem}>
                            <span className={`${styles.menuText} ${styles.menuTextSmall}`}>
                                ที่อยู่ที่บันทึกไว้
                            </span>
                            <ChevronRightIcon className={styles.arrow} />
                        </div>
                    </Link>

                    {/* บัตรเครดิต / บัตรเดบิต */}
                    <Link href="/profile-cards" onClick={onClose}>
                        <div className={styles.menuItem}>
                            <span className={`${styles.menuText} ${styles.menuTextSmall}`}>
                                บัตรเครดิต / บัตรเดบิต
                            </span>
                            <ChevronRightIcon className={styles.arrow} />
                        </div>
                    </Link>

                    {/* ออกจากระบบ */}
                    <button onClick={handleLogout} className={styles.menuItem} style={{ width: '100%', textAlign: 'left' }}>
                        <span className={`${styles.menuText} ${styles.menuTextSmall} ${styles.menuTextLogout}`}>
                            ออกจากระบบ
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}
