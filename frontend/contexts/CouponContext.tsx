"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Coupon, UserCoupon, CouponState } from "@/lib/coupon";

// Mock Data - Initial Available Coupons
const initialCoupons: Coupon[] = [
  // Platform Coupons (General)
  {
    id: "platform-1",
    code: "PETSHOP100",
    title: "รับไปเลย!!! ส่วนลด ฿100",
    discountAmount: 100,
    minSpend: 200,
    type: "discount",
    status: "available",
    expiryDate: "2025-12-20T23:59:59Z",
    color: "red",
    badgeIcon: "https://api.builder.io/api/v1/image/assets/TEMP/40c595824b97fee337663ced1df45b782130fab1",
    conditions: [
      "ใช้ได้สำหรับสมาชิกทุกท่าน",
      "สั่งซื้อขั้นต่ำ ฿200",
      "ใช้ได้ถึง 20 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
      "ไม่สามารถใช้ร่วมกับส่วนลดอื่นได้",
      "สงวนสิทธิ์ในการยกเลิกโค้ดโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
    ],
  },
  {
    id: "platform-2",
    code: "FREESHIP100",
    title: "ส่งฟรี!!! เมื่อใช้คู่กับร้านโค้ดคุ้ม",
    discountAmount: 0,
    minSpend: 100,
    type: "freeship",
    status: "available",
    expiryDate: "2025-12-20T23:59:59Z",
    color: "green",
    badgeIcon: "https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e",
    conditions: [
      "ใช้ได้เฉพาะสินค้าในร้านโค้ดคุ้ม",
      "สั่งซื้อขั้นต่ำ ฿100",
      "ใช้ได้ถึง 20 ธันวาคม 2025",
      "ต้องใช้ร่วมกับโค้ดส่วนลดของร้าน",
      "ใช้ได้ครั้งเดียวต่อ 1 คำสั่งซื้อ",
      "จัดส่งในพื้นที่กรุงเทพและปริมณฑลเท่านั้น",
    ],
  },
  {
    id: "platform-3",
    code: "MEGASALE500",
    title: "ส่วนลด ฿500",
    discountAmount: 500,
    minSpend: 0,
    type: "discount",
    status: "available",
    expiryDate: "2025-12-30T23:59:59Z",
    color: "red",
    badgeIcon: "https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e",
    conditions: [
      "ใช้ได้สำหรับสมาชิกทุกท่าน",
      "ไม่มีขั้นต่ำ",
      "ใช้ได้ถึง 30 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
      "สามารถใช้ร่วมกับโค้ดส่งฟรีได้",
      "สงวนสิทธิ์ในการยกเลิกโค้ดโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
    ],
  },
  {
    id: "platform-4",
    code: "EXPIRED1DAY",
    title: "ส่งฟรี!!! เพียงวันนี้เท่านั้น",
    discountAmount: 0,
    minSpend: 0,
    type: "freeship",
    status: "expired",
    expiryDate: "2025-12-01T23:59:59Z",
    color: "green",
    badgeIcon: "https://api.builder.io/api/v1/image/assets/TEMP/a68ec0128b9f0a77b2a805f55c92a55214e6120e",
    conditions: [
      "ใช้ได้เฉพาะวันที่ 1 ธันวาคม 2025",
      "ไม่มีขั้นต่ำ",
      "ใช้ได้กับสินค้าทุกชิ้นในร้าน",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
      "จัดส่งภายใน 3-5 วันทำการ",
      "**โค้ดนี้หมดอายุแล้ว**",
    ],
  },

  // Store-specific Coupons (from StoreProfile mock data)
  // Store 1: Pet Shop Official
  {
    id: "store1-coupon1",
    code: "PETSHOP100-S1",
    title: "รับไปเลย!!!",
    discountAmount: 100,
    minSpend: 200,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "red",
    storeId: "store1",
    storeName: "Pet Shop Official",
    storeLogo: "https://ui-avatars.com/api/?name=Pet+Shop&background=FF6B35&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Pet Shop Official",
      "สั่งซื้อขั้นต่ำ ฿200",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
  {
    id: "store1-coupon2",
    code: "PETSHOP500-S1",
    title: "ส่วนลดใหญ่!",
    discountAmount: 500,
    minSpend: 800,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "orange",
    storeId: "store1",
    storeName: "Pet Shop Official",
    storeLogo: "https://ui-avatars.com/api/?name=Pet+Shop&background=FF6B35&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Pet Shop Official",
      "สั่งซื้อขั้นต่ำ ฿800",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
  {
    id: "store1-coupon3",
    code: "PETSHOP50-S1",
    discountAmount: 50,
    minSpend: 0,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "red",
    title: "ส่วนลด ฿50",
    storeId: "store1",
    storeName: "Pet Shop Official",
    storeLogo: "https://ui-avatars.com/api/?name=Pet+Shop&background=FF6B35&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Pet Shop Official",
      "ไม่มีขั้นต่ำ",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },

  // Store 2: Happy Pets Mall
  {
    id: "store2-coupon1",
    code: "HAPPYPETS150",
    title: "ลดพิเศษ!",
    discountAmount: 150,
    minSpend: 300,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "orange",
    storeId: "store2",
    storeName: "Happy Pets Mall",
    storeLogo: "https://ui-avatars.com/api/?name=Happy+Pets&background=4ECDC4&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Happy Pets Mall",
      "สั่งซื้อขั้นต่ำ ฿300",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
  {
    id: "store2-coupon2",
    code: "HAPPYPETS80",
    discountAmount: 80,
    minSpend: 150,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "red",
    title: "ส่วนลด ฿80",
    storeId: "store2",
    storeName: "Happy Pets Mall",
    storeLogo: "https://ui-avatars.com/api/?name=Happy+Pets&background=4ECDC4&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Happy Pets Mall",
      "สั่งซื้อขั้นต่ำ ฿150",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },

  // Store 3: Pet Paradise Store
  {
    id: "store3-coupon1",
    code: "PARADISE200",
    title: "ส่วนลดใหญ่!",
    discountAmount: 200,
    minSpend: 500,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "red",
    storeId: "store3",
    storeName: "Pet Paradise Store",
    storeLogo: "https://ui-avatars.com/api/?name=Pet+Paradise&background=9B59B6&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Pet Paradise Store",
      "สั่งซื้อขั้นต่ำ ฿500",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
  {
    id: "store3-coupon2",
    code: "PARADISE100",
    discountAmount: 100,
    minSpend: 0,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "orange",
    title: "ส่วนลด ฿100",
    storeId: "store3",
    storeName: "Pet Paradise Store",
    storeLogo: "https://ui-avatars.com/api/?name=Pet+Paradise&background=9B59B6&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Pet Paradise Store",
      "ไม่มีขั้นต่ำ",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
  {
    id: "store3-coupon3",
    code: "PARADISE300",
    discountAmount: 300,
    minSpend: 1000,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "orange",
    title: "ส่วนลด ฿300",
    storeId: "store3",
    storeName: "Pet Paradise Store",
    storeLogo: "https://ui-avatars.com/api/?name=Pet+Paradise&background=9B59B6&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน Pet Paradise Store",
      "สั่งซื้อขั้นต่ำ ฿1000",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },

  // Store 4: PetCare Pro
  {
    id: "store4-coupon1",
    code: "PETCARE120",
    discountAmount: 120,
    minSpend: 250,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "red",
    title: "ส่วนลด ฿120",
    storeId: "store4",
    storeName: "PetCare Pro",
    storeLogo: "https://ui-avatars.com/api/?name=PetCare+Pro&background=E74C3C&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน PetCare Pro",
      "สั่งซื้อขั้นต่ำ ฿250",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
  {
    id: "store4-coupon2",
    code: "PETCARE250",
    title: "โปรพิเศษ!",
    discountAmount: 250,
    minSpend: 600,
    type: "store",
    status: "available",
    expiryDate: "2025-12-25T23:59:59Z",
    color: "orange",
    storeId: "store4",
    storeName: "PetCare Pro",
    storeLogo: "https://ui-avatars.com/api/?name=PetCare+Pro&background=E74C3C&color=fff&size=128&bold=true",
    conditions: [
      "ใช้ได้เฉพาะในร้าน PetCare Pro",
      "สั่งซื้อขั้นต่ำ ฿600",
      "ใช้ได้ถึง 25 ธันวาคม 2025",
      "ใช้ได้ครั้งเดียวต่อ 1 บัญชี",
    ],
  },
];

// Coupon Actions
type CouponAction =
  | { type: "COLLECT"; payload: { couponId: string } }
  | { type: "USE"; payload: { couponId: string } }
  | { type: "REMOVE"; payload: { couponId: string } }
  | { type: "LOAD"; payload: { userCoupons: UserCoupon[] } };

function couponReducer(state: CouponState, action: CouponAction): CouponState {
  switch (action.type) {
    case "COLLECT": {
      const { couponId } = action.payload;
      const coupon = state.allCoupons.find((c) => c.id === couponId);
      if (!coupon) return state;
      
      // Check if already collected
      if (state.userCoupons.some((c) => c.id === couponId)) return state;
      
      // Create user coupon with collected timestamp
      const userCoupon: UserCoupon = {
        ...coupon,
        status: "collected",
        collectedAt: new Date().toISOString(),
      };

      return {
        ...state,
        userCoupons: [...state.userCoupons, userCoupon],
      };
    }

    case "USE": {
      const { couponId } = action.payload;
      return {
        ...state,
        userCoupons: state.userCoupons.map((c) =>
          c.id === couponId
            ? { ...c, status: "used", usedAt: new Date().toISOString() }
            : c
        ),
      };
    }

    case "REMOVE": {
      const { couponId } = action.payload;
      return {
        ...state,
        userCoupons: state.userCoupons.filter((c) => c.id !== couponId),
      };
    }

    case "LOAD": {
      return {
        ...state,
        userCoupons: action.payload.userCoupons,
      };
    }

    default:
      return state;
  }
}

// Context Value Type
type CouponContextValue = {
  allCoupons: Coupon[];
  userCoupons: UserCoupon[];
  collectCoupon: (couponId: string) => void;
  useCoupon: (couponId: string) => void;
  removeCoupon: (couponId: string) => void;
  isCouponCollected: (couponId: string) => boolean;
  getStoreCoupons: (storeId?: string) => Coupon[];
  getMyCoupons: () => UserCoupon[];
  getPlatformCoupons: () => Coupon[];
  getMyStoreCoupons: () => UserCoupon[];
};

const CouponContext = createContext<CouponContextValue | null>(null);

// Hook to use coupon context
export function useCoupons() {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error("useCoupons must be used within CouponProvider");
  return ctx;
}

// Load user coupons from localStorage
function loadUserCouponsFromStorage(): UserCoupon[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("petshop_user_coupons_v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UserCoupon[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Coupon Provider Component
export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    couponReducer,
    {
      allCoupons: initialCoupons,
      userCoupons: [],
    },
    (initial) => ({
      ...initial,
      userCoupons: loadUserCouponsFromStorage(),
    })
  );

  // Save to localStorage whenever userCoupons changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "petshop_user_coupons_v1",
      JSON.stringify(state.userCoupons)
    );
  }, [state.userCoupons]);

  const collectCoupon = (couponId: string) => {
    dispatch({ type: "COLLECT", payload: { couponId } });
  };

  const useCoupon = (couponId: string) => {
    dispatch({ type: "USE", payload: { couponId } });
  };

  const removeCoupon = (couponId: string) => {
    dispatch({ type: "REMOVE", payload: { couponId } });
  };

  const isCouponCollected = (couponId: string) => {
    return state.userCoupons.some((c) => c.id === couponId);
  };

  // Get coupons for a specific store (or all store coupons if no storeId)
  const getStoreCoupons = (storeId?: string) => {
    if (storeId) {
      return state.allCoupons.filter(
        (c) => c.type === "store" && c.storeId === storeId && c.status === "available"
      );
    }
    return state.allCoupons.filter(
      (c) => c.type === "store" && c.status === "available"
    );
  };

  // Get platform-level coupons (discount, freeship)
  const getPlatformCoupons = () => {
    return state.allCoupons.filter(
      (c) => (c.type === "discount" || c.type === "freeship") && !c.storeId
    );
  };

  // Get user's collected coupons (excluding used ones)
  const getMyCoupons = () => {
    return state.userCoupons.filter((c) => c.status === "collected");
  };

  // Get user's store coupons
  const getMyStoreCoupons = () => {
    return state.userCoupons.filter(
      (c) => c.type === "store" && c.status === "collected"
    );
  };

  const value = useMemo<CouponContextValue>(
    () => ({
      allCoupons: state.allCoupons,
      userCoupons: state.userCoupons,
      collectCoupon,
      useCoupon,
      removeCoupon,
      isCouponCollected,
      getStoreCoupons,
      getMyCoupons,
      getPlatformCoupons,
      getMyStoreCoupons,
    }),
    [state]
  );

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
}
