import app from "./src/app.js";
import pool from "./src/config/database.js";
const PORT = process.env.PORT || 3000;
async function checkDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conectado a la base de datos MySQL");
        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);
        process.exit(1);
    }
}
async function startServer() {
    await checkDatabaseConnection();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

startServer().then(r => "hj");