import { Router } from "express";
import {
  clearChat,
  createChatCompletion,
  getAllMessages,
  verifyUser,
} from "../controllers/ChatController";

const router = Router();

router.post("/chat-completion", verifyUser, createChatCompletion);
router.get("/get-messages", verifyUser, getAllMessages);
router.get("/clear-chat", verifyUser, clearChat);

export default router;
