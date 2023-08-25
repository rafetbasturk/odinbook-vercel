import { useEffect } from "react";

const useOutsideClick = (ref, setFunction) => {
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setFunction(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [ref, setFunction])
}

export default useOutsideClick