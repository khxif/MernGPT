"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearChat = exports.getAllMessages = exports.createChatCompletion = exports.verifyUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const openai_1 = require("../lib/openai");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    console.log("ctoken" + token);
    if (!token || token.trim() === "")
        return res.status(401).json({ message: "Token expired or malfunctioned" });
    const data = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    if (!data)
        return res.status(401).json({ message: "Invalid Token!" });
    res.locals.jwtData = data;
    next();
});
exports.verifyUser = verifyUser;
const createChatCompletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { message } = req.body;
        const user = yield UserModel_1.default.findOne({ email: (_a = res.locals.jwtData) === null || _a === void 0 ? void 0 : _a.email });
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        console.log(chats);
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const completion = yield openai_1.openai.chat.completions.create({
            messages: chats,
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
        user.chats.push(completion.choices[0].message);
        yield user.save();
        res.json({ chats: user.chats }).status(200);
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .json({ message: error.message || "Something went wrong!" });
    }
});
exports.createChatCompletion = createChatCompletion;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield UserModel_1.default.findOne({ email: (_b = res.locals.jwtData) === null || _b === void 0 ? void 0 : _b.email });
    if (!user)
        return res.status(401).json({ message: "User not found" });
    return res.json({ chats: user.chats }).status(200);
});
exports.getAllMessages = getAllMessages;
const clearChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = yield UserModel_1.default.findOne({ email: (_c = res.locals.jwtData) === null || _c === void 0 ? void 0 : _c.email });
    if (!user)
        return res.status(401).json({ message: "User not found" });
    //@ts-ignore
    user.chats = [];
    yield user.save();
    res.status(200).json({ chats: user.chats });
});
exports.clearChat = clearChat;
