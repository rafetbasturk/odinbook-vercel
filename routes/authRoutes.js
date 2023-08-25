const { Router } = require("express");
const passport = require("passport");
const { register, login, logout, getCurrentUser, callback } = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authenticateUser");

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/facebook").get(passport.authenticate('facebook'));
router.route("/facebook/callback").get(passport.authenticate('facebook'), callback);

module.exports = router;