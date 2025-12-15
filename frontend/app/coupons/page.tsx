"use client"
import { useState } from 'react'

export default function CouponsPage() {
  const coupons = [
    {
      id: 1,
      category: "special",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/a7cf6ba9ad09640df95044e260d2b86b54cc4eb8",
      title: "รับไปเลย!!! ส่วนลด ฿100",
      badge: "ร้านโค้ดคุ้ม",
      badgeIcon: "https://api.builder.io/api/v1/image/assets/TEMP/40c595824b97fee337663ced1df45b782130fab1",
      minPurchase: "สั่งซื้อขั้นต่ำ ฿200",
      validUntil: "ใช้ได้ถึง 20 ธันวาคม",
      saved: false
    },
    {
      id: 2,
      category: "shipping",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e",
      title: "ส่งฟรี!!! เมื่อใช้คู่กับร้านโค้ดคุ้ม",
      badge: "ส่งฟรี",
      minPurchase: "สั่งซื้อขั้นต่ำ ฿100",
      validUntil: "ใช้ได้ถึง 20 ธันวาคม",
      saved: false
    },
    {
      id: 3,
      category: "shipping",
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e",
      title: "ส่งฟรี!!! เพียงวันนี้เท่านั้น",
      badge: "ส่งฟรี",
      minPurchase: "สั่งซื้อขั้นต่ำ ฿0",
      validUntil: "ใช้ได้ถึง 1 ธันวาคม",
      expired: true
    },
    {
      id: 4,
      category: "discount",
      logo: "https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e",
      title: "ส่วนลด ฿500",
      badge: "Maew",
      minPurchase: "สั่งซื้อขั้นต่ำ ฿0",
      validUntil: "ใช้ได้ถึง 30 ธันวาคม",
      saved: false
    }
  ]

  const [savedCoupons, setSavedCoupons] = useState<number[]>([])

  const toggleSave = (id: number) => {
    if (savedCoupons.includes(id)) {
      setSavedCoupons(savedCoupons.filter(couponId => couponId !== id))
    } else {
      setSavedCoupons([...savedCoupons, id])
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-[1284px] mx-auto px-4 py-8">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-[#FF8C42] to-[#FFA959] rounded-[20px] h-[231px] flex items-center justify-center mb-8 relative overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/a7cf6ba9ad09640df95044e260d2b86b54cc4eb8"
              alt="Celebration"
              className="absolute left-[281px] top-[58px] w-[79px] h-[79px]"
            />
            <div className="text-center relative z-10">
              <h1 className="text-white text-[36px] font-bold font-['Inter'] mb-2">
                ฉลองครบรอบ 100 ปี ส่งฟรี!!!
              </h1>
              <p className="text-white text-[36px] font-bold font-['Inter']">
                พร้อมโค้ดส่วนลดพิเศษอีกมากมาย
              </p>
            </div>
            <div className="absolute top-4 right-4 text-white text-[24px] font-bold font-['Inter']">
              เริ่ม 1 ธันวาคม - 25 ธันวาคม
            </div>
          </div>

          {/* Special Offers Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA559] rounded-[20px] h-[104px] flex items-center justify-center mb-6">
              <h2 className="text-white text-[36px] font-bold font-['Inter']">
                ฉลองครบรอบ 100 ปีโค้ดสุดพิเศษ
              </h2>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm p-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Badge */}
                <div className="w-[137px] h-[129px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg flex flex-col items-center justify-center">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/40c595824b97fee337663ced1df45b782130fab1"
                    alt="Shop Badge"
                    className="w-[50px] h-[50px] mb-2"
                  />
                  <span className="text-white text-[20px] font-bold font-['Inter']">ร้านโค้ดคุ้ม</span>
                </div>

                {/* Coupon Details */}
                <div>
                  <h3 className="text-[32px] font-bold font-['Inter'] mb-2">
                    รับไปเลย!!! ส่วนลด ฿100
                  </h3>
                  <p className="text-[20px] font-bold font-['Inter'] mb-1">
                    สั่งซื้อขั้นต่ำ ฿200
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-[#979797] text-[16px] font-bold font-['Inter']">
                      ใช้ได้ถึง 20 ธันวาคม
                    </span>
                    <a href="#" className="text-[#0038FF] text-[16px] font-bold font-['Inter'] underline">
                      เงื่อนไข
                    </a>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={() => toggleSave(1)}
                className={`w-[108px] h-[49px] rounded-xl font-bold font-['Inter'] text-[20px] transition-colors ${
                  savedCoupons.includes(1)
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-gradient-to-r from-[#FF4D00] to-[#F99D20] text-white hover:opacity-90'
                }`}
              >
                {savedCoupons.includes(1) ? 'บันทึกแล้ว' : 'เก็บ'}
              </button>
            </div>
          </div>

          {/* Free Shipping Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA559] rounded-[20px] h-[104px] flex items-center justify-center mb-6">
              <h2 className="text-white text-[36px] font-bold font-['Inter']">
                โค้ดส่งฟรี
              </h2>
            </div>

            <div className="space-y-4">
              {/* Shipping Coupon 1 */}
              <div className="bg-white rounded-[20px] shadow-sm p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-[137px] h-[129px] bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] rounded-lg flex flex-col items-center justify-center">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e"
                      alt="Free Shipping"
                      className="w-[50px] h-[50px] mb-2"
                    />
                    <span className="text-white text-[20px] font-bold font-['Inter']">ส่งฟรี</span>
                  </div>

                  <div>
                    <h3 className="text-[32px] font-bold font-['Inter'] mb-2">
                      ส่งฟรี!!! เมื่อใช้คู่กับร้านโค้ดคุ้ม
                    </h3>
                    <p className="text-[20px] font-bold font-['Inter'] mb-1">
                      สั่งซื้อขั้นต่ำ ฿100
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#979797] text-[16px] font-bold font-['Inter']">
                        ใช้ได้ถึง 20 ธันวาคม
                      </span>
                      <a href="#" className="text-[#0038FF] text-[16px] font-bold font-['Inter'] underline">
                        เงื่อนไข
                      </a>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => toggleSave(2)}
                  className={`w-[108px] h-[49px] rounded-xl font-bold font-['Inter'] text-[20px] transition-colors ${
                    savedCoupons.includes(2)
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white hover:opacity-90'
                  }`}
                >
                  {savedCoupons.includes(2) ? 'บันทึกแล้ว' : 'เก็บ'}
                </button>
              </div>

              {/* Expired Shipping Coupon */}
              <div className="bg-white rounded-[20px] shadow-sm p-8 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-6">
                  <div className="w-[137px] h-[129px] bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] rounded-lg flex flex-col items-center justify-center">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e"
                      alt="Free Shipping"
                      className="w-[50px] h-[50px] mb-2"
                    />
                    <span className="text-white text-[20px] font-bold font-['Inter']">ส่งฟรี</span>
                  </div>

                  <div>
                    <h3 className="text-[32px] font-bold font-['Inter'] mb-2">
                      ส่งฟรี!!! เพียงวันนี้เท่านั้น
                    </h3>
                    <p className="text-[20px] font-bold font-['Inter'] mb-1">
                      สั่งซื้อขั้นต่ำ ฿0
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#979797] text-[16px] font-bold font-['Inter']">
                        ใช้ได้ถึง 1 ธันวาคม
                      </span>
                      <a href="#" className="text-[#0038FF] text-[16px] font-bold font-['Inter'] underline">
                        เงื่อนไข
                      </a>
                    </div>
                  </div>
                </div>

                <span className="text-[#F00] text-[20px] font-bold font-['Inter']">
                  โค้ดหมด!
                </span>
              </div>
            </div>
          </div>

          {/* Discount Section */}
          <div>
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA559] rounded-[20px] h-[104px] flex items-center justify-center mb-6">
              <h2 className="text-white text-[36px] font-bold font-['Inter']">
                โค้ดส่วนลด
              </h2>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm p-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-[137px] h-[129px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg flex items-center justify-center p-2">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e"
                    alt="Maew Logo"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-[32px] font-bold font-['Inter'] mb-2">
                    ส่วนลด ฿500
                  </h3>
                  <p className="text-[20px] font-bold font-['Inter'] mb-1">
                    สั่งซื้อขั้นต่ำ ฿0
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-[#979797] text-[16px] font-bold font-['Inter']">
                      ใช้ได้ถึง 30 ธันวาคม
                    </span>
                    <a href="#" className="text-[#0038FF] text-[16px] font-bold font-['Inter'] underline">
                      เงื่อนไข
                    </a>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toggleSave(4)}
                className={`w-[108px] h-[49px] rounded-xl font-bold font-['Inter'] text-[20px] transition-colors ${
                  savedCoupons.includes(4)
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-gradient-to-r from-[#FF4D00] to-[#F99D20] text-white hover:opacity-90'
                }`}
              >
                {savedCoupons.includes(4) ? 'บันทึกแล้ว' : 'เก็บ'}
              </button>
            </div>
          </div>
        </div>
      </main>
  )
}
