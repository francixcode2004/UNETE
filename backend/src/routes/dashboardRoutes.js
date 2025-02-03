import {salesReport,
    productsReport
} from "../controller/dashboardController.js";
import express from "express";
const router = express.Router();
router.get('/sales', salesReport);
router.get('/products/report', productsReport);
export default router;