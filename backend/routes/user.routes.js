const { Router } = require("express")
const usersRoutes = Router()
const { register, login } = require("../controllers/user.controller")



usersRoutes.post("/register", async (req, res) => {
    const user = req.body
    const result = await register(user)
    res.json(result)
})


usersRoutes.post("/login", async (req, res) => {
    try {
        const user = req.body
        const result = await login(user)
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
})


usersRoutes.get("/", async (req, res) => {
    res.send("Estoy en la ruta de usuarios")
})

usersRoutes.post("/", async (req, res) => {
    res.send("Estoy en la ruta de creación de usuarios")
})

usersRoutes.delete("/:id", async (req, res) => {
    res.send("Estoy en la ruta de eliminación de usuarios")
})

usersRoutes.put("/:id", async (req, res) => {
    res.send("Estoy en la ruta de actualización de usuarios")
})

usersRoutes.get("/:id", async (req, res) => {
    res.send("Estoy en la ruta de busqueda de usuarios por id")
})

module.exports = usersRoutes