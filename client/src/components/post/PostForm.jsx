import { Link } from "react-router-dom";
import { useState } from "react"
import ProfileImage from "../ProfileImage"
import useUserContext from "../../hooks/useUserContext"
import usePostContext from "../../hooks/usePostContext"


const PostForm = () => {
  const { currentUser } = useUserContext();
  const { createPost } = usePostContext();
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault()
    createPost({ content });
    setContent("")
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <Link to={`/${currentUser._id}`}>
        <ProfileImage image={currentUser?.image} />
      </Link>
      <textarea
        placeholder="What is on your mind?"
        className="textarea"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={content === ""}
      >
        post
      </button>
    </form>
  )
}
export default PostForm