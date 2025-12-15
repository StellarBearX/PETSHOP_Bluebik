"use client"

import { useState } from 'react'

export default function CategoryDetailPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  const products = Array(50).fill(null).map((_, i) => ({
    id: i + 1,
    name: i % 5 === 0 ? "Pet Paradise อาหารเปียก อาหารแมว กระสอบ 2kg" : 
         i % 5 === 1 ? "Regalos รีกาลอส อาหารแมว กระสอบ 5kg" :
         i % 5 === 2 ? "Kaniva คานิว่า อาหารแมว กระสอบ 8kg" :
         i % 5 === 3 ? "FURLOVE คานิว่า เหมาะสำหรับแมวทุกวัย ถุงละ 1kg" :
         "PURINA ONE เพียวริน่าวัน อาหารแมว",
    price: 1400 + (i * 50),
    image: i % 5 === 0 ? "https://api.builder.io/api/v1/image/assets/TEMP/7ffc7c948ff8e15233c19748f8bd3ef5ed63b14d" :
           i % 5 === 1 ? "https://api.builder.io/api/v1/image/assets/TEMP/0deb6464ba5ea0356f7edd023e441c04da01c575" :
           i % 5 === 2 ? "https://api.builder.io/api/v1/image/assets/TEMP/2c07e0be7e9f34de7d3a66ec6b07c399979a3f83" :
           i % 5 === 3 ? "https://api.builder.io/api/v1/image/assets/TEMP/2f57526bb1463607ea5e05a2f0b2148164758157" :
           "https://api.builder.io/api/v1/image/assets/TEMP/aae45ac0563278956fb9e425a0a469351743b70a",
    sold: "7",
    location: "กรุงเทพมหานคร",
    isBestSeller: i % 3 === 0
  }))

  return (
      
      <main className="bg-[#F5F5F5] min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-4 pt-4">
          <div className="text-[#F99D20] text-[15px] font-bold font-['Inter'] -tracking-[0.333px]">
            Home &gt; อาหารสัตว์
          </div>
        </div>

        {/* Banner */}
        <div className="max-w-[1440px] mx-auto px-4 mt-2 mb-4">
          <div className="relative w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0bd2893a763071d0018d40ec3fd0ec2534c33120"
              alt="Banner"
              className="w-[709px] h-[320px] mx-auto object-cover"
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFEEE0]"></div>
              <div className="w-5 h-2 rounded-full bg-[#FF4D00]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FFEEE0]"></div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-8 pb-16">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <aside className="w-[186px] flex-shrink-0">
              {/* Recommended for you */}
              <div className="mb-4">
                <h3 className="text-[15px] font-['Inter'] text-center -tracking-[0.333px] mb-4">
                  Recommended for you
                </h3>
              </div>

              {/* All Categories */}
              <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded mb-0.5">
                <div className="px-2 py-2">
                  <div className="text-[15px] font-['Inter'] -tracking-[0.333px] mb-2">
                    หมวดหมู่ทั้งหมด
                  </div>
                </div>
              </div>

              {/* Food Category */}
              <div className="bg-white shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] px-3 py-1 mb-1">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-['Inter'] -tracking-[0.333px] text-white">
                    อาหารสัตว์
                  </span>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/4e4fbbbebc67c8ff6c1da4e0abdfec44e01fd966"
                    alt=""
                    className="w-[11px] h-2"
                  />
                </div>
              </div>

              <div className="mb-3 text-[12px] font-['Inter'] space-y-1.5 pl-1">
                <div>อาหารชนิดเนื้อสัตว์</div>
                <div>อาหารชนิดปลา</div>
                <div>อาหารชนิดผัก</div>
                <div>อาหารชนิดเม็ด</div>
                <div>เสื้อผ้าและอุปกรณ์แต่งตัว</div>
                <div>อุปกรณ์สำหรับสัตว์เลี้ยง</div>
                <div>อุปกรณ์ทำความสะอาดและการอาบน้ำ</div>
                <div className="flex items-center gap-1 text-[#FD560B] pt-1">
                  <span>ดูเพิ่มเติม</span>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/17ffef7275697e6b8cdcfe5ff2ef9c738fef43ad"
                    alt=""
                    className="w-2 h-2"
                  />
                </div>
              </div>

              <div className="h-px bg-[#C4C4C4]/60 mb-3"></div>

              {/* Brand */}
              <div className="bg-gradient-to-r from-[#FD560B] to-[#F99D20] shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] px-3 py-1 mb-2">
                <span className="text-[14px] font-['Inter'] text-white">ยี่ห้อ</span>
              </div>

              <div className="mb-3 text-[12px] font-['Inter'] space-y-1 pl-1">
                <div>Regalos (รีกาลอส)</div>
                <div>FURLOVE (คานิว่า)</div>
                <div>Buzz Netura บัซซ์</div>
                <div>Oliver (โอลิเวอร์)</div>
                <div>Kin-D กินดี</div>
                <div>All well (ออลเวลล์)</div>
                <div>PURINA ONE (เพียวริน่า วัน)</div>
                <div>Kaniva (คานิว่า)</div>
                <div className="flex items-center gap-1 text-[#FD560B] pt-1">
                  <span>ดูเพิ่มเติม</span>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/17ffef7275697e6b8cdcfe5ff2ef9c738fef43ad"
                    alt=""
                    className="w-2 h-2"
                  />
                </div>
              </div>

              <div className="h-px bg-[#C4C4C4]/60 mb-3"></div>

              {/* Services & Promotions */}
              <div className="bg-white shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] mb-2">
                <div className="px-2 py-1">
                  <span className="text-[14px] font-['Inter'] text-[#FFFCF9]">
                    บริการสินค้าและโปรโมชั่น
                  </span>
                </div>
              </div>

              <div className="mb-3 text-[12px] font-['Inter'] space-y-1 pl-1">
                <div>ส่วนลด สมาชิกใหม่</div>
                <div>ส่วนลด ส่งฟรี</div>
                <div>ลดแรง ซื้อครั้งแรก</div>
                <div>ราคาดีที่สุด</div>
                <div>จ่ายผ่านบัตร สะสมแต้ม</div>
                <div>ส่วนลด 10%/15%/20%</div>
                <div>Flash Sale</div>
              </div>

              <div className="h-px bg-[#C4C4C4]/60 mb-3"></div>

              {/* Cat Age */}
              <div className="bg-white shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] mb-2">
                <div className="px-2 py-1">
                  <span className="text-[12px] font-['Inter'] text-[#FFFCF9]">
                    วัยของแมว
                  </span>
                </div>
              </div>

              <div className="mb-3 text-[12px] font-['Inter'] space-y-1 pl-1">
                <div>ลูกแมว (แรกเกิด - 1 ปี)</div>
                <div>แมวผู้ใหญวัยรุ่น(1 ปี - 7 ปี)</div>
                <div>แมวผู้ใหญวัยผู้ใหญ่ ( 7 ปีขึ้นไป)</div>
                <div>แมวอาวุโส (11 ปีขึ้นไป)</div>
              </div>

              <div className="h-px bg-[#C4C4C4]/60 mb-3"></div>

              {/* Food Properties */}
              <div className="bg-white shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] mb-2">
                <div className="px-2 py-1">
                  <span className="text-[12px] font-['Inter'] text-[#FFFCF9]">
                    คุณสมบัติอาหาร
                  </span>
                </div>
              </div>

              <div className="mb-3 text-[12px] font-['Inter'] space-y-1 pl-1">
                <div>ปราศจากธัญพืช</div>
                <div>ธรรมชาติ-โปรตีน</div>
                <div>แบบผสม</div>
              </div>

              <div className="h-px bg-[#C4C4C4]/60 mb-3"></div>

              {/* Search by Category */}
              <div className="bg-white shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] mb-2">
                <div className="px-2 py-1">
                  <span className="text-[12px] font-['Inter'] text-[#FFFCF9]">
                    ค้นหาตามหมวดหมู่
                  </span>
                </div>
              </div>

              <div className="mb-3 text-[12px] font-['Inter'] space-y-1 pl-1">
                <div>อาหารสัตว์ ( 999 พัน+)</div>
                <div>เสื้อผ้าและอุปกรณ์สำหรับสัตว์เลี้ยง (233 พัน+)</div>
                <div>อุปกรณ์ทำความสะอาดและตกแต่งขน (190 พัน+)</div>
                <div>ชามและเครื่องให้อาหาร (87 พัน+)</div>
                <div>ของเล่น (ุ65 พัน+)</div>
                <div>ปอกคอ สายจูง และสายรัด (ุ35 พัน+)</div>
                <div className="flex items-center gap-1 text-[#FD560B] pt-1">
                  <span>ดูเพิ่มเติม</span>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/17ffef7275697e6b8cdcfe5ff2ef9c738fef43ad"
                    alt=""
                    className="w-2 h-2"
                  />
                </div>
              </div>

              <div className="h-px bg-[#C4C4C4]/60 mb-3"></div>

              {/* Rating */}
              <div className="mb-2">
                <span className="text-[12px] font-['Inter']">คะแนน</span>
              </div>

              <div className="space-y-2 mb-3">
                {[
                  { stars: 5, label: 'ดีเยี่ยม', color: '#FF4D00' },
                  { stars: 4, label: 'ดี', color: '#FF4D00' },
                  { stars: 3, label: 'ปานกลาง', color: '#FF4D00' },
                  { stars: 2, label: 'พอใช้', color: '#FD560B' },
                  { stars: 1, label: 'ปรับปรุง', color: '#F35C05' }
                ].map((rating, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array(rating.stars).fill(0).map((_, j) => (
                        <svg key={j} className="w-4 h-3.5" viewBox="0 0 16 13" fill={rating.color}>
                          <path d="M7.6084 0L9.40451 4.83688H15.2169L10.5146 7.82624L12.3107 12.6631L7.6084 9.67376L2.90612 12.6631L4.70223 7.82624L-5.38826e-05 4.83688H5.81229L7.6084 0Z"/>
                        </svg>
                      ))}
                      {Array(5 - rating.stars).fill(0).map((_, j) => (
                        <svg key={j + rating.stars} className="w-4 h-3.5" viewBox="0 0 16 13" fill={i === 3 ? "#C4C4C4" : "#D9D9D9"}>
                          <path d="M7.6084 0L9.40451 4.83688H15.2169L10.5146 7.82624L12.3107 12.6631L7.6084 9.67376L2.90612 12.6631L4.70223 7.82624L-5.38826e-05 4.83688H5.81229L7.6084 0Z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] font-['Inter']">{rating.label}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#C4C4C4]/60"></div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-['Inter'] text-center -tracking-[0.333px]">สินค้า</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-['Inter'] text-center -tracking-[0.333px]">
                    <span>จำนวนรายการสินค้าทั้งหมด</span>
                    <span>15000</span>
                    <span>รายการ</span>
                  </div>
                  <button className="text-[10px] font-['Inter'] text-center -tracking-[0.333px]">
                    ดูทั้งหมด
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <select className="h-[25px] border-[0.5px] border-[#979797] rounded text-[12px] px-2 text-[#979797] font-['Prompt']">
                    <option>หมวดหมู่: แมวโต</option>
                  </select>
                  <select className="h-[25px] border-[0.5px] border-[#979797] rounded text-[12px] px-2 text-[#979797] font-['Prompt']">
                    <option>กรุงเทพมหานคร</option>
                  </select>
                  <select className="h-[25px] border-[0.5px] border-[#979797] rounded text-[12px] px-2 text-[#979797] font-['Prompt']">
                    <option>ราคา : สูงไปต่ำ</option>
                  </select>
                  <select className="h-[25px] border-[0.5px] border-[#979797] rounded text-[12px] px-2 text-[#979797] font-['Prompt']">
                    <option>100 - 2,000</option>
                  </select>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-[23px] h-[19px] border border-[#D9D9D9]/70 bg-[#D9D9D9]/70 shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.30)]"></div>
                  <div className="w-[23px] h-[19px] border border-[#D9D9D9]/31 shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.30)]"></div>
                  <svg className="w-5 h-6 ml-2" viewBox="0 0 20 24" fill="#FA7D27">
                    <path d="M6.86934 19.3635L8.83201 20.6666V12.0794C8.83092 11.7375 8.72871 11.4099 8.54742 11.1672L2.18837 2.60612H17.4579L11.1087 11.1672C10.9274 11.4099 10.8252 11.7375 10.8241 12.0794L10.7947 22.1521L12.7573 23.4551V12.6136L19.2145 3.90919C19.4728 3.56122 19.6204 3.09464 19.6267 2.60612V1.30306C19.6267 0.957468 19.5233 0.62603 19.3393 0.381658C19.1552 0.137287 18.9056 0 18.6453 0H0.981334C0.721068 0 0.471462 0.137287 0.287426 0.381658C0.10339 0.62603 0 0.957468 0 1.30306V2.60612C0.00627809 3.09464 0.153859 3.56122 0.41216 3.90919L6.86934 12.6136V19.3635Z"/>
                  </svg>
                </div>
              </div>

              {/* Total Count */}
              <div className="flex items-center justify-end gap-2 mb-4">
                <span className="text-[10px] font-['Inter'] text-center -tracking-[0.333px]">จำนวนสินค้าทั้งหมด</span>
                <span className="text-[10px] font-['Inter'] text-center -tracking-[0.333px]">1000</span>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-5 gap-x-3 gap-y-4 mb-8">
                {products.slice((currentPage - 1) * 10, currentPage * 10).map((product) => (
                  <div key={product.id} className="relative bg-white rounded-sm shadow-[0_1px_3px_0_rgba(0,0,0,0.25)]">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[120px] h-[130px] object-cover rounded-t-sm"
                      />
                      {product.isBestSeller && (
                        <div className="absolute top-3 left-0 bg-[#FF4D00] text-white text-[8px] font-bold font-['Inter'] -tracking-[0.333px] px-2.5 py-0.5">
                          สินค้าขายดี
                        </div>
                      )}
                      <button className="absolute top-[105px] right-2">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/TEMP/b5b05d0b81645500870018f47552cccbfd5fcbe1"
                          alt="Favorite"
                          className="w-3 h-3"
                        />
                      </button>
                    </div>

                    <div className="p-2">
                      <p className="text-[8px] font-['Inter'] -tracking-[0.333px] h-[26px] line-clamp-2 mb-1">
                        {product.name}
                      </p>
                      
                      <div className="mb-1">
                        <div className="bg-[#FF4D00] inline-block px-1 rounded">
                          <span className="text-white text-[8px] font-bold font-['Inter'] -tracking-[0.333px]">
                            โค้ดส่วนลด
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#FF4D00] text-[8px] font-bold font-['Inter'] -tracking-[0.333px]">
                          ฿{product.price}
                        </span>
                        <img
                          src="https://api.builder.io/api/v1/image/assets/TEMP/412b6c1c5473e480deaa8942dbfbbb11f4ebdfee"
                          alt="Rating"
                          className="w-5 h-5"
                        />
                      </div>

                      <div className="text-[4px] font-['Inter'] -tracking-[0.333px] space-y-0.5">
                        <div>ยอดขาย {product.sold} ชิ้น</div>
                        <div>{product.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="w-[30px] h-[30px] rounded-full bg-[#979797] flex items-center justify-center">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/afaa7d3fcc3e8a3cda6e577d5f1ca50ebe9277f8"
                    alt=""
                    className="w-3 h-2"
                  />
                </button>
                
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-[30px] h-[30px] rounded-full bg-[#979797] flex items-center justify-center text-white text-[10px] font-['Inter'] -tracking-[0.333px]"
                  >
                    {page}
                  </button>
                ))}

                <span className="text-[#656565] text-[24px] font-['Inter'] -tracking-[0.333px]">...</span>

                <button
                  onClick={() => setCurrentPage(12)}
                  className="w-[30px] h-[30px] rounded-full bg-[#979797] flex items-center justify-center text-white text-[10px] font-['Inter'] text-center -tracking-[0.333px]"
                >
                  12
                </button>

                <button className="w-[30px] h-[30px] rounded-full bg-[#979797] flex items-center justify-center">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/abaad69eaf40adfe8ecd1ce45ecbefd5ef39ea3c"
                    alt=""
                    className="w-3 h-2"
                  />
                </button>
              </div>

              <div className="text-center text-[12px] font-['Prompt'] mt-2">
                <span className="text-[#FB7E14]">{currentPage}</span>
                <span className="text-black">/12</span>
              </div>
            </div>
          </div>
        </div>
      </main>

  )
}
