"use client"
import Link from "next/link"
import { useState } from 'react'
import ProfileDropdown from './ProfileDropdown'

export default function Navbar(){
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)

    return(
        <nav className="bg-gradient-to-r from-[#E8954F] to-[#F7A961] h-[105px] flex items-center px-2.5 relative">
            <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
                {/* Logo */}
                <div className="w-[138px] h-[78px] relative">
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e"
                        alt="Meow Meow Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/a4d5c457cadca55671963e132cba2bdd395881a9"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span className="text-white text-[15px] font-bold">Home</span>
                    </Link>

                    <Link href="/notifications" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/f34acdfaa4d915c3708eed128c269e53490186e0"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span className="text-white text-[15px] font-bold">Notification</span>
                    </Link>

                    <Link href="/coupons" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/5bd10c6b52e96ab682118e91c3fa2c5c3f9b7574"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span className="text-white text-[15px] font-bold">Coupon</span>
                    </Link>

                    <Link href="/cart" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/2901bf89fcba411386dac60c3d561a559f5223b6"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span className="text-white text-[15px] font-bold">Cart</span>
                    </Link>

                    <Link href="/favorite" className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/b80de9f65b94d83c27755ef14a0def9a5307a069"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span className="text-white text-[15px] font-bold">Favorite</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder=""
                        className="w-[350px] h-10 rounded-full border border-[#F99D20] bg-white/90 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-[#F99D20]"
                    />
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/b153ae714e010a92b4a556df09e4b7be58cdd427"
                        alt="Search"
                        className="w-5 h-5 absolute right-3 top-2.5 cursor-pointer"
                    />
                </div>

                {/* Profile Icon */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        className="w-[47px] h-[47px] hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/f64983e622fbed261da071b7b1de4cdcfb40f6df"
                            alt="Profile"
                            className="w-full h-full"
                        />
                    </button>
                    <ProfileDropdown
                        isOpen={showProfileDropdown}
                        onClose={() => setShowProfileDropdown(false)}
                    />
                </div>
            </div>
        </nav>
    )
}
