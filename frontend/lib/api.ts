const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

// Helper function to make authenticated requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

// ==================== AUTH APIs ====================
export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImageUrl?: string;
  };
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== PRODUCT APIs ====================
export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  images: string[];
  shopName?: string;
  dimensions: ProductDimension[];
  skus: ProductSku[];
  badges: string[];
  rating?: number;
  sold?: number;
  location?: string;
  category?: string;
  brand?: string;
  catAge?: string;
}

export interface ProductDimension {
  key: string;
  label: string;
  options: ProductOption[];
}

export interface ProductOption {
  id: string;
  label: string;
  image?: string;
}

export interface ProductSku {
  skuId: string;
  selection: Record<string, string>;
  price: number;
  stock: number;
}

export interface ProductListResponse {
  products: ProductResponse[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export async function getProducts(params?: {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  q?: string;
}): Promise<ProductListResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
  if (params?.q) queryParams.append('q', params.q);

  const query = queryParams.toString();
  return apiRequest<ProductListResponse>(`/products${query ? `?${query}` : ''}`);
}

export async function getProductById(id: string): Promise<ProductResponse> {
  return apiRequest<ProductResponse>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>('/categories');
}

export async function getBrands(): Promise<Brand[]> {
  return apiRequest<Brand[]>('/brands');
}

// ==================== CART APIs ====================
export interface CartLine {
  id: string;
  productId: string;
  skuId: string;
  name: string;
  image: string;
  selection: Record<string, string>;
  price: number;
  quantity: number;
}

export interface CartResponse {
  lines: CartLine[];
}

export interface AddToCartRequest {
  productId: string;
  skuId: string;
  quantity?: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export async function getCart(): Promise<CartResponse> {
  return apiRequest<CartResponse>('/cart');
}

export async function addToCart(data: AddToCartRequest): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>('/cart/items', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCartItem(
  itemId: string,
  data: UpdateCartItemRequest
): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function removeCartItem(itemId: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(`/cart/items/${itemId}`, {
    method: 'DELETE',
  });
}

export async function clearCart(): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>('/cart', {
    method: 'DELETE',
  });
}

// ==================== ORDER APIs ====================
export interface CreateOrderRequest {
  addressId: string;
  paymentCardId?: string;
  couponId?: string;
  paymentMethod: 'cod' | 'card' | 'qr';
}

export interface OrderItem {
  id: string;
  productId: string;
  skuId: string;
  productName: string;
  variant: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  productDiscount: number;
  shippingCost: number;
  shippingDiscount: number;
  total: number;
  createdAt: string;
}

export interface OrderListResponse {
  orders: OrderResponse[];
  total: number;
}

export async function createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
  return apiRequest<OrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getOrders(): Promise<OrderListResponse> {
  return apiRequest<OrderListResponse>('/orders');
}

export async function getOrderById(id: string): Promise<OrderResponse> {
  return apiRequest<OrderResponse>(`/orders/${id}`);
}

// ==================== COUPON APIs ====================
export interface CouponResponse {
  id: string;
  code: string;
  title: string;
  description?: string;
  discountAmount: number;
  minSpend: number;
  type: string;
  status: string;
  expiryDate: string;
  conditions: string[];
  storeId?: string;
  storeName?: string;
  storeLogo?: string;
  color?: string;
  badgeIcon?: string;
}

export interface CouponListResponse {
  coupons: CouponResponse[];
}

export async function getCoupons(storeId?: string): Promise<CouponListResponse> {
  const query = storeId ? `?storeId=${storeId}` : '';
  return apiRequest<CouponListResponse>(`/coupons${query}`);
}

export async function collectCoupon(couponId: string): Promise<{ success: boolean; couponId: string }> {
  return apiRequest<{ success: boolean; couponId: string }>(`/coupons/${couponId}/collect`, {
    method: 'POST',
  });
}

export async function getUserCoupons(): Promise<CouponListResponse> {
  return apiRequest<CouponListResponse>('/user/coupons');
}

// ==================== ADDRESS APIs ====================
export interface AddressRequest {
  firstName: string;
  lastName: string;
  phone: string;
  addressTh: string;
  addressEn?: string;
  province?: string;
  district?: string;
  road?: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface AddressResponse {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressTh: string;
  addressEn?: string;
  province?: string;
  district?: string;
  road?: string;
  postalCode?: string;
  isDefault: boolean;
}

export async function getAddresses(): Promise<AddressResponse[]> {
  return apiRequest<AddressResponse[]>('/addresses');
}

export async function createAddress(data: AddressRequest): Promise<AddressResponse> {
  return apiRequest<AddressResponse>('/addresses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAddress(id: string, data: AddressRequest): Promise<AddressResponse> {
  return apiRequest<AddressResponse>(`/addresses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAddress(id: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(`/addresses/${id}`, {
    method: 'DELETE',
  });
}
