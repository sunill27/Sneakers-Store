import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";

class CartController {
  //Add to cart API:
  async addToCart(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      res.status(400).json({
        message: "Please provide quantity, productId",
      });
      return; // Ensure to return here to stop further execution
    }

    // Check if the product is already in the cart:
    let cartItem = await Cart.findOne({
      where: {
        productId: productId,
        userId: userId,
      },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // To insert into cart table:
      cartItem = await Cart.create({
        quantity,
        userId,
        productId,
      });
    }
    const data = await Cart.findAll({
      where: {
        userId,
      },
    });
    res.status(200).json({
      message: "Product added to cart successfully",
      data,
    });
  }

  //Get cart items API:
  async getCartItems(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const cartItems = await Cart.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "description", "imageUrl"],
          include: [
            {
              model: Category,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      // attributes: ["productId", "quantity"],
    });
    if (cartItems.length === 0) {
      res.status(404).json({
        message: "No items in cart",
      });
    } else {
      res.status(200).json({
        message: "Cart items fetched successfully",
        data: cartItems,
      });
    }
  }

  //Delete Cart item API:
  async deleteCartItem(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { productId } = req.params;

    //Check whether above productId product exist or not
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({
        message: "No product with that id found",
      });
      return;
    }

    //Delete that productId from userCart
    await Cart.destroy({
      where: {
        userId,
        productId,
      },
    });
    res.status(200).json({
      message: "Product removed from cart Successfully",
    });
  }

  //Update Cart Item API:
  async updateCartItem(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartData = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (cartData) {
      cartData.quantity = quantity;
      await cartData?.save();
      res.status(200).json({
        message: "Cart product updated successfully",
        data: cartData,
      });
    } else {
      res.status(404).json({
        message: "No items with that product id in cart",
      });
    }
  }
}

export default new CartController();
