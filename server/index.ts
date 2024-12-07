import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import dbConnection from "./src/config/config";
import errorMiddleware from "./src/middlewares/error";
import router from "./src/routes";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8800;

// MONGODB CONNECTION
dbConnection();

// middlenames
app.use(cors());
app.use(mongoSanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.get("/", (req, res) => {
  res.json({ message: "Hello from API" });
});
//error middleware
app.use(errorMiddleware);
// Move the root route here

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
export default app;
