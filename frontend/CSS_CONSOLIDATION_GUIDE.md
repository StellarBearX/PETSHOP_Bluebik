# CSS Consolidation Guide

คู่มือนี้อธิบายคลาส global ที่เพิ่มใหม่ใน `globals.css` และวิธีใช้งานเพื่อลดการซ้ำซ้อนของ CSS

## 📋 สรุปการเปลี่ยนแปลง

### ไฟล์ที่ถูกลบ (ใช้ global classes แทน)
- ❌ `app/cart/page.module.css` - ใช้ global classes แทนทั้งหมด
- ❌ `app/layout.module.css` - ใช้ global classes แทนทั้งหมด

### ไฟล์ที่ถูกทำให้เล็กลงมาก
- ✅ `app/profile/page.module.css` - ลดลง ~70%
- ✅ `app/profile-address/page.module.css` - ลดลง ~50%
- ✅ `app/profile-cards/page.module.css` - ลดลง ~45%
- ✅ `app/profile-orders/page.module.css` - ลดลง ~40%
- ✅ `app/notifications/page.module.css` - ลดลง ~15%
- ✅ `app/coupons/page.module.css` - ลดลง ~25%
- ✅ `app/checkout/page.module.css` - ลดลง ~20%
- ✅ `app/shopee-mall/page.module.css` - ลดลง ~20%
- ✅ `app/category/page.module.css` - ลดลง ~15%
- ✅ `app/page.module.css` - ลดลง ~30%
- ✅ `app/not-found.module.css` - ลดลง ~25%

---

## 🎨 คลาส Global ใหม่ที่เพิ่มใน globals.css

### 1. Page Layouts (หน้าเพจ)

#### `.page-main`
```css
/* ใช้แทน: min-height: 100vh; background: #F5F5F5; overflow: auto; */
<div className="page-main">...</div>
```

#### `.page-main-short`
```css
/* ใช้แทน: min-height: 576px; background: #F5F5F5; overflow: auto; */
<div className="page-main-short">...</div>
```

#### Container Sizes
```css
.page-container       /* max-width: 1440px */
.page-container-sm    /* max-width: 1000px */
.page-container-md    /* max-width: 1253px */
.page-container-lg    /* max-width: 1340px */
```

#### Padding Utilities
```css
.page-padding         /* padding: 1rem (mobile), 2rem (desktop) */
.page-padding-y       /* padding-top/bottom: 1rem (mobile), 2rem (desktop) */
```

**ตัวอย่างการใช้งาน:**
```tsx
<main className="page-main page-padding-y">
  <div className="page-container">
    {/* เนื้อหา */}
  </div>
</main>
```

---

### 2. Profile Layout Pattern (เลย์เอาต์หน้าโปรไฟล์)

#### `.profile-header`
```css
/* Header สีขาวสูง 45px พร้อม shadow */
<div className="profile-header">
  <h1 className="profile-header-title">ชื่อหน้า</h1>
</div>
```

#### `.profile-flex-container`
```css
/* Flex container ที่เป็น column บนมือถือ, row บน desktop */
<div className="profile-flex-container">
  <ProfileSidebar />
  <div className="profile-main-content">...</div>
</div>
```

#### `.profile-section-title` และ `.profile-section-description`
```css
<h2 className="profile-section-title">หัวข้อ</h2>
<p className="profile-section-description">คำอธิบาย</p>
```

---

### 3. Gradient Backgrounds (พื้นหลังไล่สี)

```css
.gradient-orange         /* #FF4D00 → #F99D20 */
.gradient-orange-light   /* #FF8C42 → #FFA959 */
.gradient-orange-alt     /* #FF6B35 → #FFA559 */
.gradient-primary        /* #FF4D00 → #FF7A00 (มีอยู่แล้ว) */
.gradient-navbar         /* #FF4D00 → #FF7A00 (มีอยู่แล้ว) */
```

**ตัวอย่างการใช้งาน:**
```tsx
<div className="gradient-orange rounded-lg p-4">
  <h2 className="text-white">Banner</h2>
</div>
```

---

