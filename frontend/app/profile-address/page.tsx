"use client"
import { useState } from 'react'
import Link from 'next/link'

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
    <main className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-[1253px] mx-auto px-4">
        {/* Header */}
        <div className="bg-white h-[45px] flex items-center px-4 rounded-lg mb-6">
          <h1 className="text-black text-[20px] font-bold font-['Inter'] -tracking-[0.333px]">My Profile</h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-[203px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded-lg p-4">
            <div className="flex items-center gap-3 pb-4 border-b mb-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/009824bbfb5cd6b43e232e01931d42e92eb3bfbd"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-[15px] font-['Inter'] -tracking-[0.333px]">Meow Meow</p>
                <div className="flex items-center gap-1">
                  <p className="text-[10px] text-[#656565] font-['Inter'] -tracking-[0.333px]">แก้ไขข้อมูลส่วนตัว</p>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/ae5a90e8d55e5378329581ced7d9028a3bf964df"
                    alt=""
                    className="w-[14px] h-[14px]"
                  />
                </div>
              </div>
            </div>

            <nav className="space-y-3">
              <Link href="/profile" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-[15px] font-['Inter'] -tracking-[0.333px]">บัญชี</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                  alt=""
                  className="w-4 h-2 transform -rotate-90"
                />
              </Link>
              <Link href="/profile-orders" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm font-['Inter'] -tracking-[0.333px]">การสั่งซื้อล่าสุด</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                  alt=""
                  className="w-4 h-2 transform -rotate-90"
                />
              </Link>
              <div className="flex items-center justify-between p-2 text-[#FF4D00] bg-gray-50 rounded">
                <span className="text-sm font-['Inter'] -tracking-[0.333px]">ที่อยู่ที่บันทึกไว้</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                  alt=""
                  className="w-4 h-2 transform -rotate-90"
                />
              </div>
              <Link href="/profile-cards" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm font-['Inter'] -tracking-[0.333px]">บัตรเครดิต / บัตรเดบิต</span>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                  alt=""
                  className="w-4 h-2 transform -rotate-90"
                />
              </Link>
              <Link href="/coupons" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm font-['Inter'] -tracking-[0.333px]">โค้ดส่วนลดของฉัน</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                  alt=""
                  className="w-4 h-2 transform -rotate-90"
                />
              </Link>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                <span className="text-sm font-['Inter'] -tracking-[0.333px]">ออกจากระบบ</span>
              </button>
            </nav>
          </div>

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
                {/* First Name */}
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ชื่อ</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ชื่อ"
                      className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#979797]"
                    />
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                      alt="Clear"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">นามสกุล</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="นามสกุล"
                      className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#979797]"
                    />
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                      alt="Clear"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">หมายเลขโทรศัพท์</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="หมายเลขโทรศัพท์"
                    className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#979797]"
                  />
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                    alt="Clear"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Address */}
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ที่อยู่</label>
                  <div className="relative">
                    <textarea
                      placeholder=""
                      rows={6}
                      className="w-full border border-[#656565] rounded p-4 text-[15px] font-['Inter'] -tracking-[0.333px] resize-none"
                    />
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                      alt="Clear"
                      className="absolute right-3 top-3 w-3.5 h-3.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Location Details */}
                <div className="space-y-4">
                  {/* Province */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">จังหวัด</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>เลือกจังหวัด</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* District */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">เขต/อำเภอ</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>เลือกเขต</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Road */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ถนน</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>เลือกถนน</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">รหัสไปรษณีย์</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>เลือกรหัสไปรษณีย์</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
                {/* First Name */}
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ชื่อ</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="Meow"
                      className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565]"
                    />
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                      alt="Clear"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">นามสกุล</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="Meow"
                      className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565]"
                    />
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                      alt="Clear"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">หมายเลขโทรศัพท์</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="090-000-0000"
                    className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565]"
                  />
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                    alt="Clear"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Address */}
                <div>
                  <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ที่อยู่</label>
                  <div className="relative">
                    <textarea
                      defaultValue="บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106"
                      rows={6}
                      className="w-full border border-[#656565] rounded p-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] resize-none"
                    />
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/bb312e75bea157fac849e806ccf55c9b37d0d20a"
                      alt="Clear"
                      className="absolute right-3 top-3 w-3.5 h-3.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Location Details */}
                <div className="space-y-4">
                  {/* Province */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">จังหวัด</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>กรุงเทพมหานคร / Bangkok</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* District */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">เขต/อำเภอ</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>จตุจักร / Chatuchak</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Road */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ถนน</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>วิภาวดีรังสิต / Vibhavadi Rangsit Road</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">รหัสไปรษณีย์</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#656565] rounded px-4 text-[15px] font-['Inter'] -tracking-[0.333px] text-[#656565] appearance-none">
                        <option>10900</option>
                      </select>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                        alt=""
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
