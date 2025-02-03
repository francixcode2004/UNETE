import pool from "../config/database.js";

export const salesReport = async (req, res) => {
    try {
        const sql = "SELECT " +
            "DATE(fecha_pedido) AS dia, " +
            "SUM(total) AS ventas_totales " +
            "FROM " +
            "pedidos " +
            "WHERE " +
            "fecha_pedido >= CURDATE() - INTERVAL 30 DAY " +
            "GROUP BY " +
            "DATE(fecha_pedido) " +
            "ORDER BY " +
            "DATE(fecha_pedido);";

        const [results] = await pool.query(sql);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const productsReport = async (req, res) => {
    try {
        const sql = "SELECT " +
            "p.nombre AS producto, " +
            "SUM(pe.total) AS ventas_totales, " +
            "SUM(pe.cantidad) AS cantidad_total_vendida " +
            "FROM " +
            "pedidos pe " +
            "JOIN " +
            "productos p ON pe.id_producto = p.id_producto " +
            "GROUP BY " +
            "p.nombre " +
            "ORDER BY " +
            "ventas_totales DESC;";

        const [results] = await pool.query(sql);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};