"use client"
import { useState } from 'react'
import { useAuth } from '@/app/providers'

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const { handleLogin } = useAuth()

    if (!isOpen) return null

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
        }
        if (password.length > 20) {
            return 'รหัสผ่านต้องไม่เกิน 20 ตัวอักษร'
        }
        return ''
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        if (value && !validateEmail(value)) {
            setEmailError('กรุณากรอกอีเมลล์ที่ถูกต้อง')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        const error = validatePassword(value)
        setPasswordError(error)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validate
        let hasError = false
        
        if (!email) {
            setEmailError('กรุณากรอกอีเมลล์')
            hasError = true
        } else if (!validateEmail(email)) {
            setEmailError('กรุณากรอกอีเมลล์ที่ถูกต้อง')
            hasError = true
        }
        
        if (!password) {
            setPasswordError('กรุณากรอกรหัสผ่าน')
            hasError = true
        } else {
            const pwdError = validatePassword(password)
            if (pwdError) {
                setPasswordError(pwdError)
                hasError = true
            }
        }
        
        if (hasError) {
            return
        }
        
        console.log('Register:', { email, password })
        handleLogin()
        setTimeout(() => {
            onSuccess()
        }, 0)
    }

    const isFormValid = email && password && !emailError && !passwordError

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content rounded-xl p-8 w-[550px] relative" onClick={(e) => e.stopPropagation()}>
                {/* Logo */}
                <div className="flex justify-center mb-12">
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/0aede5d0e28cb7e974e8566560f084f298d19463" 
                        alt="Meow Meow" 
                        className="w-[392px] h-[221px] object-contain"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Email Input */}
                    <div className="relative">
                        <div className="input-with-icon">
                            <img 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/bb1527979d860473a483ea26a23ad970aabda3aa" 
                                alt="" 
                                className="w-5 h-5"
                            />
                            <input 
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailChange}
                                placeholder="อีเมลล์"
                                className="input-field"
                            />
                        </div>
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1 ml-1">{emailError}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <div className="input-with-icon">
                            <img 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/9f0a45bb2b764c9eccaa361dc89c8ddf0644c367" 
                                alt="" 
                                className="w-5 h-5"
                            />
                            <input 
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordChange}
                                placeholder="รหัสผ่าน"
                                className="input-field"
                            />
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1 ml-1">{passwordError}</p>
                        )}
                        {!passwordError && password && (
                            <p className="text-gray-500 text-xs mt-1 ml-1">
                                รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button 
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full h-[50px] text-xl font-normal mt-8 ${
                            isFormValid 
                                ? 'btn-primary' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        ลงทะเบียน
                    </button>
                </form>
            </div>
        </div>
    )
}
