"use client"
import { useState } from 'react'

export default function CouponsPage() {
  const [savedCoupons, setSavedCoupons] = useState<number[]>([])

  const toggleSave = (id: number) => {
    if (savedCoupons.includes(id)) {
      setSavedCoupons(savedCoupons.filter(couponId => couponId !== id))
    } else {
      setSavedCoupons([...savedCoupons, id])
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] overflow-auto">
      <div className="container-responsive max-w-[1284px] py-4 md:py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#FF8C42] to-[#FFA959] rounded-xl md:rounded-[20px] h-[150px] md:h-[231px] flex items-center justify-center mb-6 md:mb-8 relative overflow-hidden">
          <div className="text-center relative z-10 px-4">
            <h1 className="text-white text-lg sm:text-2xl md:text-[36px] font-bold font-['Inter'] mb-1 md:mb-2 overflow-wrap-break">
              ฉลองครบรอบ 100 ปี ส่งฟรี!!!
            </h1>
            <p className="text-white text-sm sm:text-xl md:text-[36px] font-bold font-['Inter'] overflow-wrap-break">
              พร้อมโค้ดส่วนลดพิเศษอีกมากมาย
            </p>
          </div>
          <div className="absolute top-2 md:top-4 right-2 md:right-4 text-white text-xs md:text-[24px] font-bold font-['Inter'] overflow-wrap-break text-right">
            เริ่ม 1 ธันวาคม - 25 ธันวาคม
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA559] rounded-xl md:rounded-[20px] h-[60px] md:h-[104px] flex items-center justify-center mb-4 md:mb-6">
            <h2 className="text-white text-base sm:text-2xl md:text-[36px] font-bold font-['Inter'] overflow-wrap-break px-4 text-center">
              ฉลองครบรอบ 100 ปีโค้ดสุดพิเศษ
            </h2>
          </div>

          <div className="bg-white rounded-xl md:rounded-[20px] shadow-sm p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
              {/* Badge */}
              <div className="w-[100px] h-[95px] sm:w-[120px] sm:h-[110px] md:w-[137px] md:h-[129px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/40c595824b97fee337663ced1df45b782130fab1"
                  alt="Shop Badge"
                  className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] mb-2"
                />
                <span className="text-white text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] overflow-wrap-break text-center px-2">ร้านโค้ดคุ้ม</span>
              </div>

              {/* Coupon Details */}
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-2xl md:text-[32px] font-bold font-['Inter'] mb-2 overflow-wrap-break">
                  รับไปเลย!!! ส่วนลด ฿100
                </h3>
                <p className="text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] mb-1 overflow-wrap-break">
                  สั่งซื้อขั้นต่ำ ฿200
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <span className="text-[#979797] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] overflow-wrap-break">
                    ใช้ได้ถึง 20 ธันวาคม
                  </span>
                  <a href="#" className="text-[#0038FF] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] underline">
                    เงื่อนไข
                  </a>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button 
              onClick={() => toggleSave(1)}
              className={`w-full sm:w-auto min-w-[90px] md:min-w-[108px] h-[40px] md:h-[49px] rounded-xl font-bold font-['Inter'] text-base md:text-[20px] transition-colors overflow-wrap-break ${
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
        <div className="mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA559] rounded-xl md:rounded-[20px] h-[60px] md:h-[104px] flex items-center justify-center mb-4 md:mb-6">
            <h2 className="text-white text-base sm:text-2xl md:text-[36px] font-bold font-['Inter'] overflow-wrap-break px-4">
              โค้ดส่งฟรี
            </h2>
          </div>

          <div className="space-y-4">
            {/* Shipping Coupon 1 */}
            <div className="bg-white rounded-xl md:rounded-[20px] shadow-sm p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                <div className="w-[100px] h-[95px] sm:w-[120px] sm:h-[110px] md:w-[137px] md:h-[129px] bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e"
                    alt="Free Shipping"
                    className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] mb-2"
                  />
                  <span className="text-white text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] overflow-wrap-break">ส่งฟรี</span>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-2xl md:text-[32px] font-bold font-['Inter'] mb-2 overflow-wrap-break">
                    ส่งฟรี!!! เมื่อใช้คู่กับร้านโค้ดคุ้ม
                  </h3>
                  <p className="text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] mb-1 overflow-wrap-break">
                    สั่งซื้อขั้นต่ำ ฿100
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <span className="text-[#979797] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] overflow-wrap-break">
                      ใช้ได้ถึง 20 ธันวาคม
                    </span>
                    <a href="#" className="text-[#0038FF] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] underline">
                      เงื่อนไข
                    </a>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toggleSave(2)}
                className={`w-full sm:w-auto min-w-[90px] md:min-w-[108px] h-[40px] md:h-[49px] rounded-xl font-bold font-['Inter'] text-base md:text-[20px] transition-colors overflow-wrap-break ${
                  savedCoupons.includes(2)
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white hover:opacity-90'
                }`}
              >
                {savedCoupons.includes(2) ? 'บันทึกแล้ว' : 'เก็บ'}
              </button>
            </div>

            {/* Expired Shipping Coupon */}
            <div className="bg-white rounded-xl md:rounded-[20px] shadow-sm p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 opacity-60">
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                <div className="w-[100px] h-[95px] sm:w-[120px] sm:h-[110px] md:w-[137px] md:h-[129px] bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e"
                    alt="Free Shipping"
                    className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] mb-2"
                  />
                  <span className="text-white text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] overflow-wrap-break">ส่งฟรี</span>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-2xl md:text-[32px] font-bold font-['Inter'] mb-2 overflow-wrap-break">
                    ส่งฟรี!!! เพียงวันนี้เท่านั้น
                  </h3>
                  <p className="text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] mb-1 overflow-wrap-break">
                    สั่งซื้อขั้นต่ำ ฿0
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <span className="text-[#979797] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] overflow-wrap-break">
                      ใช้ได้ถึง 1 ธันวาคม
                    </span>
                    <a href="#" className="text-[#0038FF] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] underline">
                      เงื่อนไข
                    </a>
                  </div>
                </div>
              </div>

              <span className="text-[#F00] text-base md:text-[20px] font-bold font-['Inter'] overflow-wrap-break">
                โค้ดหมด!
              </span>
            </div>
          </div>
        </div>

        {/* Discount Section */}
        <div>
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA559] rounded-xl md:rounded-[20px] h-[60px] md:h-[104px] flex items-center justify-center mb-4 md:mb-6">
            <h2 className="text-white text-base sm:text-2xl md:text-[36px] font-bold font-['Inter'] overflow-wrap-break px-4">
              โค้ดส่วนลด
            </h2>
          </div>

          <div className="bg-white rounded-xl md:rounded-[20px] shadow-sm p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="w-[100px] h-[95px] sm:w-[120px] sm:h-[110px] md:w-[137px] md:h-[129px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e"
                  alt="Maew Logo"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-2xl md:text-[32px] font-bold font-['Inter'] mb-2 overflow-wrap-break">
                  ส่วนลด ฿500
                </h3>
                <p className="text-sm sm:text-base md:text-[20px] font-bold font-['Inter'] mb-1 overflow-wrap-break">
                  สั่งซื้อขั้นต่ำ ฿0
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <span className="text-[#979797] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] overflow-wrap-break">
                    ใช้ได้ถึง 30 ธันวาคม
                  </span>
                  <a href="#" className="text-[#0038FF] text-xs sm:text-sm md:text-[16px] font-bold font-['Inter'] underline">
                    เงื่อนไข
                  </a>
                </div>
              </div>
            </div>

            <button 
              onClick={() => toggleSave(4)}
              className={`w-full sm:w-auto min-w-[90px] md:min-w-[108px] h-[40px] md:h-[49px] rounded-xl font-bold font-['Inter'] text-base md:text-[20px] transition-colors overflow-wrap-break ${
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
