"use client"

export default function ProfileSuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl p-10 w-[420px] flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Success Icon - Large Orange Checkmark */}
                <div className="mb-6">
                    <svg className="w-32 h-32 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Success Message */}
                <p className="text-[#FF4D00] text-2xl font-semibold text-center mb-10">
                    แก้ไขข้อมูลสำเร็จ
                </p>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="w-[198px] h-[38px] rounded-full border-2 border-[#F7921E] text-[#FF4D00] text-base font-semibold hover:bg-[#F7921E] hover:text-white transition-all"
                >
                    ปิด
                </button>
            </div>
        </div>
    )
}

