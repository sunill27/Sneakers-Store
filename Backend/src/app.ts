import express, { Application } from "express";
const app: Application = express();
const PORT: number = 3000;

import "reflect-metadata";

//dotenv invoked:
import * as dotenv from "dotenv";
dotenv.config();

// CORS invoked:
import cors from "cors";
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.static("./src/uploads/"));

// Import database connection and sync function
import { syncDatabase } from "./database/connection"; // Updated import

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
import { Server } from "socket.io";
import { createServer } from "http"; // Import 'createServer'
import User from "./database/models/userModel";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

let onlineUsers: any = [];
const addOnlineUsers = (socketId: string, userId: string, role: string) => {
  onlineUsers = onlineUsers.filter((user: any) => user.userId !== userId);
  onlineUsers.push({ socketId, userId, role });
};
io.on("connection", async (socket) => {
  console.log("A client connected");
  const { token } = socket.handshake.auth;
  if (token) {
    //@ts-ignore
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    //@ts-ignore
    const existingUsers = await User.findByPk(decoded.id);
    if (existingUsers) {
      addOnlineUsers(socket.id, existingUsers.id, existingUsers.role);
    }
  }
  socket.on("updateOrderStatus", ({ status, orderId, userId }) => {
    const findUser = onlineUsers.find((user: any) => user.userId == userId);
    if (userId) {
      io.to(findUser.socketId).emit("statusUpdated", { status, orderId });
    }
  });
  console.log(onlineUsers);
});

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
    server.listen(PORT, () => {
      console.log(`Server started at port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start the server after syncing and seeding
startServer();
