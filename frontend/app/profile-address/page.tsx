"use client"
import { useState } from 'react'
import ProfileSidebar from '@/Components/ProfileSidebar'
import styles from './page.module.css'

export default function AddressPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  
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

  const addresses = [
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

  const handleEdit = (id: number) => {
    setSelectedAddress(id)
    setShowEditModal(true)
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
                  onClick={() => setShowAddModal(true)}
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
                {addresses.map((address) => (
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
                        <p className={styles.addressText}>
                          {address.addressEn}
                        </p>
                      </div>
                      <button className={styles.deleteButton}>
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
                        <button className={styles.setDefaultButton}>
                          ตั้งเป็นที่อยู่หลัก
                        </button>
                      )}
                    </div>
                    
                    {address.id !== addresses.length && (
                      <div className={styles.divider}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className={styles.saveButtonContainer}>
                <button className={styles.saveButton}>
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

            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ชื่อ</label>
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>นามสกุล</label>
                  <input
                    type="text"
                    placeholder="นามสกุล"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  placeholder="หมายเลขโทรศัพท์"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ที่อยู่</label>
                  <textarea
                    placeholder=""
                    rows={6}
                    className={styles.textarea}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>จังหวัด</label>
                    <select className={styles.select}>
                      <option>เลือกจังหวัด</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>เขต/อำเภอ</label>
                    <select className={styles.select}>
                      <option>เลือกเขต</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ถนน</label>
                    <select className={styles.select}>
                      <option>เลือกถนน</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>รหัสไปรษณีย์</label>
                    <select className={styles.select}>
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
      {showEditModal && (
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

            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ชื่อ</label>
                  <input
                    type="text"
                    defaultValue="Meow"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>นามสกุล</label>
                  <input
                    type="text"
                    defaultValue="Meow"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>หมายเลขโทรศัพท์</label>
                <input
                  type="text"
                  defaultValue="090-000-0000"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ที่อยู่</label>
                  <textarea
                    defaultValue="บริษัท บลูบิค วัลแคน  จำกัด  (สำนักงานใหญ่)"
                    rows={6}
                    className={styles.textarea}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>จังหวัด</label>
                    <select className={styles.select}>
                      <option>กรุงเทพมหานคร</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>เขต/อำเภอ</label>
                    <select className={styles.select}>
                      <option>จตุจักร</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ถนน</label>
                    <select className={styles.select}>
                      <option>วิภาวดีรังสิต</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>รหัสไปรษณีย์</label>
                    <select className={styles.select}>
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
