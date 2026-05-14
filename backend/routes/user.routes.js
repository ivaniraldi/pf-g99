const { Router } = require("express")
const usersRoutes = Router()
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller")
const { validateToken, verifyAdmin } = require("../utils/AuthMiddlewares")

// User Management
usersRoutes.get("/", validateToken, async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

usersRoutes.get("/:id", validateToken, async (req, res) => {
    try {
        const result = await getUserById(req.params.id)
        if (!result) return res.status(404).json({ message: "Usuario no encontrado" })
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

usersRoutes.put("/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.params
        const user = req.body
        const result = await updateUser(id, user)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

usersRoutes.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await deleteUser(req.params.id)
        res.json({ message: "Usuario eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = usersRoutes