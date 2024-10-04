import User from "./database/models/userModel";
import bcrypt from "bcrypt";

const adminSeeder = async (): Promise<void> => {
  const [data] = await User.findAll({
    where: {
      email: "admin@gmail.com",
    },
  });
  if (!data) {
    await User.create({
      email: "admin@gmail.com",
      password: bcrypt.hashSync("password", 8),
      username: "admin",
      role: "admin",
    });
    console.log("Admin credentials seeded successfully.");
  } else {
    console.log("Admin credentials already seeded.");
  }
};

export default adminSeeder;
