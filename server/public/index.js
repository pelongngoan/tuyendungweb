"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config/config"));
const routes_1 = __importDefault(require("routes"));
const error_1 = __importDefault(require("middlewares/error"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8800;
(0, config_1.default)();
app.use((0, cors_1.default)());
// app.use(mongoSanitize());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(routes_1.default);
app.use(error_1.default);
app.listen(PORT, () => {
    console.log(`Dev Server running on port: ${PORT}`);
});
exports.default = app;
