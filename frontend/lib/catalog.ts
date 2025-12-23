import { IMAGES } from "./images";
export type ProductVariantOption = {
  id: string;
  label: string;
  image?: string; // Optional image for variant option
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
  category?: string;
  brand?: string;
  catAge?: string;
};

// Category definitions
export const CATEGORIES = [
  { id: 'all', name: 'หมวดหมู่ทั้งหมด' },
  { id: 'food', name: 'อาหารสัตว์' },
  { id: 'meat-food', name: 'อาหารชนิดเนื้อสัตว์' },
  { id: 'fish-food', name: 'อาหารชนิดปลา' },
  { id: 'vegetable-food', name: 'อาหารชนิดผัก' },
  { id: 'pellet-food', name: 'อาหารชนิดเม็ด' },
  { id: 'clothing', name: 'เสื้อผ้าและอุปกรณ์แต่งตัว' },
  { id: 'equipment', name: 'อุปกรณ์สำหรับสัตว์เลี้ยง' },
  { id: 'cleaning', name: 'อุปกรณ์ทำความสะอาดและการอาบน้ำ' },
];

export const BRANDS = [
  { id: 'regalos', name: 'Regalos (รีกาลอส)' },
  { id: 'furlove', name: 'FURLOVE (คานิว่า)' },
  { id: 'buzz-netura', name: 'Buzz Netura บัซซ์' },
  { id: 'oliver', name: 'Oliver (โอลิเวอร์)' },
  { id: 'kin-d', name: 'Kin-D กินดี' },
  { id: 'all-well', name: 'All well (ออลเวลล์)' },
  { id: 'purina-one', name: 'PURINA ONE (เพียวริน่า วัน)' },
  { id: 'kaniva', name: 'Kaniva (คานิว่า)' },
];

export const CAT_AGES = [
  { id: 'kitten', name: 'ลูกแมว (แรกเกิด - 1 ปี)' },
  { id: 'adult', name: 'แมวผู้ใหญ่วัยรุ่น (1 ปี - 7 ปี)' },
  { id: 'mature', name: 'แมวผู้ใหญ่วัยผู้ใหญ่ (7 ปีขึ้นไป)' },
  { id: 'senior', name: 'แมวอาวุโส (11 ปีขึ้นไป)' },
];

