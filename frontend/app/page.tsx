"use client"
import { useState } from 'react'
import LoginModal from '@/Components/LoginModal'
import RegisterModal from '@/Components/RegisterModal'
import SuccessModal from '@/Components/SuccessModal'
import ProfileDropdown from '@/Components/ProfileDropdown'
import ProductCard from '@/Components/ProductCard'
import Link from 'next/link'

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const handleSwitchToRegister = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
    setShowSuccess(true)
  }

  const categories = [
    { name: "Animal\nfood", icon: "https://api.builder.io/api/v1/image/assets/TEMP/6d1edec1969de036e58d4ce6f5779ebb80350538" },
    { name: "pet\nsupplies", icon: "https://api.builder.io/api/v1/image/assets/TEMP/7271d343953f252b7a42d884cae36bb9d5469f47" },
    { name: "Clothes and\naccessories", icon: "https://api.builder.io/api/v1/image/assets/TEMP/a34d75e49f456032094a4b5ff46e0609ed5463ac" },
    { name: "Cleaning\nequipment", icon: "https://api.builder.io/api/v1/image/assets/TEMP/929fe5c8f3f0dc09a3ad8ec925bcebaaf8fb5227" },
    { name: "sand and\nbathroom", icon: "https://api.builder.io/api/v1/image/assets/TEMP/79f556957c403ba99f5d15360f964cdfa9950b4c" },
    { name: "Hygiene\ncare", icon: "https://api.builder.io/api/v1/image/assets/TEMP/004d3d0b2ac2c5d00c635a02511f937edc4882bf" },
    { name: "Cat\nsnacks", icon: "https://api.builder.io/api/v1/image/assets/TEMP/b8a79e732389849e0a47627c6632dd6c41546d62" },
    { name: "Cat\nexercise", icon: "https://api.builder.io/api/v1/image/assets/TEMP/d78aa07115d10be4a643985db44560ecfbf7cb06" },
  ]

  const recommendedProducts = Array(10).fill({
    name: "PURINA ONE เพียวริน่าวัน อาหารแมว",
    price: "400",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9f6f4a7ff45e59449140587baff701db77d4c33d"
  })

  return (
    <>
      <main className="min-h-[576px] bg-[#F5F5F5]">
        {/* Banner Section */}
        <section className="relative w-full h-[500px] mt-6 mb-12 px-4">
          <div className="max-w-[1440px] mx-auto relative h-full">
            <div className="absolute left-0 top-5 z-10">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/75927ca557ede0ef326e8fe725144b011efa5d44" 
                alt="Previous" 
                className="w-20 h-[430px] rounded-r-xl cursor-pointer hover:opacity-80"
              />
            </div>

            <div className="absolute left-[104px] right-[104px] top-0 h-full">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/1fd37dc0a9f7a659bc9914b9218685930cf9200f" 
                alt="Banner" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="absolute right-0 top-5 z-10">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/d4c7bf5d315f0a68f95e56fedf0e2aff86c057ba" 
                alt="Next" 
                className="w-20 h-[430px] rounded-l-xl cursor-pointer hover:opacity-80"
              />
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
              <div className="w-4 h-4 rounded-full bg-[#FFEEE0]"></div>
              <div className="w-[41px] h-4 rounded-full bg-[#FF4D00]"></div>
              <div className="w-4 h-4 rounded-full bg-[#FFEEE0]"></div>
            </div>
          </div>
        </section>

        {/* Shopping Mall Section */}
        <section className="max-w-[1000px] mx-auto px-4 mb-12">
          <div className="bg-white h-[45px] flex items-center justify-between px-4 rounded-t-lg">
            <h2 className="text-black text-[20px] font-bold">Shopping Mall</h2>
            <Link href="/shopee-mall" className="flex items-center gap-2 text-[#FF4D00] text-[12px] hover:opacity-80">
              <span>see more</span>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ed7fa190b22aa590d38a45c97113e721f8fd4bf4" 
                alt="" 
                className="w-5 h-5 transform -rotate-90"
              />
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-b-lg p-4">
            <div className="grid grid-cols-4 gap-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/abb7edfe50237f94aeaf1a789fa8f6fe60e61085" 
                alt="Product 1" 
                className="w-full h-[200px] object-cover rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/fd8662dce488a82f6ce120d647d6110ea222dc0b" 
                alt="Product 2" 
                className="w-full h-[200px] object-cover rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/50109194e77f1ca8695d89b25c2f6e64fb211b23" 
                alt="Product 3" 
                className="w-full h-[200px] object-cover rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
              />
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/ae71c0de8f2b0bbb13cec9d98c66ae3627f6ae17" 
                alt="Product 4" 
                className="w-full h-[200px] object-cover rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Category Section */}
        <section className="max-w-[1000px] mx-auto px-4 mb-12">
          <div className="bg-white h-[45px] flex items-center px-4 rounded-t-lg">
            <h2 className="text-black text-[20px] font-bold">Category</h2>
          </div>
          <div className="bg-white shadow-md rounded-b-lg p-4">
            <div className="grid grid-cols-8 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className="bg-[#FF4D00] rounded-[10px] h-[160px] flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity p-2"
                >
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className="w-[50px] h-[50px] mb-3"
                  />
                  <span className="text-[#F1F1F1] text-[15px] text-center whitespace-pre-line leading-tight">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="max-w-[1000px] mx-auto px-4 mb-12">
          <div className="bg-white h-[45px] flex items-center px-8 rounded-t-lg">
            <h2 className="text-black text-[20px] font-bold">Recommended</h2>
          </div>
          <div className="bg-white shadow-md rounded-b-lg p-6">
            <div className="grid grid-cols-5 gap-6">
              {recommendedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            
            {/* See More Button */}
            <div className="flex justify-center mt-8">
              <button className="w-[300px] h-[50px] bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] rounded text-white text-[15px] font-bold hover:opacity-90 transition-opacity">
                See more
              </button>
            </div>
          </div>
        </section>

        {/* Floating Login Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-[#FF4D00] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#FF6A00] transition-colors font-bold"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </main>

      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)}
        onSuccess={handleRegisterSuccess}
      />
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)}
      />
    </>
  )
}
