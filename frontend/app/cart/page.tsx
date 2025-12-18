"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart, useCatalog } from "../providers";
import { formatPriceTHB, formatSelection } from "@/lib/format";
import CouponSelectionModal from "@/Components/CouponSelectionModal";
import type { UserCoupon } from "@/lib/coupon";
import styles from "./page.module.css";

export default function CartPage() {
  const { state, setQty, removeFromCart, subtotal, selectedCoupon, setSelectedCoupon, productDiscount, shippingDiscount, finalTotal } = useCart();
  const { getProductById } = useCatalog();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCouponModal, setShowCouponModal] = useState(false);

  const allIds = useMemo(() => state.lines.map((l) => l.id), [state.lines]);

  const selectAll = selectedIds.length > 0 && selectedIds.length === allIds.length;

  const toggleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectedSubtotal = useMemo(() => {
    return state.lines
      .filter((l) => selectedIds.includes(l.id))
      .reduce((sum, l) => sum + l.price * l.quantity, 0);
  }, [state.lines, selectedIds]);

  const handleSelectCoupon = (coupon: UserCoupon | null) => {
    setSelectedCoupon(coupon);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ef5106e8c1589916161d078d5360bd31312755ca"
            alt="Cart"
            className={styles.headerIcon}
          />
          <h1 className={styles.headerTitle}>รถเข็น</h1>
        </div>

        {state.lines.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartTitle}>รถเข็นของคุณว่างอยู่</div>
            <Link href="/">
              <button className={styles.emptyCartButton + " btn-primary"}>เลือกซื้อสินค้า</button>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartTable}>
              <div className={styles.cartTableContent}>
                <div className={styles.cartTableHeader}>
                  <div className={styles.cartTableHeaderGrid}>
                    <div className={styles.headerCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                      <span className={styles.headerCheckboxLabel}>ทั้งหมด</span>
                    </div>
                    <div className={styles.headerColumn + " " + styles.price}>ราคาต่อชิ้น</div>
                    <div className={styles.headerColumn + " " + styles.quantity}>จำนวน</div>
                    <div className={styles.headerColumn + " " + styles.total}>ราคารวม</div>
                    <div className={styles.headerColumn + " " + styles.action}>Action</div>
                  </div>
                </div>

                <div className={styles.cartItems}>
                  {state.lines.map((line) => {
                    const product = getProductById(line.productId);
                    const variantText = product ? formatSelection(product, line.selection) : "";

                    return (
                      <div key={line.id} className={styles.cartItem}>
                        <div className={styles.cartItemGrid}>
                          <div className={styles.itemInfo}>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(line.id)}
                              onChange={() => toggleItem(line.id)}
                              className={styles.itemCheckbox}
                              aria-label={`Select ${line.name}`}
                            />
                            <div className={styles.itemImage}>
                              <img src={line.image} alt={line.name} />
                            </div>
                            <div className={styles.itemDetails}>
                              <h3 className={styles.itemName}>
                                {line.name}
                              </h3>
                              {variantText ? (
                                <div className={styles.itemVariant}>{variantText}</div>
                              ) : null}
                            </div>
                          </div>

                          <div className={styles.itemPrice}>{formatPriceTHB(line.price)}</div>

                          <div className={styles.itemQuantity}>
                            <div className={styles.quantityControl}>
                              <button
                                type="button"
                                onClick={() => setQty(line.id, line.quantity - 1)}
                                className={styles.quantityButton}
                                aria-label="Decrease"
                              >
                                −
                              </button>
                              <span className={styles.quantityValue}>{line.quantity}</span>
                              <button
                                type="button"
                                onClick={() => setQty(line.id, line.quantity + 1)}
                                className={styles.quantityButton}
                                aria-label="Increase"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className={styles.itemTotal}>
                            {formatPriceTHB(line.price * line.quantity)}
                          </div>

                          <div className={styles.itemAction}>
                            <button
                              type="button"
                              onClick={() => removeFromCart(line.id)}
                              className={styles.deleteButton}
                            >
                              ลบ
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                {/* Coupon Selection */}
                <div 
                  className={styles.couponSection}
                  onClick={() => setShowCouponModal(true)}
                >
                  <div className={styles.couponContent}>
                    <div className={styles.couponLeft}>
                      <span className={styles.couponIcon}>
                        {selectedCoupon?.type === 'freeship' ? '🚚' : '🎟️'}
                      </span>
                      <div className={styles.couponInfo}>
                        {selectedCoupon ? (
                          <>
                            <div className={styles.couponTitle}>
                              {selectedCoupon.title}
                            </div>
                            <div className={styles.couponDiscount}>
                              {selectedCoupon.type === 'freeship' 
                                ? `ส่งฟรี (ลดค่าส่ง ฿${shippingDiscount})` 
                                : `ลด ฿${productDiscount}`}
                            </div>
                          </>
                        ) : (
                          <div className={styles.couponPlaceholder}>
                            เลือกคูปอง
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      className={styles.couponChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCouponModal(true);
                      }}
                    >
                      เปลี่ยน
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className={styles.priceSummary}>
                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>ยอดรวม (เลือก)</span>
                    <span className={styles.priceValue}>
                      {formatPriceTHB(selectedSubtotal)}
                    </span>
                  </div>
                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>ยอดรวมทั้งหมด</span>
                    <span className={styles.priceValue + " " + styles.subtotal}>{formatPriceTHB(subtotal)}</span>
                  </div>
                  {selectedCoupon && productDiscount > 0 && (
                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>ส่วนลดสินค้า</span>
                      <span className={styles.priceValue + " " + styles.discount}>
                        -฿{productDiscount}
                      </span>
                    </div>
                  )}
                  {selectedCoupon && shippingDiscount > 0 && (
                    <div className={styles.priceRow}>
                      <span className={styles.priceLabel}>ส่วนลดค่าส่ง (ใช้ที่หน้าชำระเงิน)</span>
                      <span className={styles.priceValue + " " + styles.discount}>
                        -฿{shippingDiscount}
                      </span>
                    </div>
                  )}
                  {selectedCoupon && productDiscount > 0 && (
                    <div className={styles.priceRow + " " + styles.final}>
                      <span className={styles.priceLabel + " " + styles.final}>ยอดชำระ</span>
                      <span className={styles.priceValue + " " + styles.final}>
                        {formatPriceTHB(finalTotal)}
                      </span>
                    </div>
                  )}
                </div>

                <Link href="/checkout">
                  <button className={styles.buyNowButton}>Buy Now</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Coupon Selection Modal */}
      <CouponSelectionModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onSelectCoupon={handleSelectCoupon}
        currentSubtotal={subtotal}
        selectedCouponId={selectedCoupon?.id}
      />
    </main>
  );
}
