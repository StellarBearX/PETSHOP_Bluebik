"use client";

import { useState } from "react";
import LoginModal from "@/Components/LoginModal";
import RegisterModal from "@/Components/RegisterModal";
import SuccessModal from "@/Components/SuccessModal";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#F5F5F5]">
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {showLogin && (
          <LoginModal
            isOpen
            onRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        )}

        {showRegister && (
          <RegisterModal
            isOpen
            onSuccess={() => {
              setShowRegister(false);
              setShowSuccess(true);
            }}
          />
        )}

        {showSuccess && (
          <SuccessModal
            isOpen
            message="ลงทะเบียนสำเร็จ"
            onClose={() => {
              setShowSuccess(false);
              setShowLogin(true);
            }}
          />
        )}
      </div>
    </main>
  );
}
