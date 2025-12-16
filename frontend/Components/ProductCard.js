"use client"
import { useState } from 'react'

export default function ProductCard({ product, showBadge = true }) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <div className="relative w-[170px] rounded-sm shadow-md bg-white">
            {/* Product Image */}
            <div className="relative">
                <img 
                    src={product.image || "https://api.builder.io/api/v1/image/assets/TEMP/9f6f4a7ff45e59449140587baff701db77d4c33d"}
                    alt={product.name}
                    className="w-full h-[183px] object-cover rounded-t-sm"
                />
                
                {/* Badge */}
                {showBadge && (
                    <div className="absolute top-0 left-0 bg-[#FF4D00] px-4 py-0.5">
                        <span className="text-white text-[8px] font-bold">สินค้าขายดี</span>
                    </div>
                )}

                {/* Favorite Heart */}
                <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-2 right-2"
                >
                    <img 
                        src={isFavorite 
                            ? "https://api.builder.io/api/v1/image/assets/TEMP/8b9fb69db0ce7252d1bfdfc1c81f6180647a5a2d"
                            : "https://api.builder.io/api/v1/image/assets/TEMP/b5b05d0b81645500870018f47552cccbfd5fcbe1"
                        }
                        alt="Favorite"
                        className="w-3 h-3"
                    />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-2">
                <p className="text-black text-[8px] line-clamp-2 mb-2 min-h-[27px]">
                    {product.name || "PURINA ONE เพียวริน่าวัน อาหารแมว"}
                </p>
                
                <div className="flex items-center justify-between">
                    <span className="text-[#FF4D00] text-[8px] font-bold">
                        ฿{product.price || "400"}
                    </span>
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/46d04e9038d25e8fdc4ca4283a89c8d955dccb3d"
                        alt="Rating"
                        className="w-7 h-7"
                    />
                </div>
            </div>
        </div>
    )
}
