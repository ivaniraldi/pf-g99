// mocks.js

export const usersMock = [
  {
    id: "u_01",
    name: "Ana Pérez",
    email: "ana@example.com",
    password: "MiClaveSegura123",
    role: "customer",
    phone: "+34 600 123 456",
    address: { street: "Calle Mayor 10", city: "Madrid", postalCode: "28013", country: "España" }
  },
  {
    id: "u_02",
    name: "Pedro Gómez",
    email: "pedro@example.com",
    password: "AdminPassword123",
    role: "admin",
    phone: "+34 600 999 888",
    address: { street: "Avenida de la Castellana 1", city: "Madrid", postalCode: "28046", country: "España" }
  },
  {
    id: "u_03",
    name: "Lucía Fernández",
    email: "lucia@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 111 222",
    address: { street: "Calle Alcalá 50", city: "Madrid", postalCode: "28014", country: "España" }
  },
  {
    id: "u_04",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 333 444",
    address: { street: "Gran Vía 12", city: "Barcelona", postalCode: "08002", country: "España" }
  },
  {
    id: "u_05",
    name: "Elena Martínez",
    email: "elena@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 555 666",
    address: { street: "Paseo de Gracia 8", city: "Barcelona", postalCode: "08007", country: "España" }
  },
  {
    id: "u_06",
    name: "Javier López",
    email: "javier@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 777 888",
    address: { street: "Calle Sierpes 25", city: "Sevilla", postalCode: "41004", country: "España" }
  },
  {
    id: "u_07",
    name: "Marta Sánchez",
    email: "marta@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 999 000",
    address: { street: "Calle Larios 15", city: "Málaga", postalCode: "29005", country: "España" }
  },
  {
    id: "u_08",
    name: "Ricardo Torres",
    email: "ricardo@example.com",
    password: "password123",
    role: "admin",
    phone: "+34 600 222 333",
    address: { street: "Calle Colón 30", city: "Valencia", postalCode: "46004", country: "España" }
  },
  {
    id: "u_09",
    name: "Sofía Castro",
    email: "sofia@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 444 555",
    address: { street: "Rúa de Franco 20", city: "Santiago", postalCode: "15702", country: "España" }
  },
  {
    id: "u_10",
    name: "Diego Morales",
    email: "diego@example.com",
    password: "password123",
    role: "customer",
    phone: "+34 600 666 777",
    address: { street: "Calle Uría 40", city: "Oviedo", postalCode: "33003", country: "España" }
  }
];

export const categories = [
  { id: "c_01", name: "T-Shirts", description: "Camisetas de algodón premium" },
  { id: "c_02", name: "Polos", description: "Polos clásicos y modernos" },
  { id: "c_03", name: "Long Sleeve", description: "Mangas largas para todo clima" },
  { id: "c_04", name: "Sweatshirts", description: "Sudaderas cómodas y con estilo" },
  { id: "c_05", name: "Jackets", description: "Chaquetas y abrigos de temporada" }
];

