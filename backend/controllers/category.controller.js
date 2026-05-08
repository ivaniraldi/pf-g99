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

module.exports = { getAllCategories, createCategory }
