"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CheckoutItem {
    id: string
    shopName: string
    productName: string
    productTag: string
    image: string
    pricePerItem: number
    quantity: number
}

export default function CheckoutPage() {
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery')
    const [agreeToPolicy, setAgreeToPolicy] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    // Mock data - ในอนาคตควรดึงจาก cart หรือ state management
    const checkoutItems: CheckoutItem[] = [
        {
            id: '1',
            shopName: '90s.shop',
            productName: 'Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก',
            productTag: 'Urinary 8kg, แถมไม้แหย่แมว',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0e97df153de0241b08a7dd44d7e1f5d659a532f',
            pricePerItem: 1190,
            quantity: 1
        },
        {
            id: '2',
            shopName: '90s.shop',
            productName: 'Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ซ...',
            productTag: '5 กก. + 1 *ขนมรสปลา',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/65da054a41dae7109c8c20e828be100ba6d2d107',
            pricePerItem: 1789,
            quantity: 1
        }
    ]

    const address = {
        company: 'บริษัท บลูบิค วัลแคน จํากัด (สํานักงานใหญ่)',
        taxId: '0105565196514',
        address: 'เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900'
    }

    const subtotal = checkoutItems.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0)
    const shipping = 10
    const total = subtotal + shipping

    const handleBuyNow = () => {
        if (!agreeToPolicy) {
            alert('กรุณายอมรับข้อตกลงนโยบายการคืนเงินและสินค้าก่อนดำเนินการต่อ')
            return
        }
        setShowConfirmModal(true)
    }

    const handleConfirmOrder = () => {
        // Handle checkout logic here
        console.log('Processing checkout...')
        setShowConfirmModal(false)
        setShowSuccessModal(true)
    }

    const handleCancelOrder = () => {
        setShowConfirmModal(false)
    }

    const handleCloseSuccess = () => {
        setShowSuccessModal(false)
        // router.push('/orders') // Navigate to orders page after checkout
    }

    return (
        <main className="min-h-screen bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Checkout Header Button */}
                <div className="mb-6">
                    <button className="bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-[16px] font-bold">ชำระเงิน</span>
                    </button>
                </div>

                {/* Address Section */}
                <div className="mb-6 pb-6 border-b border-gray-300">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h2 className="text-black text-[18px] font-bold">ที่อยู่</h2>
                        </div>
                        <button className="text-[#FF4D00] text-[14px] hover:underline">
                            แก้ไขที่อยู่
                        </button>
                    </div>
                    <div className="ml-7">
                        <p className="text-black text-[14px] mb-1">{address.company}</p>
                        <p className="text-black text-[14px] mb-1">เลขประจําตัวผู้เสียภาษี {address.taxId}</p>
                        <p className="text-black text-[14px]">{address.address}</p>
                    </div>
                </div>

                {/* Product List Section */}
                <div className="mb-6 pb-6 border-b border-gray-300">
                    {/* Column Headers */}
                    <div className="hidden md:grid grid-cols-12 gap-4 mb-4 pb-2 border-b border-gray-200">
                        <div className="col-span-6"></div>
                        <div className="col-span-2 text-center text-gray-600 text-[14px] font-medium">ราคาต่อหน่วย</div>
                        <div className="col-span-2 text-center text-gray-600 text-[14px] font-medium">จํานวน</div>
                        <div className="col-span-2 text-center text-gray-600 text-[14px] font-medium">ราคารวม</div>
                    </div>

                    {/* Products */}
                    <div className="space-y-4">
                        {checkoutItems.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                                {/* Shop Name and Product Info */}
                                <div className="flex items-start gap-4 md:col-span-6">
                                    <div className="text-black text-[14px] font-medium mb-2 md:mb-0 md:w-24">{item.shopName}</div>
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="w-[100px] h-[100px] object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="text-black text-[14px] mb-2 leading-tight">{item.productName}</p>
                                        <span className="inline-block bg-gray-200 text-gray-700 text-[12px] px-2 py-1 rounded">
                                            {item.productTag}
                                        </span>
                                    </div>
                                </div>

                                {/* Price Per Unit */}
                                <div className="md:col-span-2 text-center md:text-left md:pl-4">
                                    <span className="text-black text-[14px] font-medium">฿{item.pricePerItem.toLocaleString()}</span>
                                </div>

                                {/* Quantity */}
                                <div className="md:col-span-2 text-center md:text-left md:pl-4">
                                    <span className="text-black text-[14px]">{item.quantity}</span>
                                </div>

                                {/* Total Price */}
                                <div className="md:col-span-2 text-center md:text-left md:pl-4">
                                    <span className="text-black text-[16px] font-medium">
                                        ฿{(item.pricePerItem * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method Section */}
                <div className="mb-6 pb-6 border-b border-gray-300">
                    <div className="flex items-center justify-between">
                        <h2 className="text-black text-[18px] font-bold">เลือกประเภทการชำระเงิน</h2>
                        <button 
                            onClick={() => setPaymentMethod('cash_on_delivery')}
                            className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                                paymentMethod === 'cash_on_delivery' 
                                    ? 'bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            เก็บเงินปลายทาง
                        </button>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="mb-8">
                    <h2 className="text-black text-[18px] font-bold mb-4">ข้อมูลการชำระเงิน</h2>
                    <div className="flex flex-col items-end gap-2 mb-4">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 text-[14px]">จํานวนสินค้า</span>
                            <span className="text-black text-[14px] font-medium">{checkoutItems.length} รายการ</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 text-[14px]">รวมการสั่งซื้อ</span>
                            <span className="text-black text-[14px] font-medium">฿{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 text-[14px]">การจัดส่ง</span>
                            <span className="text-black text-[14px] font-medium">฿{shipping.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-300">
                        <span className="text-black text-[16px] font-medium">ยอดชำระเงินทั้งหมด</span>
                        <span className="text-[#FF4D00] text-[24px] font-bold">฿{total.toLocaleString()}</span>
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 shadow-lg">
                    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agreeToPolicy}
                                onChange={(e) => setAgreeToPolicy(e.target.checked)}
                                className="w-5 h-5 text-[#FF4D00] border-gray-300 rounded focus:ring-[#FF4D00]"
                            />
                            <span className="text-black text-[14px]">
                                ฉันได้อ่านและยินยอมข้อตกลงนโยบายการคืนเงินและสินค้า
                            </span>
                            <button className="text-blue-600 text-[14px] hover:underline">
                                นโยบายสินค้า
                            </button>
                        </div>
                        <button 
                            onClick={handleBuyNow}
                            className="bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white px-12 py-3 rounded-lg text-[16px] font-bold hover:opacity-90 transition-opacity w-full md:w-auto"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Spacer for fixed bottom bar */}
                <div className="h-24"></div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCancelOrder}>
                    <div className="bg-white rounded-xl p-8 w-[500px] max-w-[90vw] flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {/* Bell Icon with Exclamation */}
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] rounded-full flex items-center justify-center relative">
                                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute text-white text-2xl font-bold">!</span>
                            </div>
                        </div>

                        {/* Confirmation Message */}
                        <p className="text-black text-[18px] font-medium text-center mb-8">
                            คุณแน่ใจที่จะทำรายการสั่งซื้อ ใช่หรือไม่
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center gap-4 w-full">
                            <button 
                                onClick={handleCancelOrder}
                                className="flex-1 px-6 py-3 rounded-lg border-2 border-[#FF4D00] text-[#FF4D00] text-[16px] font-medium hover:bg-gray-50 transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button 
                                onClick={handleConfirmOrder}
                                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white text-[16px] font-medium hover:opacity-90 transition-opacity"
                            >
                                ตกลง
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-12 w-[500px] max-w-[90vw] flex flex-col items-center shadow-2xl">
                        {/* Success Icon */}
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] rounded-full flex items-center justify-center">
                                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Success Message */}
                        <p className="text-black text-[24px] font-bold text-center mb-12">
                            ทำรายการสั่งซื้อสำเร็จ
                        </p>

                        {/* Close Button */}
                        <button 
                            onClick={handleCloseSuccess}
                            className="px-12 py-3 rounded-full border-2 border-[#FF4D00] text-[#FF4D00] text-[16px] font-medium hover:bg-[#FF4D00] hover:text-white transition-all"
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

