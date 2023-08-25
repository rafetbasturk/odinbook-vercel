const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

exports.getAllUsers = async (req, res) => {
  const { search } = req.query
  let query = {};
  if (search) {
    query = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    }
  }
  let result = User.find(query);
  
  const numOfUsers = await User.countDocuments(query)
  const users = await result;

  res.status(StatusCodes.OK).json({ numOfUsers, users })
}

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({
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

exports.friendRequest = async (req, res) => {
  const sender = await User.findById(req.user.userId)
  const receiver = await User.findById(req.params.id)

  // Check if the request has already been sent
  if (sender.sentFriendRequests.includes(receiver._id)) {
    throw new BadRequestError('Request already sent');
  }

  sender.sentFriendRequests.push(receiver._id);
  await sender.save({
    validateBeforeSave: false,
  });
  receiver.receivedFriendRequests.push(sender._id);
  await receiver.save({
    validateBeforeSave: false,
  });

  return res.status(StatusCodes.OK).json({ msg: 'Request sent' });
}

exports.accept = async (req, res) => {
  const { id } = req.params
  const sender = await User.findById(id);
  const receiver = await User.findById(req.user.userId);


  receiver.receivedFriendRequests.pull(id);
  if (receiver.friends.includes(id)) throw new BadRequestError("Already friends!");
  receiver.friends.push(id);
  await receiver.save({ validateBeforeSave: false });

  sender.sentFriendRequests.pull(receiver._id);
  sender.friends.push(receiver._id);
  await sender.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({
    receiver,
    sender
  })
}

exports.reject = async (req, res) => {
  const sender = await User.findById(req.params.id);
  const receiver = await User.findById(req.user.userId);

  receiver.receivedFriendRequests.pull(sender._id);
  await receiver.save({ validateBeforeSave: false });

  sender.sentFriendRequests.pull(receiver._id);
  await sender.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({
    user: receiver
  })
}

exports.mutuals = async (req, res) => {
  const currentId = req.user.userId;
  const userId = req.params.id;

  let mutualFriends = []

  if (currentId === userId) {
    mutualFriends = []
  }
  else {
    const users = await User.find({
      _id: { $in: [currentId, userId] }
    })

    mutualFriends = users[0].friends.filter(id => users[1].friends.includes(id))
  }

  res.status(StatusCodes.OK).json({
    mutualFriends
  })
}

exports.uploadImage = async (req, res) => {
  const { image } = req.files;
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    overwrite: true,
    public_id: req.user.userId,
    folder: "odinbook",
    width : 200,
    height: 200,
    crop: "scale",
  });

  fs.rmSync(req.files.image.tempFilePath);

  res.status(StatusCodes.OK).json({imageUrl: result.secure_url});
}

exports.updateUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json({
    user
  });
}