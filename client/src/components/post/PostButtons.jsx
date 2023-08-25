import { BiLike, BiDislike, BiComment } from "react-icons/bi";
import usePostContext from "../../hooks/usePostContext";
import useUserContext from "../../hooks/useUserContext";

const PostButtons = ({ likes, postId, setShowForm }) => {
  const { currentUser } = useUserContext()
  const { toggleLike, resetCommentEditMode } = usePostContext()

  const isLikedByUser = likes?.includes(currentUser._id)

  const handleLike = () => {
    const endPoint = isLikedByUser ? "unlike" : "like"
    toggleLike(postId, currentUser._id, endPoint)
  }

  const handleComment = () => {
    resetCommentEditMode()
    setShowForm(true)
  }

  return (
    <div className="buttons">
      <button type="button" onClick={handleLike}>
        {!isLikedByUser
          ? <> <BiLike className="icon" /> like </>
          : <> <BiDislike className="icon" /> unlike </>}
      </button>

      <button type="button" onClick={handleComment}>
        <BiComment className="icon" /> comment
      </button>
    </div>
  );
}

export default PostButtons