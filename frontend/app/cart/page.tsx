"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function CartPage() {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
    2: 1
  })

  const cartItems = [
    {
      id: 1,
      shop: "90s.shop",
      shopType: "recommended",
      name: "Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก",
      variant: "Urinary 8kg, แถมไม้แหย่แมว",
      price: 1190,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/66a9416979682534bcc31cf585b69c3ea91e4e97"
    },
    {
      id: 2,
      shop: "Bite of Wild Official Shop",
      shopType: "mall",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด เหมาะสำหรับทุกช่วงวัย",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/395c6f306fe987600d1e46a5ff4944a68c1cc986"
    }
  ]

  const recommendedProducts = [
    {
      id: 1,
      name: "Regalos รีกาลอส อาหารแมว กระสอบ 5kg",
      price: 2000,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/407ec119c7c1817030b2368b4183a5979fc01269",
      sold: "7",
      location: "กรุงเทพมหานคร",
      rating: 5
    },
    {
      id: 2,
      name: "FURLOVE คานิว่า เหมาะสำหรับแมวทุกวัย ถุงละ 1kg",
      price: 2000,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/75a057525a60e85177fe520b470d7733e0a6ba8e",
      sold: "7",
      location: "กรุงเทพมหานคร",
      rating: 5
    },
    {
      id: 3,
      name: "All well ออลเวลล์ อาหารแมว กระสอบ 2kg",
      price: 1990,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7f3b5d9340ce10a96910c594cda702dfbdaef446",
      sold: "7",
      location: "กรุงเทพมหานคร",
      rating: 5
    },
    {
      id: 4,
      name: "Pet Paradise อาหารเปียก อาหารแมว กระสอบ 2kg",
      price: 1900,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/9b878cc576a7bf582abdc69342d84c14cdffbe4b",
      sold: "7",
      location: "กรุงเทพมหานคร",
      rating: 5
    },
    {
      id: 5,
      name: "Pramy ปรามี อาหารแมว กระสอบ 5kg",
      price: 1890,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad427acb1546058bbcb67bae7e5b762da0f03953",
      sold: "7",
      location: "กรุงเทพมหานคร",
      rating: 5
    }
  ]

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map(item => item.id))
    }
    setSelectAll(!selectAll)
  }

  const toggleItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }))
  }

  const removeItem = (id: number) => {
    setSelectedItems(selectedItems.filter(itemId => itemId !== id))
  }

  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (item.price * quantities[item.id]), 0)
  
  const discount = 0

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-[1340px] mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg p-4 mb-8 flex items-center gap-4">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/ef5106e8c1589916161d078d5360bd31312755ca" 
              alt="Cart"
              className="w-[50px] h-[50px]"
            />
            <h1 className="text-white text-[32px] font-bold font-['Inter']">รถเข็น</h1>
          </div>

          {/* Table Header */}
          <div className="flex items-center gap-4 mb-4 px-2">
            <div className="flex items-center gap-3 w-[102px]">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-[26px] h-[26px] cursor-pointer accent-[#FF4D00]"
              />
              <span className="text-black text-[18px] font-bold font-['Inter']">ทั้งหมด</span>
            </div>
            <div className="flex-1 grid grid-cols-12 gap-4">
              <div className="col-span-4"></div>
              <div className="col-span-2 text-[14px] font-['Mitr']">ราคาต่อชิ้น</div>
              <div className="col-span-2 text-[14px] font-['Mitr']">จำนวน</div>
              <div className="col-span-2 text-[14px] font-['Mitr']">ราคารวม</div>
              <div className="col-span-2 text-[14px] font-['Mitr']">Action</div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-300 mb-6"></div>

          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-start gap-4 px-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="w-[26px] h-[26px] mt-12 cursor-pointer accent-[#FF4D00]"
                  />
                  
                  <div className="flex-1">
                    {/* Shop Name */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2">
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
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product Image & Info */}
                      <div className="col-span-4 flex gap-4">
                        <div className="w-[120px] h-[120px] border border-[#D9D9D9] rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[14px] font-['Mitr'] text-[#333] line-clamp-2 leading-5">{item.name}</h3>
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
                      <div className="col-span-2">
                        <div className="flex items-center border border-[#D9D9D9] rounded-lg w-[78px] h-[25px]">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex items-center justify-center w-[25px] h-full hover:bg-gray-100"
                          >
                            <img 
                              src="https://api.builder.io/api/v1/image/assets/TEMP/ea5a0d07b1edae4b0f84a735c2d46b55154b84f3"
                              alt="decrease"
                              className="w-3 h-3"
                            />
                          </button>
                          <span className="flex-1 text-center text-[14px] font-['Mitr']">
                            {quantities[item.id]}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex items-center justify-center w-[25px] h-full hover:bg-gray-100"
                          >
                            <img 
                              src="https://api.builder.io/api/v1/image/assets/TEMP/151fd72b3b5dfee5b88defcef21f65fc2f4efefb"
                              alt="increase"
                              className="w-3 h-3"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="col-span-2 text-[14px] font-['Mitr']">
                        ฿{(item.price * quantities[item.id]).toLocaleString()}
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex gap-3">
                        <button className="hover:opacity-70">
                          <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/d83ca65e259bb78dd9793cd40aeae177c9bf6c4c"
                            alt="edit"
                            className="w-[30px] h-[30px]"
                          />
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="hover:opacity-70"
                        >
                          <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/9dfe66b6cba7eef494fe3500b452584a5c23163c"
                            alt="delete"
                            className="w-[30px] h-[30px]"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Coupon Section */}
                    <div className="mt-4 flex items-center gap-2">
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
                  </div>
                </div>

                {/* Divider */}
                {index < cartItems.length - 1 && (
                  <div className="border-b border-gray-300 my-6"></div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 flex justify-end">
            <div className="w-[192px]">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-['Mitr']">ยอดรวม</span>
                  <span className="text-[20px] font-['Mitr'] text-[#FF4D00]">{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-['Mitr']">ส่วนลด</span>
                  <span className="text-[14px] font-['Mitr']">{discount}%</span>
                </div>
              </div>
              <Link href="/checkout">
                <button className="w-full h-[45px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded text-white text-[15px] font-['Inter'] hover:opacity-90 transition-opacity">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-16">
            <h2 className="text-[32px] font-bold font-['Inter'] mb-6">สินค้าแนะนำ</h2>
            <div className="grid grid-cols-5 gap-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="relative">
                  <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                    {/* Best Seller Badge */}
                    <div className="absolute top-[22px] left-0 z-10">
                      <div className="bg-[#FF4D00] px-4 py-0.5">
                        <span className="text-white text-[8px] font-bold font-['Inter']">สินค้าขายดี</span>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative h-[217px]">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Heart Icon */}
                      <button className="absolute top-[227px] right-2 hover:opacity-70">
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/276fe61bc45453d6598594901d9736b94b7f6d98"
                          alt="favorite"
                          className="w-[19px] h-5"
                        />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      <h3 className="text-[8px] font-['Inter'] text-black mb-2 h-[43px] line-clamp-3">
                        {product.name}
                      </h3>
                      
                      {/* Discount Badge */}
                      <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-sm px-2 py-0.5 inline-block mb-2">
                        <span className="text-white text-[8px] font-bold font-['Inter']">โค้ดส่วนลด</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/ae0834f51588ef102ff9bd6562639a0d6ed55834"
                          alt="rating"
                          className="w-[31px] h-[33px]"
                        />
                      </div>

                      {/* Price */}
                      <div className="text-[#FF4D00] text-[8px] font-bold font-['Inter'] mb-1">
                        ฿{product.price.toLocaleString()}
                      </div>

                      {/* Sold & Location */}
                      <div className="text-[4px] font-['Inter'] text-black space-y-0.5">
                        <div>ยอดขาย {product.sold} ชิ้น</div>
                        <div>{product.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  )
}
