const { Router } = require("express")
const orderRoutes = Router()

orderRoutes.get("/", async (req, res) => {
    res.send("Estoy en la ruta de ordenes")
})

orderRoutes.post("/", async (req, res) => {
    res.send("Estoy en la ruta de creación de ordenes")
})

orderRoutes.delete("/:id", async (req, res) => {
    res.send("Estoy en la ruta de eliminación de ordenes")
})

orderRoutes.put("/:id", async (req, res) => {
    res.send("Estoy en la ruta de actualización de ordenes")
})

orderRoutes.get("/:id", async (req, res) => {
    res.send("Estoy en la ruta de busqueda de ordenes por id")
})

module.exports = orderRoutes