export const PROMOTIONS = [
  'ส่วนลด สมาชิกใหม่',
  'ส่วนลด ส่งฟรี',
  'ลดแรง ซื้อครั้งแรก',
  'ราคาดีที่สุด',
  'จ่ายผ่านบัตร สะสมแต้ม',
  'ส่วนลด 10%/15%/20%',
  'Flash Sale',
];

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
  // อาหารชนิดเม็ด (Pellet Food)
  {
    id: "p1",
    name: "PURINA ONE เพียวริน่าวัน อาหารแมว",
    description: "อาหารแมวคุณภาพ สำหรับแมวทุกช่วงวัย เลือกสูตร/ขนาดได้ตามต้องการ พร้อมตัวเลือกแพ็คเกจ.",
    images: [
      IMAGES.catalog.dogFood1,
      IMAGES.catalog.dogFood2,
    ],
    shopName: "Purina Official",
    badges: ["สินค้าขายดี"],
    rating: 4.8,
    sold: 723,
    location: "กรุงเทพมหานคร",
    category: "pellet-food",
    brand: "purina-one",
    catAge: "adult",
    dimensions: [
      { key: "flavor", label: "สูตร", options: [{ id: "salmon", label: "ปลาแซลมอน" }, { id: "chicken", label: "ไก่" }] },
      { key: "size", label: "ขนาด", options: [{ id: "1kg", label: "1 กก." }, { id: "3kg", label: "3 กก." }] },
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
    description: "อาหารแมวเกรด Premium เลือกสีแพ็คเกจและขนาดได้ เหมาะสำหรับแมวทุกช่วงวัย.",
    images: [
      IMAGES.catalog.catFood1,
      IMAGES.catalog.catFood2,
    ],
    shopName: "90s.shop",
    badges: ["แนะนำ"],
    rating: 4.9,
    sold: 1288,
    location: "กรุงเทพมหานคร",
    category: "pellet-food",
    brand: "kaniva",
    catAge: "adult",
    dimensions: [
      { 
        key: "color", 
        label: "สีแพ็คเกจ", 
        options: [
          { id: "orange", label: "ส้ม", image: "https://ui-avatars.com/api/?name=O&background=FF6B35&color=fff&size=48" }, 
          { id: "blue", label: "น้ำเงิน", image: "https://ui-avatars.com/api/?name=B&background=3B82F6&color=fff&size=48" }
        ] 
      },
      { key: "size", label: "ขนาด", options: [{ id: "2kg", label: "2 กก." }, { id: "7kg", label: "7 กก." }] },
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
      IMAGES.catalog.accessories1,
      IMAGES.catalog.accessories2,
    ],
    shopName: "Bite of Wild Official Shop",
    badges: ["Mall"],
    rating: 4.7,
    sold: 541,
    location: "กรุงเทพมหานคร",
    category: "pellet-food",
    brand: "buzz-netura",
    catAge: "kitten",
    dimensions: [
      { key: "bundle", label: "แพ็คเกจ", options: [{ id: "standard", label: "มาตรฐาน" }, { id: "gift", label: "แถมขนม" }] },
      { key: "size", label: "น้ำหนัก", options: [{ id: "1kg", label: "1 กก." }, { id: "5kg", label: "5 กก." }] },
    ],
    skus: [
      { skuId: "p3-standard-1kg", selection: { bundle: "standard", size: "1kg" }, price: 299, stock: 16 },
      { skuId: "p3-standard-5kg", selection: { bundle: "standard", size: "5kg" }, price: 1789, stock: 8 },
      { skuId: "p3-gift-1kg", selection: { bundle: "gift", size: "1kg" }, price: 349, stock: 22 },
      { skuId: "p3-gift-5kg", selection: { bundle: "gift", size: "5kg" }, price: 1899, stock: 0 },
    ],
  },
  // อาหารชนิดเนื้อสัตว์ (Meat Food)
  {
    id: "p4",
    name: "Regalos รีกาลอส อาหารแมวเนื้อไก่",
    description: "อาหารแมวเนื้อไก่แท้ 100% โปรตีนสูง บำรุงขน",
    images: [IMAGES.catalog.toy],
    shopName: "Regalos Official",
    badges: ["สินค้าขายดี"],
    rating: 4.6,
    sold: 456,
    location: "กรุงเทพมหานคร",
    category: "meat-food",
    brand: "regalos",
    catAge: "adult",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "500g", label: "500 กรัม" }, { id: "1kg", label: "1 กก." }] }],
    skus: [
      { skuId: "p4-500g", selection: { size: "500g" }, price: 189, stock: 50 },
      { skuId: "p4-1kg", selection: { size: "1kg" }, price: 349, stock: 30 },
    ],
  },
  {
    id: "p5",
    name: "FURLOVE อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    location: "เชียงใหม่",
    category: "meat-food",
    brand: "furlove",
    catAge: "mature",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "400g", label: "400 กรัม" }, { id: "800g", label: "800 กรัม" }] }],
    skus: [
      { skuId: "p5-400g", selection: { size: "400g" }, price: 159, stock: 45 },
      { skuId: "p5-800g", selection: { size: "800g" }, price: 289, stock: 25 },
    ],
  },
  // อาหารชนิดปลา (Fish Food)
  {
    id: "p6",
    name: "Oliver อาหารแมวปลาทูน่า",
    description: "อาหารแมวปลาทูน่าแท้ โอเมก้า 3 สูง บำรุงสมอง",
    images: [IMAGES.catalog.snack],
    shopName: "Oliver Pet Shop",
    badges: ["สินค้าขายดี"],
    rating: 4.7,
    sold: 678,
    location: "กรุงเทพมหานคร",
    category: "fish-food",
    brand: "oliver",
    catAge: "adult",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "85g", label: "85 กรัม" }, { id: "400g", label: "400 กรัม" }] }],
    skus: [
      { skuId: "p6-85g", selection: { size: "85g" }, price: 35, stock: 100 },
      { skuId: "p6-400g", selection: { size: "400g" }, price: 129, stock: 60 },
    ],
  },
  {
    id: "p7",
    name: "Kin-D กินดี อาหารแมวปลาแซลมอน",
    description: "อาหารแมวปลาแซลมอนนอร์เวย์ สูตรพิเศษ",
    images: [IMAGES.catalog.supplement],
    shopName: "Kin-D Official",
    badges: ["Mall"],
    rating: 4.8,
    sold: 890,
    location: "กรุงเทพมหานคร",
    category: "fish-food",
    brand: "kin-d",
    catAge: "kitten",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "1kg", label: "1 กก." }, { id: "3kg", label: "3 กก." }] }],
    skus: [
      { skuId: "p7-1kg", selection: { size: "1kg" }, price: 450, stock: 35 },
      { skuId: "p7-3kg", selection: { size: "3kg" }, price: 1150, stock: 20 },
    ],
  },
  // อาหารชนิดผัก (Vegetable Food)
  {
    id: "p8",
    name: "All well ออลเวลล์ อาหารแมวผักรวม",
    description: "อาหารแมวสูตรผักรวม ไฟเบอร์สูง ช่วยระบบย่อย",
    images: [IMAGES.catalog.bed],
    shopName: "All well Store",
    badges: ["ใหม่"],
    rating: 4.4,
    sold: 156,
    location: "กรุงเทพมหานคร",
    category: "vegetable-food",
    brand: "all-well",
    catAge: "senior",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "500g", label: "500 กรัม" }, { id: "1.5kg", label: "1.5 กก." }] }],
    skus: [
      { skuId: "p8-500g", selection: { size: "500g" }, price: 199, stock: 40 },
      { skuId: "p8-1.5kg", selection: { size: "1.5kg" }, price: 489, stock: 20 },
    ],
  },
  // เสื้อผ้าและอุปกรณ์แต่งตัว (Clothing)
  {
    id: "p9",
    name: "ชุดเสื้อผ้าแมว Cute Cat Dress",
    description: "ชุดเสื้อผ้าแมวน่ารัก ผ้านุ่ม ใส่สบาย",
    images: [IMAGES.catalog.cleaning],
    shopName: "Pet Fashion",
    badges: ["สินค้าขายดี"],
    rating: 4.3,
    sold: 345,
    location: "กรุงเทพมหานคร",
    category: "clothing",
    brand: "furlove",
    catAge: "adult",
    dimensions: [
      { key: "size", label: "ไซส์", options: [{ id: "s", label: "S" }, { id: "m", label: "M" }, { id: "l", label: "L" }] },
      { key: "color", label: "สี", options: [{ id: "pink", label: "ชมพู" }, { id: "blue", label: "ฟ้า" }] },
    ],
    skus: [
      { skuId: "p9-s-pink", selection: { size: "s", color: "pink" }, price: 299, stock: 20 },
      { skuId: "p9-m-pink", selection: { size: "m", color: "pink" }, price: 299, stock: 25 },
      { skuId: "p9-l-pink", selection: { size: "l", color: "pink" }, price: 299, stock: 15 },
      { skuId: "p9-s-blue", selection: { size: "s", color: "blue" }, price: 299, stock: 18 },
      { skuId: "p9-m-blue", selection: { size: "m", color: "blue" }, price: 299, stock: 22 },
      { skuId: "p9-l-blue", selection: { size: "l", color: "blue" }, price: 299, stock: 10 },
    ],
  },
  {
    id: "p10",
    name: "ปลอกคอแมว Premium Collar",
    description: "ปลอกคอแมวพรีเมียม มีกระดิ่ง ปรับระดับได้",
    images: [IMAGES.catalog.clothing],
    shopName: "Pet Accessories",
    badges: ["แนะนำ"],
    rating: 4.6,
    sold: 567,
    location: "เชียงใหม่",
    category: "clothing",
    brand: "oliver",
    catAge: "adult",
    dimensions: [{ key: "color", label: "สี", options: [{ id: "red", label: "แดง" }, { id: "black", label: "ดำ" }, { id: "gold", label: "ทอง" }] }],
    skus: [
      { skuId: "p10-red", selection: { color: "red" }, price: 149, stock: 50 },
      { skuId: "p10-black", selection: { color: "black" }, price: 149, stock: 45 },
      { skuId: "p10-gold", selection: { color: "gold" }, price: 179, stock: 30 },
    ],
  },
  // อุปกรณ์สำหรับสัตว์เลี้ยง (Equipment)
  {
    id: "p11",
    name: "ที่ลับเล็บแมว Cat Scratcher",
    description: "ที่ลับเล็บแมวทำจากกระดาษลูกฟูก ทนทาน",
    images: [IMAGES.categoryBanners.banner2],
    shopName: "Cat Equipment",
    badges: ["สินค้าขายดี"],
    rating: 4.5,
    sold: 789,
    location: "กรุงเทพมหานคร",
    category: "equipment",
    brand: "kin-d",
    catAge: "adult",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "small", label: "เล็ก" }, { id: "large", label: "ใหญ่" }] }],
    skus: [
      { skuId: "p11-small", selection: { size: "small" }, price: 199, stock: 60 },
      { skuId: "p11-large", selection: { size: "large" }, price: 399, stock: 40 },
    ],
  },
  {
    id: "p12",
    name: "บ้านแมว Cat House Deluxe",
    description: "บ้านแมวขนาดใหญ่ หลายชั้น มีที่ลับเล็บ",
    images: [IMAGES.catalog.accessories2],
    shopName: "Cat Home",
    badges: ["Mall"],
    rating: 4.9,
    sold: 234,
    location: "กรุงเทพมหานคร",
    category: "equipment",
    brand: "regalos",
    catAge: "adult",
    dimensions: [{ key: "type", label: "แบบ", options: [{ id: "2-floor", label: "2 ชั้น" }, { id: "3-floor", label: "3 ชั้น" }] }],
    skus: [
      { skuId: "p12-2floor", selection: { type: "2-floor" }, price: 1990, stock: 15 },
      { skuId: "p12-3floor", selection: { type: "3-floor" }, price: 2990, stock: 10 },
    ],
  },
  // อุปกรณ์ทำความสะอาดและการอาบน้ำ (Cleaning)
  {
    id: "p13",
    name: "แชมพูแมว Premium Shampoo",
    description: "แชมพูแมวสูตรอ่อนโยน ไม่ระคายเคืองผิว",
    images: [IMAGES.catalog.dogFood2],
    shopName: "Pet Care",
    badges: ["สินค้าขายดี"],
    rating: 4.7,
    sold: 456,
    location: "กรุงเทพมหานคร",
    category: "cleaning",
    brand: "all-well",
    catAge: "adult",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "250ml", label: "250 มล." }, { id: "500ml", label: "500 มล." }] }],
    skus: [
      { skuId: "p13-250ml", selection: { size: "250ml" }, price: 199, stock: 70 },
      { skuId: "p13-500ml", selection: { size: "500ml" }, price: 349, stock: 45 },
    ],
  },
  {
    id: "p14",
    name: "แปรงขนแมว Grooming Brush",
    description: "แปรงขนแมว ช่วยลดขนร่วง นวดผิวหนัง",
    images: [IMAGES.catalog.catFood2],
    shopName: "Pet Grooming",
    badges: ["แนะนำ"],
    rating: 4.6,
    sold: 678,
    location: "เชียงใหม่",
    category: "cleaning",
    brand: "buzz-netura",
    catAge: "adult",
    dimensions: [{ key: "type", label: "แบบ", options: [{ id: "soft", label: "ขนอ่อน" }, { id: "firm", label: "ขนแข็ง" }] }],
    skus: [
      { skuId: "p14-soft", selection: { type: "soft" }, price: 249, stock: 50 },
      { skuId: "p14-firm", selection: { type: "firm" }, price: 249, stock: 45 },
    ],
  },
  {
    id: "p15",
    name: "ทรายแมว Premium Cat Litter",
    description: "ทรายแมวเกรดพรีเมียม ดูดกลิ่นดี ไม่ฟุ้ง",
    images: [IMAGES.catalog.catFood1],
    shopName: "Cat Litter Store",
    badges: ["สินค้าขายดี"],
    rating: 4.8,
    sold: 1234,
    location: "กรุงเทพมหานคร",
    category: "cleaning",
    brand: "kaniva",
    catAge: "adult",
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p15-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p15-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p16",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p16-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p16-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p17",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
  skus: [
      { skuId: "p17-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p17-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p18",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p18-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p18-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p19",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p19-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p19-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p20",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p20-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p20-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p21",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p21-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p21-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p22",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p22-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p22-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p23",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p23-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p23-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p24",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p24-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p24-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p25",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p25-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p25-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
  {
    id: "p26",
    name: "อาหารแมวเนื้อวัว Premium",
    description: "อาหารแมวเนื้อวัวคุณภาพสูง เหมาะสำหรับแมวโต",
    images: [IMAGES.catalog.shampoo],
    shopName: "FURLOVE Store",
    badges: ["แนะนำ"],
    rating: 4.5,
    sold: 234,
    dimensions: [{ key: "size", label: "ขนาด", options: [{ id: "5L", label: "5 ลิตร" }, { id: "10L", label: "10 ลิตร" }] }],
    skus: [
      { skuId: "p26-5L", selection: { size: "5L" }, price: 199, stock: 100 },
      { skuId: "p26-10L", selection: { size: "10L" }, price: 349, stock: 80 },
    ],
  },
];
