import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connetcDb from "../config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

connetcDb();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running");
});
