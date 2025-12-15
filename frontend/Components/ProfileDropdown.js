"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function ProfileDropdown({ isOpen, onClose }) {
    const [language, setLanguage] = useState('TH')

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
            <div className="absolute top-[85px] right-[50px] w-[432px] bg-white rounded-lg shadow-xl z-50">
                {/* Profile Header */}
                <div className="flex items-center gap-6 p-5 border-b border-gray-200">
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa" 
                        alt="Profile" 
                        className="w-[47px] h-[47px] rounded-full"
                    />
                    <span className="text-black text-[15px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">
                        Meow Meow
                    </span>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                    {/* บัญชี */}
                    <Link href="/profile" onClick={onClose}>
                        <div className="flex items-center justify-between py-3 px-5 cursor-pointer hover:bg-gray-50">
                            <span className="text-black text-[15px] font-['Inter'] leading-normal -tracking-[0.333px]">
                                บัญชี
                            </span>
                            <img 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                                alt="" 
                                className="w-[15px] h-[15px] transform -rotate-90"
                            />
                        </div>
                    </Link>

                    {/* การสั่งซื้อล่าสุด */}
                    <Link href="/profile-orders" onClick={onClose}>
                        <div className="flex items-center justify-between py-3 px-5 cursor-pointer hover:bg-gray-50">
                            <span className="text-black text-[14px] font-['Inter'] leading-normal -tracking-[0.333px]">
                                การสั่งซื้อล่าสุด
                            </span>
                            <img 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                                alt="" 
                                className="w-[15px] h-[15px] transform -rotate-90"
                            />
                        </div>
                    </Link>

                    {/* ที่อยู่ที่บันทึกไว้ */}
                    <Link href="/profile-address" onClick={onClose}>
                        <div className="flex items-center justify-between py-3 px-5 cursor-pointer hover:bg-gray-50">
                            <span className="text-black text-[14px] font-['Inter'] leading-normal -tracking-[0.333px]">
                                ที่อยู่ที่บันทึกไว้
                            </span>
                            <img 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                                alt="" 
                                className="w-[15px] h-[15px] transform -rotate-90"
                            />
                        </div>
                    </Link>

                    {/* บัตรเครดิต / บัตรเดบิต */}
                    <div className="flex items-center justify-between py-3 px-5 cursor-pointer hover:bg-gray-50">
                        <span className="text-black text-[14px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            บัตรเครดิต / บัตรเดบิต
                        </span>
                        <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                            alt="" 
                            className="w-[15px] h-[15px] transform -rotate-90"
                        />
                    </div>

                    {/* Language Toggle */}
                    <div className="flex items-center justify-between py-3 px-5">
                        <span className="text-black text-[14px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            เปลี่ยนภาษา / Languages
                        </span>
                        <button 
                            onClick={() => setLanguage(language === 'TH' ? 'EN' : 'TH')}
                            className="relative w-[75px] h-[22px] rounded-[36px] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)_inset,-2px_-2px_4px_0_rgba(0,0,0,0.10)_inset] overflow-hidden"
                        >
                            <div 
                                className={`absolute top-0 h-[22px] w-[41px] rounded-[36px] shadow-[0_-4px_10px_0_rgba(0,0,0,0.10)_inset] bg-[#FF4D00] transition-all duration-300 ${
                                    language === 'TH' ? 'left-0' : 'left-[34px]'
                                }`}
                            ></div>
                            <span className={`absolute left-3 top-0.5 text-[13px] font-['Mitr'] leading-[18px] transition-colors ${
                                language === 'TH' ? 'text-white' : 'text-[#FD560B]'
                            }`}>
                                TH
                            </span>
                            <span className={`absolute right-3 top-0.5 text-[13px] font-['Mitr'] leading-[18px] transition-colors ${
                                language === 'EN' ? 'text-white' : 'text-[#FD560B]'
                            }`}>
                                EN
                            </span>
                        </button>
                    </div>

                    {/* ออกจากระบบ */}
                    <div className="py-3 px-5 cursor-pointer hover:bg-gray-50">
                        <span className="text-[#FF4D00] text-[14px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            ออกจากระบบ
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
