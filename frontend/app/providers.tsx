"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { mockCatalog, type Product, type ProductSku, type ProductVariantSelection, findSku } from "@/lib/catalog";
import type { CartLine, CartState } from "@/lib/cart";

type SearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}

type CatalogContextValue = {
  products: Product[];
  loading: boolean;
  getProductById: (id: string) => Product | undefined;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}

type CartAction =
  | { type: "ADD"; payload: { product: Product; sku: ProductSku; selection: ProductVariantSelection; quantity: number } }
  | { type: "REMOVE"; payload: { lineId: string } }
  | { type: "SET_QTY"; payload: { lineId: string; quantity: number } }
  | { type: "CLEAR" };

function toLineId(productId: string, skuId: string) {
  return `${productId}:${skuId}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const { product, sku, selection, quantity } = action.payload;
      const id = toLineId(product.id, sku.skuId);
      const existing = state.lines.find((l) => l.id === id);
      if (existing) {
        return {
          lines: state.lines.map((l) => (l.id === id ? { ...l, quantity: l.quantity + quantity } : l)),
        };
      }

      const line: CartLine = {
        id,
        productId: product.id,
        skuId: sku.skuId,
        name: product.name,
        image: product.images[0] ?? "",
        selection,
        price: sku.price,
        quantity,
      };

      return { lines: [...state.lines, line] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.id !== action.payload.lineId) };
    case "SET_QTY": {
      const qty = Math.max(1, action.payload.quantity);
      return { lines: state.lines.map((l) => (l.id === action.payload.lineId ? { ...l, quantity: qty } : l)) };
    }
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addToCart: (args: { product: Product; selection: ProductVariantSelection; quantity?: number }) => { ok: true } | { ok: false; reason: string };
  removeFromCart: (lineId: string) => void;
  setQty: (lineId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function loadCartFromStorage(): CartState {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.localStorage.getItem("petshop_cart_v1");
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.lines || !Array.isArray(parsed.lines)) return { lines: [] };
    return {
      lines: parsed.lines
        .filter((l) => l && typeof l.id === "string")
        .map((l) => ({ ...l, quantity: Math.max(1, Number(l.quantity) || 1) })),
    };
  } catch {
    return { lines: [] };
  }
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In the future: fetch from Backend / Builder CMS when credentials exist.
    setProducts(mockCatalog);
    setLoading(false);
  }, []);

  const getProductById = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p] as const));
    return (id: string) => map.get(id);
  }, [products]);

  const [cartState, dispatch] = useReducer(cartReducer, undefined, loadCartFromStorage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("petshop_cart_v1", JSON.stringify(cartState));
  }, [cartState]);

  const subtotal = useMemo(
    () => cartState.lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [cartState.lines]
  );

  const totalItems = useMemo(
    () => cartState.lines.reduce((sum, l) => sum + l.quantity, 0),
    [cartState.lines]
  );

  const addToCart: CartContextValue["addToCart"] = ({ product, selection, quantity = 1 }) => {
    const sku = findSku(product, selection);
    if (!sku) return { ok: false, reason: "กรุณาเลือกตัวเลือกสินค้าให้ครบ" };
    if (sku.stock <= 0) return { ok: false, reason: "สินค้าหมด" };
    dispatch({ type: "ADD", payload: { product, sku, selection, quantity } });
    return { ok: true };
  };

  const searchValue = useMemo<SearchContextValue>(() => ({ query, setQuery }), [query]);

  const catalogValue = useMemo<CatalogContextValue>(
    () => ({ products, loading, getProductById }),
    [products, loading, getProductById]
  );

  const cartValue = useMemo<CartContextValue>(
    () => ({
      state: cartState,
      addToCart,
      removeFromCart: (lineId) => dispatch({ type: "REMOVE", payload: { lineId } }),
      setQty: (lineId, quantity) => dispatch({ type: "SET_QTY", payload: { lineId, quantity } }),
      clear: () => dispatch({ type: "CLEAR" }),
      subtotal,
      totalItems,
    }),
    [cartState, subtotal, totalItems]
  );

  return (
    <SearchContext.Provider value={searchValue}>
      <CatalogContext.Provider value={catalogValue}>
        <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
      </CatalogContext.Provider>
    </SearchContext.Provider>
  );
}
