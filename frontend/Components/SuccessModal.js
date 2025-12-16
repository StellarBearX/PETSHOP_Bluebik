"use client"

export default function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl p-12 w-[400px] flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Success Icon */}
                <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/57a8938c0ecdd827e1dd57172c76d57f95c24b90" 
                    alt="Success" 
                    className="w-[120px] h-[120px] mb-8"
                />

                {/* Success Message */}
                <p className="text-[#FF4D00] text-[24px] font-normal text-center mb-12">
                    ลงทะเบียนสำเร็จ
                </p>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="w-[198px] h-[38px] rounded-full border-2 border-[#F7921E] text-[#FF4D00] text-[16px] font-normal hover:bg-[#F7921E] hover:text-white transition-all"
                >
                    ปิด
                </button>
            </div>
        </div>
    )
}
