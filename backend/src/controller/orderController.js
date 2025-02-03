import pool from "../config/database.js";
export const createOrder = async (req, res) => {
    const { user_id, cart, total } = req.body;
    try {
        // Inicia una transacción para asegurarnos de que todo sea atómico
        await pool.query("START TRANSACTION");

        // Insertar un nuevo pedido en la tabla de pedidos (se hace por cada producto del carrito)
        for (let item of cart) {
            const { id_producto, quantity, price } = item;

            // Inserta un nuevo pedido para cada producto en el carrito con su precio
            await pool.query(
                "INSERT INTO pedidos (id_usuario, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
                [user_id, id_producto, quantity, price]  // Asegúrate de incluir el precio aquí
            );
        }

        // Si todo es exitoso, comiteamos la transacción
        await pool.query("COMMIT");

        // Enviar una respuesta de éxito
        res.status(200).json({
            message: "Pedido realizado correctamente.",
            total: total,
            cart: cart,
        });
    } catch (error) {
        // Si ocurre un error, hacemos un rollback para no dejar la base de datos inconsistente
        await pool.query("ROLLBACK");
        console.error("Error al crear el pedido:", error);
        res.status(500).json({
            message: "Hubo un error al procesar el pedido.",
            error: error.message,
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await pool.query(
            `SELECT 
                p.id_pedido, 
                p.id_usuario, 
                u.nombre AS usuario_nombre, 
                p.id_producto, 
                pr.nombre AS producto_nombre, 
                p.cantidad, 
                p.precio_unitario, 
                (p.cantidad * p.precio_unitario) AS total_a_pagar, 
                p.fecha_pedido
            FROM pedidos p
            JOIN productos pr ON p.id_producto = pr.id_producto
            JOIN usuarios u ON p.id_usuario = u.id
            ORDER BY p.fecha_pedido DESC`
        );

        res.status(200).json({
            message: "Pedidos obtenidos correctamente.",
            orders
        });
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({
            message: "Hubo un error al obtener los pedidos.",
            error: error.message
        });
    }
};
export const getUserOrders = async (req, res) => {
    const { user_id } = req.params;  // El id del usuario se pasa en los parámetros de la URL
    try {
        const [orders] = await pool.query(
            `SELECT 
                p.id_pedido, 
                p.id_usuario, 
                p.id_producto, 
                pr.nombre AS producto_nombre, 
                p.cantidad, 
                p.precio_unitario, 
                (p.cantidad * p.precio_unitario) AS total_a_pagar, 
                p.fecha_pedido
            FROM pedidos p
            JOIN productos pr ON p.id_producto = pr.id_producto
            WHERE p.id_usuario = ?`,
            [user_id]
        );

        res.status(200).json({
            message: "Pedidos obtenidos correctamente.",
            orders
        });
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({
            message: "Hubo un error al obtener los pedidos.",
            error: error.message
        });
    }
};
