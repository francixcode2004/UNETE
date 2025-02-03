import pool from "../config/database.js";
export const messageUser = async (req, res) => {
    const { name, email, message } = req.body;
    // Validación de campos requeridos
    if (!name || !email || !message) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios (nombre, email, mensaje)"
        });
    }
    try {
        // Insertar mensaje en la base de datos
        const [result] = await pool.query(
            `INSERT INTO mensajes 
            (nombre, correo, mensaje) 
            VALUES (?, ?, ?)`,
            [name, email, message]
        );
        // Obtener el mensaje recién creado
        const [newMessage] = await pool.query(
            "SELECT * FROM mensajes WHERE id = ?",
            [result.insertId]
        );
        res.status(201).json({
            success: true,
            message: "Mensaje enviado correctamente",
            data: newMessage[0]
        });
    } catch (error) {
        console.error("Error en messageUser:", error);
        res.status(500).json({
            success: false,
            error: "Error al enviar el mensaje",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
export const getMessages = async (req,res)=>{
    try{
        const [result]=await pool.query("select * from mensajes")
        res.status(200).json({success: true,data:result})
    }catch (error){
        res.status(500).json({
            success: false,
            error: "Error al cargar los mensajes",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const [messageExists] = await pool.query("SELECT * FROM mensajes WHERE id = ?", [id]);
        if (messageExists.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Mensaje no encontrado"
            });
        }
        await pool.query("DELETE FROM mensajes WHERE id = ?", [id]);
        res.status(200).json({
            success: true,
            message: "Mensaje eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error al eliminar el mensaje",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};