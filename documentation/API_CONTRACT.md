# 📄 API Contract

---

## 👥 Users

### `GET /users`
- **Auth Required:** `true` (Token)

**Response:**
```json
[
  {
    "id": "u_01",
    "name": "Ana Pérez",
    "email": "ana@example.com",
    "role": "customer"
  },
  {
    "id": "u_02",
    "name": "Pedro Gómez",
    "email": "pedro@example.com",
    "role": "admin"
  }
]
```

### `GET /users/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "id": "u_01",
  "name": "Ana Pérez",
  "email": "ana@example.com",
  "role": "customer",
  "phone": "+34 600 123 456",
  "address": {
    "street": "Calle Mayor 10",
    "city": "Madrid",
    "postalCode": "28013",
    "country": "España"
  },
  "orders": [
    {
      "id": "o_101",
      "status": "delivered",
      "total": 49.99
    }
  ]
}
```

### `PUT /users/:id`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "name": "Ana Pérez",
  "email": "ana.nueva@example.com",
  "password": "NuevaClave123",
  "phone": "+34 600 123 456",
  "address": {
    "street": "Calle Mayor 12",
    "city": "Madrid",
    "postalCode": "28013",
    "country": "España"
  }
}
```

**Response:**
```json
{
  "id": "u_01",
  "name": "Ana Pérez",
  "email": "ana.nueva@example.com",
  "phone": "+34 600 123 456",
  "address": {
    "street": "Calle Mayor 12",
    "city": "Madrid",
    "postalCode": "28013",
    "country": "España"
  }
}
```

### `DELETE /users/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "message": "Usuario eliminado correctamente"
}
```

---

## 🏷️ Categories

### `GET /categories`
- **Auth Required:** `false`

**Response:**
```json
[
  { "id": "c_01", "name": "T-Shirts" },
  { "id": "c_02", "name": "Polo" },
  { "id": "c_03", "name": "Long Sleeve" }
]
```

### `GET /categories/:id`
- **Auth Required:** `false`

**Response:**
```json
{
  "id": "c_01",
  "name": "T-Shirts",
  "description": "Camisetas de algodón para uso diario"
}
```

### `POST /categories`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "name": "Hoodies",
  "description": "Sudaderas con capucha"
}
```

**Response:**
```json
{
  "id": "c_04",
  "name": "Hoodies",
  "description": "Sudaderas con capucha"
}
```

### `PUT /categories/:id`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "name": "Camisetas",
  "description": "Camisetas y tops casuales"
}
```

**Response:**
```json
{
  "id": "c_01",
  "name": "Camisetas",
  "description": "Camisetas y tops casuales"
}
```

### `DELETE /categories/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "message": "Categoría eliminada"
}
```

---

## 🛍️ Products

### `GET /products`
- **Auth Required:** `false`

**Response:**
```json
[
  {
    "id": "p_101",
    "name": "Camiseta Básica Blanca",
    "price": 19.99,
    "category": { "id": "c_01", "name": "T-Shirts" },
    "availableSizes": ["S", "M", "L", "XL"],
    "colors": ["Blanco", "Negro"],
    "stock": 120,
    "imageUrl": "/images/camiseta-blanca.jpg"
  },
  {
    "id": "p_102",
    "name": "Polo Azul Marino",
    "price": 29.99,
    "category": { "id": "c_02", "name": "Polo" },
    "availableSizes": ["M", "L"],
    "colors": ["Azul marino"],
    "stock": 45,
    "imageUrl": "/images/polo-azul.jpg"
  }
]
```

### `GET /products/:id`
- **Auth Required:** `false`

**Response:**
```json
{
  "id": "p_101",
  "name": "Camiseta Básica Blanca",
  "description": "Camiseta de algodón 100% con corte regular y costuras reforzadas.",
  "price": 19.99,
  "brand": "Urban Shirt",
  "availableSizes": ["S", "M", "L", "XL"],
  "colors": ["Blanco", "Negro"],
  "category": { "id": "c_01", "name": "T-Shirts" },
  "stock": 120,
  "images": [
    "/images/camiseta-blanca-1.jpg",
    "/images/camiseta-blanca-2.jpg"
  ],
  "material": "Algodón 100%",
  "slug": "camiseta-basica-blanca"
}
```

### `POST /products`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "name": "Camiseta Vintage",
  "description": "Camiseta con estampado retro y corte relaxed.",
  "price": 24.99,
  "brand": "Streetline",
  "categoryId": "c_01",
  "availableSizes": ["S", "M", "L"],
  "colors": ["Gris", "Negro"],
  "stock": 80,
  "images": [
    "/images/vintage-1.jpg",
    "/images/vintage-2.jpg"
  ]
}
```

