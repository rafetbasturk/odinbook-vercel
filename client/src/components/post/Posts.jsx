import usePagination from "../../hooks/usePagination"
import Post from "./Post"

const Posts = ({ isLoading, posts, page, hasMorePages, changePage }) => {
  const targetRef = usePagination(isLoading, page, hasMorePages, changePage)

  return (
    posts?.map((post, i) =>
      <Post
        key={post._id}
        {...post}
        ref={posts.length === i + 1 ? targetRef : null}
      />
    )
  )
}
export default Posts