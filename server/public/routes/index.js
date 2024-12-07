"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const companies_1 = __importDefault(require("./companies"));
const job_1 = __importDefault(require("./job"));
const router = express_1.default.Router();
const path = "/api-v1/";
router.use(`${path}auth`, auth_1.default); //api-v1/auth/
router.use(`${path}users`, user_1.default);
router.use(`${path}companies`, companies_1.default);
router.use(`${path}jobs`, job_1.default);
exports.default = router;
