const pool = require("../utils/dbConnection")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const register = async (user) => {
    const passwordHash = await bcrypt.hashSync(user.password)
    const values = [user.email, passwordHash, user.name]
    const result = await pool.query("INSERT INTO users (email, password_hash, name) VALUES($1, $2, $3) RETURNING id, name, email, role", values)
    return result.rows[0]
}

const login = async (user) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [user.email])
    const userFound = result.rows[0]
    if (!userFound) {
        throw new Error("Usuario no encontrado")
    }

    const passwordMatch = await bcrypt.compareSync(user.password, userFound.password_hash)
    if (!passwordMatch) {
        throw new Error("Contraseña incorrecta")
    }

    const token = jwt.sign({ id: userFound.id, email: userFound.email, role: userFound.role }, process.env.JWT_SECRET, { expiresIn: "1h" })

    return { 
        token, 
        user: {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role
        } 
    }
}

const getAllUsers = async () => {
    const result = await pool.query("SELECT id, name, email, role FROM users")
    return result.rows
}

const getUserById = async (id) => {
    const userRes = await pool.query("SELECT id, name, email, role, phone, street, city, postal_code, country FROM users WHERE id = $1", [id])
    if (userRes.rows.length === 0) return null
    const user = userRes.rows[0]

    const ordersRes = await pool.query("SELECT id, status, total FROM orders WHERE user_id = $1", [id])
    
    return {
        ...user,
        address: {
            street: user.street,
            city: user.city,
            postalCode: user.postal_code,
            country: user.country
        },
        orders: ordersRes.rows.map(o => ({ ...o, total: parseFloat(o.total) }))
    }
}

const updateUser = async (id, user) => {
    let query = "UPDATE users SET name = $1, email = $2, phone = $3, street = $4, city = $5, postal_code = $6, country = $7"
    let values = [user.name, user.email, user.phone, user.address?.street, user.address?.city, user.address?.postalCode, user.address?.country]
    
    if (user.password) {
        const passwordHash = await bcrypt.hashSync(user.password)
        query += ", password_hash = $8"
        values.push(passwordHash)
        query += ", updated_at = NOW() WHERE id = $9 RETURNING id, name, email, role, phone, street, city, postal_code as \"postalCode\", country"
        values.push(id)
    } else {
        query += ", updated_at = NOW() WHERE id = $8 RETURNING id, name, email, role, phone, street, city, postal_code as \"postalCode\", country"
        values.push(id)
    }

    const result = await pool.query(query, values)
    const updated = result.rows[0]
    return {
        ...updated,
        address: {
            street: updated.street,
            city: updated.city,
            postalCode: updated.postalCode,
            country: updated.country
        }
    }
}

const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
}

module.exports = { register, login, getAllUsers, getUserById, updateUser, deleteUser }