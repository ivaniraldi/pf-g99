const { Router } = require("express")
const categoryRoutes = Router()
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category.controller")
const { verifyAdmin } = require("../utils/AuthMiddlewares")

categoryRoutes.get("/", async (req, res) => {
    const categories = await getAllCategories()
    res.json(categories)
})

categoryRoutes.post("/", verifyAdmin, async (req, res) => {
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

categoryRoutes.delete("/:id", verifyAdmin, async (req, res) => {
    const result = await deleteCategory(req.params.id)
    res.json({
        message: "Categoría eliminada",
        data: result
    })
})

categoryRoutes.put("/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params
    const category = req.body
    const result = await updateCategory(id, category)
    res.json({
        message: "Categoría actualizada con éxito",
        data: result
    })
})

categoryRoutes.get("/:id", async (req, res) => {
    const result = await getCategoryById(req.params.id)
    if (!result) return res.status(404).json({ message: "Categoría no encontrada" })
    res.json(result)
})

module.exports = categoryRoutes