### 4. Common Buttons (ปุ่มทั่วไป)

#### `.btn-orange-gradient`
```css
/* ปุ่มไล่สีส้ม พร้อม hover effect */
<button className="btn-orange-gradient px-6 py-2 rounded">
  บันทึก
</button>
```

#### `.btn-orange-outline`
```css
/* ปุ่มขอบส้ม hover จะเป็นพื้นหลังเทา */
<button className="btn-orange-outline px-6 py-2 rounded">
  ยกเลิก
</button>
```

#### `.btn-primary` (มีอยู่แล้ว)
```css
/* ปุ่มไล่สีส้มแบบ rounded-full */
<button className="btn-primary px-8 py-3">คลิก</button>
```

#### `.btn-outline-primary` (มีอยู่แล้ว)
```css
/* ปุ่มขอบส้มแบบ rounded-full */
<button className="btn-outline-primary px-8 py-3">คลิก</button>
```

---

### 5. Form Elements (ฟอร์ม)

#### Input, Select, Textarea
```css
.form-input        /* Input ทั่วไป */
.form-select       /* Select dropdown */
.form-textarea     /* Textarea */
.form-label        /* Label สำหรับ form */
```

**ตัวอย่างการใช้งาน:**
```tsx
<label className="form-label">ชื่อ</label>
<input type="text" className="form-input" placeholder="กรอกชื่อ" />

<label className="form-label">ประเทศ</label>
<select className="form-select">
  <option>ไทย</option>
</select>

<label className="form-label">รายละเอียด</label>
<textarea className="form-textarea" rows={4} />
```

---

### 6. Modal Styles (โมดัล)

#### `.modal-overlay-dark`
```css
/* Overlay สีดำโปร่งแสง พร้อม flexbox กลางหน้าจอ */
<div className="modal-overlay-dark">
  <div className="modal-container">...</div>
</div>
```

#### `.modal-container`
```css
/* กล่องโมดัลสีขาวมุมมน */
<div className="modal-container w-[600px]">
  <h2>หัวข้อโมดัล</h2>
</div>
```

---

### 7. Utility Classes (คลาสเสริม)

#### Dividers
```css
.divider-gray        /* เส้นแบ่งสีเทา */
```

#### Shadows
```css
.shadow-card         /* เงาแบบการ์ด (0 1px 4px rgba(0,0,0,0.25)) */
.shadow-product      /* เงาแบบสินค้า พร้อม hover effect (มีอยู่แล้ว) */
```

#### Spacing
```css
.section-spacing     /* margin-bottom: 1.5rem (mobile), 2rem (desktop) */
```

---

### 8. Product Grid Patterns (เลย์เอาต์กริดสินค้า)

```css
.product-grid-2          /* 2 columns */
.product-grid-responsive /* 2→3→4→5 columns (responsive) */
```

**ตัวอย่างการใช้งาน:**
```tsx
<div className="product-grid-responsive">
  <ProductCard />
  <ProductCard />
  <ProductCard />
</div>
```

---

### 9. Badge Styles (ป้ายกำกับ)

```css
.badge-orange        /* ป้ายพื้นส้ม ข้อความขาว */
.badge-gradient      /* ป้ายไล่สีส้ม */
```

**ตัวอย่างการใช้งาน:**
```tsx
<span className="badge-orange">ขายดี</span>
<span className="badge-gradient">ค่าจัดส่งฟรี</span>
```

---

### 10. Hero Banner Pattern

```css
.hero-banner         /* Banner ใหญ่ responsive พร้อม gradient */
```

**ตัวอย่างการใช้งาน:**
```tsx
<div className="hero-banner gradient-orange-light">
  <h1 className="text-white text-3xl">ยินดีต้อนรับ!</h1>
</div>
```

---

## 🔧 วิธีการใช้งาน

