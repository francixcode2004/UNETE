import express from "express";
import {
    getUsers,
    createUser,
    loginUser,
    logoutUser,
    authenticateToken
} from "../controller/userController.js";
const router = express.Router();
// Rutas públicas
router.post("/register", createUser); // Registro de usuario
router.post("/login", loginUser); // Inicio de sesión
// Rutas protegidas (requieren autenticación)
router.get("/users", authenticateToken, getUsers); // Obtener usuarios
router.post("/logout", authenticateToken, logoutUser); // Cerrar sesión
export default router;
