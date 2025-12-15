"use client"
import { useState } from 'react'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'Meow',
    lastName: 'Meow',
    email: 'meow.me@gmail.com',
    phone: '090-000-0000',
    gender: 'female',
    day: '9',
    month: 'สิงหาคม',
    year: '2567'
  })

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-8">
        <div className="max-w-[1440px] mx-auto px-4">
          {/* Header */}
          <div className="bg-white h-[45px] flex items-center px-3 mb-6 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
            <h1 className="text-black text-center text-[20px] font-bold font-['Inter'] -tracking-[0.333px]">
              My Profile
            </h1>
          </div>

          <div className="flex gap-6">
            {/* Left Sidebar */}
            <div className="w-[203px] flex-shrink-0">
              {/* Profile Summary */}
              <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded p-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/009824bbfb5cd6b43e232e01931d42e92eb3bfbd"
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    <p className="text-[15px] font-['Inter'] text-center -tracking-[0.333px]">Meow Meow</p>
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] text-[#656565] font-['Inter'] text-center -tracking-[0.333px]">
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

                {/* Menu */}
                <nav className="space-y-3">
                  <div className="flex items-center justify-between text-[#FF4D00]">
                    <span className="text-[15px] font-['Inter'] -tracking-[0.333px]">บัญชี</span>
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                      alt=""
                      className="w-[15px] h-[7px] transform -rotate-90"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-['Inter'] -tracking-[0.333px]">การสั่งซื้อล่าสุด</span>
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                      alt=""
                      className="w-[15px] h-[7px] transform -rotate-90"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-['Inter'] -tracking-[0.333px]">ที่อยู่ที่บันทึกไว้</span>
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                      alt=""
                      className="w-[15px] h-[7px] transform -rotate-90"
                    />
                  </div>
                  <a href="/profile-cards" className="flex items-center justify-between">
                    <span className="text-[14px] font-['Inter'] -tracking-[0.333px]">บัตรเครดิต / บัตรเดบิต</span>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                      alt=""
                      className="w-[15px] h-[7px] transform -rotate-90"
                    />
                  </a>
                  <a href="/coupons" className="flex items-center justify-between">
                    <span className="text-[14px] font-['Inter'] -tracking-[0.333px]">โค้ดส่วนลดของฉัน</span>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7edaf58636be0f810a89af2b6376c5458e66d49b"
                      alt=""
                      className="w-[15px] h-[7px] transform -rotate-90"
                    />
                  </a>
                  <button className="w-full text-left">
                    <span className="text-[14px] font-['Inter'] -tracking-[0.333px]">ออกจากระบบ</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded p-8">
              <div className="mb-6">
                <h2 className="text-[15px] font-['Inter'] -tracking-[0.333px] mb-1">ข้อมูลของฉัน</h2>
                <p className="text-[10px] text-[#656565] font-['Inter'] -tracking-[0.333px]">
                  จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                </p>
              </div>

              <div className="flex gap-12">
                <div className="flex-1">
                  {/* Username Section */}
                  <div className="mb-6">
                    <h3 className="text-[15px] font-['Inter'] -tracking-[0.333px] mb-4">ชื่อผู้ใช้</h3>
                    
                    {/* First Name */}
                    <div className="mb-5">
                      <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">ชื่อ</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-[250px] h-[36px] border border-[#656565] rounded px-4 text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px]"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="mb-5">
                      <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">นามสกุล</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-[250px] h-[36px] border border-[#656565] rounded px-4 text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                      <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">อีเมล</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-[364px] h-[36px] border border-[#656565] rounded px-4 text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px] underline"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-5">
                      <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-2">หมายเลขโทรศัพท์</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-[364px] h-[36px] border border-[#656565] rounded px-4 text-[15px] text-[#656565] font-['Inter'] -tracking-[0.333px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="mb-6">
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-3">เพศ</label>
                    <div className="flex gap-12">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-5 h-5">
                          <div className="w-5 h-5 rounded-full border border-[#FF4D00]"></div>
                          {formData.gender === 'female' && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FF4D00]"></div>
                          )}
                        </div>
                        <span className="text-[15px] font-['Inter'] -tracking-[0.333px]">หญิง</span>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="sr-only"
                        />
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-5 h-5">
                          <div className="w-5 h-5 rounded-full border border-[#656565]"></div>
                          {formData.gender === 'male' && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#656565]"></div>
                          )}
                        </div>
                        <span className="text-[15px] font-['Inter'] -tracking-[0.333px]">ชาย</span>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="sr-only"
                        />
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-5 h-5">
                          <div className="w-5 h-5 rounded-full border border-[#656565]"></div>
                          {formData.gender === 'other' && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#656565]"></div>
                          )}
                        </div>
                        <span className="text-[15px] font-['Inter'] -tracking-[0.333px]">อื่นๆ</span>
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={formData.gender === 'other'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div className="mb-8">
                    <label className="text-[15px] font-['Inter'] -tracking-[0.333px] block mb-3">วัน/เดือน/ปี เกิด</label>
                    <div className="flex gap-3">
                      <div className="relative">
                        <select
                          value={formData.day}
                          onChange={(e) => setFormData({...formData, day: e.target.value})}
                          className="w-[108px] h-[36px] border border-[#656565] rounded px-3 text-[15px] font-['Inter'] -tracking-[0.333px] appearance-none"
                        >
                          <option value="9">9</option>
                        </select>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                          alt=""
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                      </div>
                      <div className="relative">
                        <select
                          value={formData.month}
                          onChange={(e) => setFormData({...formData, month: e.target.value})}
                          className="w-[108px] h-[36px] border border-[#656565] rounded px-3 text-[15px] font-['Inter'] -tracking-[0.333px] appearance-none"
                        >
                          <option value="สิงหาคม">สิงหาคม</option>
                        </select>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                          alt=""
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                      </div>
                      <div className="relative">
                        <select
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className="w-[108px] h-[36px] border border-[#656565] rounded px-3 text-[15px] font-['Inter'] -tracking-[0.333px] appearance-none"
                        >
                          <option value="2567">2567</option>
                        </select>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/bb809fb3c9fe712e8079abddeae346b474b9a2ed"
                          alt=""
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button className="w-[100px] h-[36px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] -tracking-[0.333px] hover:opacity-90">
                      บันทึก
                    </button>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="flex flex-col items-center pt-16">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/4af760aa421324ef2f06ed9aaab02411ae07cf1e"
                    alt="Profile Picture"
                    className="w-[91px] h-[91px] rounded-full mb-4"
                  />
                  <button className="w-[100px] h-[30px] border border-[#F99D20] rounded text-[#F99D20] text-[15px] font-['Inter'] -tracking-[0.333px] hover:bg-gray-50">
                    เลือกรูป
                  </button>
                  <p className="text-[8px] text-[#656565] font-['Inter'] mt-2 text-center max-w-[100px]">
                    ขนาดไฟล์: สูงสุด 1 MB<br/>
                    ไฟล์ที่รองรับ: .JPEG, .PNG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
