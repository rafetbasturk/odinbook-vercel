import { BiLike } from "react-icons/bi";

const PostContent = ({ content, likes, length }) => {
  return (
    <div className="post-content">
      <p>{content}</p>
      <div className="counts">
        {likes.length > 0 && <span className="like-counts">
          <BiLike className="icon" /> {likes?.length}
        </span>}
        {length > 0 && <span className="comment-counts">
          {length} {length === 1 ? "comment" : "comments"}
        </span>}
      </div>
    </div>
  )
}

export default PostContent