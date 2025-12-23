"use client";

import React from "react";
import { Store, MessageCircle, Star, Package, Clock } from "lucide-react";
import styles from "./StoreProfile.module.css";
import { useCoupons } from "@/contexts/CouponContext";

// Data Interfaces
interface ShopInfo {
  id: string;
  name: string;
  logo: string;
  rating: number;
  totalProducts: number;
  responseRate: number;
  onlineStatus: string;
  followers: number;
  isOfficial: boolean;
}

// Store with Shop Info Interface
interface StoreWithShopInfo {
  shop: ShopInfo;
}

// Props Interface
interface StoreProfileProps {
  storeId?: string; // Optional: for future integration with backend
}

// Mock Data - Multiple Stores (Shop Info only, coupons from Context)
const mockStoresData: Record<string, StoreWithShopInfo> = {
  "store1": {
    shop: {
      id: "store1",
      name: "Pet Shop Official",
      logo: "https://ui-avatars.com/api/?name=Pet+Shop&background=FF6B35&color=fff&size=128&bold=true",
      rating: 4.9,
      totalProducts: 1250,
      responseRate: 98,
      onlineStatus: "ออนไลน์ 5 นาทีที่แล้ว",
      followers: 45620,
      isOfficial: true,
    },
  },
  "store2": {
    shop: {
      id: "store2",
      name: "Happy Pets Mall",
      logo: "https://ui-avatars.com/api/?name=Happy+Pets&background=4ECDC4&color=fff&size=128&bold=true",
      rating: 4.8,
      totalProducts: 890,
      responseRate: 95,
      onlineStatus: "ออนไลน์ 2 นาทีที่แล้ว",
      followers: 32100,
      isOfficial: false,
    },
  },
  "store3": {
    shop: {
      id: "store3",
      name: "Pet Paradise Store",
      logo: "https://ui-avatars.com/api/?name=Pet+Paradise&background=9B59B6&color=fff&size=128&bold=true",
      rating: 4.7,
      totalProducts: 650,
      responseRate: 92,
      onlineStatus: "ออนไลน์ 15 นาทีที่แล้ว",
      followers: 28500,
      isOfficial: false,
    },
  },
  "store4": {
    shop: {
      id: "store4",
      name: "PetCare Pro",
      logo: "https://ui-avatars.com/api/?name=PetCare+Pro&background=E74C3C&color=fff&size=128&bold=true",
      rating: 4.6,
      totalProducts: 520,
      responseRate: 90,
      onlineStatus: "ออนไลน์ 30 นาทีที่แล้ว",
      followers: 18200,
      isOfficial: true,
    },
  },
};

export default function StoreProfile({ storeId = "store1" }: StoreProfileProps) {
  // Get coupon functions from context
  const { getStoreCoupons, collectCoupon, isCouponCollected } = useCoupons();

  // Get store data based on storeId (default to store1 for mock)
  const storeData = mockStoresData[storeId] || mockStoresData["store1"];
  
  // Get coupons for this store from context
  const storeCoupons = getStoreCoupons(storeId);

  const handleCollectCoupon = (couponId: string) => {
    collectCoupon(couponId);
  };

  return (
    <div className={styles.container}>
      {/* Single Store Card */}
      <div className={styles.storeCard}>
        {/* Section 1: Store Information */}
        <div className={styles.storeInfo}>
          {/* Left: Logo & Name */}
          <div className={styles.storeLeft}>
            <img
              src={storeData.shop.logo}
              alt={storeData.shop.name}
              className={styles.storeLogo}
            />
            <div className={styles.storeDetails}>
              <div className={styles.storeNameRow}>
                <h3 className={styles.storeName}>{storeData.shop.name}</h3>
                {storeData.shop.isOfficial && (
                  <span className={styles.officialBadge}>Official</span>
                )}
              </div>
              <div className={styles.onlineStatus}>
                <span className={styles.statusDot}></span>
                {storeData.shop.onlineStatus}
              </div>
            </div>
          </div>

          {/* Middle: Stats */}
          <div className={styles.storeStats}>
            <div className={styles.statItem}>
              <Package className={styles.statIcon} />
              <div className={styles.statContent}>
                <div className={styles.statLabel}>สินค้า</div>
                <div className={styles.statValue}>{storeData.shop.totalProducts.toLocaleString()}</div>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <Star className={styles.statIcon} />
              <div className={styles.statContent}>
                <div className={styles.statLabel}>คะแนน</div>
                <div className={styles.statValue}>
                  {storeData.shop.rating}
                  <Star className={styles.starIconSmall} />
                </div>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <Clock className={styles.statIcon} />
              <div className={styles.statContent}>
                <div className={styles.statLabel}>ตอบกลับ</div>
                <div className={styles.statValue}>{storeData.shop.responseRate}%</div>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>ผู้ติดตาม</div>
                <div className={styles.statValue}>
                  {(storeData.shop.followers / 1000).toFixed(1)}k
                </div>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className={styles.storeActions}>
            <button className={styles.actionButton}>
              <MessageCircle className={styles.actionIcon} />
              แชทเลย
            </button>
            <button className={styles.actionButton}>
              <Store className={styles.actionIcon} />
              ดูร้านค้า
            </button>
          </div>
        </div>

        {/* Section 2: Coupons */}
        {storeCoupons.length > 0 && (
          <div className={styles.couponsSection}>
            <div className={styles.couponsSectionHeader}>
              <h4 className={styles.couponsTitle}>คูปองส่วนลด</h4>
              <span className={styles.couponsSubtitle}>รับคูปองก่อนหมดเขต!</span>
            </div>
            
            <div className={styles.couponsScroll}>
              <div className={styles.couponsList}>
                {storeCoupons.map((coupon) => {
                  const isCollected = isCouponCollected(coupon.id);
                  const colorClass = coupon.color === "red" ? styles.couponRed : styles.couponOrange;

                  return (
                    <div
                      key={coupon.id}
                      className={`${styles.couponCard} ${colorClass} ${
                        isCollected ? styles.couponCollected : ""
                      }`}
                    >
                      <div className={styles.couponLeft}>
                        <div className={styles.couponContent}>
                          {coupon.title && (
                            <div className={styles.couponTitle}>{coupon.title}</div>
                          )}
                          <div className={styles.couponAmount}>
                            ส่วนลด ฿{coupon.discountAmount}
                          </div>
                          <div className={styles.couponCondition}>
                            {coupon.minSpend > 0
                              ? `สั่งซื้อขั้นต่ำ ฿${coupon.minSpend}`
                              : "ไม่มีขั้นต่ำ"}
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.couponDivider}></div>
                      
                      <div className={styles.couponRight}>
                        <button
                          className={`${styles.collectButton} ${
                            isCollected ? styles.collectButtonCollected : ""
                          }`}
                          onClick={() => handleCollectCoupon(coupon.id)}
                          disabled={isCollected}
                        >
                          {isCollected ? "เก็บแล้ว" : "เก็บโค้ด"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

