"use client";

import React, { useMemo } from "react";
import type { Product, ProductVariantSelection } from "@/lib/catalog";
import { getAvailableOptions } from "@/lib/catalog";
import styles from "./ProductVariantSelector.module.css";

type Props = {
  product: Product;
  selection: ProductVariantSelection;
  onChange: (next: ProductVariantSelection) => void;
};

export default function ProductVariantSelector({ product, selection, onChange }: Props) {
  const availableByDim = useMemo(() => {
    return product.dimensions.reduce<Record<string, Set<string>>>((acc, dim) => {
      const options = getAvailableOptions(product, dim.key, selection);
      acc[dim.key] = new Set(options.map((option) => option.id));
      return acc;
    }, {});
  }, [product, selection]);

  return (
    <div className={styles.container}>
      {product.dimensions.map((dim) => {
        const active = selection[dim.key] ?? "";
        const available = availableByDim[dim.key] ?? new Set<string>();

        return (
          <div key={dim.key} className={styles.dimensionGroup}>
            <div className={styles.dimensionLabel}>{dim.label}</div>
            <div className={styles.optionsContainer}>
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
                    className={`${styles.optionButton} ${
                      isActive
                        ? styles.optionButtonActive
                        : !isAvailable
                          ? styles.optionButtonDisabled
                          : ''
                    } ${opt.image ? styles.optionButtonWithImage : ''}`}
                    aria-pressed={isActive}
                  >
                    {opt.image && (
                      <img 
                        src={opt.image} 
                        alt={opt.label}
                        className={styles.optionImage}
                      />
                    )}
                    <span>{opt.label}</span>
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
