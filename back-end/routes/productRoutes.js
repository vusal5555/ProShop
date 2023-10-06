import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingProduct,
  updateProduct,
  createNewReview,
  getTopRatedProducts,
} from "../controllers/productController.js";
import asyncHandler from "../middleware/asyncHandle.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/", asyncHandler(getAllProducts))
  .post("/", protect, admin, createProduct);

router.get("/top", getTopRatedProducts);

router
  .get("/:id", asyncHandler(getSingProduct))
  .put("/:id", protect, admin, updateProduct)
  .delete("/:id", protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createNewReview);

export default router;
