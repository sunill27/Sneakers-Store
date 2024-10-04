import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Please provide username, email, password",
      });
      return;
    }

    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      role: role,
    });

    res.status(200).json({
      message: "User registered successfully",
    });
  }

  public static async loginUser(req: Request, res: Response): Promise<void> {
    //User input
    const { email, password } = req.body;
    if (!email || !email) {
      res.status(400).json({
        message: "Please provide email, password",
      });
      return;
    }

    //Check whether user with above email exist or not:
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!data) {
      res.status(400).json({
        message: "No user found with that email",
      });
      return;
    }

    //Check password:
    const isMatched = bcrypt.compareSync(password, data.password);
    if (isMatched) {
      //Generate Token:
      const token = jwt.sign(
        { id: data.id },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "20d",
        }
      );
      res.status(200).json({
        message: "Logged in successfully",
        data: token,
      });
    } else {
      res.status(400).json({
        message: "Invalid email or password",
      });
    }
  }
}
export default AuthController;
