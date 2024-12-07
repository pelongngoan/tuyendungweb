"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// Register controller
const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    // Validate fields
    if (!firstName) {
        next("First Name is required");
        return;
    }
    if (!email) {
        next("Email is required");
        return;
    }
    if (!lastName) {
        next("Last Name is required");
        return;
    }
    if (!password) {
        next("Password is required");
        return;
    }
    try {
        const userExist = await userModel_1.default.findOne({ email });
        if (userExist) {
            next("Email Address already exists");
            return;
        }
        const user = await userModel_1.default.create({
            firstName,
            lastName,
            email,
            password,
        });
        // User token
        const token = await user.createJWT();
        res.status(201).send({
            success: true,
            message: "Account created successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.register = register;
// Sign-in controller
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Validation
        if (!email || !password) {
            next("Please Provide A User Credentials");
            return;
        }
        // Find user by email
        const user = await userModel_1.default.findOne({ email }).select("+password");
        if (!user) {
            next("Invalid email or password");
            return;
        }
        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            next("Invalid email or password");
            return;
        }
        user.password = "";
        const token = user.createJWT();
        res.status(200).json({
            success: true,
            message: "Login successfully",
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.signIn = signIn;
