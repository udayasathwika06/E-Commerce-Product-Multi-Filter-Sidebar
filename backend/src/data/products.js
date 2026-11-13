/**
 * Master Product Item Inventory
 * Extensive dataset covering multiple categories, wide price spectrum in INR (₹299 - ₹79,999),
 * and varied star ratings (1.0 - 5.0) for comprehensive testing.
 */
export const products = [
  // --- Electronics ---
  {
    id: "elec-01",
    name: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    category: "Electronics",
    price: 29990,
    rating: 4.8,
    reviewCount: 2410,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description: "Industry-leading noise cancellation with two processors and 8 microphones.",
    inStock: true
  },
  {
    id: "elec-02",
    name: "Apple Watch Series 9 GPS 45mm",
    category: "Electronics",
    price: 39900,
    rating: 4.7,
    reviewCount: 1890,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    description: "Powerful S9 SiP chip, double tap gesture, and bright always-on display.",
    inStock: true
  },
  {
    id: "elec-03",
    name: "Keychron Q1 Pro Custom Mechanical Keyboard",
    category: "Electronics",
    price: 16499,
    rating: 4.6,
    reviewCount: 754,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    description: "QMK/VIA wireless custom mechanical keyboard with CNC aluminum body.",
    inStock: true
  },
  {
    id: "elec-04",
    name: "Logitech MX Master 3S Wireless Mouse",
    category: "Electronics",
    price: 8995,
    rating: 4.9,
    reviewCount: 3120,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    description: "Quiet Clicks and 8K DPI any-surface tracking for peak productivity.",
    inStock: true
  },
  {
    id: "elec-05",
    name: "Dell UltraSharp 27\" 4K USB-C Hub Monitor",
    category: "Electronics",
    price: 54999,
    rating: 4.5,
    reviewCount: 620,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
    description: "Brilliant color clarity with IPS Black technology and 90W power delivery.",
    inStock: true
  },
  {
    id: "elec-06",
    name: "JBL Flip 6 Portable Waterproof Speaker",
    category: "Electronics",
    price: 9999,
    rating: 4.4,
    reviewCount: 1450,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    description: "Eco-friendly bold sound with 2-way speaker system and IP67 rating.",
    inStock: true
  },
  {
    id: "elec-07",
    name: "Anker 737 Power Bank 24,000mAh 140W",
    category: "Electronics",
    price: 8499,
    rating: 4.6,
    reviewCount: 980,
    image: "https://images.unsplash.com/photo-1609592426867-b9c1d68a2bf6?w=600&auto=format&fit=crop&q=80",
    description: "Ultra-powerful two-way charging with digital smart display.",
    inStock: true
  },
  {
    id: "elec-08",
    name: "Budget Wired Gaming Headset",
    category: "Electronics",
    price: 1499,
    rating: 2.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    description: "Entry level headset with stereo surround sound and inline controls.",
    inStock: true
  },
  {
    id: "elec-09",
    name: "Basic USB Desktop Microphone",
    category: "Electronics",
    price: 999,
    rating: 1.9,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    description: "Plug-and-play condenser mic for basic voice calls and conference meetings.",
    inStock: true
  },
  {
    id: "elec-10",
    name: "Canon EOS R50 Mirrorless Camera Body",
    category: "Electronics",
    price: 58990,
    rating: 4.8,
    reviewCount: 420,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    description: "Compact 24.2 MP mirrorless camera with Dual Pixel CMOS AF II.",
    inStock: true
  },

  // --- Apparel ---
  {
    id: "app-01",
    name: "Levi's Vintage Trucker Denim Jacket",
    category: "Apparel",
    price: 4999,
    rating: 4.6,
    reviewCount: 840,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
    description: "Classic silhouette trucker jacket made from 100% durable cotton denim.",
    inStock: true
  },
  {
    id: "app-02",
    name: "Patagonia Better Sweater Fleece Quarter-Zip",
    category: "Apparel",
    price: 8999,
    rating: 4.9,
    reviewCount: 1620,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    description: "Warm, low-bulk quarter-zip pullover made with soft recycled polyester fleece.",
    inStock: true
  },
  {
    id: "app-03",
    name: "Heavyweight Boxy Supima Cotton T-Shirt",
    category: "Apparel",
    price: 1299,
    rating: 4.4,
    reviewCount: 520,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    description: "Relaxed drop-shoulder heavyweight t-shirt crafted from extra-long staple Supima.",
    inStock: true
  },
  {
    id: "app-04",
    name: "All-Weather Technical Parka Jacket",
    category: "Apparel",
    price: 14999,
    rating: 4.7,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    description: "Waterproof, wind-resistant outer shell with thermal insulating down fill.",
    inStock: true
  },
  {
    id: "app-05",
    name: "Everlane Slim 4-Way Stretch Chino Pant",
    category: "Apparel",
    price: 3499,
    rating: 4.3,
    reviewCount: 790,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    description: "Tailored comfortable chinos designed with moisture-wicking flexible twill.",
    inStock: true
  },
  {
    id: "app-06",
    name: "Merino Wool Crewneck Cable Knit Sweater",
    category: "Apparel",
    price: 7999,
    rating: 4.8,
    reviewCount: 460,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
    description: "100% Australian extra-fine merino wool with timeless textured weave.",
    inStock: true
  },
  {
    id: "app-07",
    name: "Ultra-Lightweight Packable Windbreaker",
    category: "Apparel",
    price: 2499,
    rating: 3.9,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    description: "Breathable ripstop windbreaker with zippered hand pockets and stowaway hood.",
    inStock: true
  },
  {
    id: "app-08",
    name: "Basic Synthetic Poly-Blend Workout Top",
    category: "Apparel",
    price: 699,
    rating: 2.3,
    reviewCount: 65,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    description: "Everyday polyester gym t-shirt with loose fit.",
    inStock: true
  },

  // --- Footwear ---
  {
    id: "foot-01",
    name: "Nike Air Max 270 React Running Shoes",
    category: "Footwear",
    price: 12995,
    rating: 4.7,
    reviewCount: 2900,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description: "Max Air 270 unit delivers unrivaled, all-day comfort with sleek modern aesthetics.",
    inStock: true
  },
  {
    id: "foot-02",
    name: "Thursday Boot Co. Captain Leather Ankle Boots",
    category: "Footwear",
    price: 16999,
    rating: 4.9,
    reviewCount: 3450,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80",
    description: "Handcrafted tier-one full-grain leather boots with Goodyear welt construction.",
    inStock: true
  },
  {
    id: "foot-03",
    name: "Adidas Ultraboost Light Performance Runners",
    category: "Footwear",
    price: 15999,
    rating: 4.6,
    reviewCount: 1530,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
    description: "Light BOOST midsole with Continental Better Rubber outsole for superior grip.",
    inStock: true
  },
  {
    id: "foot-04",
    name: "Birkenstock Arizona Soft Footbed Suede Sandals",
    category: "Footwear",
    price: 9990,
    rating: 4.8,
    reviewCount: 1940,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=80",
    description: "Anatomically shaped cork-latex footbed with velvet soft suede finish.",
    inStock: true
  },
  {
    id: "foot-05",
    name: "Vans Old Skool Classic Skate Shoes",
    category: "Footwear",
    price: 4999,
    rating: 4.5,
    reviewCount: 2210,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80",
    description: "Durable canvas and suede uppers with iconic side stripe and signature rubber waffle outsole.",
    inStock: true
  },
  {
    id: "foot-06",
    name: "Salomon Speedcross 5 Trail Running Shoes",
    category: "Footwear",
    price: 11999,
    rating: 4.6,
    reviewCount: 880,
    image: "https://images.unsplash.com/photo-1551107696-a4b085a6d966?w=600&auto=format&fit=crop&q=80",
    description: "Aggressive grip with deep chevron lugs designed for technical trail terrain.",
    inStock: true
  },
  {
    id: "foot-07",
    name: "Generic Slip-On Canvas Loafers",
    category: "Footwear",
    price: 1299,
    rating: 3.2,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
    description: "Casual lightweight flat slip-on shoes with thin vulcanized sole.",
    inStock: true
  },
  {
    id: "foot-08",
    name: "Cheap Plastic Shower Slides",
    category: "Footwear",
    price: 499,
    rating: 1.8,
    reviewCount: 34,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    description: "Basic molded EVA slides with standard non-slip bottom.",
    inStock: true
  },

  // --- Accessories ---
  {
    id: "acc-01",
    name: "Bellroy Slim Leather Bi-fold Sleeve Wallet",
    category: "Accessories",
    price: 4299,
    rating: 4.7,
    reviewCount: 1100,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
    description: "Eco-tanned leather bi-fold engineered with quick-draw pull tab and RFID shielding.",
    inStock: true
  },
  {
    id: "acc-02",
    name: "Ray-Ban Classic Aviator Polarized Sunglasses",
    category: "Accessories",
    price: 10490,
    rating: 4.8,
    reviewCount: 2300,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    description: "Timeless teardrop metal frames with premium crystal green polarized lenses.",
    inStock: true
  },
  {
    id: "acc-03",
    name: "Peak Design Everyday Backpack 20L",
    category: "Accessories",
    price: 22999,
    rating: 4.9,
    reviewCount: 1420,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    description: "Award-winning daily and photo carry backpack with ultra-clean aesthetic.",
    inStock: true
  },
  {
    id: "acc-04",
    name: "Oura Ring Gen 3 Horizon Smart Wellness Tracker",
    category: "Accessories",
    price: 28999,
    rating: 4.4,
    reviewCount: 680,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
    description: "Titanium sleep, readiness, and heart-rate tracking smart ring.",
    inStock: true
  },
  {
    id: "acc-05",
    name: "Fossil Minimalist Chronograph Leather Watch",
    category: "Accessories",
    price: 9495,
    rating: 4.3,
    reviewCount: 540,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    description: "Stainless steel case with clean navy face and supple brown leather strap.",
    inStock: true
  },
  {
    id: "acc-06",
    name: "Heavy Duty Canvas Weekender Duffel Bag",
    category: "Accessories",
    price: 4499,
    rating: 4.5,
    reviewCount: 380,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&auto=format&fit=crop&q=80",
    description: "Spacious 45L travel duffel with reinforced base and brass hardware.",
    inStock: true
  },
  {
    id: "acc-07",
    name: "Basic Faux Leather Keychain",
    category: "Accessories",
    price: 299,
    rating: 2.9,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80",
    description: "Simple metal split-ring keychain with synthetic leather strap.",
    inStock: true
  },

  // --- Home & Kitchen ---
  {
    id: "home-01",
    name: "Breville Barista Touch Espresso Machine",
    category: "Home & Kitchen",
    price: 79999,
    rating: 4.8,
    reviewCount: 1650,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80",
    description: "Automated touchscreen with integrated conical burr grinder and thermo-jet heating.",
    inStock: true
  },
  {
    id: "home-02",
    name: "Fellow Stagg EKG Electric Pour-Over Kettle",
    category: "Home & Kitchen",
    price: 13999,
    rating: 4.9,
    reviewCount: 2150,
    image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=600&auto=format&fit=crop&q=80",
    description: "Variable temperature control with precision gooseneck spout and LCD screen.",
    inStock: true
  },
  {
    id: "home-03",
    name: "Dyson V12 Detect Slim Cordless Vacuum",
    category: "Home & Kitchen",
    price: 52900,
    rating: 4.6,
    reviewCount: 1120,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80",
    description: "Laser illumination reveals invisible dust on hard floors with piezo sensor.",
    inStock: true
  },
  {
    id: "home-04",
    name: "Le Creuset Enameled Cast Iron Dutch Oven 5.5 Qt",
    category: "Home & Kitchen",
    price: 32000,
    rating: 4.9,
    reviewCount: 3800,
    image: "https://images.unsplash.com/photo-1584990347449-39908cf6924b?w=600&auto=format&fit=crop&q=80",
    description: "Iconic French-made cast iron for slow-cooking, braising, and roasting.",
    inStock: true
  },
  {
    id: "home-05",
    name: "Modern Minimalist Nordic Ceramic Mug Set of 4",
    category: "Home & Kitchen",
    price: 1999,
    rating: 4.4,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    description: "Handcrafted stoneware pottery mugs with ergonomic matte finish handles.",
    inStock: true
  },
  {
    id: "home-06",
    name: "Ultrasonic Cool Mist Aromatherapy Diffuser",
    category: "Home & Kitchen",
    price: 1799,
    rating: 4.2,
    reviewCount: 450,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
    description: "BPA-free essential oil diffuser with ambient warm LED lighting.",
    inStock: true
  },
  {
    id: "home-07",
    name: "Basic Stainless Steel Kitchen Tongs",
    category: "Home & Kitchen",
    price: 499,
    rating: 2.7,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    description: "Standard locking food tongs with heat-resistant silicone tips.",
    inStock: true
  },
  {
    id: "home-08",
    name: "Benks Wireless Charging RGB Desk Lamp",
    category: "Home & Kitchen",
    price: 4999,
    rating: 4.5,
    reviewCount: 290,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
    description: "Stepless dimming architect lamp with fast Qi wireless charging base.",
    inStock: true
  }
];
