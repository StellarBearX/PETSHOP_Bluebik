import type { ProductVariantSelection } from "./catalog";

export type CartLine = {
  id: string;
  productId: string;
  skuId: string;
  name: string;
  image: string;
  selection: ProductVariantSelection;
  price: number;
  quantity: number;
};

export type CartState = {
  lines: CartLine[];
};
