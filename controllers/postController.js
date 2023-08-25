const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnAuthenticatedError } = require("../errors");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const checkPermissions = require("../utils/checkPermissions");

exports.createPost = async (req, res) => {
  const { content } = req.body
  req.body.author = req.user.userId

  if (!content) throw new BadRequestError('Please Provide All Values');

  const post = await Post.create(req.body)

  res.status(StatusCodes.CREATED).json({
    post
  })
}

exports.getAllPosts = async (req, res) => {
  const {author} = req.query
  let query = {}

  if (author) {
    query.author = author
  }
  else {
    const user = await User.findById(req.user.userId)

    if (user.friends.length === 0) {
      query = {}
    }
    else {
      query = {
        $or: [
          { author: req.user.userId },
          { author: { $in: user.friends } }
        ]
      }
    }
  }

  // No Await
  let result = Post.find(query)
    .populate({ path: "author" })
    .populate({ path: "comments" })
    .sort({ "createdAt": -1 })

  // pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const posts = await result;
  const numOfPosts = await Post.countDocuments(query)
  const numOfPages = Math.ceil(numOfPosts / limit)

  res.status(StatusCodes.OK).json({
    numOfPosts,
    numOfPages,
    posts
  })
}

exports.getPost = async (req, res) => {
  const post = await Post
    .findOne({ _id: req.params.id })
    .populate({
      path: "comments",
      select: "content author"
    })
  // .populate({
  //   path: "author",
  //   select: "name email image"
  // })

  if (!post) throw new NotFoundError(`No post with id: ${req.params.id}`)
  res.status(StatusCodes.OK).json({
    post
  })
}

exports.updatePost = async (req, res) => {
  const { id } = req.params
  const { title, text } = req.body
  if (!title || !text) throw new BadRequestError('Please Provide All Values');

  const post = await Post.findById(id)
  if (!post) throw new NotFoundError(`No post with id ${id}`);
  checkPermissions(req.user, post.user)

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true
  })
  res.status(StatusCodes.OK).json({
    post: updatedPost
  })
}

exports.deletePost = async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)

  if (!post) throw new NotFoundError(`No post with id ${id}`);

  checkPermissions(req.user, post.user)

  await Post.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({
    msg: "Success! Post removed."
  })
}

exports.getPostComments = async (req, res) => {
  const { comments } = await Post.findById(req.params.id).populate({
    path: "comments",
    select: "content author createdAt"
  })
  if (!comments) throw NotFoundError("There are no comments on this post!")
  res.status(StatusCodes.OK).json({
    comments
  })
}

exports.createPostComment = async (req, res) => {
  if (!req.user) throw new UnAuthenticatedError('Log in to comment!')
  if (!req.body.content) throw new BadRequestError('Please Provide All Values!')
  req.body.author = req.user.userId

  const { _id: commentId } = await Comment.create(req.body)

  const { id: postId } = req.params
  const post = await Post.findById(postId)
  if (!post) throw new NotFoundError(`No post with id ${postId}`);

  post.comments = [...post.comments, commentId]
  await post.save({ validateBeforeSave: false, new: true })
  await post.populate({
    path: "author comments",
  })

  res.status(StatusCodes.CREATED).json({
    post
  })
}

exports.like = async (req, res) => {
  const { id: postId } = req.params

  const post = await Post.findById(postId)
  if (post.likes.includes(req.user.userId)) {
    throw new BadRequestError('Post already liked by this user!')
  }
  post.likes = [...post.likes, req.user.userId]
  await post.save()

  res.status(200).json({
    msg: "You liked the post!"
  })

}

exports.unlike = async (req, res) => {
  const { id: postId } = req.params

  const post = await Post.findById(postId)
  console.log(!post.likes.includes(req.user.userId));
  if (!post.likes.includes(req.user.userId)) {
    throw new BadRequestError('Post not liked by this user!')
  }
  post.likes = post.likes.filter(like => {
    like.toString() !== req.user.userId
  })
  await post.save()

  res.status(200).json({
    msg: "You unliked the post!"
  })
}