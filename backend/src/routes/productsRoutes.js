import {
    insertProduct,
    getProduct,
    getProducts,
    editProduct,
    deleteProduct
} from "../controller/productsController.js"
import upload from "../middleware/multerConfig.js";
import express from "express";
import {authenticateToken} from "../controller/userController.js";
const router = express.Router();
router.post("/product",upload.single('imagen'), insertProduct);
router.get("/product/:id", getProduct);
router.get("/products", getProducts);
router.patch("/product/:id", authenticateToken,upload.single("imagen"), editProduct);
router.delete("/product/:id", authenticateToken, deleteProduct);
export default router;