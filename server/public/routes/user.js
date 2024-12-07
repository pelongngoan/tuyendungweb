"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// GET user by userId (by params)
router.get("/get-user/:userId", auth_1.default, user_1.getUser);
// UPDATE USER || PUT
router.put("/update-user", auth_1.default, user_1.updateUser);
exports.default = router;
