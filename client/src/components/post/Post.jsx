/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Link, useLocation } from 'react-router-dom';
import { forwardRef } from "react";
import { PostContent, Comments } from './';
import { Profile } from '../';

const Post = forwardRef(({ _id, author, content, likes, comments }, ref) => {
  const location = useLocation();

  const handleClick = e => {
    if (location.pathname.includes(author?._id)) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  return (
    <article className="post" ref={ref ? ref : null}>
      <Link
        to={`/${author?._id}`}
        onClick={handleClick}
        style={{ padding: 0, background: "transparent" }}
      >
        <Profile type="post" {...author} />
      </Link>

      <PostContent
        content={content}
        likes={likes}
        length={comments.length}
      />

      <hr />

      <Comments
        postId={_id}
        likes={likes}
        comments={comments}
      />
    </article>
  )
})

export default Post