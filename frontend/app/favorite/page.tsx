"use client"

export default function FavoritePage() {
  const favoriteProducts = Array(6).fill({
    name: "Kaniva คานิว่า อาหารแมว กระสอบ 8kg",
    price: "815 - ฿899",
    originalPrice: "฿999",
    sales: "ยอดขาย 7 ชิ้น",
    location: "กรุงเทพมหานคร",
    rating: 5,
    badge: "สินค้าขายดี",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a0e97df153de0241b08a7dd44d7e1f5d659a532f"
  })

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mx-[221px] py-8">
            {/* Products List */}
            <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] rounded">
              <div className="space-y-6 p-8">
                {favoriteProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="bg-white border-[2px] border-gray-200 rounded-[2px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-4 p-3">
                      {/* Product Image */}
                      <div className="w-[90px] h-[90px] flex-shrink-0 rounded overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between relative">
                        {/* Product Name */}
                        <h3 className="text-[12px] font-['Inter'] text-black leading-normal -tracking-[0.333px] pr-8 mt-1">
                          {product.name}
                        </h3>

                        {/* Badge and Rating - Side by side */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="bg-[#FF4D00] rounded w-fit px-2 py-0.5">
                            <span className="text-white text-[8px] font-['Inter'] leading-normal -tracking-[0.333px]">
                              {product.badge}
                            </span>
                          </div>
                          <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/3762c7f0b8d9e8de20737776043e333bdbdafeeb"
                            alt="Rating"
                            className="w-[42px] h-[42px]"
                          />
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[#979797] text-[6px] font-bold font-['Inter'] line-through leading-normal -tracking-[0.333px]">
                            {product.originalPrice}
                          </span>
                          <span className="text-[#FA7D27] text-[12px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">
                            ฿{product.price}
                          </span>
                        </div>

                        {/* Sales and Location */}
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-black text-[8px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            {product.sales}
                          </span>
                          <span className="text-black text-[10px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            {product.location}
                          </span>
                        </div>

                        {/* Heart Icon */}
                        <button className="absolute top-0 right-0">
                          <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/27d947f56fdf03696a238d9b61ee3c9122edb00c"
                            alt="Remove from favorites"
                            className="w-[24px] h-[22px]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
