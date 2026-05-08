const jwt = require("jsonwebtoken")
require("dotenv").config()


const validateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) return res.json({ message: "Token no proporcionado" })
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.json({ message: "Token inválido" })
    }

}

const verifyAdmin = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) return res.json({ message: "Token no proporcionado" })
    try {
        const user = jwt.decode(token)
        if (user.role !== "admin") {
            return res.json({ message: "No tienes permisos para realizar esta accion" })
        }
        next()
    } catch (error) {
        res.json({ message: "Token inválido" })
    }
}

module.exports = { validateToken, verifyAdmin }

