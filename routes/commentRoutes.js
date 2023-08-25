const { Router } = require("express")
const { getAllComments, getComment, updateComment, deleteComment, createComment } = require("../controllers/commentController")
const { authenticateUser } = require("../middlewares/authenticateUser")

const router = Router()

router.use(authenticateUser)

router
  .route("/")
  .get(getAllComments)
  .post(createComment)

router
  .route("/:id")
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment)

module.exports = router