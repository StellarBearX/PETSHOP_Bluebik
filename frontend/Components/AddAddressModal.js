"use client"
import { useState, useEffect } from 'react'

export default function AddAddressModal({ isOpen, onClose, onSave, editData = null }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
    })

    // Load edit data when modal opens
    useEffect(() => {
        if (isOpen && editData) {
            setFormData({
                firstName: editData.firstName || '',
                lastName: editData.lastName || '',
                phone: editData.phone || '',
                address: editData.address || ''
            })
        } else if (isOpen && !editData) {
            // Reset form when opening for new address
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                address: ''
            })
        }
    }, [isOpen, editData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleClear = (fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: ''
        })
    }

    const handleSubmit = () => {
        if (formData.firstName && formData.lastName && formData.phone && formData.address) {
            onSave(formData)
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                address: ''
            })
            onClose()
        }
    }

    const handleCancel = () => {
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            address: ''
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCancel}>
            <div className="bg-white rounded-xl p-8 w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E8954F] to-[#F7A961] flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <h2 className="text-black text-2xl font-bold">{editData ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่'}</h2>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                    {/* Name Fields Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                ชื่อ
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="ชื่อ"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all"
                                />
                                {formData.firstName && (
                                    <button
                                        onClick={() => handleClear('firstName')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                นามสกุล
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="นามสกุล"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all"
                                />
                                {formData.lastName && (
                                    <button
                                        onClick={() => handleClear('lastName')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            หมายเลขโทรศัพท์
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="หมายเลขโทรศัพท์"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all"
                            />
                            {formData.phone && (
                                <button
                                    onClick={() => handleClear('phone')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            ที่อยู่
                        </label>
                        <div className="relative">
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="ที่อยู่"
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8954F] focus:border-transparent transition-all resize-none"
                            />
                            {formData.address && (
                                <button
                                    onClick={() => handleClear('address')}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleCancel}
                        className="flex-1 h-[45px] rounded-lg border-2 border-[#F7921E] text-[#FF4D00] text-base font-semibold hover:bg-[#F7921E] hover:text-white transition-all"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 h-[45px] rounded-lg bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white text-base font-semibold hover:opacity-90 transition-opacity"
                    >
                        บันทึก
                    </button>
                </div>
            </div>
        </div>
    )
}

