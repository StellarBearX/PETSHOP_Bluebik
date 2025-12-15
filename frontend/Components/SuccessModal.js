"use client";

export default function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="
          bg-white
          w-[400px] h-[400px]
          rounded-xl
          flex flex-col items-center
          shadow-[0_18px_45px_rgba(0,0,0,0.18)]
        "
      >
        <div className="mt-[62px]">
          <img
            src="/images/auth/icon-success.png"
            alt="success"
            className="w-[120px] h-[120px]"
          />
        </div>

        <p className="mt-[30px] text-[#FF4D00] text-[22px] font-normal">
          {message || "ลงทะเบียนสำเร็จ"}
        </p>

        <button
          onClick={onClose}
          className="
            mt-[53px]
            w-[198px] h-[38px]
            rounded-[19px]
            border-2 border-[#F7921E]
            text-[#FF4D00] text-[16px] font-normal
            hover:bg-[#F7921E] hover:text-white
            transition
          "
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
