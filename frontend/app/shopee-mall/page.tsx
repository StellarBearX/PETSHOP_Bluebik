"use client"
import Link from 'next/link'

export default function ShopeeMallPage() {
    const products = [
        {
            name: "Kaniva คานิว่า อาหารแมว กระสอบ 8kg",
            price: "899",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/a0e97df153de0241b08a7dd44d7e1f5d659a532f"
        },
        {
            name: "ชามใส่อาหารสำหรับสัตว์เลี้ยง ให้อาหารแมว ชามให้อาหารสุนัข ชามอาหารสัตว์เลี้ยง",
            price: "145",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/1bf492d806e10544365de793fe8c1f1e09a184ef"
        },
        {
            name: "CatHoliday เพ็ทเทอเรีย อาหารแมวแบบเม็ด ขนาด 1.5kg",
            price: "899",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/f162c04d1c40bfed5f72bbf326b1427054ac7faa"
        },
        {
            name: "PURINA ONE เพียวริน่าวัน อาหารแมว",
            price: "899",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/f539ffec4b2b7a9d49318e9642f5cf9cbe62b1f9"
        },
        {
            name: "FURLOVE คานิว่า เหมาะสำหรับแมวทุกวัย ถุงละ 1kg",
            price: "899",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/65da054a41dae7109c8c20e828be100ba6d2d107"
        },
        {
            name: "เสื้อสัตว์เลี้ยง ใส่สบาย ระบายอากาศดี XS-2XL",
            price: "65",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/ea3bed068d21a9e556a86613ff9b54f70669cad5"
        },
        {
            name: "กระดาษลับเล็บวงรี ที่ลับเล็บแมว รูปอ่าง ที่ฝนเล็บแมว ของเล่นแมว เป็นที่นอนแม",
            price: "899",
            image: "https://api.builder.io/api/v1/image/assets/TEMP/ef3dc73e85e1744a53538d3e79976ce3ca140925"
        },
    ]

    return (
        <main className="min-h-screen bg-[#F5F5F5] py-8">
            <div className="max-w-[1000px] mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-[20px]">
                    <Link href="/" className="text-black hover:text-[#FF4D00]">Home</Link>
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/81cffa23d611a9098ff51247ea7a45e25a320e0c" 
                        alt="" 
                        className="w-5 h-5 transform -rotate-90"
                    />
                    <span className="text-[#FF4D00]">Shopee Mall</span>
                </div>

                {/* Header */}
                <div className="bg-white h-[45px] flex items-center justify-between px-4 rounded-t-lg mb-0">
                    <h1 className="text-[#FF4D00] text-[20px] font-bold">Shopee Mall</h1>
                    <span className="text-black text-[10px]">Total number of products : 6 items</span>
                </div>

                {/* Products Grid */}
                <div className="bg-white shadow-md rounded-b-lg p-8">
                    <div className="grid grid-cols-2 gap-6">
                        {products.map((product, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-4 bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow cursor-pointer"
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
                                    <p className="text-black text-[12px] mb-2 line-clamp-2">{product.name}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#FA7D27] text-[12px] font-bold">฿{product.price}</span>
                                        <img 
                                            src="https://api.builder.io/api/v1/image/assets/TEMP/3762c7f0b8d9e8de20737776043e333bdbdafeeb"
                                            alt="Rating"
                                            className="w-10 h-10"
                                        />
                                    </div>
                                </div>
                                <button className="ml-auto">
                                    <img 
                                        src="https://api.builder.io/api/v1/image/assets/TEMP/09a4f899918b90df2d20af4bd178f25e9857b5fa"
                                        alt="Favorite"
                                        className="w-3 h-2.5"
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
