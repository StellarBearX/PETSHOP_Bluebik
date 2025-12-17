"use client"

import { useState } from 'react'
import { useAuth } from '@/app/providers'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import SuccessModal from './SuccessModal'

export default function AuthModals() {
  const { isLoggedIn, showLogin, authLoaded, setShowLogin } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSwitchToRegister = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
    setShowSuccess(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }

  // Don't render modals until auth state is loaded from localStorage
  if (!authLoaded) return null

  return (
    <>
      <LoginModal 
        isOpen={!isLoggedIn && showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal 
        isOpen={!isLoggedIn && showRegister} 
        onClose={() => setShowRegister(false)}
        onSuccess={handleRegisterSuccess}
      />
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={handleCloseSuccess}
      />
    </>
  )
}
