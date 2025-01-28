import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Cart from "./models/cartModel";
import Order from "./models/orderModel";
import Payment from "./models/paymentModel";
import OrderDetail from "./models/orderDetail";

// Initialize Sequelize with environment variables
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || "", // Handle empty password
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/models"], // Ensure models are correctly located
});

// Authenticate and log status
sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Sync database function
export const syncDatabase = async (): Promise<void> => {
  await sequelize.sync({ force: false });
  console.log("Synced!!");
};

// Define relationships between models
// User-Product relationship
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Category-Product relationship
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

// User-Cart relationship
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// Product-Cart relationship
Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

// Order-OrderDetail relationship
Order.hasMany(OrderDetail, { foreignKey: "orderId" });
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

// Product-OrderDetail relationship
Product.hasMany(OrderDetail, { foreignKey: "productId" });
OrderDetail.belongsTo(Product, { foreignKey: "productId" });

// Payment-Order relationship
Payment.hasOne(Order, { foreignKey: "paymentId" });
Order.belongsTo(Payment, { foreignKey: "paymentId" });

// User-Order relationship
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

export default sequelize;
