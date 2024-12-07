"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_2 = require("../controllers/auth");
const companies_1 = require("../controllers/companies");
const router = express_1.default.Router();
//ip rate limit
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// REGISTER
router.post("/register", limiter, companies_1.register);
// LOGIN
router.post("/login", limiter, auth_2.signIn);
// GET DATA
router.post("/get-company-profile", auth_1.default, companies_1.getCompanyProfile);
router.post("/get-company-joblisting", auth_1.default, companies_1.getCompanyJobListing);
router.get("/", companies_1.getCompanies);
router.get("/get-company/:id", companies_1.getCompanyById);
// UPDATE DATA
router.put("/update-company", auth_1.default, companies_1.updateCompanyProfile);
exports.default = router;
