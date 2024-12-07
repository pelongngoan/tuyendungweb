"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAYJOR = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the interface for the user document
var MAYJOR;
(function (MAYJOR) {
    MAYJOR["England"] = "England";
    MAYJOR["Arab"] = "Arab";
    MAYJOR["China"] = "China";
    MAYJOR["France"] = "France";
    MAYJOR["Germany"] = "Germany";
    MAYJOR["Japan"] = "Japan";
    MAYJOR["Korea"] = "Korea";
    MAYJOR["Russia"] = "Russia";
    MAYJOR["Economy"] = "Economy";
    MAYJOR["Tradition"] = "Tradition";
})(MAYJOR || (exports.MAYJOR = MAYJOR = {}));
// Schema definition
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required!"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required!"],
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: true,
        validate: validator_1.default.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minlength: [6, "Password length should be greater than 6 characters"],
        select: true,
    },
    accountType: { type: String, default: "seeker" },
    contact: { type: String },
    mayjor: {
        type: String,
        enum: Object.values(MAYJOR), // Use enum values here
    },
}, { timestamps: true });
// Middleware to hash the password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
// Method to compare password
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcryptjs_1.default.compare(userPassword, this.password);
};
// Method to create JWT
userSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};
const Users = mongoose_1.default.model("Users", userSchema);
exports.default = Users;
