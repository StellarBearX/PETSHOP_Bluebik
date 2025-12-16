"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function OrdersPage() {
    const [userName, setUserName] = useState('Meow Meow')

    // Load user name from localStorage
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile')
        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile)
                const fullName = `${profile.firstName || 'Meow'} ${profile.lastName || 'Meow'}`.trim() || 'Meow Meow'
                setUserName(fullName)
            } catch (error) {
                console.error('Error loading profile:', error)
            }
        }
    }, [])

    return (
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
                            <h2 className="text-black text-base font-bold mb-2">{userName}</h2>
                            <Link 
                                href="/profile"
                                className="flex items-center gap-1.5 text-[#E8954F] hover:text-[#F7A961] transition-colors text-xs font-medium"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                แก้ไขข้อมูลส่วนตัว
                            </Link>
                        </div>

                        {/* Menu List */}
                        <div className="space-y-1.5 flex-1">
                            {['บัญชี', 'การสั่งซื้อล่าสุด', 'ที่อยู่ที่บันทึกไว้', 'ออกจากระบบ'].map((menu, index) => (
                                <div
                                    key={menu}
                                    onClick={() => {
                                        if (menu === 'บัญชี') {
                                            window.location.href = '/profile'
                                        } else if (menu === 'การสั่งซื้อล่าสุด') {
                                            window.location.href = '/orders'
                                        } else if (menu === 'ที่อยู่ที่บันทึกไว้') {
                                            window.location.href = '/addresses'
                                        } else if (menu === 'ออกจากระบบ') {
                                            window.location.href = '/'
                                        }
                                    }}
                                    className={`flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-all ${
                                        menu === 'การสั่งซื้อล่าสุด'
                                            ? 'bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white shadow-md' 
                                            : 'hover:bg-gray-50 text-black'
                                    }`}
                                >
                                    <span className={`text-[13px] ${menu === 'การสั่งซื้อล่าสุด' ? 'font-bold' : 'font-medium'}`}>
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
                        <div className="flex-1 overflow-y-auto">
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <h2 className="text-black text-xl font-bold mb-1">การสั่งซื้อล่าสุด</h2>
                                <p className="text-gray-600 text-xs">
                                    จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

