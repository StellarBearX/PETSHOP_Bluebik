"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductVariantSelector from "@/Components/ProductVariantSelector";
import { useCatalog, useCart } from "@/app/providers";
import type { ProductVariantSelection } from "@/lib/catalog";
import { findSku, getProductPriceRange, isSelectionComplete } from "@/lib/catalog";
import { formatPriceRangeTHB, formatPriceTHB, formatSelection } from "@/lib/format";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { getProductById, loading } = useCatalog();
  const { addToCart } = useCart();

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
      <main className="min-h-screen bg-[#F5F5F5] overflow-auto">
        <div className="container-responsive py-8">
          <div className="bg-white rounded-lg shadow p-6">Loading...</div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] overflow-auto">
        <div className="container-responsive py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-lg font-bold">ไม่พบสินค้า</div>
            <button
              type="button"
              className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
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
    <main className="min-h-screen bg-[#F5F5F5] overflow-auto">
      <div className="container-responsive py-4 md:py-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white rounded-lg shadow p-4 md:p-6 overflow-auto">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="text-sm text-[#0038FF] underline"
                onClick={() => router.back()}
              >
                ย้อนกลับ
              </button>
              <div className="text-xs text-gray-500 overflow-wrap-break">ID: {product.id}</div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[300px] md:h-[420px] object-cover"
                  />
                </div>
                <div className="mt-3 flex gap-2 overflow-auto">
                  {product.images.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-xl md:text-2xl font-bold overflow-wrap-break">{product.name}</h1>
                <div className="text-sm text-gray-600 overflow-wrap-break">ร้าน: {product.shopName}</div>

                <div className="text-[#FF4D00] text-2xl font-bold">{priceText}</div>

                {selectionText ? (
                  <div className="text-xs text-gray-600 overflow-wrap-break">{selectionText}</div>
                ) : (
                  <div className="text-xs text-gray-600 overflow-wrap-break">เลือกตัวเลือกสินค้าเพื่อดูราคา</div>
                )}

                <ProductVariantSelector
                  product={product}
                  selection={selection}
                  onChange={(next) => {
                    setError(null);
                    setSelection(next);
                  }}
                />

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
                      router.push("/cart");
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
                      router.push("/checkout");
                    }}
                  >
                    ซื้อเลย
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="text-lg font-bold mb-2">รายละเอียดสินค้า</div>
              <div className="text-sm text-gray-700 overflow-wrap-break">{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}