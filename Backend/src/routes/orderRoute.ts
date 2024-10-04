import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/catchAsync";
import oderController from "../controllers/oderController";

const router: Router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    errorHandler(oderController.createOrder)
  );

router
  .route("/verify")
  .post(
    authMiddleware.isAuthenticated,
    errorHandler(oderController.verifyTransaction)
  );

router
  .route("/customer")
  .get(
    authMiddleware.isAuthenticated,
    errorHandler(oderController.fetchMyOrders)
  );

router
  .route("/customer/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.CUSTOMER),
    errorHandler(oderController.cancelOrder)
  )
  .get(
    authMiddleware.isAuthenticated,
    errorHandler(oderController.fetchOrderDetails)
  );

//ADMIN:
router
  .route("/admin/payment/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(oderController.changePaymentStatus)
  );

router
  .route("/admin/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(oderController.changeOrderStatus)
  )
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.ADMIN),
    errorHandler(oderController.deleteOrder)
  );
export default router;
