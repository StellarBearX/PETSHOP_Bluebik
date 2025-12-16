"use client"
import { useState } from 'react'

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Register:', { email, password })
        onSuccess()
    }

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

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="อีเมลล์"
                                className="input-field"
                            />
                        </div>
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
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="รหัสผ่าน"
                                className="input-field"
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <button 
                        type="submit"
                        className="w-full h-[50px] btn-primary text-xl font-normal mt-8"
                    >
                        ลงทะเบียน
                    </button>
                </form>
            </div>
        </div>
    )
}
