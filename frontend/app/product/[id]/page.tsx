"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductVariantSelector from "@/Components/Product/ProductVariantSelector/ProductVariantSelector";
import ProductReviews from "@/Components/Product/ProductReviews/ProductReviews";
import StoreProfile from "@/Components/Product/StoreProfile/StoreProfile";
import { HeartIcon } from "@/Components/UI/Icons/Icons";
import { useCatalog, useCart, useFavorites } from "@/app/providers";
import type { ProductVariantSelection } from "@/lib/catalog";
import { findSku, getProductPriceRange, isSelectionComplete } from "@/lib/catalog";
import { formatPriceRangeTHB, formatPriceTHB, formatSelection } from "@/lib/format";
import { ChevronLeft, ChevronRight, X, Share2, Star } from "lucide-react";
import styles from "../page.module.css";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { getProductById, products, loading } = useCatalog();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const productId = params?.id;
  const product = productId ? getProductById(productId) : undefined;

  const [selection, setSelection] = useState<ProductVariantSelection>({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // Map productId to storeId (mock logic - different products have different stores)
  const getStoreIdForProduct = (prodId: string): string => {
    // Use simple hash to assign different stores to different products
    const stores = ["store1", "store2", "store3", "store4"];
    const hash = prodId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return stores[hash % stores.length];
  };

  const storeId = productId ? getStoreIdForProduct(productId) : "store1";

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

  // Calculate discount percentage (mock data)
  const discountPercent = sku ? Math.floor(Math.random() * 20) + 10 : 15;
  const originalPrice = sku ? Math.floor(sku.price * (1 + discountPercent / 100)) : 0;

  // Recommendations - get random products excluding current
  const recommendations = useMemo(() => {
    if (!product) return [];
    return products
      .filter(prod => prod.id !== product.id)
      .slice(0, 8);
  }, [products, product]);

  // Image navigation
  const handlePrevImage = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? (product?.images.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === (product?.images.length || 1) - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={`container-responsive ${styles.loadingContainer}`}>
          <div className={styles.loadingCard}>Loading...</div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={styles.main}>
        <div className={`container-responsive ${styles.notFoundContainer}`}>
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
      <div className={`container-responsive ${styles.contentContainer}`}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <button onClick={() => router.push("/")} className={styles.breadcrumbLink}>
              Home
            </button>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <button onClick={() => router.push("/category")} className={styles.breadcrumbLink}>
              อาหารสัตว์
            </button>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>Grain Free</span>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </div>

          <div className={styles.card}>
            <div className={styles.productLayout}>
              {/* Image Gallery - Left Column */}
              <div className={styles.imageSection}>
                {product.badges && product.badges.length > 0 && (
                  <div className={styles.badge}>{product.badges[0]}</div>
                )}
                <div 
                  className={styles.mainImage}
                  onClick={() => setShowLightbox(true)}
                >
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                  />
                </div>
                <div className={styles.thumbnails}>
                  {product.images.map((img, idx) => (
                    <div 
                      key={img} 
                      className={`${styles.thumbnail} ${idx === selectedImageIndex ? styles.thumbnailActive : ''}`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info - Right Column */}
              <div className={styles.infoSection}>
                <div className={styles.topActions}>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    className={styles.iconButton}
                    aria-label="Add to favorites"
                  >
                    <HeartIcon 
                      filled={isFavorite(product.id)}
                      className={`w-6 h-6 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label="Share"
                  >
                    <Share2 className={styles.shareIcon} />
                  </button>
                </div>

                <h1 className={styles.productTitle}>{product.name}</h1>
                
                {/* Rating and Sales */}
                <div className={styles.ratingSection}>
                  <div className={styles.rating}>
                    <span className={styles.ratingValue}>{product.rating || 4.9}</span>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating || 4.9) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className={styles.divider}>|</span>
                  <div className={styles.sold}>ขายแล้ว {product.sold || 0} ชิ้น</div>
                </div>

                {/* Promotion Banner */}
                <div className={styles.promotionBanner}>
                  ลดทันที! ใช้โค้ดส่วนลด MEGAMMEOW2024 ลดสูงถึง {discountPercent}%
                </div>

                {/* Price */}
                <div className={styles.priceSection}>
                  <div className={styles.priceRow}>
                    <span className={styles.originalPrice}>฿{originalPrice.toLocaleString()}</span>
                    <span className={styles.price}>{priceText}</span>
                  </div>
                  <div className={styles.discountBadge}>ลดเหลือ {discountPercent}%</div>
                </div>

                {/* Variant Selector */}
                <div className={styles.variantSection}>
                  <ProductVariantSelector
                    product={product}
                    selection={selection}
                    onChange={(next) => {
                      setError(null);
                      setSelection(next);
                    }}
                  />
                </div>

                {/* Quantity Selector */}
                <div className={styles.quantitySection}>
                  <div className={styles.quantityLabel}>Quantity</div>
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
                  <div className={styles.stockInfo}>
                    {sku ? `${sku.stock} ชิ้นพร้อมส่ง` : "21 ชิ้นพร้อมส่ง"}
                  </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {/* Action Buttons */}
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.actionButton} btn-outline-primary ${loadingAction ? 'opacity-60 pointer-events-none' : ''}`}
                    onClick={() => {
                      if (loadingAction) return;
                      if (!isSelectionComplete(product, selection)) {
                        setError("กรุณาเลือกตัวเลือกสินค้าให้ครบ");
                        return;
                      }
                      setLoadingAction(true);
                      const result = addToCart({ product, selection, quantity });
                      if (!result.ok) {
                        setError(result.reason);
                        setLoadingAction(false);
                        return;
                      }
                      alert("เพิ่มสินค้าลงตะกร้าแล้ว");
                      setLoadingAction(false);
                    }}
                    disabled={loadingAction}
                  >
                    {loadingAction ? 'กำลังดำเนินการ...' : 'Add To Cart'}
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionButton} btn-primary ${loadingAction ? 'opacity-60 pointer-events-none' : ''}`}
                    onClick={() => {
                      if (loadingAction) return;
                      if (!isSelectionComplete(product, selection)) {
                        setError("กรุณาเลือกตัวเลือกสินค้าให้ครบ");
                        return;
                      }
                      setLoadingAction(true);
                      const result = addToCart({ product, selection, quantity });
                      if (!result.ok) {
                        setError(result.reason);
                        setLoadingAction(false);
                        return;
                      }
                      router.push("/checkout");
                    }}
                    disabled={loadingAction}
                  >
                    {loadingAction ? 'กำลังดำเนินการ...' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className={styles.description}>
              <div className={styles.descriptionTitle}>รายละเอียดสินค้า</div>
              <div className={styles.descriptionText}>{product.description}</div>
            </div>

            {/* Store Profile Section - Shows store info and store coupons */}
            <StoreProfile storeId={storeId} />

            {/* Recommendations Section */}
            <div className={styles.recommendationsSection}>
              <div className={styles.sectionTitle}>สินค้าขายดีประจำสัปดาห์</div>
              <div className={styles.recommendationsGrid}>
                {recommendations.map((item) => (
                  <div 
                    key={item.id} 
                    className={styles.recommendationCard}
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    <div className={styles.recommendationImage}>
                      <img src={item.images[0]} alt={item.name} />
                      {item.badges && item.badges.length > 0 && (
                        <div className={styles.recommendationBadge}>
                          {item.badges[0]}
                        </div>
                      )}
                    </div>
                    <div className={styles.recommendationInfo}>
                      <div className={styles.recommendationName}>{item.name}</div>
                      <div className={styles.recommendationPrice}>
                        {formatPriceTHB(getProductPriceRange(item).min)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Reviews Section */}
            <ProductReviews />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className={styles.lightbox} onClick={() => setShowLightbox(false)}>
          <button 
            className={styles.lightboxClose}
            onClick={() => setShowLightbox(false)}
            aria-label="Close"
          >
            <X className={styles.closeIcon} />
          </button>
          
          <button 
            className={styles.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className={styles.navIcon} />
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className={styles.lightboxImage}
            />
          </div>

          <button 
            className={styles.lightboxNext}
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            aria-label="Next image"
          >
            <ChevronRight className={styles.navIcon} />
          </button>
        </div>
      )}
    </main>
  );
}