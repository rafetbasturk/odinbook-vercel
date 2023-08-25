const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Comment = require("../models/commentModel");
const checkPermissions = require("../utils/checkPermissions");

exports.getAllComments = async (req, res) => {
  const comments = await Comment.find({})
  const numOfComments = await Comment.countDocuments()

  res.status(StatusCodes.OK).json({
    numOfComments,
    comments
  })
}

exports.getComment = async (req, res) => {
  const { id } = req.params

  const comment = await Comment.findById(id)
  if (!comment) throw new NotFoundError(`No comment with id ${id}`)

  res.status(StatusCodes.OK).json({
    comment
  })
}

exports.deleteComment = async (req, res) => {
  const { id } = req.params
  const comment = await Comment.findById(id)
  if (!comment) throw new NotFoundError(`No comment with id ${id}`)
  checkPermissions(req.user, comment.author)
  await Comment.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({
    msg: "Success! Comment removed."
  })
}

exports.updateComment = async (req, res) => {
  const { id } = req.params
  if (!req.body.content) throw new BadRequestError('Please Provide Content');

  const comment = await Comment.findById(id)
  if (!comment) throw new NotFoundError(`No comment with id ${id}`)

  checkPermissions(req.user, comment.author)

  const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true
  })
  res.status(StatusCodes.OK).json({
    comment: updatedComment
  })
}

exports.createComment = async (req, res) => {
  res.send("createComment")
}