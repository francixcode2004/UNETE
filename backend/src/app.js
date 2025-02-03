import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors"
import { fileURLToPath } from 'url';
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors())
app.use(express.json());
// Servir archivos estáticos desde 'src/uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/", userRoutes);
app.use("/api/",productsRoutes);
app.use("/api/",messageRoutes)
app.use("/api/",orderRoutes)
export default app;