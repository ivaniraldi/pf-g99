const { Router } = require("express")
const productsRouter = Router()
const { getAllProducts, createProduct, deleteProduct, getProductById, modifyProduct } = require("../controllers/product.controller")
const { validateToken, verifyAdmin } = require("../utils/AuthMiddlewares")


productsRouter.get("/", async (req, res) => {
    const products = await getAllProducts()
    res.json(products)
})

productsRouter.post("/", verifyAdmin, async (req, res) => {
    let newProduct = {
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        brand: req.body.brand,
        material: req.body.material,
        price: req.body.price,
        category_id: req.body.category_id,
        stock: req.body.stock
    }

    const result = await createProduct(newProduct)
    res.status(201).json(
        {
            message: "Producto creado con éxito!",
            data: result
        }
    )

})

productsRouter.delete("/:id", verifyAdmin, async (req, res) => {
    const result = await deleteProduct(req.params.id.toString())
    res.json(
        {
            message: "Producto eliminado con éxito!",
            data: result
        }
    )
})

productsRouter.put("/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params
    const product = req.body
    const result = await modifyProduct(id.toString(), product)
    res.json(
        {
            message: "Producto modificado con éxito!",
            data: result
        }
    )
})

productsRouter.get("/:id", async (req, res) => {
    const result = await getProductById(req.params.id.toString())
    res.json(result)
})


module.exports = productsRouter