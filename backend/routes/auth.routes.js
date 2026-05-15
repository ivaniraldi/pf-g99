const { Router } = require("express")
const authRoutes = Router()
const { register, login } = require("../controllers/user.controller")

authRoutes.post("/register", async (req, res) => {
    try {
        const user = req.body
        console.log("Datos recibidos en el backend para registro:", user); // Verificar los datos recibidos
        const result = await register(user)
        res.status(201).json(result)
    } catch (error) {
        console.error("Error en registro:", error); // Verificar el error
        res.status(500).json({ message: error.message })
    }
})

authRoutes.post("/login", async (req, res) => {
    try {
        const user = req.body
        const result = await login(user)
        res.json(result)
    } catch (error) {
        console.error("Error en login:", error); // Verificar el error
        res.status(401).json({ message: error.message })
    }
})

module.exports = authRoutes
