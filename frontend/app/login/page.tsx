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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
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
    </div>
  );
}
