import { useRef, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ProfileImage from "../ProfileImage";
import useUserContext from "../../hooks/useUserContext";
import usePostContext from "../../hooks/usePostContext";

const CommentForm = ({ postId, formContent, setFormContent }) => {
  const { createComment, isCommentEditing, editComment, comment, postId: contextPostId } = usePostContext();
  const { currentUser: { image } } = useUserContext();
  const focusRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault()
    if (isCommentEditing) {
      editComment(postId, { content: formContent })
    }
    else {
      createComment(postId, { content: formContent })
    }
    setFormContent("")
  }

  useEffect(() => {
    if (comment && postId === contextPostId) {
      setFormContent(comment?.content)
    }
    else {
      setFormContent("")
    }
  }, [comment])

  useEffect(() => {
    focusRef.current.focus()
    focusRef.current.scrollIntoView({
      behavior: "smooth", block: "center", inline: "end"
    })
  }, [])

  return (
    <form className="comment-form" onSubmit={handleSubmit} >
      <ProfileImage image={image} />
      <textarea
        placeholder="Comment..."
        className="textarea open"
        value={formContent}
        onChange={e => setFormContent(e.target.value)}
        ref={focusRef}
      />
      <button
        type="submit"
        className="submit show"
        disabled={formContent === ""}
      >
        <AiOutlineSend className="icon" />
      </button>
    </form>
  )
}

export default CommentForm
