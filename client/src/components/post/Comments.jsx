import { useState } from "react";
import usePostContext from "../../hooks/usePostContext"
import { Loading } from "../";
import { Comment, CommentForm, PostButtons } from "./"

const Comments = ({ postId, comments, likes }) => {
  const [formContent, setFormContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { isCommentLoading, postId: contextPostId } = usePostContext();

  return (
    <>
      <PostButtons postId={postId} likes={likes} setShowForm={setShowForm} />
      <hr />
      <div className="comments">
        {comments?.map(comment => (
          <Comment
            key={comment._id}
            {...comment}
            postId={postId}
            setShowForm={setShowForm}
            setFormContent={setFormContent}
          />
        ))}
        {contextPostId === postId && isCommentLoading && <Loading />}
        {showForm && <CommentForm postId={postId} formContent={formContent} setFormContent={setFormContent} />}
      </div>
    </>
  )
}

export default Comments