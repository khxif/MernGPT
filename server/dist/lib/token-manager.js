"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (user) => {
    const payload = {
        username: user.username,
        email: user.email,
    };
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
    return token;
};
exports.createToken = createToken;
