"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = require("../controllers/ChatController");
const router = (0, express_1.Router)();
router.post("/chat-completion", ChatController_1.verifyUser, ChatController_1.createChatCompletion);
router.get("/get-messages", ChatController_1.verifyUser, ChatController_1.getAllMessages);
router.get("/clear-chat", ChatController_1.verifyUser, ChatController_1.clearChat);
exports.default = router;
