const { Router } = require("express")
const productsRouter = Router()
const { getAllProducts, createProduct, deleteProduct, getProductById, modifyProduct } = require("../controllers/product.controller")
const { verifyAdmin } = require("../utils/AuthMiddlewares")

productsRouter.get("/", async (req, res) => {
    try {
        const products = await getAllProducts()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

productsRouter.post("/", verifyAdmin, async (req, res) => {
    try {
        const newProduct = {
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            brand: req.body.brand,
            material: req.body.material,
            price: req.body.price,
            category_id: req.body.categoryId || req.body.category_id,
            stock: req.body.stock,
            images: req.body.images,
            availableSizes: req.body.availableSizes,
            colors: req.body.colors
        }

        const result = await createProduct(newProduct)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

productsRouter.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await deleteProduct(req.params.id)
        res.json({ message: "Producto eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

productsRouter.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const product = {
            ...req.body,
            category_id: req.body.categoryId || req.body.category_id
        }
        const result = await modifyProduct(id, product)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

productsRouter.get("/:id", async (req, res) => {
    try {
        const result = await getProductById(req.params.id)
        if (!result) return res.status(404).json({ message: "Producto no encontrado" })
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = productsRouter