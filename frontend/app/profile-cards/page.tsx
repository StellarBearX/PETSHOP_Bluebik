"use client"
import { useState } from 'react'
import ProfileSidebar from '@/Components/ProfileSidebar'

export default function ProfileCardsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  })

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-4 md:py-8 overflow-auto">
      <div className="container-responsive max-w-[1253px]">
        {/* Header */}
        <div className="bg-white h-[45px] flex items-center px-3 mb-4 md:mb-6">
          <h1 className="text-black text-center text-base md:text-[20px] font-bold font-['Inter'] -tracking-[0.333px] overflow-wrap-break">
            My Profile
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded-lg p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-[15px] font-['Inter'] -tracking-[0.333px] mb-1">บัตรเครดิต / บัตรเดบิต</h2>
                <p className="text-[12px] text-[#656565] font-['Inter'] -tracking-[0.333px]">
                  บัตรจะแสดงเมื่อคุณเลือกชำระเงินผ่านช่องทางบัตรเครดิต/บัตรเดบิต หรือผ่อนชำระผ่านบัตรเครดิต
                </p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="w-[100px] h-[36px] border border-[#FF4D00] rounded flex items-center justify-center gap-2 text-[#FF6C00] text-[15px] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50"
              >
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/85456dbddef44f1ec86f5e003221c58a31f1e87a"
                  alt=""
                  className="w-[15px] h-[15px]"
                />
                เพิ่มบัตร
              </button>
            </div>

            <div className="border-t border-gray-200 mb-8"></div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-20">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/25c4dd6c2c65fbf58a458ec192aeb30986f74667"
                alt="No cards"
                className="w-[73px] h-[73px] mb-4"
              />
              <p className="text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px]">
                ไม่มีตัวเลือกการชำระเงิน
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button className="w-[100px] h-[36px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] -tracking-[0.333px] hover:opacity-90">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white w-[603px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] relative" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-200 w-full h-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-[20px] p-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f628a52ade3ea5a382954063075f79b0164ddd9c"
                  alt="Close"
                  className="w-[41px] h-[41px]"
                />
              </button>

              <div className="flex items-center gap-2 mb-8">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/45f2260ea667bf4e0f39c8e4969ecc384b910e31"
                  alt="Card"
                  className="w-[29px] h-[29px]"
                />
                <h2 className="text-[24px] font-['Inter'] -tracking-[0.333px]">
                  เพิ่มบัตรเครดิต / บัตรเดบิต
                </h2>
              </div>

              <div className="flex justify-end gap-2 mb-6">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d32d6972ead0919d933be1bb396a8b4cf8fa49f4"
                  alt="Mastercard"
                  className="w-[42px] h-[42px]"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2c8e8ed1a87be23179d489a05d810279d00399d7"
                  alt="JCB"
                  className="w-[34px] h-[34px] mt-1"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/15af96c3363b6443f5991cacd07535827f16f3c8"
                  alt="Visa"
                  className="w-[49px] h-[49px]"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/25c4dd6c2c65fbf58a458ec192aeb30986f74667"
                  alt="UnionPay"
                  className="w-[41px] h-[41px]"
                />
              </div>

              <form className="space-y-6">
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">
                    <span className="text-red-500">* </span>หมายเลขบัตร
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    className="w-full h-[50px] border border-[#FFFCF9] rounded px-4 text-[15px] font-['Inter'] bg-white"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">
                    <span className="text-red-500">* </span>ชื่อบนบัตร
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                    className="w-full h-[50px] border border-[#FFFCF9] rounded px-4 text-[15px] font-['Inter'] bg-white"
                    placeholder="JOHN DOE"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">
                      <span className="text-red-500">* </span>วันหมดอายุ (ดด/ปป)
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full h-[50px] border border-[#FFFCF9] rounded px-4 text-[15px] font-['Inter'] bg-white"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="w-[155px]">
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">
                      <span className="text-red-500">* </span>CVV
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      className="w-full h-[50px] border border-[#FFFCF9] rounded px-4 text-[15px] font-['Inter'] bg-white"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-[100px] h-[36px] border border-[#FF4D00] rounded text-[#FF4D00] text-[15px] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="w-[100px] h-[36px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] -tracking-[0.333px] hover:opacity-90"
                  >
                    บันทึก
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
