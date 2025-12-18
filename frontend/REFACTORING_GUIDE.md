# CSS Refactoring Guide

## Overview
โค้ดได้ถูก refactor จาก inline Tailwind classes ให้เป็น modular components พร้อม CSS Modules เพื่อให้ maintain ได้ง่ายขึ้น

## Components ที่สร้างใหม่

### 1. **BannerCarousel** (`Components/BannerCarousel.tsx`)
- Component สำหรับแสดง banner carousel
- รองรับการคลิกลูกศรซ้าย/ขวา และคลิกที่รูปเพื่อเลื่อนภาพ
- Dots แสดงสถานะภาพปัจจุบัน
- CSS แยกไว้ใน `BannerCarousel.module.css`

**Props:**
```typescript
interface BannerCarouselProps {
  images: string[]           // Array ของ URL รูปภาพ
  autoPlayInterval?: number  // (Optional) เวลาหมุนอัตโนมัติ
}
```

**การใช้งาน:**
```tsx
<BannerCarousel images={bannerImages} />
```

---

### 2. **ContentSection** (`Components/ContentSection.tsx`)
- Wrapper component สำหรับ section container
- จัดการ max-width, spacing, และ responsive padding
- CSS แยกไว้ใน `ContentSection.module.css`

**Props:**
```typescript
interface ContentSectionProps {
  children: ReactNode
  className?: string  // (Optional) เพิ่ม custom classes
}
```

**การใช้งาน:**
```tsx
<ContentSection>
  {/* content here */}
</ContentSection>
```

---

### 3. **SectionHeader** (`Components/SectionHeader.tsx`)
- Component สำหรับ header ของแต่ละ section
- รองรับ "see more" link (optional)
- มี styling สีส้ม (#FF4D00) พร้อมข้อความสีขาว
- CSS แยกไว้ใน `SectionHeader.module.css`

**Props:**
```typescript
interface SectionHeaderProps {
  title: string
  showSeeMore?: boolean      // แสดง "see more" link หรือไม่
  seeMoreHref?: string       // URL สำหรับ "see more"
}
```

**การใช้งาน:**
```tsx
<SectionHeader title="Shopping Mall" showSeeMore seeMoreHref="/shopee-mall" />
<SectionHeader title="Category" />
```

---

### 4. **SectionBody** (`Components/SectionBody.tsx`)
- Component สำหรับ body content ของ section
- รองรับ 3 ระดับ padding: small, medium, large
- มี styling พื้นฐานเหมือนกัน (สีขาว, shadow, rounded corners)
- CSS แยกไว้ใน `SectionBody.module.css`

**Props:**
```typescript
interface SectionBodyProps {
  children: ReactNode
  padding?: 'small' | 'medium' | 'large'  // Default: 'medium'
}
```

**การใช้งาน:**
```tsx
<SectionBody padding="medium">
  {/* content here */}
</SectionBody>
```

---

## โครงสร้างไฟล์ใหม่

```
frontend/
├── Components/
│   ├── BannerCarousel.tsx
│   ├── BannerCarousel.module.css
│   ├── ContentSection.tsx
│   ├── ContentSection.module.css
│   ├── SectionHeader.tsx
│   ├── SectionHeader.module.css
│   ├── SectionBody.tsx
│   ├── SectionBody.module.css
│   └── ... (components อื่นๆ)
│
└── app/
    ├── page.tsx
    ├── page.module.css
    └── globals.css
```

---

## ตัวอย่างการใช้งานใน page.tsx

### เดิม (Inline Tailwind):
```tsx
<section className="section-container">
  <div className="card-header">
    <h2 className="card-title">Shopping Mall</h2>
    <Link href="/shopee-mall" className="flex items-center gap-2 text-white text-xs md:text-sm hover:opacity-80">
      <span>see more</span>
      <img src="..." alt="" className="w-4 h-4 md:w-5 md:h-5 transform -rotate-90" />
    </Link>
  </div>
  <div className="bg-white shadow-md rounded-b-lg p-3 md:p-4">
    {/* content */}
  </div>
</section>
```

### ใหม่ (Modular Components):
```tsx
<ContentSection>
  <SectionHeader title="Shopping Mall" showSeeMore seeMoreHref="/shopee-mall" />
  <SectionBody padding="medium">
    {/* content */}
  </SectionBody>
</ContentSection>
```

---

## ประโยชน์ของการ Refactor

### ✅ Maintainability
- แก้ไข styling ได้ในที่เดียว
- ไม่ต้องหา class ที่กระจัดกระจายในหลายไฟล์

### ✅ Reusability
- ใช้ components ซ้ำได้ทั่วทั้ง project
- ลด code duplication

### ✅ Type Safety
- TypeScript interface ช่วยป้องกัน props ผิดพลาด
- IDE autocomplete ทำงานได้ดี

### ✅ Performance
- CSS Modules มี scoped styles (ไม่ชนกัน)
- Bundle size เล็กลง (dead code elimination)

### ✅ Readability
- Component names บอกความหมายชัดเจน
- JSX สั้นลง อ่านง่ายขึ้น

---

## Migration Guide

### ถ้าต้องการเพิ่ม section ใหม่:

```tsx
<ContentSection>
  <SectionHeader 
    title="Section Name" 
    showSeeMore={true}      // optional
    seeMoreHref="/link"     // optional
  />
  <SectionBody padding="medium">
    <div className={styles.customGrid}>
      {/* Your content here */}
    </div>
  </SectionBody>
</ContentSection>
```

### ถ้าต้องการ custom styling:

1. เพิ่ม CSS ใน `page.module.css` หรือสร้าง module ใหม่
2. Import และใช้:
```tsx
import styles from './page.module.css'

<div className={styles.customClass}>
  {/* content */}
</div>
```

---

## CSS Modules vs Tailwind

ตอนนี้ใช้ทั้งสองแบบ:
- **CSS Modules**: สำหรับ component structure และ layout
- **Tailwind (ใน globals.css)**: สำหรับ utility classes ที่ใช้ทั่วไป

สามารถใช้ร่วมกันได้:
```tsx
<div className={`${styles.customClass} hover:opacity-80`}>
  {/* Mix CSS Module + Tailwind */}
</div>
```

---

## Best Practices

1. **Component ควรมีหน้าที่เดียว** - แยก logic กับ presentation
2. **CSS Module สำหรับ component-specific styles**
3. **globals.css สำหรับ shared utilities**
4. **ใช้ TypeScript interfaces สำหรับ props**
5. **Comment ในกรณีที่ logic ซับซ้อน**

---

## ไฟล์ที่ถูกแก้ไข

### ไฟล์ใหม่:
- ✅ `Components/BannerCarousel.tsx` + `.module.css`
- ✅ `Components/ContentSection.tsx` + `.module.css`
- ✅ `Components/SectionHeader.tsx` + `.module.css`
- ✅ `Components/SectionBody.tsx` + `.module.css`
- ✅ `app/page.module.css`

### ไฟล์ที่แก้ไข:
- ✅ `app/page.tsx` - refactored to use new components
- ✅ `app/globals.css` - cleaned up, kept utility classes

---

## สรุป

การ refactor นี้ทำให้:
- โค้ดสั้นลง จาก ~245 บรรทัด → ~180 บรรทัด (ใน page.tsx)
- Components แยกชัดเจน ใช้ซ้ำได้
- CSS แยกเป็นไฟล์ maintain ง่าย
- Type-safe with TypeScript
- Performance ดีขึ้น (CSS Modules)

ถ้ามีคำถามหรือต้องการเพิ่ม components อื่นๆ สามารถทำตามรูปแบบนี้ได้เลยครับ! 🚀

