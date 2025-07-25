const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const userRoute = require("./routes/user");
const prodRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const skinQuiz = require("./routes/skinQuiz");
const orderRoute = require("./routes/order");
const reviewRoute = require("./routes/review");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
dotenv.config();
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: ["price", "Category"] }));
//Api Routes
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: "http://localhost:3000",

    credentials: true,
  })
);
app.use(express.json());
app;
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/products", prodRoute);
app.use("/api/cart", cartRoute);
app.use("/api/skinquiz", skinQuiz);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
