"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("กรุณากรอกอีเมลล์")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "กรุณากรอกอีเมลล์ที่ถูกต้อง"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const router = useRouter();
  const { handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const getRegisteredUser = () => {
    try {
      const raw = localStorage.getItem("registeredUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    if (loading) return;
    setLoading(true);
    const registered = getRegisteredUser();

    // ✅ ไม่เคยสมัคร
    if (!registered) {
      alert("กรุณาสมัครสมาชิกก่อนเข้าสู่ระบบ");
      onClose?.();
      onSwitchToRegister?.();
      setLoading(false);
      return;
    }

    // ✅ อีเมล/รหัสผ่านไม่ถูกต้อง (กันอาการ “กดแล้วนิ่ง”)
    if (data.email !== registered.email || data.password !== registered.password) {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");

      // ใส่ error ให้ทั้งสองช่อง เพื่อให้เห็นชัดขึ้น (ไม่เปลี่ยนดีไซน์)
      setError("email", { type: "manual", message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      setError("password", { type: "manual", message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      setLoading(false);
      return;
    }

    // ✅ สำเร็จ
    handleLogin();
    onClose?.();
    router.refresh();
    // reload will navigate away; no need to setLoading(false) after this
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-[550px] h-[700px] shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-12">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0aede5d0e28cb7e974e8566560f084f298d19463"
            alt="Meow Meow"
            className="w-[392px] h-[221px] object-contain"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[303px]" noValidate>
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/bb1527979d860473a483ea26a23ad970aabda3aa"
                alt="email icon"
                className="w-[20px] h-[20px]"
              />
              <input
                type="email"
                placeholder="อีเมลล์"
                className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400"
                required
                {...register("email", {
                  onChange: () => {
                    if (errors.email) clearErrors("email");
                  },
                  onBlur: () => {},
                })}
              />
            </div>
            <div className="mt-2 h-px bg-gray-300" />
            {errors.email?.message && (
              <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>
            )}
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
                placeholder="รหัสผ่าน"
                className="w-full bg-transparent text-[16px] text-black outline-none placeholder:text-gray-400"
                required
                disabled={loading}
                {...register("password", {
                  onChange: () => {
                    if (errors.password) clearErrors("password");
                  },
                })}
              />
            </div>
            <div className="mt-2 h-px bg-gray-300" />
            {errors.password?.message && (
              <p className="mt-1 text-[12px] text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-[303px] h-[50px] text-white rounded-full text-[18px] font-normal ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
            style={{ background: "linear-gradient(90deg, #FF4D00 0%, #FBA01A 100%)" }}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          <button
            type="button"
            onClick={onSwitchToRegister}
            disabled={loading}
            className={`w-[303px] h-[50px] mt-4 rounded-full border-2 border-[#F7921E] text-[18px] font-normal text-[#FF4D00] transition hover:bg-[#F7921E] hover:text-white ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
}
