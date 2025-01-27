import AuthController from "../controllers/userController";
import express, { Router } from "express";
import errorHandler from "../services/catchAsync";
import authMiddleware, { Role } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route("/register").post(errorHandler(AuthController.registerUser));
router.route("/login").post(errorHandler(AuthController.loginUser));
router
  .route("/users")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(AuthController.fetchUsers)
  );
router
  .route("/users/:id")
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(AuthController.deleteUsers)
  );
export default router;
