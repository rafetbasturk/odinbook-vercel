require('dotenv').config()
require('express-async-errors');
const path = require('path');
const express = require("express");
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("./config/cloudinary");

const errorHandlerMiddleWare = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
const commentRouter = require("./routes/commentRoutes");

const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
app.use(passport.initialize());
require("./config/passport");

app.get("api/v1", (req, res) => {
  res.status(200).json({
    message: "Test"
  })
})
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

module.exports = app;