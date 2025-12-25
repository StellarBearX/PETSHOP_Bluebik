"use client"
// Profile Address Page - จัดการที่อยู่
// Features: Add/Edit/Delete addresses, Set default, Form validation, Data persistence, เชื่อมกับ Checkout
import { useState, useEffect } from 'react'
import { IMAGES } from "@/lib/images";
import ProfileSidebar from '@/Components/Profile/ProfileSidebar/ProfileSidebar'
import { useToast } from '@/contexts/ToastContext'
import LoadingSpinner from '@/Components/UI/LoadingSpinner/LoadingSpinner'
import styles from './page.module.css'

interface Address {
  id: number
  name: string
  phone: string
  address: string
  addressEn?: string
  isDefault: boolean
}

// Mock data for Thai provinces, districts, roads, and postal codes
interface LocationData {
  province: string
  districts: {
    name: string
    roads: string[]
    postalCodes: string[]
  }[]
}

const locationData: LocationData[] = [
  {
    province: 'กรุงเทพมหานคร',
    districts: [
      {
        name: 'จตุจักร',
        roads: ['วิภาวดีรังสิต', 'พหลโยธิน', 'เสนานิคม', 'จตุจักร'],
        postalCodes: ['10900', '10901', '10902']
      },
      {
        name: 'บางรัก',
        roads: ['สีลม', 'สุรวงศ์', 'เจริญกรุง', 'บางรัก'],
        postalCodes: ['10500', '10501']
      },
      {
        name: 'สาทร',
        roads: ['สาทรเหนือ', 'สาทรใต้', 'เจริญกรุง', 'สีลม'],
        postalCodes: ['10120', '10121']
      }
    ]
  },
  {
    province: 'นนทบุรี',
    districts: [
      {
        name: 'เมืองนนทบุรี',
        roads: ['บางกรวย-ไทรน้อย', 'รัตนาธิเบศร์', 'ติวานนท์'],
        postalCodes: ['11000', '11001']
      },
      {
        name: 'บางกรวย',
        roads: ['บางกรวย', 'บางไผ่', 'บางบัวทอง'],
        postalCodes: ['11130']
      }
    ]
  },
  {
    province: 'สมุทรปราการ',
    districts: [
      {
        name: 'เมืองสมุทรปราการ',
        roads: ['สุขุมวิท', 'บางพลี', 'ศรีนครินทร์'],
        postalCodes: ['10270', '10280']
      },
      {
        name: 'บางพลี',
        roads: ['สุขุมวิท', 'บางพลี', 'บางบ่อ'],
        postalCodes: ['10540']
      }
    ]
  }
]

