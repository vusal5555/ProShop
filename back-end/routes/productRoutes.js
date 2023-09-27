import express from "express";
import {
  getAllProducts,
  getSingProduct,
} from "../controllers/productController.js";
import asyncHandler from "../middleware/asyncHandle.js";

const router = express.Router();

router.get("/", asyncHandler(getAllProducts));

router.get("/:id", asyncHandler(getSingProduct));

export default router;
