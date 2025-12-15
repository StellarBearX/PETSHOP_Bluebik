"use client";
import { useState } from "react";

export default function RegisterModal({ isOpen, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    onSuccess();
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
              className="
                w-full
                text-[16px]
                outline-none
                placeholder:text-[#BDBDBD]
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="รหัสผ่าน"
              className="
                w-full
                text-[16px]
                outline-none
                placeholder:text-[#BDBDBD]
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-[250px] h-[1px] bg-[#BDBDBD] mt-[6px]" />
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center pt-[30px]">
          <button
            type="submit"
            className="
              w-[303px] h-[50px]
              rounded-full
              bg-gradient-to-r from-[#FF4D00] to-[#FF7A00]
              text-white text-[18px]
              hover:opacity-90
              transition
            "
          >
            ลงทะเบียน
          </button>
        </div>
      </form>
    </div>
  );
}
