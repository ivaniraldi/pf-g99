const pool = require("../utils/dbConnection")

const getAllProducts = async () => {
    const query = `
        SELECT p.*, c.name as category_name, 
        (SELECT url FROM product_images WHERE product_id = p.id ORDER BY position ASC LIMIT 1) as "imageUrl"
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
    `
    const result = await pool.query(query)

    return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        price: parseFloat(row.price),
        category: { id: row.category_id, name: row.category_name },
        stock: row.stock,
        imageUrl: row.imageUrl,
        availableSizes: [], // Simplified for list view
        colors: []
    }))
}

const getProductById = async (id) => {
    const productRes = await pool.query(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.id = $1
    `, [id])

    if (productRes.rows.length === 0) return null
    const product = productRes.rows[0]

    const imagesRes = await pool.query("SELECT url FROM product_images WHERE product_id = $1 ORDER BY position", [id])
    const sizesRes = await pool.query("SELECT size FROM product_sizes WHERE product_id = $1", [id])
    const colorsRes = await pool.query("SELECT color FROM product_colors WHERE product_id = $1", [id])

    return {
        ...product,
        price: parseFloat(product.price),
        category: { id: product.category_id, name: product.category_name },
        images: imagesRes.rows.map(img => img.url),
        availableSizes: sizesRes.rows.map(s => s.size),
        colors: colorsRes.rows.map(c => c.color)
    }
}

const createProduct = async (product) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const values = [product.name, product.slug, product.description, product.brand, product.material, product.price, product.category_id, product.stock]
        const result = await client.query("INSERT INTO products (name, slug, description, brand, material, price, category_id, stock ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", values)
        const newProduct = result.rows[0]

        if (product.images && Array.isArray(product.images)) {
            for (let i = 0; i < product.images.length; i++) {
                await client.query("INSERT INTO product_images (product_id, url, position) VALUES ($1, $2, $3)", [newProduct.id, product.images[i], i])
            }
        }
        if (product.availableSizes && Array.isArray(product.availableSizes)) {
            for (const size of product.availableSizes) {
                await client.query("INSERT INTO product_sizes (product_id, size) VALUES ($1, $2)", [newProduct.id, size])
            }
        }
        if (product.colors && Array.isArray(product.colors)) {
            for (const color of product.colors) {
                await client.query("INSERT INTO product_colors (product_id, color) VALUES ($1, $2)", [newProduct.id, color])
            }
        }

        await client.query('COMMIT')
        return await getProductById(newProduct.id)
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}

const modifyProduct = async (id, product) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const values = [product.name, product.slug, product.description, product.brand, product.material, product.price, product.category_id, product.stock, id]
        await client.query("UPDATE products SET name = $1, slug = $2, description = $3, brand = $4, material = $5, price = $6, category_id = $7, stock = $8, updated_at = NOW() WHERE id = $9", values)

        if (product.images && Array.isArray(product.images)) {
            await client.query("DELETE FROM product_images WHERE product_id = $1", [id])
            for (let i = 0; i < product.images.length; i++) {
                await client.query("INSERT INTO product_images (product_id, url, position) VALUES ($1, $2, $3)", [id, product.images[i], i])
            }
        }
        if (product.availableSizes && Array.isArray(product.availableSizes)) {
            await client.query("DELETE FROM product_sizes WHERE product_id = $1", [id])
            for (const size of product.availableSizes) {
                await client.query("INSERT INTO product_sizes (product_id, size) VALUES ($1, $2)", [id, size])
            }
        }
        if (product.colors && Array.isArray(product.colors)) {
            await client.query("DELETE FROM product_colors WHERE product_id = $1", [id])
            for (const color of product.colors) {
                await client.query("INSERT INTO product_colors (product_id, color) VALUES ($1, $2)", [id, color])
            }
        }

        await client.query('COMMIT')
        return await getProductById(id)
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}

const deleteProduct = async (id) => {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
}

module.exports = { getAllProducts, createProduct, deleteProduct, getProductById, modifyProduct }