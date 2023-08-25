import { useContext } from "react"
import { AlertContext } from "../contexts/alertContext"

const useAlert = () => {
  return useContext(AlertContext)
}

export default useAlert