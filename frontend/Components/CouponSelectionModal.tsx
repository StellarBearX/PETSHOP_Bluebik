"use client";

import React from "react";
import { useCoupons } from "@/contexts/CouponContext";
import type { UserCoupon } from "@/lib/coupon";
import styles from "./CouponSelectionModal.module.css";

interface CouponSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCoupon: (coupon: UserCoupon | null) => void;
  currentSubtotal: number;
  selectedCouponId?: string | null;
}

export default function CouponSelectionModal({
  isOpen,
  onClose,
  onSelectCoupon,
  currentSubtotal,
  selectedCouponId,
}: CouponSelectionModalProps) {
  const { getMyCoupons } = useCoupons();

  if (!isOpen) return null;

  const myCoupons = getMyCoupons();

  // Filter coupons that can be used (meet min spend requirement)
  const availableCoupons = myCoupons.filter(
    (coupon) => currentSubtotal >= coupon.minSpend
  );

  // Filter coupons that cannot be used (don't meet min spend)
  const unavailableCoupons = myCoupons.filter(
    (coupon) => currentSubtotal < coupon.minSpend
  );

  const handleSelectCoupon = (coupon: UserCoupon) => {
    if (currentSubtotal >= coupon.minSpend) {
      onSelectCoupon(coupon);
      onClose();
    }
  };

  const handleRemoveCoupon = () => {
    onSelectCoupon(null);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>เลือกคูปอง</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* No Coupon Option */}
          <div
            className={`${styles.couponCard} ${
              !selectedCouponId ? styles.couponCardSelected : ""
            }`}
            onClick={handleRemoveCoupon}
          >
            <div className={styles.couponContent}>
              <div className={styles.couponTitle}>ไม่ใช้คูปอง</div>
              <div className={styles.couponSubtitle}>
                ไม่ต้องการใช้คูปองส่วนลด
              </div>
            </div>
            {!selectedCouponId && (
              <div className={styles.selectedBadge}>✓ เลือกแล้ว</div>
            )}
          </div>

          {/* Available Coupons */}
          {availableCoupons.length > 0 && (
            <>
              <div className={styles.sectionTitle}>คูปองที่ใช้ได้</div>
              {availableCoupons.map((coupon) => {
                const isSelected = selectedCouponId === coupon.id;
                const savings = coupon.discountAmount;

                return (
                  <div
                    key={coupon.id}
                    className={`${styles.couponCard} ${
                      isSelected ? styles.couponCardSelected : ""
                    }`}
                    onClick={() => handleSelectCoupon(coupon)}
                  >
                    <div className={styles.couponIcon}>
                      {coupon.type === "freeship" ? "🚚" : "🎫"}
                    </div>
                    <div className={styles.couponContent}>
                      <div className={styles.couponTitle}>{coupon.title}</div>
                      <div className={styles.couponSubtitle}>
                        {coupon.type === "freeship"
                          ? "ส่งฟรี"
                          : `ลด ฿${savings}`}
                      </div>
                      {coupon.minSpend > 0 && (
                        <div className={styles.couponMinSpend}>
                          ขั้นต่ำ ฿{coupon.minSpend}
                        </div>
                      )}
                      <div className={styles.couponExpiry}>
                        ใช้ได้ถึง {formatDate(coupon.expiryDate)}
                      </div>
                    </div>
                    {isSelected && (
                      <div className={styles.selectedBadge}>✓ เลือกแล้ว</div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* Unavailable Coupons */}
          {unavailableCoupons.length > 0 && (
            <>
              <div className={styles.sectionTitle}>
                คูปองที่ใช้ไม่ได้ (ไม่ถึงขั้นต่ำ)
              </div>
              {unavailableCoupons.map((coupon) => {
                const remaining = coupon.minSpend - currentSubtotal;

                return (
                  <div
                    key={coupon.id}
                    className={`${styles.couponCard} ${styles.couponCardDisabled}`}
                  >
                    <div className={styles.couponIcon}>
                      {coupon.type === "freeship" ? "🚚" : "🎫"}
                    </div>
                    <div className={styles.couponContent}>
                      <div className={styles.couponTitle}>{coupon.title}</div>
                      <div className={styles.couponSubtitle}>
                        {coupon.type === "freeship"
                          ? "ส่งฟรี"
                          : `ลด ฿${coupon.discountAmount}`}
                      </div>
                      <div className={styles.couponMinSpend}>
                        ขาดอีก ฿{remaining} เพื่อใช้คูปอง
                      </div>
                      <div className={styles.couponExpiry}>
                        ใช้ได้ถึง {formatDate(coupon.expiryDate)}
                      </div>
                    </div>
                    <div className={styles.disabledBadge}>ใช้ไม่ได้</div>
                  </div>
                );
              })}
            </>
          )}

          {/* Empty State */}
          {myCoupons.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎟️</div>
              <div className={styles.emptyTitle}>ยังไม่มีคูปอง</div>
              <div className={styles.emptyText}>
                ไปเก็บคูปองเพื่อรับส่วนลดพิเศษ!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
