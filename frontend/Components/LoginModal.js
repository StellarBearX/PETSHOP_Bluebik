"use client";
import { useState } from "react";
import { useAuth } from "@/app/providers";
import { loginUser } from "@/lib/api";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleLogin } = useAuth();

  if (!isOpen) return null;

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("กรุณากรอกอีเมลล์");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("กรุณากรอกอีเมลล์ที่ถูกต้อง");
      return;
    }
    if (!password) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      return;
    }

    setEmailError("");
    setPasswordError("");
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      
      // Store token and user info
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isLoggedIn", "true");
      
      handleLogin();
      onClose?.();
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      setPasswordError(err.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                onBlur={(e) => {
                  const v = e.target.value;
                  if (v && !validateEmail(v)) setEmailError("กรุณากรอกอีเมลล์ที่ถูกต้อง");
                }}
                placeholder="อีเมลล์"
                className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400"
                required
              />
            </div>
            <div className="mt-2 h-px bg-gray-300" />
              {emailError && <p className="mt-1 text-[12px] text-red-500">{emailError}</p>}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/9f0a45bb2b764c9eccaa361dc89c8ddf0644c367"
                alt="password icon"
                className="w-[20px] h-[20px]"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                  if (error) setError("");
                }}
                onBlur={(e) => {
                  if (!e.target.value) setPasswordError("กรุณากรอกรหัสผ่าน");
                }}
                placeholder="รหัสผ่าน"
                className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400"
                required
              />
            </div>
            <div className="mt-2 h-px bg-gray-300" />
            {passwordError && <p className="mt-1 text-[12px] text-red-500">{passwordError}</p>}
          </div>

          {error && <p className="mb-4 text-[12px] text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-[303px] h-[50px] text-white rounded-full text-[18px] font-normal disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(90deg, #FF4D00 0%, #FBA01A 100%)" }}
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          <button
            type="button"
            onClick={onSwitchToRegister}
            className="w-[303px] h-[50px] mt-4 rounded-full border-2 border-[#F7921E] text-[18px] font-normal text-[#FF4D00] transition hover:bg-[#F7921E] hover:text-white"
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
}
