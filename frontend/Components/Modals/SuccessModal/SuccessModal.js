"use client";

export default function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        style={{ width: 400, height: 400 }}
      >
        <img
          src="/images/auth/icon-success.png"
          alt="success"
          style={{ width: 120, height: 120, marginTop: 62 }}
        />

        <p
          style={{
            marginTop: 30,
            width: 194,
            height: 22,
            color: "#FF4D00",
            fontFamily: "Kanit",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "22px",
            textAlign: "center",
          }}
        >
          {message || "ลงทะเบียนสำเร็จ"}
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: 53,
            width: 198,
            height: 38,
            borderRadius: 19,
            border: "2px solid #F7921E",
            background: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "Kanit",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "22px",
              color: "#FF4D00",
            }}
          >
            ปิด
          </span>
        </button>
      </div>
    </div>
  );
}
