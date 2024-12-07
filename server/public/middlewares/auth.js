"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next("Authentication failed");
    }
    const token = authHeader.split(" ")[1];
    try {
        // Assuming JWT_SECRET_KEY is a string
        const userToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Cast userToken as any or define a more specific type for it
        req.body.user = {
            userId: userToken.userId,
        };
        next();
    }
    catch (error) {
        console.log(error);
        next("Authentication failed");
    }
};
exports.default = userAuth;
