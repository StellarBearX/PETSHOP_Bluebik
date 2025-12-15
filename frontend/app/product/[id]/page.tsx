"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="text-[15px] text-black">
          <Link href="/" className="hover:text-[#FF4D00]">Home</Link>
          <span className="mx-2">{">"}</span>
          <Link href="/category" className="hover:text-[#FF4D00]">อาหารสัตว์</Link>
          <span className="mx-2">{">"}</span>
          <span>Grain Free</span>
          <span className="mx-2">{">"}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 pb-12">
        {/* Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-[#FFEEE0] px-3 py-1 rounded-full">
            <svg width="76" height="33" viewBox="0 0 76 33" fill="none">
              <ellipse cx="6.33333" cy="16.5" rx="6.33333" ry="16.5" fill="#FFEEE0"/>
              <ellipse cx="69.6663" cy="16.5" rx="6.33333" ry="16.5" fill="#FFEEE0"/>
              <rect x="22.167" width="31.6667" height="33" rx="7.5" fill="#FF4D00"/>
            </svg>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left - Product Images */}
          <div className="flex-shrink-0">
            <div className="w-[343px] h-[505px] mb-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/b9b67e8f547ff37ff553567c75b02253c9501808"
                alt="Product"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/433bd524d93b0a1726baaad6015a06b9b2321c6e"
                alt="Product thumbnail"
                className="w-full h-[100px] object-cover rounded-lg cursor-pointer hover:opacity-80"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/97ab8bcd97d6ee826ea3c11f94bebf083ad5069b"
                alt="Product thumbnail"
                className="w-full h-[100px] object-cover rounded-lg cursor-pointer hover:opacity-80"
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex-1">
            {/* Bestseller Badge & Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#FF4D00] px-3 py-0.5">
                <span className="text-white text-[8px] font-bold">สินค้าขายดี</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold">4.9</span>
                {[1, 2, 3, 4].map((i) => (
                  <svg key={i} width="9" height="9" viewBox="0 0 17 17" fill="none">
                    <path d="M8.27979 3L9.2901 6.10942H12.5595L9.91451 8.03115L10.9248 11.1406L8.27979 9.21885L5.63475 11.1406L6.64506 8.03115L4.00003 6.10942H7.26947L8.27979 3Z" fill="#FF4D00"/>
                  </svg>
                ))}
                <svg width="9" height="9" viewBox="0 0 17 17" fill="none">
                  <path d="M8.27979 3L9.2901 6.10942H12.5595L9.91451 8.03115L10.9248 11.1406L8.27979 9.21885L5.63475 11.1406L6.64506 8.03115L4.00003 6.10942H7.26947L8.27979 3Z" fill="#979797"/>
                </svg>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-[#FD560B] text-[15px] mb-4">
              มาแรง ลดกระหน่ำ Kaniva Grain Free อาหารแมวคานิว่า สูตรเกรนฟรี บำรุงขนและผิวหนัง โซเดียมต่ำ 1.2-1.3 kg
            </h1>

            {/* Share Button */}
            <div className="flex justify-end mb-4">
              <button className="hover:opacity-80">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/6791519e8963e9f0159d073ba58a2e0e2de0deff"
                  alt="Share"
                  className="w-[27px] h-[26px]"
                />
              </button>
            </div>

            {/* Discount Banner */}
            <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] px-6 py-2 rounded mb-6">
              <p className="text-white text-[13px]">
                ลูกค้าใหม่ ! ใช้โค้ดส่วนลด  MEOWMEOW2024  ลดเพิ่ม 15%
              </p>
            </div>

            {/* Product Details */}
            <div className="mb-8">
              <h2 className="text-[18px] font-bold mb-4">รายละเอียดสินค้า</h2>
              <div className="text-[18px] leading-relaxed space-y-4">
                <p>
                  Kaniva Cat 370g - 400g คานิว่า อาหารแมว ขนาด 380 - 400 กรัม  มี 4 สูตร
                  <br />1.Salmon, Tuna&Rice แซลมอน ทูน่าและข้าว (380g)
                  <br />2.Chicken, Tuna&Rice ไก่ ทูน่าและข้าว (400g)
                  <br />3.Lamb, Tuna&Rice แกะ ทูน่าและข้าว (380g)
                  <br />4.Indoor, แมวเลี้ยงในบ้าน (370g)
                </p>

                <p>
                  วิสกัสWhiskas อาหารแมวเปียกเพาร์pouch 80g ถูกที่สุด คละรสได้ ถูกที่สุด ครบ11รสชาติ ส่งไว มีทุกแบบลูกแมว แมวโต แมวสูงวัย วิสกัส เพาร์ อาหารแมวชนิดเปียก ผลิตจากเนื้อปลาแท้ๆ คุณภาพดี ผ่านกระบวนการปรุงและผลิตอย่างพิถีพิถันแบบเฉพาะของวิสกัส เพื่อเก็บรักษาความอร่อย หอมสดใหม่ และความคุณค่าทางสารอาหารครบถ้วนสมดุลทั้ง 41 ชนิด ช่วยเสริมสร้างร่ายกายที่แข็งแรงสมวัยรวมถึงบำรุงผิวและขนให้สวยเงางามให้แก่แมวที่รักของคุณได้อย่างครบถ้วน
                </p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border-t border-b py-6 mb-6">
              <div className="flex items-start gap-4">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/433bd524d93b0a1726baaad6015a06b9b2321c6e"
                  alt="Pet Smart"
                  className="w-[100px] h-[100px] rounded"
                />
                <div className="flex-1">
                  <h3 className="text-[32px] font-semibold mb-2">Pet Smart</h3>
                  <p className="text-[16px] text-[#656565] mb-4">
                    เข้าสู่ระบบล่าสุดเมื่อ 27 นาที ที่ผ่านมา
                  </p>
                  
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p className="text-[20px] text-[#979797] mb-1">คะแนน</p>
                      <p className="text-[20px] text-[#FF4D00]">77.5 พัน</p>
                    </div>
                    <div>
                      <p className="text-[20px] text-[#979797] mb-1">รายการสินค้า</p>
                      <p className="text-[20px] text-[#FF4D00]">722</p>
                    </div>
                    <div>
                      <p className="text-[20px] text-[#979797] mb-1">เข้าร่วมเมื่อ</p>
                      <p className="text-[20px] text-[#FF4D00]">4 ปี ที่ผ่านมา</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[15px]">Quantity</span>
              <div className="flex items-center border border-[#FA7D27] rounded">
                <button 
                  onClick={decrementQuantity}
                  className="w-[20px] h-[24px] flex items-center justify-center text-[#FA7D27] border-r border-[#FA7D27] hover:bg-[#FFF5F0]"
                >
                  -
                </button>
                <div className="w-[30px] h-[24px] flex items-center justify-center text-white bg-[#FA7D27] text-[10px]">
                  {quantity}
                </div>
                <button 
                  onClick={incrementQuantity}
                  className="w-[20px] h-[24px] flex items-center justify-center text-[#FA7D27] border-l border-[#FA7D27] hover:bg-[#FFF5F0]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="w-[180px] h-[50px] border border-[#FF4D00] rounded flex items-center justify-center gap-2 hover:bg-[#FFF5F0] transition-colors">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2375d3395b3632e7899bc7141c420f3e06c4f2e7"
                  alt=""
                  className="w-[22px] h-[22px]"
                />
                <span className="text-[#FF4D00] text-[15px]">Add To Cart</span>
              </button>
              
              <button className="w-[180px] h-[50px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] hover:opacity-90 transition-opacity">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
