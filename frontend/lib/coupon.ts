export type CouponType = "discount" | "freeship" | "store";

export type CouponStatus = "available" | "collected" | "used" | "expired";

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description?: string;
  discountAmount: number; // จำนวนส่วนลด (บาท)
  minSpend: number; // ขั้นต่ำในการใช้ (บาท)
  type: CouponType;
  status: CouponStatus;
  expiryDate: string; // ISO date string
  conditions: string[];
  // Store-specific coupons
  storeId?: string;
  storeName?: string;
  storeLogo?: string;
  color?: "red" | "orange" | "green";
  badgeIcon?: string;
}

export interface UserCoupon extends Coupon {
  collectedAt?: string; // ISO date string
  usedAt?: string; // ISO date string
}

export interface CouponState {
  allCoupons: Coupon[]; // All available coupons in the system
  userCoupons: UserCoupon[]; // User's collected coupons
}