export default function AddressPage() {
  const { showToast } = useToast()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  
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

  // Get available districts based on selected province
  const availableDistricts = formData.province
    ? locationData.find(loc => loc.province === formData.province)?.districts || []
    : []

  // Get available roads and postal codes based on selected district
  const selectedDistrictData = formData.district
    ? availableDistricts.find(dist => dist.name === formData.district)
    : null

  const availableRoads = selectedDistrictData?.roads || []
  const availablePostalCodes = selectedDistrictData?.postalCodes || []

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
      
      // Try to parse address to extract province, district, road, postal code
      // Format: address road district province postalCode
      const addressParts = address.address.split(' ')
      let province = ''
      let district = ''
      let road = ''
      let postalCode = ''
      let mainAddress = address.address

      // Try to find postal code (5 digits at the end)
      const postalCodeMatch = address.address.match(/\b\d{5}\b/)
      if (postalCodeMatch) {
        postalCode = postalCodeMatch[0]
        mainAddress = address.address.replace(postalCode, '').trim()
      }

      // Try to find province
      const foundProvince = locationData.find(loc => 
        address.address.includes(loc.province)
      )
      if (foundProvince) {
        province = foundProvince.province
        mainAddress = mainAddress.replace(province, '').trim()
        
        // Try to find district
        const foundDistrict = foundProvince.districts.find(dist =>
          mainAddress.includes(dist.name)
        )
        if (foundDistrict) {
          district = foundDistrict.name
          mainAddress = mainAddress.replace(district, '').trim()
          
          // Try to find road
          const foundRoad = foundDistrict.roads.find(r =>
            mainAddress.includes(r)
          )
          if (foundRoad) {
            road = foundRoad
            mainAddress = mainAddress.replace(road, '').trim()
          }
        }
      }

      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        phone: address.phone.replace(/[()]/g, '').replace(/\s/g, ''),
        address: mainAddress,
        province: province,
        district: district,
        road: road,
        postalCode: postalCode
      })
      setShowEditModal(true)
    }
  }

  // Handle add submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error')
      return
    }

    if (!formData.province || !formData.district || !formData.road || !formData.postalCode) {
      showToast('กรุณาเลือกจังหวัด เขต/อำเภอ ถนน และรหัสไปรษณีย์', 'error')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Build full address string
    const fullAddress = `${formData.address} ${formData.road} ${formData.district} ${formData.province} ${formData.postalCode}`

    const newAddress: Address = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: fullAddress,
      addressEn: fullAddress, // Use same address for now
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
    setIsLoading(false)
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

    if (!formData.province || !formData.district || !formData.road || !formData.postalCode) {
      showToast('กรุณาเลือกจังหวัด เขต/อำเภอ ถนน และรหัสไปรษณีย์', 'error')
      return
    }

    // Build full address string
    const fullAddress = `${formData.address} ${formData.road} ${formData.district} ${formData.province} ${formData.postalCode}`

    const updatedAddresses = addresses.map(addr => 
      addr.id === selectedAddress
        ? {
            ...addr,
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: fullAddress,
            addressEn: fullAddress
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
                    src={IMAGES.addIcon}
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
                        src={IMAGES.locationIcon}
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
                          src={IMAGES.editIcon}
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
                src={IMAGES.addressIcon}
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
                    <select 
                      className={styles.select}
                      value={formData.province}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          province: e.target.value,
                          district: '', // Reset district when province changes
                          road: '', // Reset road when province changes
                          postalCode: '' // Reset postal code when province changes
                        })
                      }}
                    >
                      <option value="">เลือกจังหวัด</option>
                      {locationData.map((loc) => (
                        <option key={loc.province} value={loc.province}>
                          {loc.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>เขต/อำเภอ</label>
                    <select 
                      className={styles.select}
                      value={formData.district}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          district: e.target.value,
                          road: '', // Reset road when district changes
                          postalCode: '' // Reset postal code when district changes
                        })
                      }}
                      disabled={!formData.province}
                    >
                      <option value="">เลือกเขต</option>
                      {availableDistricts.map((dist) => (
                        <option key={dist.name} value={dist.name}>
                          {dist.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ถนน</label>
                    <select 
                      className={styles.select}
                      value={formData.road}
                      onChange={(e) => setFormData({ ...formData, road: e.target.value })}
                      disabled={!formData.district}
                    >
                      <option value="">เลือกถนน</option>
                      {availableRoads.map((road) => (
                        <option key={road} value={road}>
                          {road}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>รหัสไปรษณีย์</label>
                    <select 
                      className={styles.select}
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      disabled={!formData.district}
                    >
                      <option value="">เลือกรหัสไปรษณีย์</option>
                      {availablePostalCodes.map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <LoadingSpinner size="small" />
                      กำลังบันทึก...
                    </span>
                  ) : (
                    'บันทึก'
                  )}
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
                src={IMAGES.addressIcon}
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
                    <select 
                      className={styles.select}
                      value={formData.province}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          province: e.target.value,
                          district: '', // Reset district when province changes
                          road: '', // Reset road when province changes
                          postalCode: '' // Reset postal code when province changes
                        })
                      }}
                    >
                      <option value="">เลือกจังหวัด</option>
                      {locationData.map((loc) => (
                        <option key={loc.province} value={loc.province}>
                          {loc.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>เขต/อำเภอ</label>
                    <select 
                      className={styles.select}
                      value={formData.district}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          district: e.target.value,
                          road: '', // Reset road when district changes
                          postalCode: '' // Reset postal code when district changes
                        })
                      }}
                      disabled={!formData.province}
                    >
                      <option value="">เลือกเขต</option>
                      {availableDistricts.map((dist) => (
                        <option key={dist.name} value={dist.name}>
                          {dist.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ถนน</label>
                    <select 
                      className={styles.select}
                      value={formData.road}
                      onChange={(e) => setFormData({ ...formData, road: e.target.value })}
                      disabled={!formData.district}
                    >
                      <option value="">เลือกถนน</option>
                      {availableRoads.map((road) => (
                        <option key={road} value={road}>
                          {road}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>รหัสไปรษณีย์</label>
                    <select 
                      className={styles.select}
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      disabled={!formData.district}
                    >
                      <option value="">เลือกรหัสไปรษณีย์</option>
                      {availablePostalCodes.map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <LoadingSpinner size="small" />
                      กำลังบันทึก...
                    </span>
                  ) : (
                    'บันทึก'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
