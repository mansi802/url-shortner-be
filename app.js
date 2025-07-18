import dotenv from "dotenv";
dotenv.config("./.env");
import express from "express";
import connectDB from "./src/config/mongo.config.js";
import url_router from "./src/routes/shortUrl.route.js";
import auth_router from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

app.use("/auth", auth_router);
app.use("/", url_router);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to URl Shortner API 😀");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 3000, () => {
    connectDB();
    console.log("server running at " + (process.env.PORT || 3000));
  });
}
connectDB();

export default app;
