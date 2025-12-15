"use client"
import { useState } from 'react'
import Link from 'next/link'
import SuccessModal from '@/Components/SuccessModal'

export default function CheckoutPage() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'qr'>('card')

  const orderItems = [
    {
      shop: "90s.shop",
      shopType: "recommended",
      name: "Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก",
      variant: "Urinary 8kg, แถมไม้แหย่แมว",
      price: 1190,
      quantity: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/66a9416979682534bcc31cf585b69c3ea91e4e97"
    },
    {
      shop: "Bite of Wild Official Shop",
      shopType: "mall",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด เหมาะสำหรับทุกช่วงวัย",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a9b9acd324c7adcbbdd98ac6bd64f51d5fbce990"
    }
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 10
  const discount = 0
  const total = subtotal + shipping - discount

  const handleBuyNow = () => {
    if (agreed) {
      setShowConfirmModal(true)
    }
  }

  const handleConfirm = () => {
    setShowConfirmModal(false)
    setShowSuccessModal(true)
  }

  return (
    <>
      <main className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-[1340px] mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg p-4 mb-6 flex items-center gap-4">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/470f79eeeab9db1552d26be46901547ffc5caa1b" 
              alt="Payment"
              className="w-[50px] h-[50px]"
            />
            <h1 className="text-white text-[32px] font-bold font-['Inter']">ชำระเงิน</h1>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/b8ef727977f108caf154f7275db1c51b9e619bfe"
                alt="Home"
                className="w-[38px] h-10"
              />
              <h2 className="text-[32px] font-bold font-['Inter']">ที่อยู่</h2>
            </div>
            <p className="text-[#656565] text-[16px] font-['Inter'] leading-relaxed max-w-[1214px]">
              บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 
              เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต 
              แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900
              <br/><br/>
              Bluebik Vulcan Company Limited (Head Office)<br/>
              Tax ID : 0105565196514 No.199 S-OASIS Building, 11th Floor, Unit no. 1103-1106, Vibhavadi Rangsit Road, Chomphon, Chatuchak, Bangkok 10900
            </p>
          </div>

          {/* Order Items */}
          <div className="space-y-6 mb-6">
            {orderItems.map((item, index) => (
              <div key={index}>
                {/* Section Header */}
                <h3 className="text-[18px] font-['Inter'] mb-4">รายการสินค้าที่สั่งซื้อ</h3>

                {/* Shop Badge */}
                <div className="flex items-center gap-2 mb-4">
                  {item.shopType === "recommended" ? (
                    <div className="bg-[#FF4D00] rounded px-1 py-0.5">
                      <span className="text-white text-[10px] font-['Mitr']">ร้านแนะนำ</span>
                    </div>
                  ) : (
                    <div className="bg-[#FF4D00] rounded px-1 py-0.5">
                      <span className="text-white text-[10px] font-['Mitr']">Mall</span>
                    </div>
                  )}
                  <span className="text-[14px] font-['Mitr']">{item.shop}</span>
                </div>

                {/* Table Headers */}
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-5"></div>
                  <div className="col-span-2 text-[14px] font-['Mitr']">ราคาต่อหน่วย</div>
                  <div className="col-span-2 text-[14px] font-['Mitr']">จำนวน</div>
                  <div className="col-span-2 text-[14px] font-['Mitr']">ราคารวม</div>
                </div>

                {/* Product Row */}
                <div className="grid grid-cols-12 gap-4 items-center mb-6">
                  {/* Product Image & Info */}
                  <div className="col-span-5 flex gap-4">
                    <div className="w-[120px] h-[120px] border border-[#D9D9D9] rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[14px] font-['Mitr'] text-[#333] line-clamp-2 leading-5">{item.name}</h4>
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 w-fit">
                        <span className="text-[14px] font-['Mitr']">{item.variant}</span>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/12fc36706518dfae295152ffa0b0fdb14dd2b5a2"
                          alt="dropdown"
                          className="w-5 h-[18px]"
                        />
                      </div>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/1a84f6dfdd398c7628939c37745abc70204d83ef"
                        alt="badges"
                        className="w-[62px] h-[19px]"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-[14px] font-['Mitr']">
                    ฿{item.price.toLocaleString()}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 text-[14px] font-['Mitr']">
                    {item.quantity}
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-[14px] font-['Mitr']">
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="flex items-center gap-2 mb-6">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/cc66f65bd5c29a6b8242142387c4db02eb904746"
                    alt="coupon"
                    className="w-[41px] h-[32px]"
                  />
                  <span className="text-[14px] font-['Mitr']">
                    {index === 0 ? "ดูโค้ดร้านค้าทั้งหมด" : "ใช้โค้ดลด ฿0 แล้ว"}
                  </span>
                  <button className="text-[#0038FF] text-[14px] font-['Mitr'] underline ml-auto">
                    เปลี่ยน
                  </button>
                </div>

                {/* Divider */}
                {index < orderItems.length - 1 && (
                  <div className="border-b border-gray-300 mb-6"></div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-[20px] font-['Mitr'] text-[#FF4D00] mb-6">เลือกประเภทการชำระเงิน</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`w-[156px] h-[60px] rounded-xl border ${
                  paymentMethod === 'cod' 
                    ? 'border-[#FF4D00] bg-white' 
                    : 'border-black bg-white'
                }`}
              >
                <span className="text-[14px] font-['Mitr']">เก็บเงินปลายทาง</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-[156px] h-[60px] rounded-xl ${
                  paymentMethod === 'card'
                    ? 'bg-gradient-to-r from-[#FF4D00] to-[#F99D20] border-0'
                    : 'border border-black bg-white'
                }`}
              >
                <span className={`text-[14px] font-['Mitr'] ${
                  paymentMethod === 'card' ? 'text-white' : 'text-black'
                }`}>
                  บัตรเครดิต/บัตรเดบิต
                </span>
              </button>
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`w-[156px] h-[60px] rounded-xl border ${
                  paymentMethod === 'qr'
                    ? 'border-[#FF4D00] bg-white'
                    : 'border-black bg-white'
                }`}
              >
                <span className="text-[14px] font-['Mitr']">QR พร้อมเพย์</span>
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cd56be3f878321fa1cf48fd2996b12b69b9485f2"
                alt="Payment"
                className="w-8 h-7"
              />
              <h3 className="text-[20px] font-['Mitr'] text-[#FF4D00]">ข้อมูลการชำระเงิน</h3>
            </div>

            <h4 className="text-[20px] font-['Mitr'] mb-4">เลือกบัญชีการชำระเงิน</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-b from-[#FF4D00] to-[#EDA46E] rounded-sm flex items-center justify-center">
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                    <path d="M25.3333 2.4V17.6C25.3333 18.2667 25.1 18.8333 24.6333 19.3C24.1667 19.7667 23.6 20 22.9333 20H2.4C1.73333 20 1.16667 19.7667 0.7 19.3C0.233333 18.8333 0 18.2667 0 17.6V2.4C0 1.73333 0.233333 1.16667 0.7 0.7C1.16667 0.233333 1.73333 0 2.4 0H22.9333C23.6 0 24.1667 0.233333 24.6333 0.7C25.1 1.16667 25.3333 1.73333 25.3333 2.4Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-[16px] font-['Mitr']">บัตรเครดิต VISA</span>
                <span className="text-[14px] font-['Mitr'] font-light ml-3">XXXX-XXXX-XXXX-4747</span>
              </div>
              <button className="ml-auto">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d83ca65e259bb78dd9793cd40aeae177c9bf6c4c"
                  alt="edit"
                  className="w-[30px] h-[30px]"
                />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col items-end gap-4">
            <div className="w-[300px] space-y-3">
              <div className="flex justify-between text-[20px] font-['Mitr']">
                <span>จำนวนสินค้า</span>
                <span>2 รายการ</span>
              </div>
              <div className="flex justify-between text-[20px] font-['Mitr']">
                <span>รวมการสั่งซื้อ</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[20px] font-['Mitr']">
                <span>การจัดส่ง</span>
                <span>฿{shipping}</span>
              </div>
              <div className="flex justify-between text-[20px] font-['Mitr']">
                <span>ส่วนลด</span>
                <span>฿{discount}</span>
              </div>
              <div className="flex justify-between text-[32px] font-['Mitr'] pt-4 border-t border-gray-300">
                <span>ยอดชำระเงินทั้งหมด</span>
                <span className="text-[#FF4D00]">฿{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3 max-w-[543px]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-[26px] h-[26px] mt-0.5 cursor-pointer accent-[#FF4D00]"
              />
              <span className="text-[18px] font-light font-['Inter']">
                ฉันได้อ่านและยินยอมข้อตกลงนโยบายการคืนเงินและสินค้า{' '}
                <a href="#" className="text-[#0038FF] underline">นโยบายสินค้า</a>
              </span>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuyNow}
              disabled={!agreed}
              className="w-[192px] h-[45px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-[400px]">
            <div className="flex flex-col items-center">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/6eab73d84e06b64781e693f78a66f72436d12186"
                alt="Warning"
                className="w-[120px] h-[120px] mb-6"
              />
              <p className="text-2xl font-['Mitr'] text-center mb-8">
                คุณแน่ใจที่จะทำรายการสั่งซื้อใช่หรือไม่
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-[120px] h-[38px] border-2 border-[#F7921E] rounded-full text-[#FA7D27] text-base font-['Mitr'] hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleConfirm}
                  className="w-[120px] h-[38px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-full text-white text-base font-['Mitr'] hover:opacity-90"
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="ทำรายการสั่งซื้อสำเร็จ"
        redirectUrl="/profile-orders"
      />

    </>
  )
}
