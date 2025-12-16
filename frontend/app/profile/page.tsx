"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ProfileSuccessModal from '@/Components/ProfileSuccessModal'
import UnsavedChangesModal from '@/Components/UnsavedChangesModal'

const DEFAULT_PROFILE_DATA = {
    firstName: 'M',
    lastName: 'N',
    phone: '0',
    gender: 'หญิง',
    email: 'meow.me@gmail.com'
}

export default function ProfilePage() {
    const router = useRouter()
    const [activeMenu, setActiveMenu] = useState('บัญชี')
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUnsavedModal, setShowUnsavedModal] = useState(false)
    const [formData, setFormData] = useState(DEFAULT_PROFILE_DATA)
    const [savedData, setSavedData] = useState(DEFAULT_PROFILE_DATA)
    const pendingNavigation = useRef<string | null>(null)

    // Load data from localStorage on mount
    useEffect(() => {
        const savedDataStr = localStorage.getItem('userProfile')
        if (savedDataStr) {
            try {
                const parsedData = JSON.parse(savedDataStr)
                setFormData(parsedData)
                setSavedData(parsedData)
            } catch (error) {
                console.error('Error loading profile data:', error)
            }
        }
    }, [])

    // Check if form has unsaved changes
    const hasUnsavedChanges = () => {
        return JSON.stringify(formData) !== JSON.stringify(savedData)
    }

    // Handle browser back button and beforeunload
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges()) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        const handlePopState = (e: PopStateEvent) => {
            if (hasUnsavedChanges()) {
                e.preventDefault()
                pendingNavigation.current = window.location.pathname
                setShowUnsavedModal(true)
                // Push state back to prevent navigation
                window.history.pushState(null, '', '/profile')
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        window.history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.removeEventListener('popstate', handlePopState)
        }
    }, [formData, savedData])

    // Update localStorage flag when form data changes
    useEffect(() => {
        const hasChanges = hasUnsavedChanges()
        localStorage.setItem('profileHasUnsavedChanges', hasChanges ? 'true' : 'false')
    }, [formData, savedData])

    // Listen for navbar navigation events
    useEffect(() => {
        const handleNavbarNavigation = (event: CustomEvent<{ path: string }>) => {
            const { path } = event.detail
            if (hasUnsavedChanges()) {
                pendingNavigation.current = path
                setShowUnsavedModal(true)
            } else {
                router.push(path)
            }
        }

        window.addEventListener('navbarNavigation', handleNavbarNavigation as EventListener)
        return () => {
            window.removeEventListener('navbarNavigation', handleNavbarNavigation as EventListener)
        }
    }, [formData, savedData, router])

    // Confirm navigation (discard changes)
    const handleConfirmNavigation = () => {
        setShowUnsavedModal(false)
        if (pendingNavigation.current) {
            router.push(pendingNavigation.current)
            pendingNavigation.current = null
        }
    }

    // Cancel navigation
    const handleCancelNavigation = () => {
        setShowUnsavedModal(false)
        pendingNavigation.current = null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleGenderChange = (gender: string) => {
        setFormData({
            ...formData,
            gender
        })
    }

    const handleSave = () => {
        // Save to localStorage
        try {
            localStorage.setItem('userProfile', JSON.stringify(formData))
            setSavedData(formData) // Update saved data to match form data
            console.log('Profile saved:', formData)
            setShowSuccessModal(true)
        } catch (error) {
            console.error('Error saving profile:', error)
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
        }
    }

    // Get full name for display
    const getFullName = () => {
        const firstName = formData.firstName || 'Meow'
        const lastName = formData.lastName || 'Meow'
        return `${firstName} ${lastName}`.trim() || 'Meow Meow'
    }

    const handleMenuClick = (menu: string) => {
        if (menu === 'ออกจากระบบ') {
            if (hasUnsavedChanges()) {
                pendingNavigation.current = '/'
                setShowUnsavedModal(true)
            } else {
                router.push('/')
            }
        } else if (menu === 'การสั่งซื้อล่าสุด') {
            router.push('/orders')
        } else if (menu === 'ที่อยู่ที่บันทึกไว้') {
            router.push('/addresses')
        } else {
            setActiveMenu(menu)
        }
    }

    return (
        <>
            <div className="h-[calc(100vh-105px)] bg-[#F5F5F5] overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6 py-6 h-full flex flex-col">
                    {/* Page Title */}
                    <h1 className="text-black text-3xl font-bold mb-4">My Profile</h1>

                    <div className="flex gap-5 flex-1 overflow-hidden">
                        {/* Left Sidebar */}
                        <div className="w-[280px] flex-shrink-0 bg-white rounded-lg shadow-md p-5 flex flex-col">
                            {/* Profile Summary */}
                            <div className="flex flex-col items-center mb-4 pb-4 border-b border-gray-200">
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 overflow-hidden">
                                    <img 
                                        src="https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa" 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h2 className="text-black text-base font-bold mb-2">{getFullName()}</h2>
                                <button
                                    onClick={() => setActiveMenu('บัญชี')}
                                    className="flex items-center gap-1.5 text-[#E8954F] hover:text-[#F7A961] transition-colors text-xs font-medium"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    แก้ไขข้อมูลส่วนตัว
                                </button>
                            </div>

                            {/* Menu List */}
                            <div className="space-y-1.5 flex-1">
                                {['บัญชี', 'การสั่งซื้อล่าสุด', 'ที่อยู่ที่บันทึกไว้', 'ออกจากระบบ'].map((menu, index) => (
                                    <div
                                        key={menu}
                                        onClick={() => handleMenuClick(menu)}
                                        className={`flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-all ${
                                            activeMenu === menu 
                                                ? 'bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white shadow-md' 
                                                : 'hover:bg-gray-50 text-black'
                                        }`}
                                    >
                                        <span className={`text-[13px] ${activeMenu === menu ? 'font-bold' : 'font-medium'}`}>
                                            {menu}
                                        </span>
                                        {index < 3 && (
                                            <img 
                                                src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                                                alt="" 
                                                className="w-3.5 h-3.5"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col overflow-hidden">
                            {/* Section Header with Email */}
                            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                                <div>
                                    <h2 className="text-black text-xl font-bold mb-1">ข้อมูลของฉัน</h2>
                                    <p className="text-gray-600 text-xs">
                                        จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                                    </p>
                                </div>
                                <span className="text-[#FF4D00] text-xs font-semibold whitespace-nowrap ml-4">
                                    {formData.email}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="flex items-start gap-8">
                                    {/* Profile Picture Upload */}
                                    <div className="flex-shrink-0">
                                        <div className="flex flex-col items-center">
                                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-3 border-2 border-gray-200 overflow-hidden shadow-md">
                                                <img 
                                                    src="https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa" 
                                                    alt="Profile" 
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <button className="text-[#E8954F] hover:text-[#F7A961] transition-colors text-xs font-semibold px-3 py-1 rounded-md hover:bg-orange-50">
                                                เลือกรูป
                                            </button>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="flex-1 min-w-0">
                                        <div className="space-y-4">
                                            {/* Username Label */}
                                            <div>
                                                <label className="block text-gray-700 text-xs font-bold mb-1">
                                                    ชื่อผู้ใช้
                                                </label>
                                            </div>

                                            {/* Name Fields Row */}
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* First Name */}
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                                                        ชื่อ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all text-sm"
                                                    />
                                                </div>

                                                {/* Last Name */}
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                                                        นามสกุล
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone Number */}
                                            <div>
                                                <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                                                    หมายเลขโทรศัพท์
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all text-sm"
                                                />
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-gray-700 text-xs font-semibold mb-2">
                                                    เพศ
                                                </label>
                                                <div className="flex gap-6">
                                                    {['หญิง', 'ชาย', 'อื่นๆ'].map((gender) => (
                                                        <label key={gender} className="flex items-center cursor-pointer group">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value={gender}
                                                                checked={formData.gender === gender}
                                                                onChange={() => handleGenderChange(gender)}
                                                                className="w-4 h-4 accent-[#E8954F] cursor-pointer"
                                                                style={{ accentColor: '#E8954F' }}
                                                            />
                                                            <span className="ml-2 text-gray-700 text-xs font-medium group-hover:text-[#E8954F] transition-colors">
                                                                {gender}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white px-8 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-bold shadow-md hover:shadow-lg text-sm"
                                >
                                    บันทึก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <ProfileSuccessModal 
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />

            {/* Unsaved Changes Modal */}
            <UnsavedChangesModal
                isOpen={showUnsavedModal}
                onCancel={handleCancelNavigation}
                onConfirm={handleConfirmNavigation}
            />
        </>
    )
}
