import express from "express";
import formidable from "express-formidable";
import {
  countTotalController,
  createProductController,
  deleteProductController,
  filterProductController,
  getAllProductsController,
  getPhotoProductController,
  getProductPerPageController,
  getSingleProductController,
  relatedProductControll,
  searchProductController,
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

//Filter Product
router.post("/product-filter", filterProductController);

//Count Product
router.get("/count-product", countTotalController);

//Get product per page
router.get("/product-list/:page", getProductPerPageController);

//Search product
router.get("/search/:keyword", searchProductController);

//Similar product
router.get("/related-product/:pid/:cid", relatedProductControll);

export default router;
