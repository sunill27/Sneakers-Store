import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import cartController from "../controllers/cartController";
import errorHandler from "../services/catchAsync";

const router: Router = express.Router();

router
  .route("/")
  .post(authMiddleware.isAuthenticated, errorHandler(cartController.addToCart))
  .get(authMiddleware.isAuthenticated, errorHandler(cartController.getCartItems));

router
  .route("/:productId")
  .delete(authMiddleware.isAuthenticated, errorHandler(cartController.deleteCartItem))
  .patch(authMiddleware.isAuthenticated, errorHandler(cartController.updateCartItem));

export default router;
