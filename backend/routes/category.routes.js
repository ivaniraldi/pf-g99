const { Router } = require("express")
const categoryRoutes = Router()
const { getAllCategories, createCategory } = require("../controllers/category.controller")

categoryRoutes.get("/", async (req, res) => {
    const categories = await getAllCategories()
    res.json(categories)
})

categoryRoutes.post("/", async (req, res) => {
    const newCategory = {
        name: req.body.name,
        description: req.body.description
    }
    const result = await createCategory(newCategory)
    res.status(201).json({
        message: "Categoría creada con éxito",
        data: result
    })
})

categoryRoutes.delete("/:id", async (req, res) => {
    res.send("Estoy en la ruta de eliminación de categorias")
})

categoryRoutes.put("/:id", async (req, res) => {
    res.send("Estoy en la ruta de actualización de categorias")
})

categoryRoutes.get("/:id", async (req, res) => {
    res.send("Estoy en la ruta de busqueda de categorias por id")
})

module.exports = categoryRoutes