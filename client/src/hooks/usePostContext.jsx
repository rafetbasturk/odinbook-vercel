import { useContext } from "react"
import { PostContext } from "../contexts/post-context"

const usePostContext = () => {
  return useContext(PostContext)
}

export default usePostContext