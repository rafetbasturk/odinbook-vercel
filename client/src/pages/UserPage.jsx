import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import usePostContext from "../hooks/usePostContext";
import { HomeWrapper } from "../assets/wrappers";
import { Loading, BackToTop, UserPageProfile } from "../components";
import { Posts } from "../components/post";

const UserPage = () => {
  const { id } = useParams();
  const { getUser, userLoading } = useUserContext();
  const { getUserPosts, isLoading, userPosts, userPage, hasMoreUserPages, changeUserPage } = usePostContext();

  useEffect(() => {
    changeUserPage(1)
    getUser(id)
  }, [id])

  useEffect(() => {
    getUserPosts(id)
  }, [userPage, id])

  return (
    <HomeWrapper>
      {!userLoading && <UserPageProfile />}
      <Posts
        isLoading={isLoading}
        posts={userPosts}
        page={userPage}
        hasMorePages={hasMoreUserPages}
        changePage={changeUserPage}
      />
      {isLoading && <Loading />}
      {!hasMoreUserPages && !isLoading && <div style={{ textAlign: "center" }}>No more content!</div>}
      <BackToTop />
    </HomeWrapper>
  )
}
export default UserPage