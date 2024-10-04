import { Request, Response } from "express";
import Product from "../database/models/productModel";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../database/models/userModel";
import Category from "../database/models/categoryModel";

class ProductController {
  //Add Product API:
  async addProduct(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { name, price, description, stock, categoryId } = req.body;
    let fileName;
    if (req.file) {
      fileName = req.file.filename;
    } else {
      fileName =
        "https://cdn.shopify.com/s/files/1/1626/5391/files/Dior_x_Air_Jordan_1_High.jpg?v=1698768560";
    }
    if (!name || !price || !stock || !description || !categoryId) {
      res.status(400).json({
        message:
          "Please provide product name, price, description, stock, categoryId",
      });
      return;
    }

    await Product.create({
      name,
      price,
      description,
      stock,
      imageUrl: fileName,
      userId: userId,
      categoryId,
    });
    res.status(200).json({
      message: "Product added successfully",
    });
  }

  //Get All Product API:
  async getAllProducts(req: Request, res: Response): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({
      message: "Products fetched successfully",
      data: data, 
    });
  }

  //Get Single Product API:
  async getSingleProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data = await Product.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!data) {
      res.status(404).json({
        message: "No product with that id",
      });
    } else {
      res.status(200).json({
        message: "Single product fetched successfully",
        data: data,
      });
    }
  }

  //Delete Product API:
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (data) {
      await Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "No product found",
      });
    }
  }

  //Update Product API:
  async updateProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { name } = req.body;
    const data = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (data) {
      await Product.update(
        { name },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        message: "Product updated successfully",
        data: data,
      });
    } else {
      res.status(404).json({
        message: "No product found",
      });
    }
  }
}
export default new ProductController();
