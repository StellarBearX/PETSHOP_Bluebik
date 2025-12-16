"use client";
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

import { useState } from "react";

const USERS_KEY = "petshop_users";

export default function RegisterModal({ isOpen, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

if (!email.trim() || !password.trim()) {
  setError("กรุณากรอกอีเมลและรหัสผ่าน");
  return;
}

if (!GMAIL_REGEX.test(email.trim())) {
  setError("กรุณาใช้อีเมล @gmail.com เท่านั้น");
  return;
}


    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const exists = users.some((u) => u.email === email.trim());
    if (exists) {
      setError("อีเมลนี้ถูกสมัครแล้ว");
      return;
    }

    users.push({ email: email.trim(), password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    onSuccess?.();
  };

  return (
    <div
      className="
        bg-white
        w-[550px] h-[700px]
        rounded-none
        px-[123px] pt-[34px]
        shadow-[0_18px_45px_rgba(0,0,0,0.18)]
        flex flex-col
      "
    >
      {/* LOGO */}
      <div className="flex justify-center mb-[40px]">
        <img
          src="/images/auth/logo-meowmeow.png"
          className="w-[392px] h-[221px] object-contain"
          alt="logo"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-[28px]">
        {/* EMAIL */}
        <div className="flex items-center gap-[16px]">
          <img
            src="/images/auth/icon-email.png"
            className="w-[20px] h-[20px]"
            alt=""
          />

          <div className="flex-1">
            <input
              placeholder="อีเมล"
              className="w-full text-[16px] outline-none placeholder:text-[#BDBDBD]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-[250px] h-px bg-[#BDBDBD] mt-[6px]" />
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
              placeholder="รหัสผ่าน"
              className="w-full text-[16px] outline-none placeholder:text-[#BDBDBD]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-[250px] h-px bg-[#BDBDBD] mt-[6px]" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm pt-1">{error}</p>}

        {/* BUTTON */}
        <div className="flex justify-center pt-[30px]">
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
            ลงทะเบียน
          </button>
        </div>
      </form>
    </div>
  );
}
