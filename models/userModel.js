const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")
const crypto = require("crypto");
const { UnAuthenticatedError } = require("../errors");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email."]
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  sentFriendRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  receivedFriendRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [4, "Minimum password length is 4 characters."],
    select: false
  },
  confirm: {
    type: String,
    required: [true, "Please provide a password confirm."],
    validate: {
      // this only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password
      },
      message: "Passwords don't match!"
    }
  },
  facebookId: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  image: {
    type: String,
    default: "default.jpg"
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, { timestamps: true });

// fire a function before doc saved to db
UserSchema.pre("save", async function (next) {
  // Only run this function if password is modified
  if (!this.isModified("password")) return next()
  // salt and hash the password
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  // delete the passwordConfirm field
  this.confirm = undefined

  next()
})

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()

  this.passwordChangedAt = Date.now()
  next()
})

UserSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

// UserSchema.pre(/^find/, function (next) {
//   this.find({}).populate({ 
//     path: "receivedFriendRequests",
//     select: "name email friends image"
//   })
//   next()
// })

// static method to login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }).select("+password")
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      user.password = undefined
      return user
    }
  }
  throw new UnAuthenticatedError("Invalid credentials!")
}

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

// UserSchema.methods.isPasswordChanged = function (JWTTimeStamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
//     return JWTTimeStamp < changedTimestamp
//   }
//   return false
// }

// UserSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex")

//   this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000

//   return resetToken
// }

// UserSchema.methods.isCurrentPasswordCorrect = async (candidatePassword, userPassword) => {
//   return await bcrypt.compare(candidatePassword, userPassword)
// }

module.exports = mongoose.model("User", UserSchema);