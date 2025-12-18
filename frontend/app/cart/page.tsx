"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart, useCatalog } from "../providers";
import { formatPriceTHB, formatSelection } from "@/lib/format";
import CouponSelectionModal from "@/Components/CouponSelectionModal";
import type { UserCoupon } from "@/lib/coupon";

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
    <main className="min-h-screen bg-[#F7F7F7] overflow-auto">
      <div className="container-responsive max-w-[1340px] py-4 md:py-8">
        <div className="bg-gradient-to-r from-[#FF4D00] to-[#F99D20] rounded-lg p-4 mb-6 md:mb-8 flex items-center gap-4">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ef5106e8c1589916161d078d5360bd31312755ca"
            alt="Cart"
            className="w-10 h-10 md:w-[50px] md:h-[50px]"
          />
          <h1 className="text-white text-2xl md:text-[32px] font-bold font-sans overflow-wrap-break">รถเข็น</h1>
        </div>

        {state.lines.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-lg font-bold mb-2">รถเข็นของคุณว่างอยู่</div>
            <Link href="/">
              <button className="mt-2 h-[45px] px-6 btn-primary text-base">เลือกซื้อสินค้า</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-auto">
              <div className="min-w-[900px]">
                <div className="flex items-center gap-4 px-4 py-3 border-b">
                  <div className="flex items-center gap-3 w-[140px]">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="w-[22px] h-[22px] cursor-pointer accent-[#FF4D00]"
                      aria-label="Select all"
                    />
                    <span className="text-black text-base font-semibold font-sans">ทั้งหมด</span>
                  </div>
                  <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-sans">
                    <div className="col-span-4"></div>
                    <div className="col-span-2 font-semibold text-[#6B7280] text-center">ราคาต่อชิ้น</div>
                    <div className="col-span-2 font-semibold text-[#6B7280] text-center">จำนวน</div>
                    <div className="col-span-2 font-semibold text-[#6B7280] text-center">ราคารวม</div>
                    <div className="col-span-2 font-semibold text-[#6B7280] text-center">Action</div>
                  </div>
                </div>

                <div className="divide-y">
                  {state.lines.map((line) => {
                    const product = getProductById(line.productId);
                    const variantText = product ? formatSelection(product, line.selection) : "";

                    return (
                      <div key={line.id} className="flex items-start gap-4 px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(line.id)}
                          onChange={() => toggleItem(line.id)}
                          className="w-[22px] h-[22px] mt-8 cursor-pointer accent-[#FF4D00]"
                          aria-label={`Select ${line.name}`}
                        />

                        <div className="flex-1">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex gap-4">
                              <div className="w-[110px] h-[110px] border border-[#D9D9D9] rounded-xl overflow-hidden flex-shrink-0">
                                <img src={line.image} alt={line.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col gap-2 min-w-0">
                                <h3 className="text-[14px] font-sans text-[#333] line-clamp-2 leading-5 overflow-wrap-break font-normal">
                                  {line.name}
                                </h3>
                                {variantText ? (
                                  <div className="text-xs text-[#656565] overflow-wrap-break font-sans">{variantText}</div>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-span-2 text-[15px] font-sans font-medium text-[#1F2937] text-center">{formatPriceTHB(line.price)}</div>

                            <div className="col-span-2">
                              <div className="flex items-center border border-[#D9D9D9] rounded-lg w-[96px] h-[32px] overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => setQty(line.id, line.quantity - 1)}
                                  className="flex items-center justify-center w-[32px] h-full hover:bg-gray-100"
                                  aria-label="Decrease"
                                >
                                  −
                                </button>
                                <span className="flex-1 text-center text-[15px] font-sans font-medium text-[#1F2937]">{line.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => setQty(line.id, line.quantity + 1)}
                                  className="flex items-center justify-center w-[32px] h-full hover:bg-gray-100"
                                  aria-label="Increase"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="col-span-2 text-[15px] font-sans font-semibold text-[#FF4D00] text-center">
                              {formatPriceTHB(line.price * line.quantity)}
                            </div>

                            <div className="col-span-2">
                              <button
                                type="button"
                                onClick={() => removeFromCart(line.id)}
                                className="text-red-500 hover:opacity-80"
                              >
                                ลบ
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:justify-end gap-4">
              <div className="bg-white rounded-lg shadow p-4 w-full md:w-[320px] overflow-auto">
                {/* Coupon Selection */}
                <div 
                  className="flex items-center justify-between p-3 mb-3 border border-[#e5e7eb] rounded-lg cursor-pointer hover:border-[#ff6b35] transition-colors"
                  onClick={() => setShowCouponModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {selectedCoupon?.type === 'freeship' ? '🚚' : '🎟️'}
                    </span>
                    <div>
                      {selectedCoupon ? (
                        <>
                          <div className="text-[13px] font-sans text-[#333] font-semibold">
                            {selectedCoupon.title}
                          </div>
                          <div className="text-[11px] font-sans text-[#10b981]">
                            {selectedCoupon.type === 'freeship' 
                              ? `ส่งฟรี (ลดค่าส่ง ฿${shippingDiscount})` 
                              : `ลด ฿${productDiscount}`}
                          </div>
                        </>
                      ) : (
                        <div className="text-[13px] font-sans text-[#666]">
                          เลือกคูปอง
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="text-[12px] font-sans text-[#ff6b35] hover:underline">
                    เปลี่ยน
                  </button>
                </div>

                {/* Price Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-sans">ยอดรวม (เลือก)</span>
                    <span className="text-[20px] font-sans text-[#FF4D00]">
                      {formatPriceTHB(selectedSubtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-sans">ยอดรวมทั้งหมด</span>
                    <span className="text-[14px] font-sans">{formatPriceTHB(subtotal)}</span>
                  </div>
                  {selectedCoupon && productDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-sans">ส่วนลดสินค้า</span>
                      <span className="text-[14px] font-sans text-[#10b981]">
                        -฿{productDiscount}
                      </span>
                    </div>
                  )}
                  {selectedCoupon && shippingDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-sans">ส่วนลดค่าส่ง (ใช้ที่หน้าชำระเงิน)</span>
                      <span className="text-[14px] font-sans text-[#10b981]">
                        -฿{shippingDiscount}
                      </span>
                    </div>
                  )}
                  {selectedCoupon && productDiscount > 0 && (
                    <div className="flex justify-between items-center pt-2 border-t border-[#e5e7eb]">
                      <span className="text-[15px] font-sans font-bold">ยอดชำระ</span>
                      <span className="text-[18px] font-sans font-bold text-[#FF4D00]">
                        {formatPriceTHB(finalTotal)}
                      </span>
                    </div>
                  )}
                </div>

                <Link href="/checkout">
                  <button className="w-full h-[45px] btn-primary text-[15px] font-sans">Buy Now</button>
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
