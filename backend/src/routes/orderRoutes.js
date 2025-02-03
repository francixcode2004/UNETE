import {createOrder,
    getUserOrders,
    getAllOrders
} from "../controller/orderController.js";
import express from "express";
const router = express.Router();
router.post("/order",createOrder);
router.get('/orders/:user_id', getUserOrders);
router.get('/orders', getAllOrders);
export default router;