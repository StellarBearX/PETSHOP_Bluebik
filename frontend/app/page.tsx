"use client";

import { useEffect, useState } from "react";
import LoginModal from "@/Components/LoginModal";
import RegisterModal from "@/Components/RegisterModal";
import SuccessModal from "@/Components/SuccessModal";
import { getToken } from "@/lib/auth";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const token = getToken();
    setShowLogin(!token);
  }, []);

  return (
    <>
      {/* Home background (ของจริงเธอจะมี layout หน้า home อยู่แล้ว) */}
      <main className="min-h-screen bg-[#F5F5F5]" />

      {(showLogin || showRegister || showSuccess) && (
        <div className="fixed inset-0 z-50">
          {/* overlay: ดำจาง + blur */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

          {/* center */}
          <div className="absolute inset-0 flex items-center justify-center">
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
                onClose={() => {
                  setShowSuccess(false);
                  setShowLogin(true);
                }}
                message="ลงทะเบียนสำเร็จ"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
