"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
    id: string
    shopName: string
    productName: string
    productTag: string
    image: string
    pricePerItem: number
    quantity: number
    selected: boolean
}

export default function CartPage() {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            shopName: '90s.shop',
            productName: 'Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก',
            productTag: 'Urinary 8kg, แถมไม้แหย่แมว',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/a0e97df153de0241b08a7dd44d7e1f5d659a532f',
            pricePerItem: 1190,
            quantity: 1,
            selected: true
        },
        {
            id: '2',
            shopName: 'Bite of Wild Official Shop',
            productName: 'Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีชดร...',
            productTag: '5 กก. + 1 *ขนมรสปลา',
            image: 'https://api.builder.io/api/v1/image/assets/TEMP/65da054a41dae7109c8c20e828be100ba6d2d107',
            pricePerItem: 1789,
            quantity: 1,
            selected: true
        }
    ])

    const [selectAll, setSelectAll] = useState(true)

    // Group items by shop
    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.shopName]) {
            acc[item.shopName] = []
        }
        acc[item.shopName].push(item)
        return acc
    }, {} as Record<string, CartItem[]>)

    const handleSelectAll = () => {
        const newSelectAll = !selectAll
        setSelectAll(newSelectAll)
        setCartItems(items => items.map(item => ({ ...item, selected: newSelectAll })))
    }

    const handleShopSelect = (shopName: string) => {
        const shopItems = groupedItems[shopName]
        const allSelected = shopItems.every(item => item.selected)
        setCartItems(items => 
            items.map(item => 
                item.shopName === shopName ? { ...item, selected: !allSelected } : item
            )
        )
    }

    const handleItemSelect = (id: string) => {
        setCartItems(items => 
            items.map(item => 
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        )
    }

    const handleQuantityChange = (id: string, delta: number) => {
        setCartItems(items => 
            items.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta)
                    return { ...item, quantity: newQuantity }
                }
                return item
            })
        )
    }

    const selectedItems = cartItems.filter(item => item.selected)
    const totalSum = selectedItems.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0)

    return (
        <main className="min-h-screen bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Cart Header Button */}
                <div className="mb-6">
                    <button className="bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-[16px] font-bold">รถเข็น</span>
                    </button>
                </div>

                {/* Select All Section */}
                <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="w-5 h-5 text-[#FF4D00] border-gray-300 rounded focus:ring-[#FF4D00]"
                        />
                        <span className="text-black text-[16px]">ทั้งหมด</span>
                    </label>
                </div>

                <div className="border-b border-gray-300 mb-6"></div>

                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-12 gap-4 mb-4 pb-2 border-b border-gray-200">
                    <div className="col-span-5"></div>
                    <div className="col-span-2 text-center text-gray-600 text-[14px] font-medium">ราคาต่อชิ้น</div>
                    <div className="col-span-2 text-center text-gray-600 text-[14px] font-medium">จํานวน</div>
                    <div className="col-span-3 text-center text-gray-600 text-[14px] font-medium">ราคารวม</div>
                </div>

                {/* Cart Items Grouped by Shop */}
                <div className="space-y-6 mb-8">
                    {Object.entries(groupedItems).map(([shopName, items]) => {
                        const shopSelected = items.every(item => item.selected)
                        return (
                            <div key={shopName} className="border-b border-gray-200 pb-6 last:border-b-0">
                                {/* Shop Header */}
                                <div className="mb-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={shopSelected}
                                            onChange={() => handleShopSelect(shopName)}
                                            className="w-5 h-5 text-[#FF4D00] border-gray-300 rounded focus:ring-[#FF4D00]"
                                        />
                                        <span className="text-black text-[16px] font-medium">{shopName}</span>
                                    </label>
                                </div>

                                {/* Products in Shop */}
                                <div className="space-y-4 ml-7">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                                            {/* Checkbox and Image */}
                                            <div className="flex items-start gap-4 md:col-span-5">
                                                <input
                                                    type="checkbox"
                                                    checked={item.selected}
                                                    onChange={() => handleItemSelect(item.id)}
                                                    className="w-5 h-5 mt-2 text-[#FF4D00] border-gray-300 rounded focus:ring-[#FF4D00]"
                                                />
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

                                            {/* Price Per Item */}
                                            <div className="md:col-span-2 text-center md:text-left md:pl-4">
                                                <span className="text-black text-[14px] font-medium">฿{item.pricePerItem.toLocaleString()}</span>
                                            </div>

                                            {/* Quantity Selector */}
                                            <div className="md:col-span-2 flex items-center justify-center md:justify-start gap-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                >
                                                    <span className="text-gray-600 text-[18px]">−</span>
                                                </button>
                                                <span className="w-12 h-8 border border-gray-300 rounded flex items-center justify-center text-black text-[14px]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                >
                                                    <span className="text-gray-600 text-[18px]">+</span>
                                                </button>
                                            </div>

                                            {/* Total Price */}
                                            <div className="md:col-span-3 text-center md:text-left md:pl-4">
                                                <span className="text-black text-[16px] font-medium">
                                                    ฿{(item.pricePerItem * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Total and Checkout Section */}
                <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-6 border-t border-gray-300">
                    <div className="flex items-center gap-2">
                        <span className="text-black text-[16px]">ยอดรวม</span>
                        <span className="text-[#FF4D00] text-[20px] font-bold">฿{totalSum.toLocaleString()}</span>
                    </div>
                    <button 
                        onClick={() => {
                            if (selectedItems.length === 0) {
                                alert('กรุณาเลือกสินค้าที่ต้องการซื้อ')
                                return
                            }
                            router.push('/checkout')
                        }}
                        className="bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white px-8 py-3 rounded-lg text-[16px] font-bold hover:opacity-90 transition-opacity w-full md:w-auto"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </main>
    )
}

