import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getPhotoProductController,
  getSingleProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//Create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Get All Products
router.get("/get-product", getAllProductsController);

//Get Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo Product
router.get("/product-photo/:pid", getPhotoProductController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

export default router;
