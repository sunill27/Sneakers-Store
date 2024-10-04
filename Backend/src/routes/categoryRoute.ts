import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import categoryController from "../controllers/categoryController";
import errorHandler from "../services/catchAsync";

const router: Router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    categoryController.addCategory
  )
  .get(errorHandler(categoryController.getCategories));

router
  .route("/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(categoryController.updateCategory)
  )
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(categoryController.deleteCategory)
  );

export default router;
