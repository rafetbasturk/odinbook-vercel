import { useEffect } from 'react';
import usePostContext from '../hooks/usePostContext';
import { HomeWrapper } from "../assets/wrappers";
import { Loading, BackToTop } from '../components';
import { Posts, PostForm } from '../components/post';
import useUserContext from '../hooks/useUserContext';

const Home = () => {
  const { currentUser } = useUserContext()
  const { getPosts, isLoading, posts, page, hasMorePages, changePage, post } = usePostContext();

  useEffect(() => {
    getPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, post, currentUser])

  return (
    <HomeWrapper>
      <PostForm />
      <Posts
        posts={posts}
        page={page}
        hasMorePages={hasMorePages}
        changePage={changePage}
        isLoading={isLoading}
      />
      {isLoading && <Loading />}
      {!hasMorePages && !isLoading && <div style={{ textAlign: "center" }}>No more content!</div>}
      <BackToTop />
    </HomeWrapper>
  )
}
export default Home