export const productsMock = [
  {
    id: "p_101",
    name: "Camiseta Básica Blanca",
    description: "Algodón 100% premium con corte regular.",
    price: 19.99,
    brand: "Urban ADL",
    category: { id: "c_01", name: "T-Shirts" },
    availableSizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Gris"],
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_102",
    name: "Polo Navy Classic",
    description: "Polo de piqué con detalles en contraste.",
    price: 34.99,
    brand: "ADL Heritage",
    category: { id: "c_02", name: "Polos" },
    availableSizes: ["M", "L", "XL"],
    colors: ["Azul marino", "Blanco"],
    stock: 85,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_103",
    name: "Manga Larga Gris Melange",
    description: "Suavidad extrema para tus días frescos.",
    price: 24.99,
    brand: "Urban ADL",
    category: { id: "c_03", name: "Long Sleeve" },
    availableSizes: ["S", "M", "L"],
    colors: ["Gris", "Negro"],
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_104",
    name: "Sudadera Essential Oversize",
    description: "Corte moderno con interior cepillado.",
    price: 49.99,
    brand: "ADL Studio",
    category: { id: "c_04", name: "Sweatshirts" },
    availableSizes: ["M", "L", "XL"],
    colors: ["Beige", "Negro", "Verde"],
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_105",
    name: "Chaqueta Bomber Negra",
    description: "Estilo urbano resistente al viento.",
    price: 89.99,
    brand: "ADL Tech",
    category: { id: "c_05", name: "Jackets" },
    availableSizes: ["L", "XL"],
    colors: ["Negro"],
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_106",
    name: "Camiseta Graphic Retro",
    description: "Inspiración vintage en algodón orgánico.",
    price: 22.99,
    brand: "Urban ADL",
    category: { id: "c_01", name: "T-Shirts" },
    availableSizes: ["S", "M", "L"],
    colors: ["Blanco", "Crema"],
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_107",
    name: "Polo Slim Fit Burdeos",
    description: "Ajuste perfecto para un look sofisticado.",
    price: 32.99,
    brand: "ADL Heritage",
    category: { id: "c_02", name: "Polos" },
    availableSizes: ["S", "M", "L"],
    colors: ["Burdeos", "Negro"],
    stock: 55,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_108",
    name: "Manga Larga de Rayas",
    description: "Estilo náutico atemporal.",
    price: 27.99,
    brand: "Urban ADL",
    category: { id: "c_03", name: "Long Sleeve" },
    availableSizes: ["M", "L"],
    colors: ["Azul/Blanco", "Rojo/Blanco"],
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_109",
    name: "Sudadera con Capucha Pastel",
    description: "Tonos suaves para un confort total.",
    price: 45.99,
    brand: "ADL Studio",
    category: { id: "c_04", name: "Sweatshirts" },
    availableSizes: ["S", "M", "L"],
    colors: ["Rosa", "Celeste", "Lila"],
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_110",
    name: "Parka Impermeable",
    description: "Protección máxima contra la lluvia.",
    price: 120.00,
    brand: "ADL Tech",
    category: { id: "c_05", name: "Jackets" },
    availableSizes: ["M", "L", "XL"],
    colors: ["Verde Oliva", "Azul"],
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_111",
    name: "Camiseta Heavy Cotton",
    description: "Tejido grueso de alta durabilidad.",
    price: 21.99,
    brand: "Urban ADL",
    category: { id: "c_01", name: "T-Shirts" },
    availableSizes: ["L", "XL", "XXL"],
    colors: ["Gris Carbón", "Negro"],
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_112",
    name: "Polo de Lino Verano",
    description: "Fresco y ligero para días calurosos.",
    price: 39.99,
    brand: "ADL Heritage",
    category: { id: "c_02", name: "Polos" },
    availableSizes: ["M", "L"],
    colors: ["Blanco", "Arena"],
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_113",
    name: "Manga Larga Térmica",
    description: "Capa base ideal para el invierno.",
    price: 29.99,
    brand: "ADL Tech",
    category: { id: "c_03", name: "Long Sleeve" },
    availableSizes: ["S", "M", "L"],
    colors: ["Negro", "Blanco"],
    stock: 110,
    imageUrl: "https://images.unsplash.com/photo-1611312449412-6cefac56398e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_114",
    name: "Sudadera Half-Zip",
    description: "Cierre de media cremallera muy versátil.",
    price: 54.99,
    brand: "ADL Studio",
    category: { id: "c_04", name: "Sweatshirts" },
    availableSizes: ["M", "L", "XL"],
    colors: ["Gris", "Azul"],
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_115",
    name: "Chaqueta Vaquera ADL",
    description: "Denim premium con lavado artesanal.",
    price: 79.99,
    brand: "Urban ADL",
    category: { id: "c_05", name: "Jackets" },
    availableSizes: ["S", "M", "L"],
    colors: ["Azul Denim"],
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_116",
    name: "Camiseta Pocket Tee",
    description: "Bolsillo frontal funcional y decorativo.",
    price: 20.99,
    brand: "Urban ADL",
    category: { id: "c_01", name: "T-Shirts" },
    availableSizes: ["S", "M", "L"],
    colors: ["Verde", "Gris"],
    stock: 130,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_117",
    name: "Polo Knit Elegance",
    description: "Tejido de punto de alta gama.",
    price: 49.99,
    brand: "ADL Heritage",
    category: { id: "c_02", name: "Polos" },
    availableSizes: ["M", "L"],
    colors: ["Crema", "Negro"],
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1626497748470-28308419f240?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_118",
    name: "Manga Larga Henley",
    description: "Cuello con botones estilo clásico.",
    price: 31.99,
    brand: "ADL Heritage",
    category: { id: "c_03", name: "Long Sleeve" },
    availableSizes: ["M", "L", "XL"],
    colors: ["Gris", "Azul"],
    stock: 65,
    imageUrl: "https://images.unsplash.com/photo-1589310243389-94754da56bca?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_119",
    name: "Sudadera Crop (Mujer)",
    description: "Corte corto para un look deportivo.",
    price: 39.99,
    brand: "ADL Studio",
    category: { id: "c_04", name: "Sweatshirts" },
    availableSizes: ["XS", "S", "M"],
    colors: ["Blanco", "Negro"],
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p_120",
    name: "Chaqueta Cortavientos",
    description: "Ligera y fácil de guardar.",
    price: 64.99,
    brand: "ADL Tech",
    category: { id: "c_05", name: "Jackets" },
    availableSizes: ["M", "L"],
    colors: ["Amarillo", "Negro"],
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=800&auto=format&fit=crop"
  }
];

