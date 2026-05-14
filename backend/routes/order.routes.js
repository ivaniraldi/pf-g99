const { Router } = require("express")
const orderRoutes = Router()
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require("../controllers/order.controller")
const { validateToken, verifyAdmin } = require("../utils/AuthMiddlewares")

orderRoutes.get("/", validateToken, async (req, res) => {
    try {
        const orders = await getAllOrders()
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

orderRoutes.post("/", validateToken, async (req, res) => {
    try {
        const result = await createOrder(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

orderRoutes.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await deleteOrder(req.params.id)
        res.json({ message: "Pedido cancelado correctamente" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

orderRoutes.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const result = await updateOrder(req.params.id, req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

orderRoutes.get("/:id", validateToken, async (req, res) => {
    try {
        const result = await getOrderById(req.params.id)
        if (!result) return res.status(404).json({ message: "Pedido no encontrado" })
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = orderRoutes