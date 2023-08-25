require('dotenv').config()
const { readFile } = require("fs/promises");
const connectDB = require("../db/connect")
const Post = require("../models/postModel")

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Post.deleteMany();

    // const data = JSON.parse(await readFile(new URL("./mock-data.json", import.meta.url)))
    const data = JSON.parse(await readFile(`./mock_data/posts.json`));
    await Post.create(data);
    console.log("Success");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

start()