"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from "react";
import { mockCatalog, type Product, type ProductSku, type ProductVariantSelection, findSku } from "@/lib/catalog";
import type { CartLine, CartState } from "@/lib/cart";
import { CouponProvider } from "@/contexts/CouponContext";
import type { UserCoupon } from "@/lib/coupon";
import { 
  getProducts as fetchProducts, 
  getCart as fetchCart, 
  addToCart as addToCartAPI, 
  updateCartItem, 
  removeCartItem as removeCartItemAPI,
  clearCart as clearCartAPI,
  type ProductResponse,
  type CartResponse
} from "@/lib/api";

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

type AuthContextValue = {
  isLoggedIn: boolean;
  showLogin: boolean;
  authLoaded: boolean;
  setShowLogin: (value: boolean) => void;
  handleLogin: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
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
  | { type: "CLEAR" }
  | { type: "SET_CART"; payload: { lines: CartLine[] } };

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
    case "SET_CART":
      return { lines: action.payload.lines };
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addToCart: (args: { product: Product; selection: ProductVariantSelection; quantity?: number }) => Promise<{ ok: true } | { ok: false; reason: string }>;
  removeFromCart: (lineId: string) => void;
  setQty: (lineId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  totalItems: number;
  selectedCoupon: UserCoupon | null;
  setSelectedCoupon: (coupon: UserCoupon | null) => void;
  productDiscount: number;
  shippingDiscount: number;
  finalTotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

type FavoritesContextValue = {
  favoriteIds: Set<string>;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getFavorites: () => Product[];
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
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

function loadFavoritesFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem("petshop_favorites_v1");
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function loadAuthFromStorage(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // Check for auth token from backend
    const token = window.localStorage.getItem("authToken");
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    return !!(token || isLoggedIn === "true");
  } catch {
    return false;
  }
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage after mount (client-side only)
  useEffect(() => {
    const savedAuth = loadAuthFromStorage();
    setIsLoggedIn(savedAuth);
    setShowLogin(!savedAuth);
    setAuthLoaded(true);
  }, []);

  useEffect(() => {
    // Fetch products from backend
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts({ page: 1, pageSize: 100 });
        // Convert backend ProductResponse to frontend Product format
        const convertedProducts: Product[] = response.products.map((p: ProductResponse) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          images: p.images,
          shopName: p.shopName || '',
          dimensions: p.dimensions.map(d => ({
            key: d.key,
            label: d.label,
            options: d.options.map(o => ({
              id: o.id,
              label: o.label,
              image: o.image
            }))
          })),
          skus: p.skus.map(s => ({
            skuId: s.skuId,
            selection: s.selection,
            price: s.price,
            stock: s.stock
          })),
          badges: p.badges || [],
          rating: p.rating,
          sold: p.sold,
          location: p.location,
          category: p.category,
          brand: p.brand,
          catAge: p.catAge
        }));
        setProducts(convertedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to mock data
        setProducts(mockCatalog);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const getProductById = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p] as const));
    return (id: string) => map.get(id);
  }, [products]);

  const [cartState, dispatch] = useReducer(cartReducer, { lines: [] });
  
  // Load cart from backend
  useEffect(() => {
    const loadCart = async () => {
      if (!isLoggedIn) return;
      try {
        const cart = await fetchCart();
        // Convert backend cart to frontend format
        const lines: CartLine[] = cart.lines.map(line => ({
          id: line.id,
          productId: line.productId,
          skuId: line.skuId,
          name: line.name,
          image: line.image,
          selection: line.selection,
          price: line.price,
          quantity: line.quantity
        }));
        dispatch({ type: "SET_CART", payload: { lines } });
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };
    loadCart();
  }, [isLoggedIn]);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => loadFavoritesFromStorage());
  
  const [selectedCoupon, setSelectedCoupon] = useState<UserCoupon | null>(null);

  // Only save to localStorage if not logged in (when logged in, cart is synced with backend)
  useEffect(() => {
    if (typeof window === "undefined" || isLoggedIn) return;
    window.localStorage.setItem("petshop_cart_v1", JSON.stringify(cartState));
  }, [cartState, isLoggedIn]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("petshop_favorites_v1", JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  const subtotal = useMemo(
    () => cartState.lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [cartState.lines]
  );

  const totalItems = useMemo(
    () => cartState.lines.reduce((sum, l) => sum + l.quantity, 0),
    [cartState.lines]
  );

  // Calculate discount based on selected coupon type
  const productDiscount = useMemo(() => {
    if (!selectedCoupon) return 0;
    // Only discount type coupons reduce product price
    if (selectedCoupon.type !== 'discount') return 0;
    // Check if subtotal meets minimum spend requirement
    if (subtotal < selectedCoupon.minSpend) return 0;
    return selectedCoupon.discountAmount;
  }, [selectedCoupon, subtotal]);

  // Calculate shipping discount (for freeship coupons)
  const shippingDiscount = useMemo(() => {
    if (!selectedCoupon) return 0;
    // Only freeship type coupons reduce shipping
    if (selectedCoupon.type !== 'freeship') return 0;
    // Check if subtotal meets minimum spend requirement
    if (subtotal < selectedCoupon.minSpend) return 0;
    // Return the discount amount (for freeship, this represents shipping discount)
    return selectedCoupon.discountAmount || 0;
  }, [selectedCoupon, subtotal]);

  // Calculate final total after discount (only product discount in cart)
  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - productDiscount);
  }, [subtotal, productDiscount]);

  const addToCart: CartContextValue["addToCart"] = async ({ product, selection, quantity = 1 }) => {
    const sku = findSku(product, selection);
    if (!sku) return { ok: false, reason: "กรุณาเลือกตัวเลือกสินค้าให้ครบ" };
    if (sku.stock <= 0) return { ok: false, reason: "สินค้าหมด" };
    
    // If logged in, sync with backend
    if (isLoggedIn) {
      try {
        await addToCartAPI({ productId: product.id, skuId: sku.skuId, quantity });
        // Reload cart from backend
        const cart = await fetchCart();
        const lines: CartLine[] = cart.lines.map(line => ({
          id: line.id,
          productId: line.productId,
          skuId: line.skuId,
          name: line.name,
          image: line.image,
          selection: line.selection,
          price: line.price,
          quantity: line.quantity
        }));
        dispatch({ type: "SET_CART", payload: { lines } });
      } catch (error) {
        console.error('Failed to add to cart:', error);
        return { ok: false, reason: "ไม่สามารถเพิ่มสินค้าได้" };
      }
    } else {
      // Use local state if not logged in
      dispatch({ type: "ADD", payload: { product, sku, selection, quantity } });
    }
    return { ok: true };
  };

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setShowLogin(false);
    // Token and user info are already stored by LoginModal/RegisterModal
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setShowLogin(true);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("user");
    }
  }, []);

  const searchValue = useMemo<SearchContextValue>(() => ({ query, setQuery }), [query]);

  const authValue = useMemo<AuthContextValue>(
    () => ({ isLoggedIn, showLogin, authLoaded, setShowLogin, handleLogin, handleLogout }),
    [isLoggedIn, showLogin, authLoaded, handleLogin, handleLogout]
  );

  const catalogValue = useMemo<CatalogContextValue>(
    () => ({ products, loading, getProductById }),
    [products, loading, getProductById]
  );

  const removeFromCart = useCallback(async (lineId: string) => {
    if (isLoggedIn) {
      try {
        await removeCartItemAPI(lineId);
        const cart = await fetchCart();
        const lines: CartLine[] = cart.lines.map(line => ({
          id: line.id,
          productId: line.productId,
          skuId: line.skuId,
          name: line.name,
          image: line.image,
          selection: line.selection,
          price: line.price,
          quantity: line.quantity
        }));
        dispatch({ type: "SET_CART", payload: { lines } });
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
    } else {
      dispatch({ type: "REMOVE", payload: { lineId } });
    }
  }, [isLoggedIn]);

  const setQty = useCallback(async (lineId: string, quantity: number) => {
    if (isLoggedIn) {
      try {
        await updateCartItem(lineId, { quantity });
        const cart = await fetchCart();
        const lines: CartLine[] = cart.lines.map(line => ({
          id: line.id,
          productId: line.productId,
          skuId: line.skuId,
          name: line.name,
          image: line.image,
          selection: line.selection,
          price: line.price,
          quantity: line.quantity
        }));
        dispatch({ type: "SET_CART", payload: { lines } });
      } catch (error) {
        console.error('Failed to update cart item:', error);
      }
    } else {
      dispatch({ type: "SET_QTY", payload: { lineId, quantity } });
    }
  }, [isLoggedIn]);

  const clear = useCallback(async () => {
    if (isLoggedIn) {
      try {
        await clearCartAPI();
        dispatch({ type: "CLEAR" });
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    } else {
      dispatch({ type: "CLEAR" });
    }
  }, [isLoggedIn]);

  const cartValue = useMemo<CartContextValue>(
    () => ({
      state: cartState,
      addToCart,
      removeFromCart,
      setQty,
      clear,
      subtotal,
      totalItems,
      selectedCoupon,
      setSelectedCoupon,
      productDiscount,
      shippingDiscount,
      finalTotal,
    }),
    [cartState, addToCart, removeFromCart, setQty, clear, subtotal, totalItems, selectedCoupon, productDiscount, shippingDiscount, finalTotal]
  );

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const isFavorite = (productId: string) => favoriteIds.has(productId);

  const getFavorites = () => products.filter((p) => favoriteIds.has(p.id));

  const favoritesValue = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      toggleFavorite,
      isFavorite,
      getFavorites,
    }),
    [favoriteIds, products]
  );

  return (
    <AuthContext.Provider value={authValue}>
      <SearchContext.Provider value={searchValue}>
        <CatalogContext.Provider value={catalogValue}>
          <CartContext.Provider value={cartValue}>
            <FavoritesContext.Provider value={favoritesValue}>
              <CouponProvider>{children}</CouponProvider>
            </FavoritesContext.Provider>
          </CartContext.Provider>
        </CatalogContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
}
