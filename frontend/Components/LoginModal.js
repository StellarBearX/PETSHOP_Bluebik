"use client"
import { useState } from 'react'

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login:', { email, password })
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl p-8 w-[550px] relative" onClick={(e) => e.stopPropagation()}>
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
                        <div className="flex items-center gap-3 pb-2 border-b border-[#BDBDBD]">
                            <img 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/1a22cc3c1b54c44750adca1262f42e1eee4efeff" 
                                alt="" 
                                className="w-5 h-5"
                            />
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="อีเมลล์"
                                className="flex-1 outline-none text-[16px] placeholder-[#BDBDBD]"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <div className="flex items-center gap-3 pb-2 border-b border-[#BDBDBD]">
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.3006 7.5H16.732V5.83332C16.732 2.6168 13.4482 0 9.41177 0C5.37529 0 2.09152 2.6168 2.09152 5.83332V7.5H0.522892C0.233873 7.5 0 7.68637 0 7.91668V18.3334C0 19.2525 0.93799 20 2.09152 20H16.7321C17.8855 20 18.8235 19.2525 18.8235 18.3333V7.91668C18.8235 7.68637 18.5897 7.5 18.3006 7.5ZM10.9774 16.204C10.9937 16.3216 10.9462 16.4396 10.8472 16.5279C10.7481 16.6162 10.6061 16.6667 10.4575 16.6667H8.36603C8.21745 16.6667 8.07549 16.6162 7.97642 16.5279C7.87735 16.4396 7.82985 16.3216 7.84623 16.204L8.17608 13.8404C7.64044 13.5299 7.32029 13.0388 7.32029 12.5C7.32029 11.5808 8.25828 10.8333 9.41181 10.8333C10.5653 10.8333 11.5033 11.5808 11.5033 12.5C11.5033 13.0388 11.1832 13.5299 10.6475 13.8404L10.9774 16.204ZM5.22877 5.83332V7.5H13.5948V5.83332C13.5948 3.99535 11.7182 2.5 9.41176 2.5C7.10529 2.5 5.22877 3.99535 5.22877 5.83332Z" fill="#F7921E"/>
                            </svg>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="รหัสผ่าน"
                                className="flex-1 outline-none text-[16px] placeholder-[#BDBDBD]"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button 
                        type="submit"
                        className="w-full h-[50px] rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white text-[20px] font-normal hover:opacity-90 transition-opacity mt-8"
                    >
                        เข้าสู่ระบบ
                    </button>

                    {/* Register Link */}
                    <button 
                        type="button"
                        onClick={onSwitchToRegister}
                        className="w-full h-[50px] rounded-full border-2 border-[#F7921E] text-[#F7921E] text-[18px] font-normal hover:bg-[#F7921E] hover:text-white transition-all"
                    >
                        สมัครสมาชิก
                    </button>
                </form>
            </div>
        </div>
    )
}
