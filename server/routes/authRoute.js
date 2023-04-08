import express from "express";
import {
  forgotPasswordController,
  getOrdersController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController);

//Test routes
router.get("/test", requireSignIn, isAdmin, testController);

//Protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected route admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update profile
router.put("/profile", requireSignIn, updateProfileController);

//Get order
router.get("/orders", requireSignIn, getOrdersController);

export default router;
