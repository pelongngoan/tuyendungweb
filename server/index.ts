import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "config/config";
import router from "routes";
import errorMiddleware from "middlewares/error";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;
// app.use("/", (req, res) => {
//   res.send("Server is running");
// });
app.use(mongoSanitize());
dbConnection();
app.use(cors());
app.use(router);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
export default app;
function mongoSanitize(): any {
  throw new Error("Function not implemented.");
}
