import { useCallback, useRef } from "react"

const usePagination = (isLoading, page, hasMorePages, changePage) => {
  const intObserver = useRef(null)

  const targetRef = useCallback(post => {
    if (isLoading) return

    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasMorePages) {
        changePage(page + 1)
      }
    })

    if (post) intObserver.current.observe(post)
  }, [isLoading, page, hasMorePages])

  return targetRef
}
export default usePagination