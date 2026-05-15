const pool = require("../utils/dbConnection")

const getAllOrders = async () => {
    const result = await pool.query("SELECT * FROM orders")
    return result.rows.map(row => ({
        ...row,
        total: parseFloat(row.total),
        placedAt: row.placed_at
    }))
}

const getOrdersByUserId = async (userId) => {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [userId])
    return result.rows.map(row => ({
        ...row,
        total: parseFloat(row.total),
        placedAt: row.placed_at
    }))
}


const getOrderById = async (id) => {
    const orderRes = await pool.query("SELECT * FROM orders WHERE id = $1", [id])
    if (orderRes.rows.length === 0) return null
    const order = orderRes.rows[0]

    const itemsRes = await pool.query(`
        SELECT oi.*, p.name as product_name_current 
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1
    `, [id])

    return {
        id: order.id,
        userId: order.user_id,
        status: order.status,
        total: parseFloat(order.total),
        items: itemsRes.rows.map(item => ({
            productId: item.product_id,
            name: item.product_name,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: parseFloat(item.unit_price)
        })),
        shippingAddress: {
            street: order.shipping_street,
            city: order.shipping_city,
            postalCode: order.shipping_postal_code,
            country: order.shipping_country
        },
        placedAt: order.placed_at
    }
}

const createOrder = async (orderData) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        // Calculate total if not provided (should ideally be calculated server-side)
        let total = 0
        const itemsWithPrices = []
        for (const item of orderData.items) {
            const prodRes = await client.query("SELECT name, price FROM products WHERE id = $1", [item.productId])
            const product = prodRes.rows[0]
            if (!product) throw new Error(`Producto ${item.productId} no encontrado`)
            
            const itemTotal = product.price * item.quantity
            total += itemTotal
            itemsWithPrices.push({
                ...item,
                name: product.name,
                price: product.price
            })
        }

        const orderValues = [
            orderData.userId,
            'processing',
            total,
            orderData.paymentMethod,
            orderData.shippingAddress.street,
            orderData.shippingAddress.city,
            orderData.shippingAddress.postalCode,
            orderData.shippingAddress.country
        ]

        const orderResult = await client.query(`
            INSERT INTO orders (user_id, status, total, payment_method, shipping_street, shipping_city, shipping_postal_code, shipping_country)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, orderValues)
        
        const newOrder = orderResult.rows[0]

        for (const item of itemsWithPrices) {
            const itemValues = [newOrder.id, item.productId, item.name, item.size, item.color, item.quantity, item.price]
            await client.query(`
                INSERT INTO order_items (order_id, product_id, product_name, size, color, quantity, unit_price)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, itemValues)
        }

        await client.query('COMMIT')
        return await getOrderById(newOrder.id)
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}

const updateOrder = async (id, data) => {
    const result = await pool.query("UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *", [data.status, id])
    return result.rows[0]
}

const deleteOrder = async (id) => {
    const result = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id])
    return result.rows[0]
}

module.exports = { getAllOrders, getOrdersByUserId, getOrderById, createOrder, updateOrder, deleteOrder }