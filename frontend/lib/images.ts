/**
 * Image Assets Constants
 * รวม URL รูปภาพทั้งหมดไว้ที่นี่เพื่อง่ายต่อการจัดการและแก้ไข
 */

const BUILDER_IO_BASE = "https://api.builder.io/api/v1/image/assets/TEMP";

export const IMAGES = {
  // App Icons & Logos
  logo: `${BUILDER_IO_BASE}/920430fbdf8e30589d118b73fe63623ac597477e`,
  
  // Profile & User
  defaultProfileImage: `${BUILDER_IO_BASE}/e1117d6a428387a10894e9853f8d501e255f2faa`,
  defaultProfileSidebar: `${BUILDER_IO_BASE}/009824bbfb5cd6b43e232e01931d42e92eb3bfbd`,
  defaultProductImage: `${BUILDER_IO_BASE}/9f6f4a7ff45e59449140587baff701db77d4c33d`,
  
  // Icons
  editIcon: `${BUILDER_IO_BASE}/ae5a90e8d55e5378329581ced7d9028a3bf964df`,
  searchIcon: `${BUILDER_IO_BASE}/b153ae714e010a92b4a556df09e4b7be58cdd427`,
  cartIcon: `${BUILDER_IO_BASE}/f64983e622fbed261da071b7b1de4cdcfb40f6df`,
  emailIcon: `${BUILDER_IO_BASE}/bb1527979d860473a483ea26a23ad970aabda3aa`,
  passwordIcon: `${BUILDER_IO_BASE}/9f0a45bb2b764c9eccaa361dc89c8ddf0644c367`,
  userIcon: `${BUILDER_IO_BASE}/0aede5d0e28cb7e974e8566560f084f298d19463`,
  rightArrowIcon: `${BUILDER_IO_BASE}/ed7fa190b22aa590d38a45c97113e721f8fd4bf4`,
  addIcon: `${BUILDER_IO_BASE}/85456dbddef44f1ec86f5e003221c58a31f1e87a`,
  locationIcon: `${BUILDER_IO_BASE}/7ede9f2b16206bf9f2c70c68fa2058b9188ea1a9`,
  addressIcon: `${BUILDER_IO_BASE}/45f2260ea667bf4e0f39c8e4969ecc384b910e31`,
  settingsIcon: `${BUILDER_IO_BASE}/bb809fb3c9fe712e8079abddeae346b474b9a2ed`,
  reviewIcon: `${BUILDER_IO_BASE}/c3abd80db39f1b20acb82d72dbcd93aebb3d37b5`,
  chatIcon: `${BUILDER_IO_BASE}/2927c1b01de55ac95bcf80662e9b50d6e3507b1c`,
  coinGoldIcon: `${BUILDER_IO_BASE}/6eab73d84e06b64781e693f78a66f72436d12186`,
  deleteIcon: `${BUILDER_IO_BASE}/25c4dd6c2c65fbf58a458ec192aeb30986f74667`,
  emptyCartIcon: `${BUILDER_IO_BASE}/ef5106e8c1589916161d078d5360bd31312755ca`,
  mallBannerIcon: `${BUILDER_IO_BASE}/83093067aa3555f0fa4daef7e8df7e8f9abe6c61`,
  
  // Navigation Icons
  nav: {
    home: `${BUILDER_IO_BASE}/a4d5c457cadca55671963e132cba2bdd395881a9`,
    category: `${BUILDER_IO_BASE}/f34acdfaa4d915c3708eed128c269e53490186e0`,
    shopee: `${BUILDER_IO_BASE}/5bd10c6b52e96ab682118e91c3fa2c5c3f9b7574`,
    coupon: `${BUILDER_IO_BASE}/2901bf89fcba411386dac60c3d561a559f5223b6`,
    notification: `${BUILDER_IO_BASE}/b80de9f65b94d83c27755ef14a0def9a5307a069`,
  },
  
  // Banners (Home Page)
  banners: {
    banner1: `${BUILDER_IO_BASE}/1fd37dc0a9f7a659bc9914b9218685930cf9200f`,
    banner2: `${BUILDER_IO_BASE}/abb7edfe50237f94aeaf1a789fa8f6fe60e61085`,
    banner3: `${BUILDER_IO_BASE}/fd8662dce488a82f6ce120d647d6110ea222dc0b`,
  },
  
  // Mall Section Images
  mall: {
    pelletFood: `${BUILDER_IO_BASE}/abb7edfe50237f94aeaf1a789fa8f6fe60e61085`,
    clothing: `${BUILDER_IO_BASE}/fd8662dce488a82f6ce120d647d6110ea222dc0b`,
    petEquipment: `${BUILDER_IO_BASE}/50109194e77f1ca8695d89b25c2f6e64fb211b23`,
    cleaning: `${BUILDER_IO_BASE}/ae71c0de8f2b0bbb13cec9d98c66ae3627f6ae17`,
  },
  
  // Category Icons
  categories: {
    food: `${BUILDER_IO_BASE}/6d1edec1969de036e58d4ce6f5779ebb80350538`,
    meatFood: `${BUILDER_IO_BASE}/7271d343953f252b7a42d884cae36bb9d5469f47`,
    fishFood: `${BUILDER_IO_BASE}/a34d75e49f456032094a4b5ff46e0609ed5463ac`,
    vegetableFood: `${BUILDER_IO_BASE}/929fe5c8f3f0dc09a3ad8ec925bcebaaf8fb5227`,
    pelletFood: `${BUILDER_IO_BASE}/79f556957c403ba99f5d15360f964cdfa9950b4c`,
    clothing: `${BUILDER_IO_BASE}/004d3d0b2ac2c5d00c635a02511f937edc4882bf`,
    equipment: `${BUILDER_IO_BASE}/b8a79e732389849e0a47627c6632dd6c41546d62`,
    cleaning: `${BUILDER_IO_BASE}/d78aa07115d10be4a643985db44560ecfbf7cb06`,
  },
  
  // Checkout Page
  checkout: {
    locationPin: `${BUILDER_IO_BASE}/470f79eeeab9db1552d26be46901547ffc5caa1b`,
    shopIcon: `${BUILDER_IO_BASE}/b8ef727977f108caf154f7275db1c51b9e619bfe`,
    creditCardIcon: `${BUILDER_IO_BASE}/12fc36706518dfae295152ffa0b0fdb14dd2b5a2`,
    deliveryIcon: `${BUILDER_IO_BASE}/1a84f6dfdd398c7628939c37745abc70204d83ef`,
    checkboxChecked: `${BUILDER_IO_BASE}/cd56be3f878321fa1cf48fd2996b12b69b9485f2`,
    coinIcon: `${BUILDER_IO_BASE}/d83ca65e259bb78dd9793cd40aeae177c9bf6c4c`,
  },
  
  // Notifications
  notifications: {
    notif1: `${BUILDER_IO_BASE}/8151e0349402460e6ba5195dce270226f36ba8a4`,
    notif2: `${BUILDER_IO_BASE}/6723024e148c86b34fdc0adbac69f5a40b85f4cc`,
    notif3: `${BUILDER_IO_BASE}/3fc07f0b4daf5f29c83cbf6759ebf42f9c48a2a4`,
    notif4: `${BUILDER_IO_BASE}/26b07e9b32f4d7aea69be409170252b8d4ea0db0`,
    notif5: `${BUILDER_IO_BASE}/5bf7f32e2ef6cce40d0a941c717b981adcdf5600`,
    notif6: `${BUILDER_IO_BASE}/bb3a28ba9039618b69881db370b61e75f546b037`,
    notif7: `${BUILDER_IO_BASE}/74f973b279dda068ab202a9895608f6509cf7647`,
    notif8: `${BUILDER_IO_BASE}/44864f2efa986b73b671344ee16868c0bf260cca`,
  },
  
  // Product Images
  products: {
    product1: `${BUILDER_IO_BASE}/791772d1f1e3670b80fe9634be235e2a38c2a773`,
    product2: `${BUILDER_IO_BASE}/6cff6e21643dde16bec0d41e0a22d4d08c451617`,
    product3: `${BUILDER_IO_BASE}/2f57526bb1463607ea5e05a2f0b2148164758157`,
  },
  
  // Payment Cards
  cards: {
    visaIcon: `${BUILDER_IO_BASE}/f628a52ade3ea5a382954063075f79b0164ddd9c`,
    mastercardIcon: `${BUILDER_IO_BASE}/d32d6972ead0919d933be1bb396a8b4cf8fa49f4`,
    jcbIcon: `${BUILDER_IO_BASE}/2c8e8ed1a87be23179d489a05d810279d00399d7`,
    amexIcon: `${BUILDER_IO_BASE}/15af96c3363b6443f5991cacd07535827f16f3c8`,
  },
  
  // Coupon Badges
  coupons: {
    badge1: `${BUILDER_IO_BASE}/40c595824b97fee337663ced1df45b782130fab1`,
    badge2: `${BUILDER_IO_BASE}/a68ec0128b9f0a77b2a805f55c92a55214e6120e`,
  },
  
  // Category Page Banners
  categoryBanners: {
    banner1: `${BUILDER_IO_BASE}/0bd2893a763071d0018d40ec3fd0ec2534c33120`,
    banner2: `${BUILDER_IO_BASE}/1fd37dc0a9f7a659bc9914b9218685930cf9200f`,
    banner3: `${BUILDER_IO_BASE}/abb7edfe50237f94aeaf1a789fa8f6fe60e61085`,
  },
  
  // Profile Images
  profile: {
    defaultImage: `${BUILDER_IO_BASE}/4af760aa421324ef2f06ed9aaab02411ae07cf1e`,
  },
  
  // Catalog Product Images (for mock data)
  catalog: {
    dogFood1: `${BUILDER_IO_BASE}/9f6f4a7ff45e59449140587baff701db77d4c33d`,
    dogFood2: `${BUILDER_IO_BASE}/abb7edfe50237f94aeaf1a789fa8f6fe60e61085`,
    catFood1: `${BUILDER_IO_BASE}/791772d1f1e3670b80fe9634be235e2a38c2a773`,
    catFood2: `${BUILDER_IO_BASE}/6cff6e21643dde16bec0d41e0a22d4d08c451617`,
    accessories1: `${BUILDER_IO_BASE}/395c6f306fe987600d1e46a5ff4944a68c1cc986`,
    accessories2: `${BUILDER_IO_BASE}/50109194e77f1ca8695d89b25c2f6e64fb211b23`,
    toy: `${BUILDER_IO_BASE}/7ffc7c948ff8e15233c19748f8bd3ef5ed63b14d`,
    shampoo: `${BUILDER_IO_BASE}/2f57526bb1463607ea5e05a2f0b2148164758157`,
    snack: `${BUILDER_IO_BASE}/aae45ac0563278956fb9e425a0a469351743b70a`,
    supplement: `${BUILDER_IO_BASE}/0deb6464ba5ea0356f7edd023e441c04da01c575`,
    bed: `${BUILDER_IO_BASE}/2c07e0be7e9f34de7d3a66ec6b07c399979a3f83`,
    cleaning: `${BUILDER_IO_BASE}/ae71c0de8f2b0bbb13cec9d98c66ae3627f6ae17`,
    clothing: `${BUILDER_IO_BASE}/fd8662dce488a82f6ce120d647d6110ea222dc0b`,
  },
} as const;

// Export individual categories for convenience
export const { logo, defaultProfileImage, defaultProfileSidebar, defaultProductImage } = IMAGES;
export const { nav, banners, mall, categories, checkout, notifications, products, cards, coupons, categoryBanners, profile, catalog } = IMAGES;
