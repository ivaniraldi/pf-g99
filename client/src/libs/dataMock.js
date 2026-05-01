// mocks.js

export const usersMock = [
  {
    id: "u_01",
    name: "Ana Pérez",
    email: "ana@example.com",
    password: "MiClaveSegura123", // Incluido para mocks de auth/login
    role: "customer",
    phone: "+34 600 123 456",
    address: {
      street: "Calle Mayor 10",
      city: "Madrid",
      postalCode: "28013",
      country: "España"
    },
    orders: [
      {
        id: "o_101",
        status: "delivered",
        total: 49.99
      }
    ]
  },
  {
    id: "u_02",
    name: "Pedro Gómez",
    email: "pedro@example.com",
    password: "AdminPassword123",
    role: "admin"
  }
];

export const categories = [
  { 
    id: "c_01", 
    name: "T-Shirts", 
    description: "Camisetas de algodón para uso diario" 
  },
  { 
    id: "c_02", 
    name: "Polo",
    description: "Polos clásicos"
  },
  { 
    id: "c_03", 
    name: "Long Sleeve",
    description: "Camisetas de manga larga"
  }
];

export const productsMock = [
  {
    id: "p_101",
    name: "Camiseta Básica Blanca",
    description: "Camiseta de algodón 100% con corte regular y costuras reforzadas.",
    price: 19.99,
    brand: "Urban Shirt",
    category: { id: "c_01", name: "T-Shirts" },
    availableSizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro"],
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "/images/camiseta-blanca-1.jpg",
      "/images/camiseta-blanca-2.jpg"
    ],
    material: "Algodón 100%",
    slug: "camiseta-basica-blanca"
  },
  {
    id: "p_102",
    name: "Polo Azul Marino",
    description: "Polo clásico en color azul marino.",
    price: 29.99,
    brand: "Urban Shirt",
    category: { id: "c_02", name: "Polo" },
    availableSizes: ["M", "L"],
    colors: ["Azul marino"],
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "/images/polo-azul.jpg"
    ]
  },
   {
    id: "p_103",
    name: "Polo Azul Marino",
    description: "Polo clásico en color azul marino.",
    price: 29.99,
    brand: "Urban Shirt",
    category: { id: "c_02", name: "Polo" },
    availableSizes: ["M", "L"],
    colors: ["Azul marino"],
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "/images/polo-azul.jpg"
    ]
  },
   {
    id: "p_104",
    name: "Polo Azul Marino",
    description: "Polo clásico en color azul marino.",
    price: 29.99,
    brand: "Urban Shirt",
    category: { id: "c_02", name: "Polo" },
    availableSizes: ["M", "L"],
    colors: ["Azul marino"],
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "/images/polo-azul.jpg"
    ]
  }
];

export const orders = [
  {
    id: "o_101",
    userId: "u_01",
    status: "delivered",
    total: 49.99,
    items: [
      {
        productId: "p_101",
        name: "Camiseta Básica Blanca",
        size: "M",
        color: "Blanco",
        quantity: 1,
        price: 19.99
      },
      {
        productId: "p_104",
        name: "Camiseta Negra",
        size: "L",
        color: "Negro",
        quantity: 1,
        price: 29.99
      }
    ],
    shippingAddress: {
      street: "Calle Mayor 10",
      city: "Madrid",
      postalCode: "28013",
      country: "España"
    },
    placedAt: "2026-04-19T20:45:00Z",
    createdAt: "2026-04-20T18:30:00Z"
  },
  {
    id: "o_102",
    userId: "u_02",
    status: "processing",
    total: 74.97,
    items: [], // Añadido array vacío para mantener consistencia en mocks
    createdAt: "2026-04-28T10:15:00Z"
  }
];