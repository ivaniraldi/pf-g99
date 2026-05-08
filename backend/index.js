const express = require("express")
const cors = require("cors")
const pool = require("./utils/dbConnection")
const router = require("./routes")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/", router)

app.listen(3000, async () => {
    console.log("🟢 Servidor iniciado en la URL: [ http://localhost:3000 ] ")
    try {
        let result = await pool.query("SELECT NOW()");
        console.log("💻 Conectado a la BD correctamente a la hora: ", result.rows[0].now)
    } catch (error) {
        console.log("🔴Error al conectar a la BD: ", error.message)
    }
})

module.exports = app
