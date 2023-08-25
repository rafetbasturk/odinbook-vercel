const { Router } = require("express");
const { getAllPosts, getPost, createPost, updatePost, deletePost, getPostComments, createPostComment, like, unlike } = require("../controllers/postController");
const { authenticateUser } = require("../middlewares/authenticateUser");

const router = Router();

router.use(authenticateUser)

router
  .route("/")
  .get(getAllPosts)
  .post(createPost)

router
  .route("/:id")
  .get(getPost)
  .patch(updatePost)
  .delete(deletePost)

router
  .route("/:id/comments")
  .get(getPostComments)
  .post(createPostComment)

router
  .route("/:id/like")
  .patch(like)
router
  .route("/:id/unlike")
  .patch(unlike)

module.exports = router