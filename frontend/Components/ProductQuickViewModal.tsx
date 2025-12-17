"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductVariantSelection } from "@/lib/catalog";
import { findSku, getProductPriceRange, isSelectionComplete } from "@/lib/catalog";
import { formatPriceRangeTHB, formatPriceTHB, formatSelection } from "@/lib/format";
import { useCart, useFavorites } from "@/app/providers";
import ProductVariantSelector from "./ProductVariantSelector";
import { HeartIcon } from "./Icons";

type Props = {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
};

export default function ProductQuickViewModal({ isOpen, product, onClose }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selection, setSelection] = useState<ProductVariantSelection>({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelection({});
    setQuantity(1);
    setError(null);
    setSelectedImageIndex(0);
  }, [product?.id]);

  const sku = useMemo(() => (product ? findSku(product, selection) : null), [product, selection]);

  const priceText = useMemo(() => {
    if (!product) return "";
    if (sku) return formatPriceTHB(sku.price);
    const range = getProductPriceRange(product);
    return formatPriceRangeTHB(range.min, range.max);
  }, [product, sku]);

  const selectionText = useMemo(() => {
    if (!product) return "";
    return formatSelection(product, selection);
  }, [product, selection]);

  if (!isOpen || !product) return null;

  const currentFavoriteStatus = isFavorite(product.id);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Product quick view">
      <div
        className="modal-content w-full max-w-[960px] max-h-[90vh] overflow-auto p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-lg md:text-2xl font-bold overflow-wrap-break flex-1">{product.name}</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
              className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label={currentFavoriteStatus ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon 
                filled={currentFavoriteStatus}
                className={`w-6 h-6 ${currentFavoriteStatus ? 'text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex-shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="rounded-xl overflow-hidden bg-gray-100 cursor-pointer">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-[280px] md:h-[360px] object-cover"
              />
            </div>
            <div className="mt-3 flex gap-2 overflow-auto">
              {product.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-orange-500 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-600 overflow-wrap-break">ร้าน: {product.shopName}</div>
            <div className="text-[#FF4D00] text-xl font-bold">{priceText}</div>

            {selectionText ? (
              <div className="text-xs text-gray-600 overflow-wrap-break">{selectionText}</div>
            ) : (
              <div className="text-xs text-gray-600 overflow-wrap-break">เลือกตัวเลือกสินค้าเพื่อดูราคา</div>
            )}

            <ProductVariantSelector product={product} selection={selection} onChange={(next) => {
              setError(null);
              setSelection(next);
            }} />

            <div className="flex items-center gap-3">
              <div className="text-sm font-bold">จำนวน</div>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="w-12 text-center">{quantity}</div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-gray-500 overflow-wrap-break">
                {sku ? `คงเหลือ ${sku.stock} ชิ้น` : ""}
              </div>
            </div>

            {error ? <div className="text-sm text-red-600 overflow-wrap-break">{error}</div> : null}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                className="flex-1 h-[45px] btn-outline-primary text-base"
                onClick={() => {
                  if (!isSelectionComplete(product, selection)) {
                    setError("กรุณาเลือกตัวเลือกสินค้าให้ครบ");
                    return;
                  }
                  const result = addToCart({ product, selection, quantity });
                  if (!result.ok) {
                    setError(result.reason);
                    return;
                  }
                  onClose();
                }}
              >
                เพิ่มลงรถเข็น
              </button>

              <button
                type="button"
                className="flex-1 h-[45px] btn-primary text-base"
                onClick={() => {
                  if (!isSelectionComplete(product, selection)) {
                    setError("กรุณาเลือกตัวเลือกสินค้าให้ครบ");
                    return;
                  }
                  const result = addToCart({ product, selection, quantity });
                  if (!result.ok) {
                    setError(result.reason);
                    return;
                  }
                  onClose();
                  router.push("/cart");
                }}
              >
                ซื้อเลย
              </button>
            </div>

            <button
              type="button"
              className="w-full h-[40px] border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => {
                onClose();
                router.push(`/product/${product.id}`);
              }}
            >
              ดูรายละเอียดสินค้า
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-700 overflow-wrap-break">{product.description}</div>
      </div>
    </div>
  );
}
