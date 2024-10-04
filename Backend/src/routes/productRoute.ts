import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import productController from "../controllers/productController";
import { multer, storage } from "../middleware/multerMiddleware";
import errorHandler from "../services/catchAsync";

const router: Router = express.Router();
const upload = multer({ storage: storage });
router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    upload.single("image"),
    errorHandler(productController.addProduct)
  )
  .get(errorHandler(productController.getAllProducts));

router
  .route("/:id")
  .get(errorHandler(productController.getSingleProduct))
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(productController.deleteProduct)
  );

router
  .route("/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(productController.updateProduct)
  );

export default router;
