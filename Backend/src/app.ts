import express, { Application } from "express";
const app: Application = express();
const PORT: number = 3000;

import "reflect-metadata";

//dotenv invoked:
import * as dotenv from "dotenv";
dotenv.config();


// CORS invoked:
import cors from "cors"
app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json());

// Import database connection and sync function
import { syncDatabase } from "./database/connection";  // Updated import

// Import admin seeder
import adminSeeder from "./adminSeeder";

// Import category controller to seed categories
import categoryController from "./controllers/categoryController";

// Import routes
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
import cartRoute from "./routes/cartRoute";
import orderRoute from "./routes/orderRoute";

// Function to start the server
const startServer = async () => {
  try {
    // Ensure the database is connected and synced before proceeding
    await syncDatabase(); 

    // Seed the admin user
    await adminSeeder();

    // Seed categories
    await categoryController.seedCategory(); // <-- Call the seed function here

    // Set up routes
    app.use("", userRoute);
    app.use("/admin/product", productRoute);
    app.use("/admin/category", categoryRoute);
    app.use("/customer/cart", cartRoute);
    app.use("/order", orderRoute);

    // Start the server
    app.listen(PORT, () => {
      console.log("Server started at port:", PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start the server after syncing and seeding
startServer();
