import multer from 'multer';
import { fileURLToPath } from 'url';
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Usamos la ruta correcta dentro de 'src/uploads/'
        cb(null, path.join(__dirname, '../uploads/')); // Subir a src/uploads
    },
    filename: (req, file, cb) => {
        // Nombre único para el archivo, evitando duplicados
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// Configuración de filtro de archivos y tamaño
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif).'), false);
    }
};
// Límite de tamaño de archivo
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // Límite de tamaño (100MB)
});
export default upload;