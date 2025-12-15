"use client"
import { useState } from 'react'

export default function ProfileDropdown({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
            <div className="absolute top-20 right-4 w-[432px] bg-white rounded-lg shadow-xl z-50 p-5">
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-gray-200">
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full"
                    />
                    <span className="text-black text-[15px] font-bold">Meow Meow</span>
                </div>

                {/* Menu Items */}
                <div className="pt-2">
                    {/* บัญชี */}
                    <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 px-2 rounded">
                        <span className="text-black text-[15px]">บัญชี</span>
                        <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                            alt="" 
                            className="w-4 h-4 transform -rotate-90"
                        />
                    </div>

                    {/* การสั่งซื้อล่าสุด */}
                    <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 px-2 rounded">
                        <span className="text-black text-[14px]">การสั่งซื้อล่าสุด</span>
                        <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                            alt="" 
                            className="w-4 h-4 transform -rotate-90"
                        />
                    </div>

                    {/* ที่อยู่ที่บันทึกไว้ */}
                    <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 px-2 rounded">
                        <span className="text-black text-[14px]">ที่อยู่ที่บันทึกไว้</span>
                        <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                            alt="" 
                            className="w-4 h-4 transform -rotate-90"
                        />
                    </div>

                    {/* Language Toggle */}
                    <div className="flex items-center justify-between py-3 px-2">
                        <span className="text-black text-[14px]">เปลี่ยนภาษา / Languages</span>
                        <div className="relative w-[75px] h-[22px] bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] rounded-full shadow-inner">
                            <div className="absolute left-0 top-0 w-[41px] h-[22px] bg-[#FF4D00] rounded-full shadow-inner"></div>
                            <span className="absolute left-3 top-0.5 text-white text-[13px]">TH</span>
                            <span className="absolute right-3 top-0.5 text-[#FD560B] text-[13px]">EN</span>
                        </div>
                    </div>

                    {/* ออกจากระบบ */}
                    <div className="py-3 cursor-pointer hover:bg-gray-50 px-2 rounded">
                        <span className="text-black text-[14px]">ออกจากระบบ</span>
                    </div>
                </div>
            </div>
        </>
    )
}
