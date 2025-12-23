# โครงสร้างโปรเจค - คู่มือการจัดระเบียบไฟล์

## 📁 โครงสร้าง Components

Components ถูกจัดระเบียบตามหมวดหมู่เพื่อให้ง่ายต่อการค้นหาและบำรุงรักษา:

```
Components/
├── Layout/              # Layout components
│   ├── Navbar/
│   │   ├── Navbar.js
│   │   └── Navbar.module.css
│   └── Footer/
│       └── Footer.js
│
├── Modals/              # Modal dialogs
│   ├── AuthModals/
│   │   └── AuthModals.tsx
│   ├── LoginModal/
│   │   └── LoginModal.js
│   ├── RegisterModal/
│   │   └── RegisterModal.js
│   ├── SuccessModal/
│   │   └── SuccessModal.js
│   ├── CouponSelectionModal/
│   │   ├── CouponSelectionModal.tsx
│   │   └── CouponSelectionModal.module.css
│   ├── PaymentCardModal/
│   │   ├── PaymentCardModal.tsx
│   │   └── PaymentCardModal.module.css
│   └── ProductQuickViewModal/
│       ├── ProductQuickViewModal.tsx
│       └── ProductQuickViewModal.module.css
│
├── Product/             # Product-related components
│   ├── ProductCard/
│   │   ├── ProductCard.js
│   │   └── ProductCard.module.css
│   ├── ProductReviews/
│   │   ├── ProductReviews.tsx
│   │   └── ProductReviews.module.css
│   ├── ProductVariantSelector/
│   │   ├── ProductVariantSelector.tsx
│   │   └── ProductVariantSelector.module.css
│   └── StoreProfile/
│       ├── StoreProfile.tsx
│       └── StoreProfile.module.css
│
├── Profile/             # User profile components
│   ├── Profile/
│   │   └── Profile.js
│   ├── ProfileSidebar/
│   │   ├── ProfileSidebar.js
│   │   └── ProfileSidebar.module.css
│   └── ProfileDropdown/
│       ├── ProfileDropdown.js
│       └── ProfileDropdown.module.css
│
├── Carousels/           # Carousel/Slider components
│   ├── BannerCarousel/
│   │   ├── BannerCarousel.tsx
│   │   └── BannerCarousel.module.css
│   └── SimpleBannerCarousel/
│       ├── SimpleBannerCarousel.tsx
│       └── SimpleBannerCarousel.module.css
│
├── UI/                  # Reusable UI components
│   ├── Icons/
│   │   └── Icons.tsx
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.tsx
│   │   └── LoadingSpinner.module.css
│   ├── Toast/
│   │   ├── Toast.tsx
│   │   └── Toast.module.css
│   └── PageHeader/
│       ├── PageHeader.tsx
│       └── PageHeader.module.css
│
├── Content/             # Content section components
│   ├── ContentSection/
│   │   ├── ContentSection.tsx
│   │   └── ContentSection.module.css
│   ├── SectionHeader/
│   │   ├── SectionHeader.tsx
│   │   └── SectionHeader.module.css
│   └── SectionBody/
│       ├── SectionBody.tsx
│       └── SectionBody.module.css
│
└── ErrorBoundary.tsx    # Error boundary component
```

## 📁 โครงสร้าง Routes (app/)

Routes ถูกจัดระเบียบตาม Next.js App Router โดยรวมหน้า profile ย่อยๆ เข้าด้วยกัน:

```
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
├── cart/                       # Shopping cart
├── category/                   # Category/Search page
├── checkout/                   # Checkout page
├── coupons/                    # Coupons page
├── favorite/                   # Favorites page
├── notifications/              # Notifications page
├── shopee-mall/               # Shopee mall page
│
├── product/
│   └── [id]/                  # Product detail page
│
└── profile/                    # Profile section (รวมทุกหน้า profile)
    ├── page.tsx               # /profile - แก้ไขข้อมูลส่วนตัว
    ├── address/
    │   └── page.tsx          # /profile/address - จัดการที่อยู่
    ├── cards/
    │   └── page.tsx          # /profile/cards - จัดการบัตรเครดิต
    ├── coupons/
    │   └── page.tsx          # /profile/coupons - คูปองของฉัน
    └── orders/
        └── page.tsx          # /profile/orders - ประวัติคำสั่งซื้อ
```

## 🔄 Import Paths

