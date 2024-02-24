import express from "express";
import { saveProducts, getPdf } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add", saveProducts); // Save products to the
router.get("/get-pdf", getPdf); // Save products to the

export default router;
