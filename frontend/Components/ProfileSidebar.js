"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers'
import styles from './ProfileSidebar.module.css'

export default function ProfileSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { handleLogout } = useAuth()
  const [profileName, setProfileName] = useState('Meow Meow')
  const [profileImage, setProfileImage] = useState('https://api.builder.io/api/v1/image/assets/TEMP/009824bbfb5cd6b43e232e01931d42e92eb3bfbd')

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
      setProfileName('Meow Meow')
    }
    
    const savedImage = localStorage.getItem('petshop_profile_image')
    if (savedImage) {
      setProfileImage(savedImage)
    } else {
      setProfileImage('https://api.builder.io/api/v1/image/assets/TEMP/009824bbfb5cd6b43e232e01931d42e92eb3bfbd')
    }
  }

  // Load profile data on mount
  useEffect(() => {
    loadProfileData()
  }, [])

  // Listen for storage changes and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      loadProfileData()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('profileUpdated', handleStorageChange)
    
    // Poll localStorage every 500ms to catch updates
    const interval = setInterval(() => {
      loadProfileData()
    }, 500)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('profileUpdated', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const onLogout = () => {
    handleLogout()
    router.push('/')
  }

  const menuItems = [
    { href: '/profile', label: 'บัญชี', fontSize: 'text-[15px]' },
    { href: '/profile-orders', label: 'การสั่งซื้อล่าสุด', fontSize: 'text-sm' },
    { href: '/profile-address', label: 'ที่อยู่ที่บันทึกไว้', fontSize: 'text-sm' },
    { href: '/profile-cards', label: 'บัตรเครดิต / บัตรเดบิต', fontSize: 'text-sm' },
    { href: '/profile-coupons', label: 'โค้ดส่วนลดของฉัน', fontSize: 'text-sm' }
  ]

  return (
    <div className={styles.sidebar}>
      {/* Profile Header */}
      <div className={styles.header}>
        <img 
          src={profileImage}
          alt="Profile"
          className={styles.profileImage}
        />
        <div>
          <p className={styles.username}>{profileName}</p>
          <Link 
            href="/profile"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <p className={styles.editText}>
              แก้ไขข้อมูลส่วนตัว
            </p>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ae5a90e8d55e5378329581ced7d9028a3bf964df"
              alt=""
              className="w-[14px] h-[14px]"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block p-2 rounded transition-colors ${
              pathname === item.href
                ? 'text-[#FF4D00] bg-gray-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <span className={`${item.fontSize} font-['Kanit'] -tracking-[0.333px]`}>
              {item.label}
            </span>
          </Link>
        ))}
        
        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="w-full text-left p-2 rounded hover:bg-gray-50"
        >
          <span className="text-sm font-['Kanit'] -tracking-[0.333px] text-red-500">
            ออกจากระบบ
          </span>
        </button>
      </nav>
    </div>
  )
}
