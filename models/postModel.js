const mongoose = require("mongoose");
require("./commentModel");
require("./userModel");

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please enter blog text."],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user."]
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
}, {
  timestamps: true,
  // toJSON: { virtuals: true },
  // toObject: { virtuals: true }
})

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "comments",
    select: "content author createdAt"
  })
  next()
})

module.exports = mongoose.model("Post", PostSchema)