"use client";
import { useState } from "react";
import { useAuth } from "@/app/providers";
import SuccessModal from "./SuccessModal";

export default function RegisterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const { handleLogin } = useAuth();

  if (!isOpen) return null;

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validatePassword = (v) => {
    if (v.length < 6) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (v.length > 20) return "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) setEmailError("กรุณากรอกอีเมลล์ที่ถูกต้อง");
    else setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!email) {
      setEmailError("กรุณากรอกอีเมลล์");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("กรุณากรอกอีเมลล์ที่ถูกต้อง");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      hasError = true;
    } else {
      const pwdError = validatePassword(password);
      if (pwdError) {
        setPasswordError(pwdError);
        hasError = true;
      } else {
        setPasswordError("");
      }
    }

    if (hasError) return;

    try {
      localStorage.setItem("registeredUser", JSON.stringify({ email, password }));
      localStorage.setItem("hasRegistered", "true");
    } catch {}

    setIsSuccessOpen(true);
  };

  const closeSuccess = () => {
    setIsSuccessOpen(false);
    handleLogin();
    onClose?.();
  };

  return (
    <>
      {!isSuccessOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onClose}
        >
          <div
            className="bg-white w-[550px] h-[700px] shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <div className="mb-12">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0aede5d0e28cb7e974e8566560f084f298d19463"
                alt="Meow Meow"
                className="w-[392px] h-[221px] object-contain"
              />
            </div>

            <form onSubmit={handleSubmit} className="w-[303px]" noValidate>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/bb1527979d860473a483ea26a23ad970aabda3aa"
                    alt="email icon"
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailChange}
                    placeholder="อีเมลล์"
                    className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="mt-2 h-px bg-gray-300" />
                {emailError && <p className="mt-1 text-[12px] text-red-500">{emailError}</p>}
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/9f0a45bb2b764c9eccaa361dc89c8ddf0644c367"
                    alt="password icon"
                    className="w-[20px] h-[20px]"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordChange}
                    placeholder="รหัสผ่าน"
                    className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="mt-2 h-px bg-gray-300" />
                {passwordError ? (
                  <p className="mt-1 text-[12px] text-red-500">{passwordError}</p>
                ) : (
                  password && (
                    <p className="mt-1 text-[11px] text-gray-500">
                      รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
                    </p>
                  )
                )}
              </div>

              <button
                type="submit"
                className="w-[303px] h-[50px] rounded-full text-[18px] font-normal text-white"
                style={{ background: "linear-gradient(90deg, #FF4D00 0%, #FBA01A 100%)" }}
              >
                ลงทะเบียน
              </button>
            </form>
          </div>
        </div>
      )}

      <SuccessModal isOpen={isSuccessOpen} onClose={closeSuccess} message="ลงทะเบียนสำเร็จ" />
    </>
  );
}
