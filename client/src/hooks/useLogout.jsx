import apiFetch from "../config/axiosConfig";
import useAuthContext from "./useAuthContext";
import usePostContext from "./usePostContext";
import useUserContext from "./useUserContext";

const useLogout = () => {
  const { setAuthInitials } = useAuthContext();
  const { setPostInitials } = usePostContext();
  const { setUserInitials } = useUserContext();

  const logout = async () => {
    await apiFetch("/auth/logout");
    setAuthInitials();
    setPostInitials();
    setUserInitials();
  }
  return logout
}
export default useLogout