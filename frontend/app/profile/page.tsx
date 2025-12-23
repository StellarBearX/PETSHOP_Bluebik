"use client"
// Profile Page - แก้ไขข้อมูลส่วนตัว
// Features: Form validation, Image upload, Save to localStorage, Auto-update ProfileDropdown & ProfileSidebar
import { useState, useRef, useEffect } from 'react'
import ProfileSidebar from '@/Components/Profile/ProfileSidebar/ProfileSidebar'
import { useToast } from '@/contexts/ToastContext'
import { IMAGES } from '@/lib/images'
import LoadingSpinner from '@/Components/UI/LoadingSpinner/LoadingSpinner'
import styles from './page.module.css'

export default function ProfilePage() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    firstName: 'Meow',
    lastName: 'Meow',
    email: 'meow.me@gmail.com',
    phone: '090-000-0000',
    gender: 'female',
    day: '9',
    month: 'สิงหาคม',
    year: '2567'
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [profileImage, setProfileImage] = useState<string>(IMAGES.profile.defaultImage)
  const [imageError, setImageError] = useState<string>('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load profile data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('petshop_profile')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed)
      } catch (e) {
        console.error('Error loading profile:', e)
      }
    }
    
    const savedImage = localStorage.getItem('petshop_profile_image')
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // First Name
    if (!formData.firstName.trim()) {
      errors.firstName = 'กรุณากรอกชื่อ'
    }

    // Last Name
    if (!formData.lastName.trim()) {
      errors.lastName = 'กรุณากรอกนามสกุล'
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'กรุณากรอกอีเมล'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'กรุณากรอกอีเมลที่ถูกต้อง'
    }

    // Phone
    const phoneRegex = /^[0-9-]+$/
    if (!formData.phone.trim()) {
      errors.phone = 'กรุณากรอกหมายเลขโทรศัพท์'
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      setShowConfirmModal(true)
    }
  }

  const handleConfirmSave = async () => {
    setIsLoading(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Handle save logic here
    console.log('Saving profile data:', formData)
    // Save to localStorage (mock)
    localStorage.setItem('petshop_profile', JSON.stringify(formData))
    if (profileImage && profileImage !== IMAGES.profile.defaultImage) {
      localStorage.setItem('petshop_profile_image', profileImage)
    }
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new Event('profileUpdated'))
    
    setIsLoading(false)
    setShowConfirmModal(false)
    setShowSuccessModal(true)
    showToast('บันทึกข้อมูลสำเร็จ', 'success')
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageError('')
    setIsUploading(true)

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      setImageError('กรุณาเลือกไฟล์ .JPEG หรือ .PNG เท่านั้น')
      setIsUploading(false)
      return
    }

    // Validate file size (1 MB = 1048576 bytes)
    if (file.size > 1048576) {
      setImageError('ขนาดไฟล์ต้องไม่เกิน 1 MB')
      setIsUploading(false)
      return
    }

    // Read file and create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
      setIsUploading(false)
      showToast('อัปโหลดรูปภาพสำเร็จ', 'success')
    }
    reader.onerror = () => {
      setImageError('เกิดข้อผิดพลาดในการอ่านไฟล์')
      setIsUploading(false)
      showToast('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ', 'error')
    }
    reader.readAsDataURL(file)
  }

  // Handle upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleCancelSave = () => {
    setShowConfirmModal(false)
  }

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
  }

  return (
    <main className={styles.main}>
      <div className="container-responsive">
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>
              My Profile
            </h1>
          </div>

          <div className={styles.flexContainer}>
            {/* Sidebar */}
            <ProfileSidebar />

            {/* Main Content */}
            <div className={styles.mainContent}>
              <div>
                <h2 className={styles.sectionTitle}>ข้อมูลของฉัน</h2>
                <p className={styles.sectionDescription}>
                  จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                </p>
              </div>

              <div className={styles.formContainer}>
                <div className={styles.formSection}>
                  {/* Username Section */}
                  <div className={styles.formGroup}>
                    <h3 className={styles.formGroupTitle}>ชื่อผู้ใช้</h3>
                    
                    {/* First Name */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>ชื่อ</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({...formData, firstName: e.target.value})
                          if (formErrors.firstName) {
                            setFormErrors({...formErrors, firstName: ''})
                          }
                        }}
                        className={styles.input}
                      />
                      {formErrors.firstName && (
                        <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                          {formErrors.firstName}
                        </span>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>นามสกุล</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({...formData, lastName: e.target.value})
                          if (formErrors.lastName) {
                            setFormErrors({...formErrors, lastName: ''})
                          }
                        }}
                        className={styles.input}
                      />
                      {formErrors.lastName && (
                        <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                          {formErrors.lastName}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>อีเมล</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value})
                          if (formErrors.email) {
                            setFormErrors({...formErrors, email: ''})
                          }
                        }}
                        className={`${styles.input} ${styles.inputEmail}`}
                      />
                      {formErrors.email && (
                        <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>หมายเลขโทรศัพท์</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({...formData, phone: e.target.value})
                          if (formErrors.phone) {
                            setFormErrors({...formErrors, phone: ''})
                          }
                        }}
                        className={`${styles.input} ${styles.inputEmail}`}
                      />
                      {formErrors.phone && (
                        <span style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.25rem', display: 'block' }}>
                          {formErrors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Gender */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>เพศ</label>
                    <div className={styles.genderOptions}>
                      <label className={styles.radioLabel}>
                        <div className={styles.radioOuter}>
                          <div className={`${styles.radioCircle} ${formData.gender === 'female' ? styles.radioCircleActive : ''}`}></div>
                          {formData.gender === 'female' && (
                            <div className={styles.radioInner}></div>
                          )}
                        </div>
                        <span className={styles.radioText}>หญิง</span>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="sr-only"
                        />
                      </label>
                      <label className={styles.radioLabel}>
                        <div className={styles.radioOuter}>
                          <div className={styles.radioCircle}></div>
                          {formData.gender === 'male' && (
                            <div className={styles.radioInner}></div>
                          )}
                        </div>
                        <span className={styles.radioText}>ชาย</span>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="sr-only"
                        />
                      </label>
                      <label className={styles.radioLabel}>
                        <div className={styles.radioOuter}>
                          <div className={styles.radioCircle}></div>
                          {formData.gender === 'other' && (
                            <div className={styles.radioInner}></div>
                          )}
                        </div>
                        <span className={styles.radioText}>อื่นๆ</span>
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={formData.gender === 'other'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>วัน/เดือน/ปี เกิด</label>
                    <div className={styles.dateInputs}>
                      <div className={styles.selectWrapper}>
                        <select
                          value={formData.day}
                          onChange={(e) => setFormData({...formData, day: e.target.value})}
                          className={styles.select}
                        >
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <option key={day} value={day.toString()}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <img 
                          src={IMAGES.settingsIcon}
                          alt=""
                          className={styles.selectIcon}
                        />
                      </div>
                      <div className={styles.selectWrapper}>
                        <select
                          value={formData.month}
                          onChange={(e) => setFormData({...formData, month: e.target.value})}
                          className={styles.select}
                        >
                          <option value="มกราคม">มกราคม</option>
                          <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                          <option value="มีนาคม">มีนาคม</option>
                          <option value="เมษายน">เมษายน</option>
                          <option value="พฤษภาคม">พฤษภาคม</option>
                          <option value="มิถุนายน">มิถุนายน</option>
                          <option value="กรกฎาคม">กรกฎาคม</option>
                          <option value="สิงหาคม">สิงหาคม</option>
                          <option value="กันยายน">กันยายน</option>
                          <option value="ตุลาคม">ตุลาคม</option>
                          <option value="พฤศจิกายน">พฤศจิกายน</option>
                          <option value="ธันวาคม">ธันวาคม</option>
                        </select>
                        <img 
                          src={IMAGES.settingsIcon}
                          alt=""
                          className={styles.selectIcon}
                        />
                      </div>
                      <div className={styles.selectWrapper}>
                        <select
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className={styles.select}
                        >
                          {Array.from({ length: 100 }, (_, i) => 2567 - i).map((year) => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <img 
                          src={IMAGES.settingsIcon}
                          alt=""
                          className={styles.selectIcon}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className={styles.saveButtonContainer}>
                    <button 
                      onClick={handleSave}
                      className={styles.saveButton}
                      disabled={isLoading}
                      style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    >
                      {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className={styles.profilePicSection}>
                  <img 
                    src={profileImage}
                    alt="Profile Picture"
                    className={styles.profilePic}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button 
                    type="button"
                    onClick={handleUploadClick}
                    className={styles.uploadButton}
                    disabled={isUploading}
                    style={{ opacity: isUploading ? 0.6 : 1, cursor: isUploading ? 'not-allowed' : 'pointer' }}
                  >
                    {isUploading ? 'กำลังอัปโหลด...' : 'เลือกรูป'}
                  </button>
                  {imageError && (
                    <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '0.5rem', textAlign: 'center' }}>
                      {imageError}
                    </p>
                  )}
                  <p className={styles.uploadNote}>
                    ขนาดไฟล์: สูงสุด 1 MB<br/>
                    ไฟล์ที่รองรับ: .JPEG, .PNG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Save Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay} onClick={handleCancelSave}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            {/* Warning Icon */}
            <div className={styles.warningIconContainer}>
              <div className={styles.warningIconCircle}>
                <svg className={styles.bellIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className={styles.exclamationMark}>!</div>
              </div>
            </div>

            {/* Warning Message */}
            <div className={styles.warningMessage}>
              <p className={styles.warningText}>มีการแก้ไขข้อมูล</p>
              <p className={styles.warningText}>ต้องการออกจากหน้านี้หรือไม่</p>
            </div>

            {/* Buttons */}
            <div className={styles.confirmModalButtons}>
              <button 
                onClick={handleCancelSave}
                className={styles.cancelSaveButton}
                disabled={isLoading}
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleConfirmSave}
                className={styles.confirmSaveButton}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
              >
                {isLoading ? <LoadingSpinner size="small" /> : 'ตกลง'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={handleCloseSuccess}>
          <div className={styles.successModal} onClick={(e) => e.stopPropagation()}>
            {/* Success Icon */}
            <div className={styles.successIconContainer}>
              <div className={styles.successIconCircle}>
                <svg className={styles.successCheckmark} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h2 className={styles.successTitle}>
              แก้ไขข้อมูลสำเร็จ
            </h2>

            {/* Close Button */}
            <button 
              onClick={handleCloseSuccess}
              className={styles.successCloseButton}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