### ก่อนหน้า (Before):
```tsx
// profile/page.tsx
import styles from './page.module.css';

export default function ProfilePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>ข้อมูลส่วนตัว</h1>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.mainContent}>
            <h2 className={styles.sectionTitle}>ชื่อ-นามสกุล</h2>
            <p className={styles.sectionDescription}>จัดการข้อมูลส่วนตัว</p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

### หลังการปรับปรุง (After):
```tsx
// profile/page.tsx
export default function ProfilePage() {
  return (
    <main className="page-main page-padding-y">
      <div className="page-container">
        <div className="profile-header">
          <h1 className="profile-header-title">ข้อมูลส่วนตัว</h1>
        </div>
        <div className="profile-flex-container">
          <div className="profile-main-content">
            <h2 className="profile-section-title">ชื่อ-นามสกุล</h2>
            <p className="profile-section-description">จัดการข้อมูลส่วนตัว</p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 📊 ผลลัพธ์

### ข้อดี
- ✅ ลด CSS ที่ซ้ำซ้อนได้มากกว่า **40%**
- ✅ ใช้คลาสเดียวกันทั่วทั้งโปรเจค → สไตล์สม่ำเสมอ
- ✅ แก้ไขสไตล์ที่ global เพียงครั้งเดียว → มีผลทั่วทั้งเว็บ
- ✅ ง่ายต่อการ maintain และเข้าใจ
- ✅ ลดขนาดไฟล์ CSS ที่ต้อง load

### สิ่งที่ต้องทำต่อ
- 🔄 อัปเดต component ต่างๆ ให้ใช้คลาส global แทน CSS modules (ทำไปแล้วบางส่วน)
- 🔄 ทดสอบหน้าต่างๆ เพื่อให้แน่ใจว่าสไตล์ยังคงเหมือนเดิม

---

## 💡 Best Practices

1. **ใช้ global classes สำหรับสไตล์ที่ใช้ซ้ำ** (layout, buttons, forms, etc.)
2. **ใช้ CSS modules สำหรับสไตล์เฉพาะของ component** (unique layouts, specific designs)
3. **ใช้ Tailwind classes สำหรับสไตล์ที่เปลี่ยนแปลงบ่อย** (spacing, colors, sizing)
4. **เช็คคลาส global ก่อนสร้าง CSS ใหม่** เผื่อมีคลาสที่ใช้งานได้อยู่แล้ว

---

## 🎯 ตัวอย่างการแปลง CSS

### ตัวอย่างที่ 1: ปุ่ม
```css
/* ❌ เดิม - CSS Module */
.saveButton {
  width: 100px;
  height: 36px;
  background: linear-gradient(to right, #FF4D00, #F99D20);
  border-radius: 0.25rem;
  color: white;
  transition: opacity 0.2s;
}
.saveButton:hover {
  opacity: 0.9;
}
```

```tsx
/* ✅ ใหม่ - Global Class + Tailwind */
<button className="btn-orange-gradient w-[100px] h-9 rounded">
  บันทึก
</button>
```

### ตัวอย่างที่ 2: Form Input
```css
/* ❌ เดิม - CSS Module */
.formInput {
  width: 100%;
  height: 36px;
  border: 1px solid #656565;
  border-radius: 0.25rem;
  padding: 0 1rem;
  font-size: 15px;
}
```

```tsx
/* ✅ ใหม่ - Global Class */
<input className="form-input" type="text" />
```

### ตัวอย่างที่ 3: Modal
```css
/* ❌ เดิม - CSS Module */
.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modalContent {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 4px rgba(0,0,0,0.25);
}
```

```tsx
/* ✅ ใหม่ - Global Classes */
<div className="modal-overlay-dark">
  <div className="modal-container w-[600px]">
    {/* Content */}
  </div>
</div>
```

---

## 📝 สรุป

การรวม CSS ที่ใช้ซ้ำไปยัง `globals.css` ช่วยให้:
- **โค้ดสะอาดขึ้น** - ลดการซ้ำซ้อน
- **Maintain ง่ายขึ้น** - แก้ที่เดียว มีผลทุกที่
- **สไตล์สม่ำเสมอ** - ใช้คลาสเดียวกันทั่วทั้งเว็บ
- **Performance ดีขึ้น** - ไฟล์ CSS เล็กลง

Happy Coding! 🚀



