const jwt = require("jsonwebtoken")
require("dotenv").config()


const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}


const verifyAdmin = (req, res, next) => {
    validateToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
        }
    });
}


module.exports = { validateToken, verifyAdmin }

