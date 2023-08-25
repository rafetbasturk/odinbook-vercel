const passport = require("passport")
const FacebookStrategy = require("passport-facebook");
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/v1/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email'],
    session: false
  }, async (accessToken, refreshToken, profile, cb) => {
    const { id, name, email, picture } = profile._json
    const user = await User.findOne({ facebookId: id })
    if (user) {
      cb(null, user)
    }
    else {
      const newUser = new User({
        facebookId: id,
        name,
        email,
        image: picture.data.url
      })
      await newUser.save({ validateBeforeSave: false })
      cb(null, newUser)
    }
  })
);