export const orders = [
  {
    id: "o_101",
    userId: "u_01",
    status: "delivered",
    total: 89.97,
    items: [
      { productId: "p_101", name: "Camiseta Básica Blanca", size: "M", color: "Blanco", quantity: 2, price: 19.99 },
      { productId: "p_104", name: "Sudadera Essential", size: "L", color: "Beige", quantity: 1, price: 49.99 }
    ],
    createdAt: "2026-04-20T18:30:00Z"
  },
  {
    id: "o_102",
    userId: "u_03",
    status: "shipped",
    total: 124.98,
    items: [
      { productId: "p_105", name: "Chaqueta Bomber Negra", size: "L", color: "Negro", quantity: 1, price: 89.99 },
      { productId: "p_102", name: "Polo Navy Classic", size: "M", color: "Azul marino", quantity: 1, price: 34.99 }
    ],
    createdAt: "2026-04-25T10:15:00Z"
  },
  {
    id: "o_103",
    userId: "u_04",
    status: "processing",
    total: 68.97,
    items: [
      { productId: "p_106", name: "Camiseta Graphic Retro", size: "M", color: "Blanco", quantity: 3, price: 22.99 }
    ],
    createdAt: "2026-04-28T14:20:00Z"
  },
  {
    id: "o_104",
    userId: "u_05",
    status: "delivered",
    total: 154.98,
    items: [
      { productId: "p_110", name: "Parka Impermeable", size: "L", color: "Verde Oliva", quantity: 1, price: 120.00 },
      { productId: "p_102", name: "Polo Navy Classic", size: "XL", color: "Blanco", quantity: 1, price: 34.99 }
    ],
    createdAt: "2026-04-29T09:45:00Z"
  },
  {
    id: "o_105",
    userId: "u_07",
    status: "cancelled",
    total: 21.99,
    items: [
      { productId: "p_111", name: "Camiseta Heavy Cotton", size: "XXL", color: "Negro", quantity: 1, price: 21.99 }
    ],
    createdAt: "2026-04-30T11:10:00Z"
  },
  {
    id: "o_106",
    userId: "u_09",
    status: "processing",
    total: 100.98,
    items: [
      { productId: "p_114", name: "Sudadera Half-Zip", size: "M", color: "Gris", quantity: 1, price: 54.99 },
      { productId: "p_109", name: "Sudadera Pastel", size: "S", color: "Rosa", quantity: 1, price: 45.99 }
    ],
    createdAt: "2026-04-30T22:00:00Z"
  }
];