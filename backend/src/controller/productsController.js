import pool from "../config/database.js";
// Tipos MIME permitidos para imágenes
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif','image/jpg'];
export const insertProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;
        // Validación de campos requeridos
        if (!name || !price || !stock || !category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        // Validación del tipo de archivo
        if (!req.file) {
            return res.status(400).json({ error: "Imagen requerida" });
        }
        if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
            return res.status(400).json({
                error: "Formato de imagen no válido. Use JPEG, PNG o GIF"
            });
        }
        // Validación de tipos de datos numéricos
        const precio = parseFloat(price);
        const stockValido = parseInt(stock);
        if (isNaN(precio) || precio <= 0) {
            return res.status(400).json({ error: "Precio debe ser un número positivo" });
        }
        if (isNaN(stockValido) || stockValido < 0) {
            return res.status(400).json({ error: "Stock debe ser un número entero no negativo" });
        }
        // Construir URL de la imagen
        const imageUrlPublic = `/uploads/${req.file.filename}`;
        // Insertar en base de datos
        const [result] = await pool.query(
            `INSERT INTO productos 
            (nombre, precio, stock, imagen, categoria) 
            VALUES (?, ?, ?, ?, ?)`,
            [name, precio, stockValido, imageUrlPublic, category]
        );
        // Respuesta estructurada
        res.status(201).json({
            imageUrl: imageUrlPublic,
            name: name,
            category: category,
            price: precio,
            stock: stockValido,
            id: result.insertId,
            message: "Producto creado exitosamente"
        });
    } catch (error) {
        console.error("Error en insertProduct:", error);
        res.status(500).json({
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
export const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const [product] = await pool.query(
            "SELECT * FROM productos WHERE id_producto = ?",
            [productId]
        );
        if (product.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(product[0]);
    } catch (error) {
        console.error("Error en getProduct:", error);
        res.status(500).json({
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, stock, category } = req.body;
        let imageUrlPublic;

        // Validar si se envía imagen
        if (req.file) {
            if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
                return res.status(400).json({
                    error: "Formato de imagen no válido. Use JPEG, PNG o GIF"
                });
            }
            imageUrlPublic = `/uploads/${req.file.filename}`;
        }

        // Construir la consulta dinámicamente
        const updateFields = [];
        const params = [];

        if (name) {
            updateFields.push("nombre = ?");
            params.push(name);
        }

        if (price) {
            const precio = parseFloat(price);
            if (isNaN(precio) || precio <= 0) {
                return res.status(400).json({ error: "Precio debe ser un número positivo" });
            }
            updateFields.push("precio = ?");
            params.push(precio);
        }

        if (stock) {
            const stockValido = parseInt(stock);
            if (isNaN(stockValido) || stockValido < 0) {
                return res.status(400).json({ error: "Stock debe ser un número entero no negativo" });
            }
            updateFields.push("stock = ?");
            params.push(stockValido);
        }

        if (category) {
            updateFields.push("categoria = ?");
            params.push(category);
        }

        if (req.file) {
            updateFields.push("imagen = ?");
            params.push(imageUrlPublic);
        }

        // Validar que hay campos para actualizar
        if (updateFields.length === 0) {
            return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
        }

        const query = `
            UPDATE productos 
            SET ${updateFields.join(', ')}
            WHERE id_producto = ?
        `;

        params.push(productId);

        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Obtener el producto actualizado
        const [updatedProduct] = await pool.query(
            "SELECT * FROM productos WHERE id_producto = ?",
            [productId]
        );

        res.status(200).json({
            message: "Producto actualizado exitosamente",
            product: updatedProduct[0]
        });

    } catch (error) {
        console.error("Error en editProduct:", error);
        res.status(500).json({
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Verificar existencia del producto
        const [product] = await pool.query(
            "SELECT * FROM productos WHERE id_producto = ?",
            [productId]
        );

        if (product.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Eliminar el producto
        const [result] = await pool.query(
            "DELETE FROM productos WHERE id_producto = ?",
            [productId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({
            message: "Producto eliminado exitosamente",
            deletedProduct: product[0]
        });

    } catch (error) {
        console.error("Error en deleteProduct:", error);
        res.status(500).json({
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Nueva función: Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const [products] = await pool.query("SELECT * FROM productos");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error en getProducts:", error);
        res.status(500).json({
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};