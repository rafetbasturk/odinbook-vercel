import useUserContext from "../hooks/useUserContext";
import Profile from "./Profile";

const Users = () => {
  const { users } = useUserContext();

  return (
    users?.map(user => <Profile key={user._id} {...user} />)
  )
}
export default Users