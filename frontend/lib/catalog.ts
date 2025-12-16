export type ProductVariantOption = {
  id: string;
  label: string;
};

export type ProductVariantDimension = {
  key: string;
  label: string;
  options: ProductVariantOption[];
};

export type ProductVariantSelection = Record<string, string>;

export type ProductSku = {
  skuId: string;
  selection: ProductVariantSelection;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  shopName: string;
  dimensions: ProductVariantDimension[];
  skus: ProductSku[];
  badges?: string[];
  rating?: number;
  sold?: number;
  location?: string;
};

export function findSku(product: Product, selection: ProductVariantSelection): ProductSku | null {
  const keys = product.dimensions.map((d) => d.key);
  const normalized: ProductVariantSelection = keys.reduce((acc, k) => {
    if (selection[k]) acc[k] = selection[k];
    return acc;
  }, {} as ProductVariantSelection);

  const sku = product.skus.find((s) =>
    keys.every((k) => s.selection[k] && s.selection[k] === normalized[k])
  );

  return sku ?? null;
}

export function getProductPriceRange(product: Product): { min: number; max: number } {
  if (product.skus.length === 0) return { min: 0, max: 0 };
  const prices = product.skus.map((s) => s.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function isSelectionComplete(product: Product, selection: ProductVariantSelection): boolean {
  return product.dimensions.every((d) => Boolean(selection[d.key]));
}

export function getAvailableOptions(
  product: Product,
  dimensionKey: string,
  currentSelection: ProductVariantSelection
): ProductVariantOption[] {
  const dim = product.dimensions.find((d) => d.key === dimensionKey);
  if (!dim) return [];

  const otherKeys = product.dimensions.map((d) => d.key).filter((k) => k !== dimensionKey);

  const valid = product.skus
    .filter((sku) => sku.stock > 0)
    .filter((sku) => otherKeys.every((k) => !currentSelection[k] || sku.selection[k] === currentSelection[k]))
    .map((sku) => sku.selection[dimensionKey]);

  const validSet = new Set(valid);

  return dim.options.filter((o) => validSet.has(o.id));
}

export const mockCatalog: Product[] = [
  {
    id: "p1",
    name: "PURINA ONE เพียวริน่าวัน อาหารแมว",
    description:
      "อาหารแมวคุณภาพ สำหรับแมวทุกช่วงวัย เลือกสูตร/ขนาดได้ตามต้องการ พร้อมตัวเลือกแพ็คเกจ.",
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/9f6f4a7ff45e59449140587baff701db77d4c33d",
      "https://api.builder.io/api/v1/image/assets/TEMP/abb7edfe50237f94aeaf1a789fa8f6fe60e61085",
    ],
    shopName: "Purina Official",
    badges: ["สินค้าขายดี"],
    rating: 4.8,
    sold: 723,
    location: "กรุงเทพมหานคร",
    dimensions: [
      {
        key: "flavor",
        label: "สูตร",
        options: [
          { id: "salmon", label: "ปลาแซลมอน" },
          { id: "chicken", label: "ไก่" },
        ],
      },
      {
        key: "size",
        label: "ขนาด",
        options: [
          { id: "1kg", label: "1 กก." },
          { id: "3kg", label: "3 กก." },
        ],
      },
    ],
    skus: [
      { skuId: "p1-salmon-1kg", selection: { flavor: "salmon", size: "1kg" }, price: 400, stock: 25 },
      { skuId: "p1-salmon-3kg", selection: { flavor: "salmon", size: "3kg" }, price: 990, stock: 12 },
      { skuId: "p1-chicken-1kg", selection: { flavor: "chicken", size: "1kg" }, price: 380, stock: 20 },
      { skuId: "p1-chicken-3kg", selection: { flavor: "chicken", size: "3kg" }, price: 950, stock: 0 },
    ],
  },
  {
    id: "p2",
    name: "Kaniva คานิว่า อาหารแมว Premium",
    description:
      "อาหารแมวเกรด Premium เลือกสีแพ็คเกจและขนาดได้ เหมาะสำหรับแมวทุกช่วงวัย.",
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/791772d1f1e3670b80fe9634be235e2a38c2a773",
      "https://api.builder.io/api/v1/image/assets/TEMP/6cff6e21643dde16bec0d41e0a22d4d08c451617",
    ],
    shopName: "90s.shop",
    badges: ["แนะนำ"],
    rating: 4.9,
    sold: 1288,
    location: "กรุงเทพมหานคร",
    dimensions: [
      {
        key: "color",
        label: "สีแพ็คเกจ",
        options: [
          { id: "orange", label: "ส้ม" },
          { id: "blue", label: "น้ำเงิน" },
        ],
      },
      {
        key: "size",
        label: "ขนาด",
        options: [
          { id: "2kg", label: "2 กก." },
          { id: "7kg", label: "7 กก." },
        ],
      },
    ],
    skus: [
      { skuId: "p2-orange-2kg", selection: { color: "orange", size: "2kg" }, price: 399, stock: 40 },
      { skuId: "p2-orange-7kg", selection: { color: "orange", size: "7kg" }, price: 1190, stock: 18 },
      { skuId: "p2-blue-2kg", selection: { color: "blue", size: "2kg" }, price: 420, stock: 0 },
      { skuId: "p2-blue-7kg", selection: { color: "blue", size: "7kg" }, price: 1240, stock: 10 },
    ],
  },
  {
    id: "p3",
    name: "Bite of Wild Grain Free",
    description: "อาหารแมว Grain Free โปรตีนสูง พร้อมตัวเลือกน้ำหนักและแพ็คของแถม.",
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/395c6f306fe987600d1e46a5ff4944a68c1cc986",
      "https://api.builder.io/api/v1/image/assets/TEMP/50109194e77f1ca8695d89b25c2f6e64fb211b23",
    ],
    shopName: "Bite of Wild Official Shop",
    badges: ["Mall"],
    rating: 4.7,
    sold: 541,
    location: "กรุงเทพมหานคร",
    dimensions: [
      {
        key: "bundle",
        label: "แพ็คเกจ",
        options: [
          { id: "standard", label: "มาตรฐาน" },
          { id: "gift", label: "แถมขนม" },
        ],
      },
      {
        key: "size",
        label: "น้ำหนัก",
        options: [
          { id: "1kg", label: "1 กก." },
          { id: "5kg", label: "5 กก." },
        ],
      },
    ],
    skus: [
      { skuId: "p3-standard-1kg", selection: { bundle: "standard", size: "1kg" }, price: 299, stock: 16 },
      { skuId: "p3-standard-5kg", selection: { bundle: "standard", size: "5kg" }, price: 1789, stock: 8 },
      { skuId: "p3-gift-1kg", selection: { bundle: "gift", size: "1kg" }, price: 349, stock: 22 },
      { skuId: "p3-gift-5kg", selection: { bundle: "gift", size: "5kg" }, price: 1899, stock: 0 },
    ],
  },
];
