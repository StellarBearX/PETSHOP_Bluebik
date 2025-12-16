"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AddAddressModal from '@/Components/AddAddressModal'

interface Address {
    id: number
    firstName: string
    lastName: string
    phone: string
    address: string
    isPrimary: boolean
}

export default function AddressesPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [addresses, setAddresses] = useState<Address[]>([])
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)
    const [pendingAddresses, setPendingAddresses] = useState<Address[]>([])
    const [userName, setUserName] = useState('Meow Meow')

    // Load addresses and user name from localStorage
    useEffect(() => {
        const savedAddresses = localStorage.getItem('userAddresses')
        if (savedAddresses) {
            try {
                const parsed = JSON.parse(savedAddresses)
                setAddresses(parsed)
                setPendingAddresses(parsed)
            } catch (error) {
                console.error('Error loading addresses:', error)
            }
        }

        // Load user name from profile
        const savedProfile = localStorage.getItem('userProfile')
        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile)
                const fullName = `${profile.firstName || 'Meow'} ${profile.lastName || 'Meow'}`.trim() || 'Meow Meow'
                setUserName(fullName)
            } catch (error) {
                console.error('Error loading profile:', error)
            }
        }
    }, [])

    // Save new/edited address to pending (not saved yet)
    const handleSaveAddress = (addressData: { firstName: string; lastName: string; phone: string; address: string }) => {
        if (editingAddress) {
            // Update existing address in pending
            const updatedAddresses = pendingAddresses.map(addr =>
                addr.id === editingAddress.id
                    ? { ...addr, ...addressData }
                    : addr
            )
            setPendingAddresses(updatedAddresses)
            setEditingAddress(null)
        } else {
            // Add new address to pending
            const newAddress = {
                id: Date.now(),
                ...addressData,
                isPrimary: pendingAddresses.length === 0
            }
            setPendingAddresses([...pendingAddresses, newAddress])
        }
    }

    // Handle edit
    const handleEdit = (address: Address) => {
        setEditingAddress(address)
        setShowAddModal(true)
    }

    // Handle delete (only from pending, not saved yet)
    const handleDelete = (id: number) => {
        const updatedAddresses = pendingAddresses.filter(addr => addr.id !== id)
        setPendingAddresses(updatedAddresses)
    }

    // Handle set primary (only in pending, not saved yet)
    const handleSetPrimary = (id: number) => {
        const updatedAddresses = pendingAddresses.map(addr => ({
            ...addr,
            isPrimary: addr.id === id
        }))
        setPendingAddresses(updatedAddresses)
    }

    // Save all changes
    const handleSaveAll = () => {
        localStorage.setItem('userAddresses', JSON.stringify(pendingAddresses))
        setAddresses(pendingAddresses)
    }

    // Close modal and reset edit state
    const handleCloseModal = () => {
        setShowAddModal(false)
        setEditingAddress(null)
        // If there are unsaved changes, they will remain in pendingAddresses until user clicks save button
    }

    return (
        <div className="h-[calc(100vh-105px)] bg-[#F5F5F5] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 py-6 h-full flex flex-col">
                {/* Page Title */}
                <h1 className="text-black text-3xl font-bold mb-4">My Profile</h1>

                <div className="flex gap-5 flex-1 overflow-hidden">
                    {/* Left Sidebar */}
                    <div className="w-[280px] flex-shrink-0 bg-white rounded-lg shadow-md p-5 flex flex-col">
                        {/* Profile Summary */}
                        <div className="flex flex-col items-center mb-4 pb-4 border-b border-gray-200">
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 overflow-hidden">
                                <img 
                                    src="https://api.builder.io/api/v1/image/assets/TEMP/e1117d6a428387a10894e9853f8d501e255f2faa" 
                                    alt="Profile" 
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h2 className="text-black text-base font-bold mb-2">{userName}</h2>
                            <Link 
                                href="/profile"
                                className="flex items-center gap-1.5 text-[#E8954F] hover:text-[#F7A961] transition-colors text-xs font-medium"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                แก้ไขข้อมูลส่วนตัว
                            </Link>
                        </div>

                        {/* Menu List */}
                        <div className="space-y-1.5 flex-1">
                            {['บัญชี', 'การสั่งซื้อล่าสุด', 'ที่อยู่ที่บันทึกไว้', 'ออกจากระบบ'].map((menu, index) => (
                                <div
                                    key={menu}
                                    onClick={() => {
                                        if (menu === 'บัญชี') {
                                            window.location.href = '/profile'
                                        } else if (menu === 'การสั่งซื้อล่าสุด') {
                                            window.location.href = '/orders'
                                        } else if (menu === 'ที่อยู่ที่บันทึกไว้') {
                                            window.location.href = '/addresses'
                                        } else if (menu === 'ออกจากระบบ') {
                                            window.location.href = '/'
                                        }
                                    }}
                                    className={`flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-all ${
                                        menu === 'ที่อยู่ที่บันทึกไว้'
                                            ? 'bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white shadow-md' 
                                            : 'hover:bg-gray-50 text-black'
                                    }`}
                                >
                                    <span className={`text-[13px] ${menu === 'ที่อยู่ที่บันทึกไว้' ? 'font-bold' : 'font-medium'}`}>
                                        {menu}
                                    </span>
                                    {index < 3 && (
                                        <img 
                                            src="https://api.builder.io/api/v1/image/assets/TEMP/71a8a8e8af26442e173f219fc941d79484c92c5e" 
                                            alt="" 
                                            className="w-3.5 h-3.5"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto">
                            {/* Header with Add Button */}
                            <div className="mb-6 pb-4 border-b border-gray-200 flex items-start justify-between">
                                <div>
                                    <h2 className="text-black text-xl font-bold mb-1">ที่อยู่ของฉัน</h2>
                                    <p className="text-gray-600 text-xs">
                                        จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="px-4 py-2 border-2 border-[#E8954F] text-[#E8954F] rounded-lg hover:bg-[#E8954F] hover:text-white transition-all font-semibold text-sm flex items-center gap-2 whitespace-nowrap"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    เพิ่มที่อยู่
                                </button>
                            </div>

                            {/* Addresses List */}
                            {pendingAddresses.length === 0 ? (
                                <div className="flex items-center justify-center h-64">
                                    <p className="text-gray-400">ยังไม่มีที่อยู่ที่บันทึกไว้</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pendingAddresses.map((address) => (
                                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3 mb-3">
                                                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-black text-sm font-semibold">ที่อยู่</span>
                                                        {address.isPrimary && (
                                                            <span className="px-2 py-0.5 bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white text-xs rounded-full font-medium">
                                                                ที่อยู่หลัก
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-700 text-sm">
                                                        {address.firstName} {address.lastName} | (+66) {address.phone}
                                                    </p>
                                                    <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                                <button
                                                    onClick={() => handleDelete(address.id)}
                                                    className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
                                                >
                                                    ลบ
                                                </button>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEdit(address)}
                                                        className="flex items-center gap-1 text-[#E8954F] text-sm font-medium hover:text-[#F7A961] transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                        แก้ไข
                                                    </button>
                                                    {!address.isPrimary && (
                                                        <button
                                                            onClick={() => handleSetPrimary(address.id)}
                                                            className="px-3 py-1 border-2 border-[#E8954F] text-[#E8954F] rounded-lg hover:bg-[#E8954F] hover:text-white transition-all text-sm font-semibold"
                                                        >
                                                            ตั้งเป็นที่อยู่หลัก
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Save Button */}
                        {JSON.stringify(pendingAddresses) !== JSON.stringify(addresses) && (
                            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleSaveAll}
                                    className="bg-gradient-to-r from-[#E8954F] to-[#F7A961] text-white px-8 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-bold shadow-md hover:shadow-lg text-sm"
                                >
                                    บันทึก
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Address Modal */}
            <AddAddressModal
                isOpen={showAddModal}
                onClose={handleCloseModal}
                onSave={handleSaveAddress}
                editData={editingAddress ? {
                    firstName: editingAddress.firstName,
                    lastName: editingAddress.lastName,
                    phone: editingAddress.phone,
                    address: editingAddress.address
                } : null as any}
            />
        </div>
    )
}

