"use client";

import { useMemo, useState, useEffect } from "react";
import { IMAGES } from "@/lib/images";
import Link from "next/link";
import { useCart, useCatalog } from "../providers";
import { formatPriceTHB, formatSelection } from "@/lib/format";
import CouponSelectionModal from "@/Components/Modals/CouponSelectionModal/CouponSelectionModal";
import type { UserCoupon } from "@/lib/coupon";
import styles from "./page.module.css";

export default function CartPage() {
  const { state, setQty, removeFromCart, subtotal, selectedCoupon, setSelectedCoupon, productDiscount, shippingDiscount, finalTotal } = useCart();
  const { getProductById } = useCatalog();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    // Load selected items from localStorage
    const savedSelectedIds = localStorage.getItem('petshop_selected_cart_items');
    if (savedSelectedIds) {
      try {
        const parsed = JSON.parse(savedSelectedIds);
        if (Array.isArray(parsed)) {
          // Filter to only include IDs that exist in current cart
          const validIds = parsed.filter(id => allIds.includes(id));
          setSelectedIds(validIds);
        }
      } catch (e) {
        console.error('Error loading selected items:', e);
      }
    }
  }, []);

  // Save selected items to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('petshop_selected_cart_items', JSON.stringify(selectedIds));
    }
  }, [selectedIds, isMounted]);

  const allIds = useMemo(() => state.lines.map((line) => line.id), [state.lines]);

  const selectAll = selectedIds.length > 0 && selectedIds.length === allIds.length;

  const toggleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  const selectedSubtotal = useMemo(() => {
    return state.lines
      .filter((line) => selectedIds.includes(line.id))
      .reduce((sum, line) => sum + line.price * line.quantity, 0);
  }, [state.lines, selectedIds]);

  const handleSelectCoupon = (coupon: UserCoupon | null) => {
    setSelectedCoupon(coupon);
  };

  // Prevent hydration mismatch by showing loading state on server
  if (!isMounted) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <img
              src={IMAGES.emptyCartIcon}
              alt="Cart"
              className={styles.headerIcon}
            />
            <h1 className={styles.headerTitle}>รถเข็น</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={IMAGES.emptyCartIcon}
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
                            <Link href={`/product/${line.productId}`} className={styles.itemImageLink}>
                              <div className={styles.itemImage}>
                                <img src={line.image} alt={line.name} />
                              </div>
                            </Link>
                            <div className={styles.itemDetails}>
                              <Link href={`/product/${line.productId}`} className={styles.itemNameLink}>
                                <h3 className={styles.itemName}>
                                  {line.name}
                                </h3>
                              </Link>
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
                  <div className={styles.couponIconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM15.5 10C14.67 10 14 9.33 14 8.5C14 7.67 14.67 7 15.5 7C16.33 7 17 7.67 17 8.5C17 9.33 16.33 10 15.5 10ZM8.5 10C7.67 10 7 9.33 7 8.5C7 7.67 7.67 7 8.5 7C9.33 7 10 7.67 10 8.5C10 9.33 9.33 10 8.5 10ZM20 15H4V13H20V15ZM20 11H4V9H5C5.83 9 6.5 8.33 6.5 7.5C6.5 6.67 5.83 6 5 6H4V5H20V6H19C18.17 6 17.5 6.67 17.5 7.5C17.5 8.33 18.17 9 19 9H20V11Z" fill="#F7921E"/>
                    </svg>
                  </div>
                  <span className={styles.couponText}>
                    {selectedCoupon 
                      ? selectedCoupon.type === 'freeship'
                        ? `${selectedCoupon.title} - ส่งฟรี`
                        : `${selectedCoupon.title} - ลด ฿${productDiscount}`
                      : "เลือกคูปอง"}
                  </span>
                  <svg 
                    className={styles.couponChevron}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
                  <button 
                    className={styles.buyNowButton}
                    disabled={selectedIds.length === 0}
                  >
                    Buy Now {selectedIds.length > 0 && `(${selectedIds.length})`}
                  </button>
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
