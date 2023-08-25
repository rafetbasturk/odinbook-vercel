const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config()
const connectDB = require("./db/connect")

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

start()