const pool = require("../utils/dbConnection")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const register = async (user) => {
    console.log(user);

    const passwordHash = await bcrypt.hashSync(user.password)
    const values = [user.email, passwordHash, user.name]

    const result = await pool.query("INSERT INTO users (email, password_hash, name) VALUES($1, $2, $3) RETURNING *", values)
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

    return { token, user: userFound }
}

module.exports = { register, login }