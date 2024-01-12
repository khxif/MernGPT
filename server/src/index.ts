import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import AppRoutes from "./routes";
import morgan from "morgan";

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", AppRoutes);
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
