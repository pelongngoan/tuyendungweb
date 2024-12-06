import express from "express";
import dbConnection from "./config/config";
import router from "./routes";

const app = express();

// Connect to the database
dbConnection();

// Middleware
app.use(express.json());
app.use(router);

export default app;
