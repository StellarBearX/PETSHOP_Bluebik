"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from './Icons'
import styles from './ProfileDropdown.module.css'

export default function ProfileDropdown({ isOpen, onClose, onLogout }) {
    const [language, setLanguage] = useState('TH')

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
                        src="https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa" 
                        alt="Profile" 
                        className={styles.profileImage}
                    />
                    <span className={styles.username}>
                        Meow Meow
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

                    {/* Language Toggle */}
                    <div className={styles.menuItem}>
                        <span className={`${styles.menuText} ${styles.menuTextSmall}`}>
                            เปลี่ยนภาษา / Languages
                        </span>
                        <button 
                            onClick={() => setLanguage(language === 'TH' ? 'EN' : 'TH')}
                            className={styles.languageToggle}
                        >
                            <div className={`${styles.languageSlider} ${language === 'TH' ? styles.th : styles.en}`}></div>
                            <span className={`${styles.languageText} ${styles.left} ${language === 'TH' ? styles.active : styles.inactive}`}>
                                TH
                            </span>
                            <span className={`${styles.languageText} ${styles.right} ${language === 'EN' ? styles.active : styles.inactive}`}>
                                EN
                            </span>
                        </button>
                    </div>

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
