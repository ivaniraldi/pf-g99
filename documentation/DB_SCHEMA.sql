-- ============================
-- USERS (usuarios del sistema)
-- ============================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY, -- ID autoincremental
    name VARCHAR(120) NOT NULL, -- nombre completo
    email VARCHAR(150) NOT NULL UNIQUE, -- email único
    password_hash VARCHAR(255) NOT NULL, -- contraseña hasheada
    role VARCHAR(20) NOT NULL DEFAULT 'customer', -- rol (admin/customer)
    phone VARCHAR(30), -- teléfono opcional

    -- dirección
    street TEXT,
    city VARCHAR(80),
    postal_code VARCHAR(20),
    country VARCHAR(80),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- creación
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() -- actualización
);

-- ============================
-- CATEGORIES (categorías)
-- ============================
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE, -- nombre único
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================
-- PRODUCTS (productos)
-- ============================
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(160) NOT NULL UNIQUE, -- para URLs amigables
    description TEXT,
    brand VARCHAR(80),
    material VARCHAR(80),

    price NUMERIC(10,2) NOT NULL CHECK (price >= 0), -- precio >= 0

    -- relación con categoría
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,

    stock INTEGER NOT NULL DEFAULT 0, -- inventario

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================
-- PRODUCT IMAGES
-- ============================
CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL, -- URL de la imagen
    position INTEGER NOT NULL DEFAULT 0 -- orden
);

-- ============================
-- PRODUCT SIZES (talles)
-- ============================
CREATE TABLE product_sizes (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(10) NOT NULL,
    UNIQUE (product_id, size) -- no repetir talles
);

-- ============================
-- PRODUCT COLORS
-- ============================
CREATE TABLE product_colors (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color VARCHAR(50) NOT NULL,
    UNIQUE (product_id, color)
);

-- ============================
-- ORDERS (órdenes)
-- ============================
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    status VARCHAR(20) NOT NULL DEFAULT 'processing', -- estado
    total NUMERIC(12,2) NOT NULL CHECK (total >= 0), -- total orden

    payment_method VARCHAR(30) NOT NULL, -- método de pago

    -- dirección de envío
    shipping_street TEXT,
    shipping_city VARCHAR(80),
    shipping_postal_code VARCHAR(20),
    shipping_country VARCHAR(80),

    placed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================
-- ORDER ITEMS (detalle orden)
-- ============================
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

    -- puede ser NULL si el producto se borra
    product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,

    product_name VARCHAR(150) NOT NULL, -- snapshot nombre
    size VARCHAR(10),
    color VARCHAR(50),

    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),

    -- calculado automáticamente
    total_price NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

-- ============================
-- INDEXES (performance)
-- ============================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_product_sizes_product ON product_sizes(product_id);
CREATE INDEX idx_product_colors_product ON product_colors(product_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);