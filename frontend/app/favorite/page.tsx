"use client"
import { useState } from 'react'

export default function FavoritePage() {
    const [favorites, setFavorites] = useState([])

    const hasFavorites = favorites.length > 0

    const favoriteProducts = [
        {
            name: "Kaniva คานิว่า อาหารแมว กระสอบ 8kg",
            price: "815",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/a0e97df153de0241b08a7dd44d7e1f5d659a532f"
        },
        {
            name: "FURLOVE คานิว่า เหมาะสำหรับแมวทุกวัย ถุงละ 1kg",
            price: "815",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/65da054a41dae7109c8c20e828be100ba6d2d107"
        },
        {
            name: "CatHoliday เพ็ทเทอเรีย อาหารแมวแบบเม็ด ขนาด 1.5kg",
            price: "815",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/f162c04d1c40bfed5f72bbf326b1427054ac7faa"
        },
        {
            name: "ชามใส่อาหารสำหรับสัตว์เลี้ยง ให้อาหารแมว ชามให้อาหารสุนัข ชามอาหารสัตว์เลี้ยง",
            price: "815",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/1bf492d806e10544365de793fe8c1f1e09a184ef"
        },
    ]

    return (
        <main className="min-h-screen bg-[#F5F5F5] py-8">
            {hasFavorites ? (
                <div className="max-w-[1000px] mx-auto px-4">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <div className="space-y-4">
                            {favoriteProducts.map((product, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-4 bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow"
                                >
                                    <img 
                                        src={product.image}
                                        alt={product.name}
                                        className="w-[90px] h-[90px] object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="bg-[#FF4D00] inline-block px-2 py-0.5 rounded mb-2">
                                            <span className="text-white text-[8px]">สินค้าขายดี</span>
                                        </div>
                                        <p className="text-black text-[12px] mb-2">{product.name}</p>
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src="https://api.builder.io/api/v1/image/assets/TEMP/599d0e2c24ceb21ffd32bdca069f43052e1919ef"
                                                alt="Rating"
                                                className="w-10 h-5"
                                            />
                                            <span className="text-[#FA7D27] text-[12px] font-bold">฿{product.price}</span>
                                        </div>
                                    </div>
                                    <button className="ml-auto">
                                        <img 
                                            src="https://api.builder.io/api/v1/image/assets/TEMP/27d947f56fdf03696a238d9b61ee3c9122edb00c"
                                            alt="Remove from favorites"
                                            className="w-6 h-5"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[600px]">
                    <div className="relative mb-8">
                        <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/04e6b52eb7dd67eeeb121dcc472d3fa0fc6095bf"
                            alt="Empty cart"
                            className="w-[158px] h-[158px]"
                        />
                        <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/24d943291a90f0186d9d540631f27df86963c4fb"
                            alt="Heart"
                            className="w-[91px] h-[91px] absolute -top-11 left-8"
                        />
                    </div>
                    <h2 className="text-[#FF4D00] text-[20px] font-normal mb-4">
                        ไม่มี Favorite
                    </h2>
                    <p className="text-[#333] text-[14px] font-light text-center max-w-[253px] leading-[18px]">
                        คุณสามารถกดไอคอนรูป"หัวใจ"ที่มุมขวาบน<br />
                        เพื่อเก็บไว้ในนี้ได้
                    </p>
                </div>
            )}
        </main>
    )
}
