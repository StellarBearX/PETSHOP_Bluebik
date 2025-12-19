"use client"
// Profile Address Page - จัดการที่อยู่
// Features: Add/Edit/Delete addresses, Set default, Form validation, Data persistence, เชื่อมกับ Checkout
import { useState, useEffect } from 'react'
import ProfileSidebar from '@/Components/ProfileSidebar'
import { useToast } from '@/contexts/ToastContext'
import styles from './page.module.css'

interface Address {
  id: number
  name: string
  phone: string
  address: string
  addressEn?: string
  isDefault: boolean
}

export default function AddressPage() {
  const { showToast } = useToast()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    road: '',
    postalCode: ''
  })

  // Load addresses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('petshop_addresses')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed)
        } else {
          // Use default mock data if empty
          setAddresses(getDefaultAddresses())
        }
      } catch (e) {
        console.error('Error loading addresses:', e)
        setAddresses(getDefaultAddresses())
      }
    } else {
      // Use default mock data
      setAddresses(getDefaultAddresses())
    }
  }, [])

  // Save addresses to localStorage whenever addresses change
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('petshop_addresses', JSON.stringify(addresses))
    }
  }, [addresses])

  // Default mock addresses
  const getDefaultAddresses = (): Address[] => [
    {
      id: 1,
      name: "Meow Meow",
      phone: "(+66)090-000-0000",
      address: "บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
      addressEn: "Bluebik Vulcan Company Limited (Head Office) Tax ID : 0105565196514 No.199 S-OASIS Building, 11th Floor, Unit no. 1103-1106, Vibhavadi Rangsit Road, Chomphon, Chatuchak, Bangkok 10900",
      isDefault: true
    },
    {
      id: 2,
      name: "Meow Meow",
      phone: "(+66)090-000-0000",
      address: "บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)  เลขประจำตัวผู้เสียภาษี 0105565196514 เลขที่ 199 อาคารเอส โอเอซิส ชั้น 11 ห้องเลขที่ 1103-1106 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
      addressEn: "Bluebik Vulcan Company Limited (Head Office) Tax ID : 0105565196514 No.199 S-OASIS Building, 11th Floor, Unit no. 1103-1106, Vibhavadi Rangsit Road, Chomphon, Chatuchak, Bangkok 10900",
      isDefault: false
    }
  ]

  // Handle delete address
  const handleDelete = (id: number) => {
    if (confirm('คุณต้องการลบที่อยู่นี้หรือไม่?')) {
      const updatedAddresses = addresses.filter(addr => addr.id !== id)
      // If deleted address was default, set first address as default
      const deletedAddress = addresses.find(addr => addr.id === id)
      if (deletedAddress?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true
      }
      setAddresses(updatedAddresses)
      localStorage.setItem('petshop_addresses', JSON.stringify(updatedAddresses))
      showToast('ลบที่อยู่สำเร็จ', 'success')
    }
  }

  // Handle set default address
  const handleSetDefault = (id: number) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    setAddresses(updatedAddresses)
    localStorage.setItem('petshop_addresses', JSON.stringify(updatedAddresses))
    showToast('ตั้งเป็นที่อยู่หลักสำเร็จ', 'success')
  }

  // Handle edit
  const handleEdit = (id: number) => {
    const address = addresses.find(addr => addr.id === id)
    if (address) {
      setSelectedAddress(id)
      // Parse name to firstName and lastName
      const nameParts = address.name.split(' ')
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        phone: address.phone.replace(/[()]/g, '').replace(/\s/g, ''),
        address: address.address,
        province: '',
        district: '',
        road: '',
        postalCode: ''
      })
      setShowEditModal(true)
    }
  }

  // Handle add submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error')
      return
    }

    const newAddress: Address = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: formData.address,
      addressEn: formData.address, // Use same address for now
      isDefault: addresses.length === 0 // First address is default
    }

    // If this is first address, set as default
    // Otherwise, if no default exists, set this as default
    if (addresses.length === 0 || !addresses.some(addr => addr.isDefault)) {
      newAddress.isDefault = true
    }

    const updatedAddresses = [...addresses, newAddress]
    setAddresses(updatedAddresses)
    localStorage.setItem('petshop_addresses', JSON.stringify(updatedAddresses))
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      province: '',
      district: '',
      road: '',
      postalCode: ''
    })
    setShowAddModal(false)
    showToast('เพิ่มที่อยู่สำเร็จ', 'success')
  }

  // Handle edit submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAddress) return

    // Validate
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error')
      return
    }

    const updatedAddresses = addresses.map(addr => 
      addr.id === selectedAddress
        ? {
            ...addr,
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: formData.address,
            addressEn: formData.address
          }
        : addr
    )
    
    setAddresses(updatedAddresses)
    localStorage.setItem('petshop_addresses', JSON.stringify(updatedAddresses))
    
    // Reset
    setSelectedAddress(null)
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      province: '',
      district: '',
      road: '',
      postalCode: ''
    })
    setShowEditModal(false)
    showToast('แก้ไขที่อยู่สำเร็จ', 'success')
  }

  // Handle save button (main page)
  const handleSave = () => {
    // Addresses are already saved to localStorage via useEffect
    showToast('บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
  }

  // Reset form when opening add modal
  const handleOpenAddModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      province: '',
      district: '',
      road: '',
      postalCode: ''
    })
    setShowAddModal(true)
  }

  return (
    <main className={styles.main}>
      <div className="container-responsive">
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>My Profile</h1>
          </div>

          <div className={styles.flexContainer}>
            {/* Sidebar */}
            <ProfileSidebar />

            {/* Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.contentHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>ที่อยู่ของฉัน</h2>
                  <p className={styles.sectionDescription}>
                    จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                  </p>
                </div>
                <button 
                  onClick={handleOpenAddModal}
                  className={styles.addButton}
                >
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/85456dbddef44f1ec86f5e003221c58a31f1e87a"
                    alt="Add"
                    className={styles.addIcon}
                  />
                  เพิ่มที่อยู่
                </button>
              </div>

              <div className={styles.divider}></div>

              {/* Addresses List */}
              <div className={styles.addressList}>
                {addresses.map((address, index) => (
                  <div key={address.id}>
                    <div className={styles.addressItem}>
                      <img 
                        src="https://api.builder.io/api/v1/image/assets/TEMP/7ede9f2b16206bf9f2c70c68fa2058b9188ea1a9"
                        alt="Location"
                        className={styles.addressIcon}
                      />
                      <div className={styles.addressContent}>
                        <div className={styles.addressHeader}>
                          <h3 className={styles.addressLabel}>ที่อยู่</h3>
                          {address.isDefault && (
                            <span className={styles.defaultBadge}>
                              ที่อยู่หลัก
                            </span>
                          )}
                        </div>
                        <p className={styles.addressName}>
                          {address.name} | {address.phone}
                        </p>
                        <p className={styles.addressText}>
                          {address.address}
                        </p>
                        {address.addressEn && (
                          <p className={styles.addressText}>
                            {address.addressEn}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDelete(address.id)}
                        className={styles.deleteButton}
                      >
                        ลบ
                      </button>
                    </div>

                    <div className={styles.addressActions}>
                      <button 
                        onClick={() => handleEdit(address.id)}
                        className={styles.editButton}
                      >
                        <span className={styles.editText}>แก้ไข</span>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/ae5a90e8d55e5378329581ced7d9028a3bf964df"
                          alt="Edit"
                          className={styles.editIcon}
                        />
                      </button>
                      {!address.isDefault && (
                        <button 
                          onClick={() => handleSetDefault(address.id)}
                          className={styles.setDefaultButton}
                        >
                          ตั้งเป็นที่อยู่หลัก
                        </button>
                      )}
                    </div>
                    
                    {index < addresses.length - 1 && (
                      <div className={styles.divider}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className={styles.saveButtonContainer}>
                <button 
                  onClick={handleSave}
                  className={styles.saveButton}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/45f2260ea667bf4e0f39c8e4969ecc384b910e31"
                alt="Address"
                className={styles.modalIcon}
              />
              <h2 className={styles.modalTitle}>เพิ่มที่อยู่</h2>
            </div>

            <form className={styles.form} onSubmit={handleAddSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ชื่อ</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="ชื่อ"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>นามสกุล</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="นามสกุล"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="หมายเลขโทรศัพท์"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ที่อยู่</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder=""
                    rows={6}
                    className={styles.textarea}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>จังหวัด</label>
                    <select className={styles.select} disabled>
                      <option>เลือกจังหวัด</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>เขต/อำเภอ</label>
                    <select className={styles.select} disabled>
                      <option>เลือกเขต</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ถนน</label>
                    <select className={styles.select} disabled>
                      <option>เลือกถนน</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>รหัสไปรษณีย์</label>
                    <select className={styles.select} disabled>
                      <option>เลือกรหัสไปรษณีย์</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={styles.cancelButton}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditModal && selectedAddress && (
        <div className={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/45f2260ea667bf4e0f39c8e4969ecc384b910e31"
                alt="Address"
                className={styles.modalIcon}
              />
              <h2 className={styles.modalTitle}>แก้ไขที่อยู่</h2>
            </div>

            <form className={styles.form} onSubmit={handleEditSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ชื่อ</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>นามสกุล</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ที่อยู่</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={6}
                    className={styles.textarea}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>จังหวัด</label>
                    <select className={styles.select} disabled>
                      <option>กรุงเทพมหานคร</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>เขต/อำเภอ</label>
                    <select className={styles.select} disabled>
                      <option>จตุจักร</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ถนน</label>
                    <select className={styles.select} disabled>
                      <option>วิภาวดีรังสิต</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>รหัสไปรษณีย์</label>
                    <select className={styles.select} disabled>
                      <option>10900</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={styles.cancelButton}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
