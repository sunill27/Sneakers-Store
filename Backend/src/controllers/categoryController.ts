import { Request, Response } from "express";
import Category from "../database/models/categoryModel";

class CategoryController {
  categoryData = [
    { name: "Air Force" },
    { name: "Casual Sneakers" },
    { name: "Sports Shoes" },
    { name: "Hiking Boots" },
    { name: "Chelsea Boots" },
    { name: "Combat Boots" },
    { name: "Sandals" },
    { name: "Loafers" },
    { name: "Others" },
  ];

  async seedCategory(): Promise<void> {
    const datas = await Category.findAll();
    if (datas.length === 0) {
      const data = await Category.bulkCreate(this.categoryData);
      console.log("Categories seeded successfully.");
    } else {
      console.log("Categories already seeded.");
    }
  }

  //Add Category API:
  async addCategory(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        message: "Please provide category name",
      });
      return;
    }

    await Category.create({
      name,
    });
    res.status(200).json({
      message: "Category added successfully",
    });
  }

  //Get Category API:
  async getCategories(req: Request, res: Response): Promise<void> {
    const data = await Category.findAll();
    res.status(200).json({
      message: "Categories fetched successfully",
      data: data,
    });
  }

  //Delete Category API:
  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Category.findAll({
      where: {
        id: id,
      },
    });
    if (data.length === 0) {
      res.status(404).json({
        message: "No category with that id",
      });
    } else {
      await Category.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Category deleted successfully",
      });
    }
  }

  //Update Category API:
  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Category.findAll({
      where: {
        id: id,
      },
    });
    if (data.length === 0) {
      res.status(404).json({
        message: "No category with that id",
      });
    } else {
      await Category.update(
        { name },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        message: "Category updated successfully",
        data: data,
      });
    }
  }
}

export default new CategoryController();
