const mongoose = require("mongoose");

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please enter your comment."]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author required."]
  }
}, {
  timestamps: true,
  // toJSON: { virtuals: true },
  // toObject: { virtuals: true }
})

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name email image"
  })
  next()
})

module.exports = mongoose.model("Comment", CommentSchema)