import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingProduct,
  updateProduct,
} from "../controllers/productController.js";
import asyncHandler from "../middleware/asyncHandle.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/", asyncHandler(getAllProducts))
  .post("/", protect, admin, createProduct);

router
  .get("/:id", asyncHandler(getSingProduct))
  .put("/:id", protect, admin, updateProduct);

export default router;
