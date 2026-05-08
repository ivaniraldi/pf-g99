const { Router } = require('express')
const productsRouter = require('./product.routes')
const usersRouter = require('./user.routes')
const orderRoutes = require('./order.routes')
const categoryRoutes = require('./category.routes')

const router = Router()

router.use("/products", productsRouter)
router.use("/users", usersRouter)
router.use("/orders", orderRoutes)
router.use("/categories", categoryRoutes)


module.exports = router