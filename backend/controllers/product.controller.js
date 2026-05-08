const pool = require("../utils/dbConnection")

const getAllProducts = async () => {
    const query = `SELECT * FROM products`
    const result = await pool.query(query)
    return result.rows
}

const createProduct = async (product) => {

    const values = [product.name, product.slug, product.description, product.brand, product.material, product.price, product.category_id, product.stock]
    const result = await pool.query("INSERT INTO products (name, slug, description, brand, material, price, category_id, stock ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", values)
    return result.rows[0]
}

const deleteProduct = async (id) => {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
}

const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id])
    return result.rows[0]
}

const modifyProduct = async (id, product) => {
    const values = [product.name, product.slug, product.description, product.brand, product.material, product.price, product.category_id, product.stock, id]
    const result = await pool.query("UPDATE products SET name = $1, slug = $2, description = $3, brand = $4, material = $5, price = $6, category_id = $7, stock = $8 WHERE id = $9 RETURNING *", values)
    return result.rows[0]
}

module.exports = { getAllProducts, createProduct, deleteProduct, getProductById, modifyProduct }