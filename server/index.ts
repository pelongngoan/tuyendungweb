import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import dbConnection from "config/config";
import router from "routes";
import errorMiddleware from "middlewares/error";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8800;
dbConnection();
app.use(cors());
// app.use(mongoSanitize());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
export default app;
