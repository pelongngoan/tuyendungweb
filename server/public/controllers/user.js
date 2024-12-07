"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.updateUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, contact, mayjor } = req.body;
    try {
        if (!firstName || !lastName || !email || !contact) {
            return next(new Error("Please provide all required fields"));
        }
        const id = req.body.user.userId;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).send(`No User with id: ${id}`);
            return;
        }
        const updateUser = {
            firstName,
            lastName,
            email,
            contact,
            mayjor,
            _id: id,
        };
        const user = await userModel_1.default.findByIdAndUpdate(id, updateUser, { new: true });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const token = user.createJWT();
        user.password = "";
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const getUser = async (req, res, next) => {
    try {
        // Get the userId from the URL params
        const { userId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(404).send("Invalid User ID");
            return;
        }
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            res.status(404).send({
                message: "User Not Found",
                success: false,
            });
            return;
        }
        user.password = "";
        res.status(200).json({
            success: true,
            user: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "auth error",
            success: false,
            error: error.message,
        });
    }
};
exports.getUser = getUser;