**Response:**
```json
{
  "id": "p_103",
  "name": "Camiseta Vintage",
  "description": "Camiseta con estampado retro y corte relaxed.",
  "price": 24.99,
  "brand": "Streetline",
  "category": { "id": "c_01", "name": "T-Shirts" },
  "availableSizes": ["S", "M", "L"],
  "colors": ["Gris", "Negro"],
  "stock": 80,
  "images": [
    "/images/vintage-1.jpg",
    "/images/vintage-2.jpg"
  ]
}
```

### `PUT /products/:id`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "name": "Camiseta Básica Blanca",
  "description": "Camiseta de algodón 100% con corte regular.",
  "price": 18.99,
  "brand": "Urban Shirt",
  "categoryId": "c_01",
  "availableSizes": ["S", "M", "L", "XL"],
  "colors": ["Blanco", "Negro"],
  "stock": 110
}
```

**Response:**
```json
{
  "id": "p_101",
  "name": "Camiseta Básica Blanca",
  "description": "Camiseta de algodón 100% con corte regular.",
  "price": 18.99,
  "brand": "Urban Shirt",
  "category": { "id": "c_01", "name": "T-Shirts" },
  "availableSizes": ["S", "M", "L", "XL"],
  "colors": ["Blanco", "Negro"],
  "stock": 110
}
```

### `DELETE /products/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "message": "Producto eliminado correctamente"
}
```

---

## 📦 Orders

### `GET /orders`
- **Auth Required:** `true` (Token)

**Response:**
```json
[
  {
    "id": "o_101",
    "userId": "u_01",
    "status": "delivered",
    "total": 49.99,
    "createdAt": "2026-04-20T18:30:00Z"
  },
  {
    "id": "o_102",
    "userId": "u_02",
    "status": "processing",
    "total": 74.97,
    "createdAt": "2026-04-28T10:15:00Z"
  }
]
```

### `GET /orders/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "id": "o_101",
  "userId": "u_01",
  "status": "delivered",
  "total": 49.99,
  "items": [
    {
      "productId": "p_101",
      "name": "Camiseta Básica Blanca",
      "size": "M",
      "color": "Blanco",
      "quantity": 1,
      "price": 19.99
    },
    {
      "productId": "p_104",
      "name": "Camiseta Negra",
      "size": "L",
      "color": "Negro",
      "quantity": 1,
      "price": 29.99
    }
  ],
  "shippingAddress": {
    "street": "Calle Mayor 10",
    "city": "Madrid",
    "postalCode": "28013",
    "country": "España"
  },
  "placedAt": "2026-04-19T20:45:00Z"
}
```

### `POST /orders`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "userId": "u_01",
  "items": [
    {
      "productId": "p_101",
      "size": "M",
      "color": "Blanco",
      "quantity": 1
    },
    {
      "productId": "p_102",
      "size": "L",
      "color": "Azul marino",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "Calle Mayor 10",
    "city": "Madrid",
    "postalCode": "28013",
    "country": "España"
  },
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "id": "o_103",
  "userId": "u_01",
  "status": "processing",
  "total": 49.98,
  "items": [
    {
      "productId": "p_101",
      "name": "Camiseta Básica Blanca",
      "size": "M",
      "color": "Blanco",
      "quantity": 1,
      "price": 19.99
    },
    {
      "productId": "p_102",
      "name": "Polo Azul Marino",
      "size": "L",
      "color": "Azul marino",
      "quantity": 1,
      "price": 29.99
    }
  ],
  "placedAt": "2026-04-30T13:00:00Z"
}
```

### `PUT /orders/:id`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "status": "shipped"
}
```

**Response:**
```json
{
  "id": "o_103",
  "status": "shipped"
}
```

### `DELETE /orders/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "message": "Pedido cancelado correctamente"
}
```

---

## 🔐 Auth

### `POST /login`
- **Auth Required:** `false`

**Request:**
```json
{
  "email": "ana@example.com",
  "password": "MiClaveSegura123"
}
```

**Response:**
```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": "u_01",
    "name": "Ana Pérez",
    "email": "ana@example.com",
    "role": "customer"
  }
}
```

### `POST /register`
- **Auth Required:** `false`

**Request:**
```json
{
  "name": "Ana Pérez",
  "email": "ana@example.com",
  "password": "MiClaveSegura123"
}
```

**Response:**
```json
{
  "id": "u_03",
  "name": "Ana Pérez",
  "email": "ana@example.com",
  "role": "customer"
}
```
```