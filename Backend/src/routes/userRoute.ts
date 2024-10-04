import AuthController from "../controllers/userController";
import express, { Router } from "express";
import errorHandler from "../services/catchAsync";

const router: Router = express.Router();

router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.loginUser));

export default router;
