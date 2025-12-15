"use client"

export default function ShopeeMallPage() {
  const products = Array(6).fill({
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-[217px] py-6 text-[20px] font-['Inter']">
            <a href="/" className="text-black hover:text-[#FF4D00]">Home</a>
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/81cffa23d611a9098ff51247ea7a45e25a320e0c"
              alt=""
              className="w-[22px] h-[22px] transform -rotate-90"
            />
            <span className="text-[#FF4D00]">Shopee Mall</span>
          </div>

          {/* Flash Deal Banner */}
          <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] mx-[217px] rounded-xl h-[163px] flex flex-col items-center justify-center mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/83093067aa3555f0fa4daef7e8df7e8f9abe6c61"
                alt="Flash Deal"
                className="w-[83px] h-[83px]"
              />
              <h1 className="text-white text-[32px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">Flash Deal</h1>
            </div>
            <p className="text-white text-[20px] font-['Inter'] leading-normal -tracking-[0.333px]">00:00 | 12:00 | 18:00 |21:00 น.</p>
          </div>

          {/* Header */}
          <div className="mx-[217px]">
            <div className="bg-white h-[45px] flex items-center justify-between px-4 rounded-t mb-0 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
              <h2 className="text-[#FF4D00] text-[20px] font-bold font-['Inter'] leading-normal -tracking-[0.333px]">Shopee Mall</h2>
              <span className="text-black text-[10px] font-['Inter'] leading-normal -tracking-[0.333px]">Total number of products : 6 items</span>
            </div>

            {/* Products Grid */}
            <div className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] p-6 grid grid-cols-2 gap-6">
              {products.map((product, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] hover:shadow-lg transition-shadow cursor-pointer"
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
                      {/* Heart Icon */}
                      <button className="absolute top-0 right-0">
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/09a4f899918b90df2d20af4bd178f25e9857b5fa"
                          alt="Add to favorites"
                          className="w-[12px] h-[10px]"
                        />
                      </button>

                      {/* Product Name */}
                      <h3 className="text-[12px] font-['Inter'] text-black leading-normal -tracking-[0.333px] pr-4 mt-1">
                        {product.name}
                      </h3>

                      {/* Badge */}
                      <div className="bg-[#FF4D00] rounded w-fit px-2 py-0.5 mt-1">
                        <span className="text-white text-[8px] font-['Inter'] leading-normal -tracking-[0.333px]">
                          {product.badge}
                        </span>
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

                      {/* Bottom Section */}
                      <div className="flex items-end justify-between mt-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-black text-[8px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            {product.sales}
                          </span>
                          <span className="text-black text-[10px] font-['Inter'] leading-normal -tracking-[0.333px]">
                            {product.location}
                          </span>
                        </div>
                        
                        {/* Rating */}
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/3762c7f0b8d9e8de20737776043e333bdbdafeeb"
                          alt="Rating"
                          className="w-[42px] h-[42px]"
                        />
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
