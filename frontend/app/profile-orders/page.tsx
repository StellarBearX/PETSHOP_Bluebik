"use client"
import ProfileSidebar from '@/Components/ProfileSidebar'

export default function OrdersPage() {
  const orders = [
    {
      shop: "90s.shop",
      name: "Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก",
      variant: "Urinary 8kg, แถมไม้แหย่แมว",
      price: 1190,
      quantity: 1,
      status: "อยู่ในระหว่างการจัดส่ง",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/791772d1f1e3670b80fe9634be235e2a38c2a773"
    },
    {
      shop: "90s.shop",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      status: "อยู่ในระหว่างการจัดส่ง",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6cff6e21643dde16bec0d41e0a22d4d08c451617"
    },
    {
      shop: "90s.shop",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      status: "สำเร็จ",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6cff6e21643dde16bec0d41e0a22d4d08c451617"
    }
  ]

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-4 md:py-8 overflow-auto">
      <div className="container-responsive max-w-[1253px]">
        {/* Header */}
        <div className="bg-white h-[45px] flex items-center px-4 rounded-lg mb-4 md:mb-6">
          <h1 className="text-black text-base md:text-[20px] font-bold font-['Inter'] overflow-wrap-break">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-[15px] font-['Inter'] mb-2">การสั่งซื้อล่าสุด</h2>
              <p className="text-[10px] text-[#656565] font-['Inter']">
                จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/c3abd80db39f1b20acb82d72dbcd93aebb3d37b5"
                        alt="Store"
                        className="w-2.5 h-2.5"
                      />
                      <span className="text-[10px] font-['Mitr']">{order.shop}</span>
                    </div>
                    <span className="text-[8px] font-['Mitr'] text-[#656565]">{order.status}</span>
                  </div>

                  <div className="p-4 flex gap-4">
                    <div className="w-[102px] h-[102px] border border-[#979797] rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={order.image}
                        alt={order.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-['Mitr'] text-[#333] mb-2 line-clamp-2">{order.name}</h3>
                      <div className="bg-[#F4F4F4] rounded px-2 py-1 inline-flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-['Mitr']">{order.variant}</span>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/2927c1b01de55ac95bcf80662e9b50d6e3507b1c"
                          alt=""
                          className="w-4 h-4"
                        />
                      </div>
                      <p className="text-sm font-['Mitr']">฿{order.price.toLocaleString()}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-['Mitr'] mb-1">
                        {order.quantity} รายการ ฿{(order.price * order.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Successful Orders Section */}
            <div className="mt-8">
              <h3 className="text-[15px] font-['Inter'] mb-4">การประวัติสั่งซื้อสำเร็จ</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
