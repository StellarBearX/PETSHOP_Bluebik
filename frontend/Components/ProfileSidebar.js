"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers'

export default function ProfileSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { handleLogout } = useAuth()

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
    <div className="w-[203px] bg-white rounded-lg shadow p-4">
      {/* Profile Header */}
      <div className="flex items-center gap-3 pb-4 border-b mb-4">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/009824bbfb5cd6b43e232e01931d42e92eb3bfbd"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-[15px] font-['Inter'] -tracking-[0.333px]">Meow Meow</p>
          <div className="flex items-center gap-1">
            <p className="text-[10px] text-[#656565] font-['Inter'] -tracking-[0.333px]">
              แก้ไขข้อมูลส่วนตัว
            </p>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ae5a90e8d55e5378329581ced7d9028a3bf964df"
              alt=""
              className="w-[14px] h-[14px]"
            />
          </div>
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
            <span className={`${item.fontSize} font-['Inter'] -tracking-[0.333px]`}>
              {item.label}
            </span>
          </Link>
        ))}
        
        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="w-full text-left p-2 rounded hover:bg-gray-50"
        >
          <span className="text-sm font-['Inter'] -tracking-[0.333px] text-red-500">
            ออกจากระบบ
          </span>
        </button>
      </nav>
    </div>
  )
}