### Components

```typescript
// Layout
import Navbar from '@/Components/Layout/Navbar/Navbar'
import Footer from '@/Components/Layout/Footer/Footer'

// Modals
import AuthModals from '@/Components/Modals/AuthModals/AuthModals'
import ProductQuickViewModal from '@/Components/Modals/ProductQuickViewModal/ProductQuickViewModal'
import CouponSelectionModal from '@/Components/Modals/CouponSelectionModal/CouponSelectionModal'

// Product
import ProductCard from '@/Components/Product/ProductCard/ProductCard'
import ProductReviews from '@/Components/Product/ProductReviews/ProductReviews'
import StoreProfile from '@/Components/Product/StoreProfile/StoreProfile'

// Profile
import ProfileSidebar from '@/Components/Profile/ProfileSidebar/ProfileSidebar'
import ProfileDropdown from '@/Components/Profile/ProfileDropdown/ProfileDropdown'

// Carousels
import BannerCarousel from '@/Components/Carousels/BannerCarousel/BannerCarousel'
import SimpleBannerCarousel from '@/Components/Carousels/SimpleBannerCarousel/SimpleBannerCarousel'

// UI
import { HeartIcon, StarRatingIcon } from '@/Components/UI/Icons/Icons'
import LoadingSpinner from '@/Components/UI/LoadingSpinner/LoadingSpinner'
import Toast from '@/Components/UI/Toast/Toast'
import PageHeader from '@/Components/UI/PageHeader/PageHeader'

// Content
import ContentSection from '@/Components/Content/ContentSection/ContentSection'
import SectionHeader from '@/Components/Content/SectionHeader/SectionHeader'

// Other
import ErrorBoundary from '@/Components/ErrorBoundary'
```

### Routes

```typescript
// Profile routes - ตอนนี้อยู่ใน /profile/...
/profile          → app/profile/page.tsx
/profile/address  → app/profile/address/page.tsx
/profile/cards    → app/profile/cards/page.tsx
/profile/coupons  → app/profile/coupons/page.tsx
/profile/orders   → app/profile/orders/page.tsx
```

## ✅ ข้อดีของโครงสร้างใหม่

1. **จัดกลุ่มตามหน้าที่** - ง่ายต่อการค้นหา component ที่ต้องการ
2. **Scalable** - เพิ่ม component ใหม่ได้ง่าย โดยใส่ในโฟลเดอร์ที่เหมาะสม
3. **Maintainable** - แก้ไขและดูแลรักษาได้สะดวก
4. **Clear Separation** - แยกส่วน UI, Business Logic, และ Layout ชัดเจน
5. **Profile Routes** - รวมหน้า profile ทั้งหมดไว้ใน `/profile/...` แทน `/profile-xxx`

## 📝 Guidelines

### เมื่อสร้าง Component ใหม่

1. **Layout Components** → `Components/Layout/`
   - เช่น Sidebar, Header, Footer

2. **Modal/Dialog** → `Components/Modals/`
   - ทุกอย่างที่เป็น popup/modal/dialog

3. **Product Related** → `Components/Product/`
   - ทุกอย่างที่เกี่ยวกับสินค้า

4. **User Profile** → `Components/Profile/`
   - ทุกอย่างที่เกี่ยวกับข้อมูลผู้ใช้

5. **Reusable UI** → `Components/UI/`
   - Button, Input, Icon, Loading, Toast, etc.

6. **Content Sections** → `Components/Content/`
   - Section layouts และ content containers

### เมื่อสร้าง Route ใหม่

- Profile related pages → `app/profile/[feature]/page.tsx`
- ใช้ nested routes สำหรับ sub-pages ที่เกี่ยวข้อง
- แต่ละ route ควรมี CSS module ของตัวเอง

## 🔧 Migration Notes

การเปลี่ยนแปลงหลัก:
- ✅ Components ถูกย้ายไปยังโฟลเดอร์ตามหมวดหมู่
- ✅ Import paths ทั้งหมดถูกอัพเดท
- ✅ Profile routes รวมอยู่ใน `/profile/...`
- ✅ Cross-folder imports ใช้ relative paths ที่ถูกต้อง
- ✅ CSS modules อยู่ในโฟลเดอร์เดียวกับ component

ไม่มี breaking changes - โค้ดทำงานตามเดิม แค่จัดระเบียบใหม่
