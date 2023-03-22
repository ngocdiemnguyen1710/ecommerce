import express from "express";
import {
  createCategoryController,
  deleteSingleCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routers

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category
router.get("/get-category", requireSignIn, isAdmin, getAllCategoryController);

//get single category
router.get(
  "/single-category/:slug",
  requireSignIn,
  isAdmin,
  getSingleCategoryController
);

//delete single category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteSingleCategoryController
);
export default router;
