import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { openai } from "../lib/openai";
import User from "../models/UserModel";
import { ChatCompletionMessageParam } from "openai/resources";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log("ctoken" + token);
  if (!token || token.trim() === "")
    return res.status(401).json({ message: "Token expired or malfunctioned" });

  const data = verify(token, process.env.JWT_SECRET!);
  if (!data) return res.status(401).json({ message: "Invalid Token!" });
  res.locals.jwtData = data;

  next();
};

export const createChatCompletion = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const user = await User.findOne({ email: res.locals.jwtData?.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    console.log(chats);
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      messages: chats as ChatCompletionMessageParam[],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    user.chats.push(completion.choices[0].message);
    await user.save();

    res.json({ chats: user.chats }).status(200);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: (error as Error).message || "Something went wrong!" });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: res.locals.jwtData?.email });
  if (!user) return res.status(401).json({ message: "User not found" });

  return res.json({ chats: user.chats }).status(200);
};

export const clearChat = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: res.locals.jwtData?.email });
  if (!user) return res.status(401).json({ message: "User not found" });

  //@ts-ignore
  user.chats = [];
  await user.save();
  res.status(200).json({ chats: user.chats });
};
