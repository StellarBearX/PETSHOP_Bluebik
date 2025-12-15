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

    const handleForgotPassword = () => {
        console.log('Forgot password')
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-[20px] w-[550px] h-[700px] relative flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Logo */}
                <div className="mb-12">
                    <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/0aede5d0e28cb7e974e8566560f084f298d19463" 
                        alt="Meow Meow" 
                        className="w-[392px] h-[221px] object-contain"
                    />
                </div>

                <form onSubmit={handleSubmit} className="w-[303px]">
                    {/* Email Input */}
                    <div className="relative mb-6">
                        <div className="flex items-center gap-3 pb-2">
                            <svg width="19" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.56522 0C4.29105 0 0 4.48609 0 10C0 15.5139 4.29105 20 9.56522 20C14.8394 20 19.1304 15.5139 19.1304 10C19.1304 4.48609 14.8394 0 9.56522 0ZM9.56522 2.91668C12.0923 2.91668 14.1486 5.06633 14.1486 7.70836C14.1486 10.3504 12.0923 12.5 9.56522 12.5C7.03809 12.5 4.98187 10.3504 4.98187 7.70832C4.98187 5.06629 7.03809 2.91668 9.56522 2.91668ZM3.19564 14.989C4.65109 17.0148 6.96068 18.3333 9.56522 18.3333C12.1698 18.3333 14.4794 17.0147 15.9348 14.9889C14.3406 14.187 12.0633 13.3333 9.56522 13.3333C7.06735 13.3333 4.79019 14.1869 3.19564 14.989Z" fill="#F7921E"/>
                            </svg>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="อิเมลล์"
                                className="flex-1 outline-none text-[16px] font-['Inter'] placeholder-[#BDBDBD] bg-transparent"
                            />
                        </div>
                        <div className="h-[1px] bg-[#BDBDBD]"></div>
                    </div>

                    {/* Password Input */}
                    <div className="relative mb-8">
                        <div className="flex items-center gap-3 pb-2">
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.3006 7.5H16.732V5.83332C16.732 2.6168 13.4482 0 9.41177 0C5.37529 0 2.09152 2.6168 2.09152 5.83332V7.5H0.522892C0.233873 7.5 0 7.68637 0 7.91668V18.3334C0 19.2525 0.93799 20 2.09152 20H16.7321C17.8855 20 18.8235 19.2525 18.8235 18.3333V7.91668C18.8235 7.68637 18.5897 7.5 18.3006 7.5ZM10.9774 16.204C10.9937 16.3216 10.9462 16.4396 10.8472 16.5279C10.7481 16.6162 10.6061 16.6667 10.4575 16.6667H8.36603C8.21745 16.6667 8.07549 16.6162 7.97642 16.5279C7.87735 16.4396 7.82985 16.3216 7.84623 16.204L8.17608 13.8404C7.64044 13.5299 7.32029 13.0388 7.32029 12.5C7.32029 11.5808 8.25828 10.8333 9.41181 10.8333C10.5653 10.8333 11.5033 11.5808 11.5033 12.5C11.5033 13.0388 11.1832 13.5299 10.6475 13.8404L10.9774 16.204ZM5.22877 5.83332V7.5H13.5948V5.83332C13.5948 3.99535 11.7182 2.5 9.41176 2.5C7.10529 2.5 5.22877 3.99535 5.22877 5.83332Z" fill="#F7921E"/>
                            </svg>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="รหัสผ่าน"
                                className="flex-1 outline-none text-[16px] font-['Inter'] placeholder-[#BDBDBD] bg-transparent"
                            />
                        </div>
                        <div className="h-[1px] bg-[#BDBDBD]"></div>
                    </div>

                    {/* Login Button */}
                    <button 
                        type="submit"
                        className="w-full h-[50px] rounded-[25px] bg-gradient-to-r from-[#FF4D00] to-[#F99D20] text-white text-[20px] font-['Inter'] hover:opacity-90 transition-opacity mb-6"
                    >
                        เข้าสู่ระบบ
                    </button>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-8">
                        <button 
                            type="button"
                            onClick={handleForgotPassword}
                            className="flex-1 h-[38px] rounded-[19px] border-2 border-[#F7921E] text-[#F7921E] text-[18px] font-['DBHelvethaicaX'] hover:bg-[#F7921E] hover:text-white transition-all"
                        >
                            ลืมรหัสผ่าน
                        </button>
                        <button 
                            type="button"
                            onClick={onSwitchToRegister}
                            className="flex-1 h-[38px] rounded-[19px] border-2 border-[#F7921E] text-[#F7921E] text-[18px] font-['Inter'] hover:bg-[#F7921E] hover:text-white transition-all"
                        >
                            สมัครสมาชิก
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex-1 h-[1px] bg-[#D9D9D9]"></div>
                        <span className="px-4 text-[#BDBDBD] text-[14px] font-['Inter']">หรือ</span>
                        <div className="flex-1 h-[1px] bg-[#D9D9D9]"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex gap-4">
                        <button 
                            type="button"
                            className="flex-1 h-[42px] bg-[#1877F2] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="white"/>
                            </svg>
                            Facebook
                        </button>
                        <button 
                            type="button"
                            className="flex-1 h-[42px] bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                                <path d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.2444 19.252C9.11376 19.252 6.45934 17.1399 5.50693 14.3003H1.51648V17.3912C3.55359 21.4434 7.70278 24.0008 12.24 24.0008Z" fill="#34A853"/>
                                <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
                                <path d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.70277 0.000808666 3.55359 2.55822 1.51648 6.61481L5.50252 9.70575C6.45053 6.86173 9.10935 4.74966 12.24 4.74966Z" fill="#EA4335"/>
                            </svg>
                            Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
