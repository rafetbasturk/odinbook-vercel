/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react"
import { postReducer } from "./reducer"
import apiFetch from "../../config/axiosConfig"
import useAlertContext from "../../hooks/useAlertContext"

import {
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CHANGE_PAGE,
  LIKE_POST,
  GET_USER_POSTS_BEGIN,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,
  CHANGE_USER_PAGE,
  SET_INITIAL_STATE,
  CREATE_COMMENT_BEGIN,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  SET_COMMENT_EDIT_MODE,
  RESET_COMMENT_EDIT_MODE,
  EDIT_COMMENT_BEGIN,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
} from "./actions";

const PostContext = createContext();

const initialState = {
  isLoading: false,
  posts: [],
  page: 1,
  numOfPages: 1,
  numOfPosts: 0,
  hasMorePages: false,
  userId: "",
  userPosts: [],
  userPage: 1,
  numOfUserPages: 1,
  numOfUserPosts: 0,
  hasMoreUserPages: false,
  postId: "",
  isCommentLoading: false,
  isCommentEditing: false,
  comment: null
}

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState)
  const { showAlert } = useAlertContext()

  const setCommentEditMode = async (postId, commentId) => {
    try {
      const { data } = await apiFetch(`/comments/${commentId}`)
      dispatch({ type: SET_COMMENT_EDIT_MODE, payload: { ...data, postId } })
    } catch (error) {
      console.log(error.response);
    }
  }

  const resetCommentEditMode = async () => {
    dispatch({ type: RESET_COMMENT_EDIT_MODE })
  }

  const editComment = async (postId, content) => {
    dispatch({ type: EDIT_COMMENT_BEGIN, payload: { postId } })
    try {
      const url = `comments/${state.comment._id}`
      const { data: { comment } } = await apiFetch.patch(url, content)
      dispatch({ type: EDIT_COMMENT_SUCCESS, payload: { postId, comment } })
      showAlert("success", "Comment edited.")
    } catch (error) {
      dispatch({ type: EDIT_COMMENT_ERROR })
      showAlert("danger", error.response.data.msg)
    }
  }

  const deleteComment = async (commentId, postId) => {
    dispatch({ type: DELETE_COMMENT_BEGIN, payload: { postId } })
    try {
      await apiFetch.delete(`comments/${commentId}`)
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: { commentId, postId } })
      showAlert("success", "Comment deleted.")
    } catch (error) {
      dispatch({ type: DELETE_COMMENT_ERROR })
      showAlert("danger", error.response.data.msg)
    }
  }

  const createComment = async (postId, content) => {

    dispatch({ type: CREATE_COMMENT_BEGIN, payload: { postId } })
    try {
      const { data } = await apiFetch.post(`posts/${postId}/comments`, content)
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data })
      showAlert("success", "Comment created.")
    } catch (error) {
      dispatch({ type: CREATE_COMMENT_ERROR })
      showAlert("danger", error.response.data.msg)
    }
  }

  const toggleLike = async (id, userId, endPoint) => {
    try {
      await apiFetch.patch(`/posts/${id}/${endPoint}`);
      dispatch({ type: LIKE_POST, payload: { id, userId, endPoint } })
      const msg = endPoint === "like" ? "You liked the post." : "You unliked the post"
      showAlert("success", msg)
    } catch (error) {
      showAlert("danger", error.response.data.msg)
    }
  }

  const getPosts = async () => {
    dispatch({ type: GET_POSTS_BEGIN })
    try {
      const { data } = await apiFetch(`/posts?page=${state.page}`);
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: GET_POSTS_ERROR })
      showAlert("danger", error.response.data.msg)
    }
  }

  const getUserPosts = async (userId) => {
    dispatch({ type: GET_USER_POSTS_BEGIN, payload: { userId } })
    let url = `/posts?author=${userId}&page=${state.userPage}`
    try {
      const { data } = await apiFetch(url);
      dispatch({
        type: GET_USER_POSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: GET_USER_POSTS_ERROR })
      showAlert("danger", error.response.data.msg)
    }
  }

  useEffect(() => {
    const handlePopstate = () => {
      dispatch({ type: SET_INITIAL_STATE });
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const createPost = async (post) => {
    dispatch({ type: CREATE_POST_BEGIN })
    try {
      const { data } = await apiFetch.post('/posts', post);
      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
      showAlert("success", "Post created.")
    } catch (error) {
      dispatch({ type: CREATE_POST_ERROR })
      showAlert("danger", error.response.data.msg)

    }
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  const changeUserPage = (userPage) => {
    dispatch({ type: CHANGE_USER_PAGE, payload: { userPage } })
  }

  const setPostInitials = () => {
    dispatch({ type: SET_INITIAL_STATE })
  }

  return (
    <PostContext.Provider
      value={{
        ...state,
        getPosts,
        createPost,
        changePage,
        changeUserPage,
        toggleLike,
        getUserPosts,
        setPostInitials,
        createComment,
        deleteComment,
        setCommentEditMode,
        resetCommentEditMode,
        editComment
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export {
  PostProvider,
  PostContext,
  initialState
}