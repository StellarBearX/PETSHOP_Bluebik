"use client"

export default function UnsavedChangesModal({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
            <div className="bg-white rounded-xl p-8 w-[420px] flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Warning Icon - Orange Bell with Exclamation */}
                <div className="mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#E8954F] to-[#F7A961] flex items-center justify-center relative">
                        {/* Bell Icon */}
                        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {/* Exclamation Mark - positioned at bottom right */}
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="text-[#FF4D00] text-lg font-bold leading-none">!</span>
                        </div>
                    </div>
                </div>

                {/* Warning Message */}
                <p className="text-black text-lg font-semibold text-center mb-8 px-4">
                    มีการแก้ไขข้อมูล ต้องการออกจากหน้านี้หรือไม่
                </p>

                {/* Buttons */}
                <div className="flex gap-4 w-full">
                    <button 
                        onClick={onCancel}
                        className="flex-1 h-[38px] rounded-full border-2 border-[#F7921E] text-[#FF4D00] text-base font-semibold hover:bg-[#F7921E] hover:text-white transition-all"
                    >
                        ยกเลิก
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 h-[38px] rounded-full bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white text-base font-semibold hover:opacity-90 transition-opacity"
                    >
                        ตกลง
                    </button>
                </div>
            </div>
        </div>
    )
}

