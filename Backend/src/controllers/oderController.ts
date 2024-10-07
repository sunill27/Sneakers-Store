import axios from "axios";
import OrderDetail from "../database/models/orderDetail";
import Order from "../database/models/orderModel";
import Payment from "../database/models/paymentModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { Response, Request } from "express";
import {
  KhaltiResponse,
  OrderData,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  TransactionResponse,
  TransactionStatus,
} from "../types/orderTypes";
import Product from "../database/models/productModel";
import Cart from "../database/models/cartModel";
import User from "../database/models/userModel";
import Category from "../database/models/categoryModel";

class ExtendedOrder extends Order {
  declare paymentId: string | null;
}

class OrderController {
  async createOrder(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const {
      phoneNumber,
      address,
      totalAmount,
      paymentDetails,
      items,
    }: OrderData = req.body;
    if (
      !phoneNumber ||
      !address ||
      !totalAmount ||
      !paymentDetails ||
      !paymentDetails.paymentMethod ||
      items.length == 0
    ) {
      res.status(400).json({
        message:
          "Please provide phoneNumber, address,totalAmount,paymentDetails,items",
      });
      return;
    }

    // Validate payment method
    // if (!(paymentDetails.paymentMethod in PaymentMethod)) {
    //   res.status(400).json({
    //     message: `Invalid payment method. Allowed values are ${Object.values(
    //       PaymentMethod
    //     ).join(", ")}`,
    //   });
    //   return;
    // }

    const paymentData = await Payment.create({
      paymentMethod: paymentDetails.paymentMethod,
    });

    //To store obtained data to respective table:
    const orderData = await Order.create({
      phoneNumber,
      address,
      totalAmount,
      paymentDetails,
      userId,
      paymentId: paymentData.id,
    });

    let responseOrderData;

    for (var i = 0; i < items.length; i++) {
      responseOrderData = await OrderDetail.create({
        quantity: items[i].quantity,
        productId: items[i].productId,
        orderId: orderData.id,
      });
      await Cart.destroy({
        where: {
          productId: items[i].productId,
          userId: userId,
        },
      });
    }

    if (
      paymentDetails.paymentMethod.toLocaleLowerCase() === PaymentMethod.KHALTI
    ) {
      //Khalti Integration:
      const data = {
        return_url: "http://localhost:5173/success/",
        purchase_order_id: orderData.id,
        amount: totalAmount * 100, //khalti support 'paisa' so
        website_url: "http://localhost:5173/",
        purchase_order_name: "orderName_" + orderData.id,
      };
      try {
        const response = await axios.post(
          "https://a.khalti.com/api/v2/epayment/initiate/",
          data,
          {
            headers: {
              Authorization: "key " + process.env.KHALTI_KEY,
            },
          }
        );
        // console.log(response);
        const khaltiResponse: KhaltiResponse = response.data;
        paymentData.pidx = khaltiResponse.pidx;
        paymentData.save();
        res.status(200).json({
          message: "Order placed successfully",
          url: khaltiResponse.payment_url,
          data: responseOrderData,
        });
      } catch (error: any) {
        console.error("Khalti API error: ", error.response.data);
        res.status(500).json({
          message: "Internal error",
          errorMessage: error.response?.data || error.message,
        });
      }
    } else {
      res.status(200).json({
        message: "Order placed successfully",
      });
    }
  }

  //Verify Transaction API:
  async verifyTransaction(req: AuthRequest, res: Response): Promise<void> {
    const { pidx } = req.body;
    if (!pidx) {
      res.status(400).json({
        message: "Please provide pidx",
      });
      return;
    }

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: process.env.KHALTI_KEY,
        },
      }
    );
    const data: TransactionResponse = response.data;
    console.log(data);

    if (data.status === TransactionStatus.COMPLETED) {
      await Payment.update(
        { paymentStatus: "paid" },
        {
          where: {
            pidx: pidx,
          },
        }
      );
      res.status(200).json({
        message: "Payment verified successfully.",
      });
    } else {
      res.status(200).json({
        message: "Payment not verified",
      });
    }
  }

  //CUSTOMER SIDE:

  //Fetch Orders:
  async fetchMyOrders(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Payment,
      },
    });
    if (orders.length > 0) {
      res.status(200).json({
        message: "Order fetched successfully",
        data: orders,
      });
    } else {
      res.status(400).json({
        message: "You have no orders yet",
        data: [],
      });
    }
  }

  //Fetch OrderDetails:
  async fetchOrderDetails(req: AuthRequest, res: Response): Promise<void> {
    const orderId = req.params.id;
    const orderDetails = await OrderDetail.findAll({
      where: {
        orderId,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Order,
          include: [
            {
              model: Payment,
              attributes: ["paymentMethod", "paymentStatus"],
            },
            {
              model: User,
              attributes: ["username", "email"],
            },
          ],
        },
      ],
    });
    if (orderDetails.length > 0) {
      res.status(200).json({
        message: "Order details fetched successfully",
        data: orderDetails,
      });
    } else {
      res.status(400).json({
        message: "No any order details of this orderId",
        data: [],
      });
    }
  }

  //Cancel Orders:
  async cancelOrder(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const orderId = req.params.id;
    const order: any = await Order.findAll({
      where: {
        userId: userId,
        id: orderId,
      },
    });
    if (
      order.orderStatus === OrderStatus.ONTHEWAY ||
      order.orderStatus === OrderStatus.PREPARATION
    ) {
      res.status(200).json({
        message:
          "You can't cancel order when it is on the way or on preparation",
      });
    }
    await Order.update(
      {
        orderStatus: OrderStatus.CANCELLED,
      },
      {
        where: {
          id: orderId,
        },
      }
    );
    res.status(200).json({
      message: "Order cancelled successfully",
    });
  }

  //ADMIN SIDE:

  //Change Order status:
  async changeOrderStatus(req: Request, res: Response): Promise<void> {
    const orderId = req.params.id;
    const orderStatus: OrderStatus = req.body.orderStatus;
    await Order.update(
      {
        orderStatus: orderStatus,
      },
      {
        where: {
          id: orderId,
        },
      }
    );
    res.status(200).json({
      message: "Order status updated successfully",
    });
  }

  //Change Payment Status:
  async changePaymentStatus(req: Request, res: Response): Promise<void> {
    const orderId = req.params.id;
    const paymentStatus: PaymentStatus = req.body.paymentStatus;
    const order = await Order.findByPk(orderId);
    const extendedOrder: ExtendedOrder = order as ExtendedOrder;
    await Payment.update(
      {
        paymentStatus: paymentStatus,
      },
      {
        where: {
          id: extendedOrder.paymentId,
        },
      }
    );
    res.status(200).json({
      message: `Payment status of order ${orderId}updated successfully to ${paymentStatus}`,
    });
  }

  //Delete Orders:
  async deleteOrder(req: AuthRequest, res: Response): Promise<void> {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    const extendedOrder: ExtendedOrder = order as ExtendedOrder;
    if (order) {
      await OrderDetail.destroy({
        where: {
          orderId: orderId,
        },
      });

      await Payment.destroy({
        where: {
          id: extendedOrder.paymentId,
        },
      });
      await Order.destroy({
        where: {
          id: orderId,
        },
      });

      res.status(200).json({
        message: "Order deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "No order with that orderId",
      });
    }
  }
}

export default new OrderController();
