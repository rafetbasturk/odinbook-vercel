const { Router } = require("express");
const { friendRequest, getAllUsers, getUser, accept, reject, getCurrentUser, mutuals, uploadImage, updateUser } = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authenticateUser");

const router = Router();

router.use(authenticateUser);

router.route("/").get(getAllUsers);

router.route("/getCurrentUser").get(getCurrentUser);

router.route("/upload").post(uploadImage);

router.route("/:id").get(getUser);
router.route("/:id").patch(updateUser);

router.route("/:id/mutual-friends").get(mutuals);
router.route("/:id/friend-request").post(friendRequest);
router.route("/:id/accept").put(accept);
router.route("/:id/reject").put(reject);

module.exports = router;