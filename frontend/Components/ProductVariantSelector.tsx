"use client";

import React, { useMemo } from "react";
import type { Product, ProductVariantSelection } from "@/lib/catalog";
import { getAvailableOptions } from "@/lib/catalog";

type Props = {
  product: Product;
  selection: ProductVariantSelection;
  onChange: (next: ProductVariantSelection) => void;
};

export default function ProductVariantSelector({ product, selection, onChange }: Props) {
  const availableByDim = useMemo(() => {
    return product.dimensions.reduce<Record<string, Set<string>>>((acc, dim) => {
      const options = getAvailableOptions(product, dim.key, selection);
      acc[dim.key] = new Set(options.map((o) => o.id));
      return acc;
    }, {});
  }, [product, selection]);

  return (
    <div className="space-y-4">
      {product.dimensions.map((dim) => {
        const active = selection[dim.key] ?? "";
        const available = availableByDim[dim.key] ?? new Set<string>();

        return (
          <div key={dim.key}>
            <div className="text-sm font-['Inter'] font-bold mb-2 overflow-wrap-break">{dim.label}</div>
            <div className="flex flex-wrap gap-2">
              {dim.options.map((opt) => {
                const isAvailable = available.has(opt.id);
                const isActive = active === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      const next: ProductVariantSelection = { ...selection, [dim.key]: opt.id };
                      onChange(next);
                    }}
                    className={`px-3 py-2 rounded border text-sm transition-colors overflow-wrap-break ${
                      isActive
                        ? "border-[#FF4D00] bg-[#FFEEE0] text-[#FF4D00]"
                        : isAvailable
                          ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-pressed={isActive}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
