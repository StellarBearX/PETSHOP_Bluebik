"use client"
import Link from 'next/link'

export default function SuccessModal({ isOpen, onClose, title = "ทำรายการสั่งซื้อสำเร็จ", redirectUrl = "/profile-orders" }) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content rounded-xl p-12 w-auto max-w-[600px] min-w-[450px] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Success Icon */}
                <div className="mb-8 flex items-center justify-center">
                    <div className="w-28 h-28 bg-gradient-to-br from-[#FF4D00] to-[#F99D20] rounded-full flex items-center justify-center shadow-lg">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                                fill="white" 
                                stroke="white" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h2 className="text-black text-2xl font-bold text-center mb-10 font-['Inter']">
                    {title}
                </h2>

                {/* Close Button */}
                {redirectUrl ? (
                    <Link href={redirectUrl}>
                        <button className="w-[120px] h-[38px] rounded-full border-2 border-[#F7921E] bg-white text-[#F7921E] text-base font-['Inter'] font-medium hover:bg-[#F7921E] hover:text-white transition-all">
                            ปิด
                        </button>
                    </Link>
                ) : (
                    <button 
                        onClick={onClose}
                        className="w-[120px] h-[38px] rounded-full border-2 border-[#F7921E] bg-white text-[#F7921E] text-base font-['Inter'] font-medium hover:bg-[#F7921E] hover:text-white transition-all"
                    >
                        ปิด
                    </button>
                )}
            </div>
        </div>
    )
}
