"use client";

import { useState } from "react";
import { setToken } from "@/lib/auth";

export default function LoginModal({ isOpen, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    setToken("mock_token_123");
    window.location.href = "/";
  };

  return (
    <div
      className="
        bg-white
        w-[550px] h-[700px]
        rounded-xl
        px-[123px] pt-[34px]
        shadow-[0_18px_45px_rgba(0,0,0,0.18)]
        flex flex-col
      "
    >
      {/* LOGO */}
      <div className="flex justify-center mb-[40px]">
        <img
          src="/images/auth/logo-meowmeow.png"
          alt="Meow Meow"
          className="w-[392px] h-[221px] object-contain"
        />
      </div>

      <form onSubmit={handleLogin} className="space-y-[28px]">
        {/* EMAIL */}
        <div className="flex items-center gap-[16px]">
          <img
            src="/images/auth/icon-email.png"
            className="w-[20px] h-[20px]"
            alt=""
          />
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล"
              className="
                w-full
                text-[16px]
                outline-none
                placeholder:text-[#BDBDBD]
              "
            />
            <div className="w-[250px] h-[1px] bg-[#BDBDBD] mt-[6px]" />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="flex items-center gap-[16px]">
          <img
            src="/images/auth/icon-lock.png"
            className="w-[20px] h-[20px]"
            alt=""
          />
          <div className="flex-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="
                w-full
                text-[16px]
                outline-none
                placeholder:text-[#BDBDBD]
              "
            />
            <div className="w-[250px] h-[1px] bg-[#BDBDBD] mt-[6px]" />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm pt-[4px]">{error}</p>
        )}

        {/* BUTTONS */}
        <div className="pt-[26px] space-y-[16px]">
          <button
            type="submit"
            className="
              w-[303px] h-[50px]
              rounded-full
              bg-gradient-to-r from-[#FF4D00] to-[#FF7A00]
              text-white text-[18px]
              hover:opacity-90 transition
            "
          >
            เข้าสู่ระบบ
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="
              w-[303px] h-[50px]
              rounded-full
              border-2 border-[#F7921E]
              text-[#F7921E] text-[18px]
              hover:bg-[#F7921E] hover:text-white
              transition
            "
          >
            สมัครสมาชิก
          </button>
        </div>
      </form>
    </div>
  );
}
