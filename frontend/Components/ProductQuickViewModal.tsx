"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductVariantSelection } from "@/lib/catalog";
import { findSku, getProductPriceRange, isSelectionComplete } from "@/lib/catalog";
import { formatPriceRangeTHB, formatPriceTHB, formatSelection } from "@/lib/format";
import { useCart, useFavorites } from "@/app/providers";
import ProductVariantSelector from "./ProductVariantSelector";
import { HeartIcon } from "./Icons";
import styles from "./ProductQuickViewModal.module.css";

// Store data (same as StoreProfile component)
const mockStoresData = {
  "store1": { name: "Pet Shop Official" },
  "store2": { name: "Happy Pets Mall" },
  "store3": { name: "Pet Paradise Store" },
  "store4": { name: "PetCare Pro" },
};

// Get store for product (same logic as Product Detail page)
function getStoreIdForProduct(productId: string): string {
  const stores = ["store1", "store2", "store3", "store4"];
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return stores[hash % stores.length];
}

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
  const storeId = getStoreIdForProduct(product.id);
  const storeName = mockStoresData[storeId as keyof typeof mockStoresData]?.name || "Pet Shop";

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Product quick view">
      <div
        className={`modal-content ${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.productTitle}>{product.name}</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
              className={styles.favoriteButton}
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
            className={styles.closeButton}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.contentGrid}>
          <div>
            <div className={styles.imageContainer}>
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.thumbnailContainer}>
              {product.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`${styles.thumbnailButton} ${
                    selectedImageIndex === index ? styles.thumbnailButtonActive : ''
                  }`}
                >
                  <img
                  src={img}
                  alt=""
                    className={styles.thumbnailImage}
                />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.shopName}>ร้าน: {storeName}</div>
            <div className={styles.price}>{priceText}</div>

            {selectionText ? (
              <div className={styles.selectionText}>{selectionText}</div>
            ) : (
              <div className={styles.selectionText}>เลือกตัวเลือกสินค้าเพื่อดูราคา</div>
            )}

            <ProductVariantSelector product={product} selection={selection} onChange={(next) => {
              setError(null);
              setSelection(next);
            }} />

            <div className={styles.quantitySection}>
              <div className={styles.quantityLabel}>จำนวน</div>
              <div className={styles.quantityControl}>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className={styles.quantityButton}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className={styles.quantityValue}>{quantity}</div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className={styles.quantityButton}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className={styles.stockText}>
                {sku ? `คงเหลือ ${sku.stock} ชิ้น` : ""}
              </div>
            </div>

            {error ? <div className={styles.errorMessage}>{error}</div> : null}

            <div className={styles.actionButtons}>
              <button
                type="button"
                className={`${styles.actionButton} btn-outline-primary text-base`}
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
                className={`${styles.actionButton} btn-primary text-base`}
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
              className={styles.detailButton}
              onClick={() => {
                onClose();
                router.push(`/product/${product.id}`);
              }}
            >
              ดูรายละเอียดสินค้า
            </button>
          </div>
        </div>

        <div className={styles.description}>{product.description}</div>
      </div>
    </div>
  );
}
