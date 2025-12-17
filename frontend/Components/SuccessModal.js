"use client"
import Link from 'next/link'

export default function SuccessModal({ isOpen, onClose, title = "ทำรายการสั่งซื้อสำเร็จ", redirectUrl = "/profile-orders" }) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content rounded-xl p-12 w-[697px] h-[733px] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Success Icon */}
                <div className="mb-16">
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/1ba2edb58e5ffcb6d38beb8afcb9d37c156bb8d2" 
                        alt="Success" 
                        className="w-[250px] h-[233px]"
                    />
                </div>

                {/* Success Message */}
                <h2 className="text-black text-5xl font-normal text-center mb-12">
                    {title}
                </h2>

                {/* Close Button */}
                {redirectUrl ? (
                    <Link href={redirectUrl}>
                        <button className="w-[198px] h-[38px] btn-outline-primary text-base font-['Mitr']">
                            ปิด
                        </button>
                    </Link>
                ) : (
                    <button 
                        onClick={onClose}
                        className="w-[198px] h-[38px] btn-outline-primary text-base font-['Mitr']"
                    >
                        ปิด
                    </button>
                )}
            </div>
        </div>
    )
}
