"use client"
import { useState } from 'react'
import ProfileSidebar from '@/Components/ProfileSidebar'

export default function AddressPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    road: '',
    postalCode: ''
  })

  const addresses = [
    {
      id: 1,
      name: "Meow Meow",
      phone: "(+66)090-000-0000",
      address: "บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
      addressEn: "Bluebik Vulcan Company Limited (Head Office) Tax ID : 0105565196514 No.199 S-OASIS Building, 11th Floor, Unit no. 1103-1106, Vibhavadi Rangsit Road, Chomphon, Chatuchak, Bangkok 10900",
      isDefault: true
    },
    {
      id: 2,
      name: "Meow Meow",
      phone: "(+66)090-000-0000",
      address: "บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
      addressEn: "Bluebik Vulcan Company Limited (Head Office) Tax ID : 0105565196514 No.199 S-OASIS Building, 11th Floor, Unit no. 1103-1106, Vibhavadi Rangsit Road, Chomphon, Chatuchak, Bangkok 10900",
      isDefault: false
    }
  ]

  const handleEdit = (id: number) => {
    setSelectedAddress(id)
    setShowEditModal(true)
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-4 md:py-8 overflow-auto">
      <div className="container-responsive max-w-[1253px]">
        {/* Header */}
        <div className="bg-white h-[45px] flex items-center px-4 rounded-lg mb-4 md:mb-6">
          <h1 className="text-black text-base md:text-[20px] font-bold font-['Inter'] -tracking-[0.333px] overflow-wrap-break">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[15px] font-['Inter'] -tracking-[0.333px] mb-2">ที่อยู่ของฉัน</h2>
                <p className="text-[10px] text-[#656565] font-['Inter'] -tracking-[0.333px]">
                  จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                </p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 h-9 border border-[#FF4D00] rounded px-4 text-[#FF4D00] text-[15px] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50"
              >
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/85456dbddef44f1ec86f5e003221c58a31f1e87a"
                  alt="Add"
                  className="w-4 h-4"
                />
                เพิ่มที่อยู่
              </button>
            </div>

            <div className="border-t border-gray-200 mb-6"></div>

            {/* Addresses List */}
            <div className="space-y-6">
              {addresses.map((address) => (
                <div key={address.id}>
                  <div className="flex items-start gap-3 mb-4">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7ede9f2b16206bf9f2c70c68fa2058b9188ea1a9"
                      alt="Location"
                      className="w-5 h-5 mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-[15px] font-['Inter'] -tracking-[0.333px]">ที่อยู่</h3>
                        {address.isDefault && (
                          <span className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] text-white text-[10px] font-['Inter'] -tracking-[0.333px] px-2 py-0.5 rounded">
                            ที่อยู่หลัก
                          </span>
                        )}
                      </div>
                      <p className="text-[15px] font-['Inter'] -tracking-[0.333px] mb-1">
                        {address.name} | {address.phone}
                      </p>
                      <p className="text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px] leading-relaxed mb-2">
                        {address.address}
                      </p>
                      <p className="text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px] leading-relaxed">
                        {address.addressEn}
                      </p>
                    </div>
                    <button className="text-red-500 text-[10px] font-['Inter'] -tracking-[0.333px] hover:opacity-80">
                      ลบ
                    </button>
                  </div>

                  <div className="flex justify-end gap-3 mb-6">
                    <button 
                      onClick={() => handleEdit(address.id)}
                      className="flex items-center gap-2"
                    >
                      <span className="text-[10px] text-[#FF4D00] font-['Inter'] -tracking-[0.333px]">แก้ไข</span>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/ae5a90e8d55e5378329581ced7d9028a3bf964df"
                        alt="Edit"
                        className="w-3.5 h-3.5"
                      />
                    </button>
                    {!address.isDefault && (
                      <button className="h-5 border border-[#656565] rounded px-2 text-[10px] text-[#656565] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50">
                        ตั้งเป็นที่อยู่หลัก
                      </button>
                    )}
                  </div>
                  
                  {address.id !== addresses.length && (
                    <div className="border-t border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button className="w-[100px] h-9 bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] -tracking-[0.333px] hover:opacity-90">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white w-[1000px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-8">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/45f2260ea667bf4e0f39c8e4969ecc384b910e31"
                alt="Address"
                className="w-[29px] h-[29px]"
              />
              <h2 className="text-[24px] font-['Inter'] -tracking-[0.333px]">เพิ่มที่อยู่</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ชื่อ</label>
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#979797]"
                  />
                </div>
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">นามสกุล</label>
                  <input
                    type="text"
                    placeholder="นามสกุล"
                    className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#979797]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  placeholder="หมายเลขโทรศัพท์"
                  className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#979797]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ที่อยู่</label>
                  <textarea
                    placeholder=""
                    rows={6}
                    className="w-full border border-[#656565] rounded p-4 text-[15px] font-['Inter'] -tracking-[0.333px] resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">จังหวัด</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>เลือกจังหวัด</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">เขต/อำเภอ</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>เลือกเขต</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ถนน</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>เลือกถนน</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">รหัสไปรษณีย์</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>เลือกรหัสไปรษณีย์</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-[100px] h-9 border border-[#FF4D00] rounded text-[#FF4D00] text-[15px] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="w-[100px] h-9 bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] -tracking-[0.333px] hover:opacity-90"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white w-[1000px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-8">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/45f2260ea667bf4e0f39c8e4969ecc384b910e31"
                alt="Address"
                className="w-[29px] h-[29px]"
              />
              <h2 className="text-[24px] font-['Inter'] -tracking-[0.333px]">แก้ไขที่อยู่</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ชื่อ</label>
                  <input
                    type="text"
                    defaultValue="Meow"
                    className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565]"
                  />
                </div>
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">นามสกุล</label>
                  <input
                    type="text"
                    defaultValue="Meow"
                    className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  defaultValue="090-000-0000"
                  className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ที่อยู่</label>
                  <textarea
                    defaultValue="บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)"
                    rows={6}
                    className="w-full border border-[#656565] rounded p-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">จังหวัด</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>กรุงเทพมหานคร</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">เขต/อำเภอ</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>จตุจักร</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ถนน</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>วิภาวดีรังสิต</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">รหัสไปรษณีย์</label>
                    <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                      <option>10900</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="w-[100px] h-9 border border-[#FF4D00] rounded text-[#FF4D00] text-[15px] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="w-[100px] h-9 bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] -tracking-[0.333px] hover:opacity-90"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
