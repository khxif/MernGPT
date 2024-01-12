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
exports.userLogout = exports.UserDetails = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const token_manager_1 = require("../lib/token-manager");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(401).json({ message: "Missing Credentials" });
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = yield new UserModel_1.default({
            username,
            email,
            password: hashedPassword,
        }).save();
        res.clearCookie("user", {
            path: "/",
            httpOnly: true,
        });
        const token = (0, token_manager_1.createToken)(user);
        res.setHeader("Set-Cookie", `user=${token}; Path=/; httpOnly=true`);
        res.json(user).status(200);
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .json({ message: error.message || "Something went wrong!" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(401).json({ message: "Missing Credentials" });
        const user = yield UserModel_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "User not registered" });
        const isPasswordValid = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid Credentials" });
        res.clearCookie("user");
        const token = (0, token_manager_1.createToken)(user);
        res.setHeader("Set-Cookie", `user=${token}; Path=/; httpOnly=true`);
        res.json(user).status(200);
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .json({ message: error.message || "Something went wrong!" });
    }
});
exports.loginUser = loginUser;
const UserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        console.log("token" + token);
        if (!token || token.trim() === "")
            return res
                .status(401)
                .json({ message: "Token expired or malfunctioned" });
        const data = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        console.log(data);
        const user = yield UserModel_1.default.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
        if (!user)
            return res.status(401).json({ message: "User not found" });
        res.json(user).status(200);
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .json({ message: error.message || "Something went wrong!" });
    }
});
exports.UserDetails = UserDetails;
const userLogout = (req, res) => {
    try {
        res.clearCookie("user");
        res.json({ message: "Logout successful" }).status(200);
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .json({ message: error.message || "Something went wrong!" });
    }
};
exports.userLogout = userLogout;
