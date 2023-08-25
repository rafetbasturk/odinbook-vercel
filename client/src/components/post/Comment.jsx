/* eslint-disable react/prop-types */
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import { ProfileImage } from "../";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import useUserContext from "../../hooks/useUserContext";
import usePostContext from "../../hooks/usePostContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Link } from "react-router-dom";

const Comment = ({ _id, author, content, createdAt, postId, showForm, setShowForm }) => {
  const { currentUser } = useUserContext();
  const { deleteComment, setCommentEditMode } = usePostContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const commentRef = useRef(null);
  useOutsideClick(commentRef, setShowOptions);

  const date = DateTime.fromISO(createdAt).toFormat('dd LLL yy')

  const handleShowMenu = () => {
    currentUser?._id === author?._id ? setShowMenu(true) : null
  }

  const handleHideMenu = () => {
    currentUser?._id === author?._id ? setShowMenu(false) : null
  }

  const handleDelete = () => {
    deleteComment(_id, postId);
  }

  const handleEdit = () => {
    setShowForm(!showForm)
    setShowOptions(false)
    setCommentEditMode(postId, _id)
  }

  return (
    <article
      className="comment"
      onMouseEnter={handleShowMenu}
      onMouseLeave={handleHideMenu}
      ref={commentRef}
    >
      <Link to={`/${author?._id}`}>
        <ProfileImage image={author?.image} />
      </Link>

      <div className="comment-content-container">
        <div className="comment-content">
          <div className="comment-author">{author?.name}</div>
          <div className="comment-post">{content}</div>
        </div>
        <div className="comment-date">{date}</div>
      </div>

      {showMenu &&
        <div className="comment-menu" onClick={() => setShowOptions(true)} >
          <BsThreeDots className="icon" />
        </div>}

      {showOptions &&
        <div className="comment-options" >
          <button onClick={handleEdit}>
            <MdEdit className="icon" /> Edit
          </button>
          <button onClick={handleDelete}>
            <MdDelete className="icon" /> Delete
          </button>
        </div>}
    </article>
  );
}

export default Comment
