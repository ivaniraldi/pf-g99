const pool = require("../utils/dbConnection")

const getAllCategories = async () => {
    const result = await pool.query("SELECT * FROM categories")
    return result.rows
}

const createCategory = async (category) => {
    const values = [category.name, category.description]
    const result = await pool.query("INSERT INTO categories (name, description) VALUES($1, $2) RETURNING *", values)
    return result.rows[0]
}

const getCategoryById = async (id) => {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id])
    return result.rows[0]
}

const updateCategory = async (id, category) => {
    const values = [category.name, category.description, id]
    const result = await pool.query("UPDATE categories SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *", values)
    return result.rows[0]
}

const deleteCategory = async (id) => {
    const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
}

module.exports = { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory }
