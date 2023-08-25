const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError } = require("../errors")
const attachCookies = require("../utils/attachCookies")

exports.register = async (req, res) => {
  const { name, email, password, confirm } = req.body

  if (!name || !email || !password || !confirm) {
    throw new BadRequestError("Please provide all values!")
  }

  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) throw new BadRequestError("Email already in use!")

  const user = await User.create(req.body)
  const token = user.createJWT()
  attachCookies({ res, token })

  user.password = undefined

  res.status(StatusCodes.CREATED).json({
    user
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide all values!")
  }

  const user = await User.login(email, password)
  const token = user.createJWT()
  attachCookies({ res, token })

  res.status(StatusCodes.OK).json({
    user
  })
}

exports.getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).populate({
    path: "receivedFriendRequests",
    select: "name email friends image"
  })
  res.status(StatusCodes.OK).json({
    user
  })
}

exports.logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(StatusCodes.OK).json({
    msg: "user logged out!"
  })
}

exports.callback = async (req, res) => {
  const user = req.user;
  const token = user.createJWT();
  attachCookies({ res, token });
  res.redirect("/");
}
