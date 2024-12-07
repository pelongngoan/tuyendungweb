import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import dbConnection from "./config/config";
import errorMiddleware from "./middlewares/error";
import router from "./routes";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../.env") });
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

//error middleware
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.json({ message: "Hello from API" });
});
app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
