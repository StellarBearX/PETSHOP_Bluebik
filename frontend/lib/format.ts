import type { Product, ProductVariantSelection } from "./catalog";

export function formatPriceTHB(value: number): string {
  return `฿${value.toLocaleString("th-TH")}`;
}

export function formatPriceRangeTHB(min: number, max: number): string {
  if (min === max) return formatPriceTHB(min);
  return `${formatPriceTHB(min)} - ${formatPriceTHB(max)}`;
}

export function formatSelection(product: Product, selection: ProductVariantSelection): string {
  return product.dimensions
    .map((d) => {
      const selected = selection[d.key];
      const option = d.options.find((o) => o.id === selected);
      return option ? `${d.label}: ${option.label}` : null;
    })
    .filter((v): v is string => Boolean(v))
    .join(", ");
}
