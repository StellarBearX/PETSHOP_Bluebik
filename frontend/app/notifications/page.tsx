"use client"
import { useState } from 'react'

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('promotion')

  const promotions = [
    "https://api.builder.io/api/v1/image/assets/TEMP/8151e0349402460e6ba5195dce270226f36ba8a4",
    "https://api.builder.io/api/v1/image/assets/TEMP/6723024e148c86b34fdc0adbac69f5a40b85f4cc",
    "https://api.builder.io/api/v1/image/assets/TEMP/3fc07f0b4daf5f29c83cbf6759ebf42f9c48a2a4",
    "https://api.builder.io/api/v1/image/assets/TEMP/26b07e9b32f4d7aea69be409170252b8d4ea0db0",
    "https://api.builder.io/api/v1/image/assets/TEMP/5bf7f32e2ef6cce40d0a941c717b981adcdf5600",
    "https://api.builder.io/api/v1/image/assets/TEMP/bb3a28ba9039618b69881db370b61e75f546b037",
    "https://api.builder.io/api/v1/image/assets/TEMP/74f973b279dda068ab202a9895608f6509cf7647",
    "https://api.builder.io/api/v1/image/assets/TEMP/44864f2efa986b73b671344ee16868c0bf260cca"
  ]

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mx-[221px] py-8">
            {/* Header Tabs */}
            <div className="flex mb-0">
              <button
                onClick={() => setActiveTab('promotion')}
                className={`w-[498px] h-[45px] flex items-center justify-center text-[20px] font-bold font-['Inter'] leading-normal -tracking-[0.333px] transition-colors rounded-tl shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] ${
                  activeTab === 'promotion' 
                    ? 'text-white bg-gradient-to-r from-[#FF4D00] to-[#F99D20]' 
                    : 'text-[#A19D9D] bg-gray-100'
                }`}
              >
                Promotion
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`w-[500px] h-[45px] flex items-center justify-center text-[20px] font-bold font-['Inter'] leading-normal -tracking-[0.333px] transition-colors rounded-tr ${
                  activeTab === 'news' 
                    ? 'text-white bg-gradient-to-r from-[#FF4D00] to-[#F99D20]' 
                    : 'text-[#A19D9D] bg-white'
                }`}
              >
                News
              </button>
            </div>

            {/* Content */}
            <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded-b">
              {activeTab === 'promotion' && (
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {promotions.map((promo, index) => (
                      <div 
                        key={index}
                        className="rounded-xl overflow-hidden shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <img 
                          src={promo}
                          alt={`Promotion ${index + 1}`}
                          className="w-full h-[200px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'news' && (
                <div className="p-12">
                  <p className="text-center text-gray-500 text-[18px] font-['Inter']">
                    ไม่มีข่าวสารในขณะนี้
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
  )
}
