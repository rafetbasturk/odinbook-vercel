import { useContext } from "react"
import { AuthContext } from "../contexts/auth-context"

const useAuthContext = () => {
  return useContext(AuthContext)
}

export default useAuthContext