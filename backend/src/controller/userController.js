import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const SECRET_KEY = "secretkey";
// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id,nombre,role as rol ,creado_en as creado FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Crear un usuario con contraseña hasheada
export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await pool.query("INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)",
            [username, hashedPassword]);

        res.status(201).json({ id: result.insertId, username, message: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Iniciar sesión y generar un token JWT
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE nombre = ?", [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Inicio de sesión exitoso", token, role: user.role, name:user.id });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido o expirado" });
        }
        req.user = user;
        next();
    });
};

// Cerrar sesión (invalidación del token en el cliente)
export const logoutUser = async (req, res) => {
    try {
        res.json({ message: "Sesión cerrada correctamente. Elimina el token del cliente." });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};