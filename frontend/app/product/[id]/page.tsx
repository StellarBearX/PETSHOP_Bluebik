"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductVariantSelector from "@/Components/ProductVariantSelector";
import { HeartIcon } from "@/Components/Icons";
import { useCatalog, useCart, useFavorites } from "@/app/providers";
import type { ProductVariantSelection } from "@/lib/catalog";
import { findSku, getProductPriceRange, isSelectionComplete } from "@/lib/catalog";
import { formatPriceRangeTHB, formatPriceTHB, formatSelection } from "@/lib/format";
import styles from "../page.module.css";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { getProductById, loading } = useCatalog();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const productId = params?.id;
  const product = productId ? getProductById(productId) : undefined;

  const [selection, setSelection] = useState<ProductVariantSelection>({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <main className={styles.main}>
        <div className="container-responsive py-8">
          <div className={styles.loadingCard}>Loading...</div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={styles.main}>
        <div className="container-responsive py-8">
          <div className={styles.notFoundCard}>
            <div className={styles.notFoundTitle}>ไม่พบสินค้า</div>
            <button
              type="button"
              className={styles.notFoundButton}
              onClick={() => router.push("/")}
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className="container-responsive py-4 md:py-8">
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => toggleFavorite(product.id)}
                className={styles.favoriteButton}
                aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon 
                  filled={isFavorite(product.id)}
                  className={`w-7 h-7 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                />
              </button>
            </div>

            <div className={styles.productLayout}>
              <div className={styles.imageSection}>
                <div className={styles.mainImage}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                  />
                </div>
                <div className={styles.thumbnails}>
                  {product.images.map((img) => (
                    <div key={img} className={styles.thumbnail}>
                      <img
                        src={img}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoSection}>
                <h1 className={styles.productTitle}>{product.name}</h1>
                <div className={styles.shopName}>ร้าน: {product.shopName}</div>

                <div className={styles.price}>{priceText}</div>

                {selectionText ? (
                  <div className={styles.selectionText}>{selectionText}</div>
                ) : (
                  <div className={styles.selectionText}>เลือกตัวเลือกสินค้าเพื่อดูราคา</div>
                )}

                <ProductVariantSelector
                  product={product}
                  selection={selection}
                  onChange={(next) => {
                    setError(null);
                    setSelection(next);
                  }}
                />

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

                {error ? <div className={styles.error}>{error}</div> : null}

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.actionButton} btn-outline-primary`}
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
                      router.push("/cart");
                    }}
                  >
                    เพิ่มลงรถเข็น
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionButton} btn-primary`}
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
                      router.push("/checkout");
                    }}
                  >
                    ซื้อเลย
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <div className={styles.descriptionTitle}>รายละเอียดสินค้า</div>
              <div className={styles.descriptionText}>{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}