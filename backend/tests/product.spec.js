const app = require("../index")
const request = require("supertest")

describe("Products Tests", () => {
    it("Obtener todos los productos", async () => {
        const response = await request(app).get("/products")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
    it("Obtener producto por id", async () => {
        const response = await request(app).get("/products/1")
        expect(response.statusCode).toBe(200)
    })
})