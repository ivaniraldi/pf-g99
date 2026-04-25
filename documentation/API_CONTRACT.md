# 📄 API Contract

---

## 👥 Users

### `GET /users`
- **Auth Required:** `true` (Token)

**Response:**
```json
[
  {
    "id": "...",
    "name": "...",
    "email": "..."
  },
  {
    "...": "..."
  }
]
```

### `GET /users/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "id": "...",
  "name": "...",
  "email": "..."
}
```

### `PUT /users/:id`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "name": "...",
  "email": "...",
  "password": "..."
}
```

**Response:**
```json
{
  "id": "...",
  "name": "...",
  "email": "...",
  "password": "..."
}
```

### `DELETE /users/:id`
- **Auth Required:** `true` (Token)

---

## 🏷️ Categories

| Method | Endpoint |
| :--- | :--- |
| `GET` | `/categories` |
| `GET` | `/categories/:id` |
| `POST` | `/categories` |
| `PUT` | `/categories/:id` |
| `DELETE` | `/categories/:id` |

---

## 🛍️ Products

### `GET /products`
- **Auth Required:** `false`

**Response:**
```json
[
  {
    "id": "...",
    "title": "...",
    "price": 0.00
  },
  {
    "...": "..."
  }
]
```

### `GET /products/:id`
- **Auth Required:** `false`

**Response:**
```json
{
  "id": "...",
  "title": "...",
  "desc": "...",
  "price": 0.00,
  "color": "...",
  "etc": "..."
}
```

### `POST /products`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "id": "...",
  "title": "...",
  "desc": "...",
  "price": 0.00,
  "color": "...",
  "etc": "..."
}
```

**Response:**
```json
{
  "id": "...",
  "title": "...",
  "desc": "...",
  "price": 0.00,
  "color": "...",
  "etc": "..."
}
```

### `PUT /products/:id`
- **Auth Required:** `true` (Token)

**Request:**
```json
{
  "id": "...",
  "title": "...",
  "desc": "...",
  "price": 0.00,
  "color": "...",
  "etc": "..."
}
```

**Response:**
```json
{
  "error": "...",
  "message": "..."
}
```

### `DELETE /products/:id`
- **Auth Required:** `true` (Token)

**Response:**
```json
{
  "message": "..."
}
```

---

## 📦 Orders

| Method | Endpoint |
| :--- | :--- |
| `GET` | `/orders` |
| `GET` | `/orders/:id` |
| `POST` | `/orders` |
| `PUT` | `/orders/:id` |
| `DELETE` | `/orders/:id` |

---

## 🔐 Auth

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/login` | User authentication |
| `POST` | `/register` | User registration |
```