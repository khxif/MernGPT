import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createToken } from "../lib/token-manager";
import User from "../models/UserModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(401).json({ message: "Missing Credentials" });

    const hashedPassword = await hash(password, 10);
    const user = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    res.clearCookie("user", {
      path: "/",
      httpOnly: true,
    });
    const token = createToken(user);

    res.setHeader("Set-Cookie", `user=${token}; Path=/; httpOnly=true`);
    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: (error as Error).message || "Something went wrong!" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({ message: "Missing Credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not registered" });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    res.clearCookie("user", {
      path: "/",
      httpOnly: true,
    });
    const token = createToken(user);

    res.setHeader("Set-Cookie", `user=${token}; Path=/; httpOnly=true`);
    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: (error as Error).message || "Something went wrong!" });
  }
};

export const UserDetails = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    console.log("token" + token);
    if (!token || token.trim() === "")
      return res
        .status(401)
        .json({ message: "Token expired or malfunctioned" });

    const data: any = verify(token, process.env.JWT_SECRET!);
    console.log(data);

    const user = await User.findOne({ email: data?.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: (error as Error).message || "Something went wrong!" });
  }
};

export const userLogout = (req: Request, res: Response) => {
  try {
    res.clearCookie("user", {
      path: "/",
      httpOnly: true,
    });
    res.json({ message: "Logout successful" }).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: (error as Error).message || "Something went wrong!" });
  }
};
