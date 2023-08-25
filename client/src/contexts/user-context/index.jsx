import { createContext, useEffect, useReducer } from "react";
import { userReducer } from "./reducer";
import useAuthContext from "../../hooks/useAuthContext";
import apiFetch from "../../config/axiosConfig";

import {
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_SEARCH,
  SET_INITIAL_STATE,
  FRIEND_REQUESTS_BEGIN,
  FRIEND_REQUESTS_SUCCESS,
  FRIEND_REQUESTS_ERROR,
  UPLOAD_BEGIN,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR
} from "./actions";

const UserContext = createContext()

const initialState = {
  isLoading: false,
  userLoading: false,
  currentUser: null,
  users: [],
  search: "",
  user: null,
  mutualFriends: 0
}

const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN })
    try {
      const { data } = await apiFetch('/users/getCurrentUser');
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CURRENT_USER_ERROR,
      })
      if (error.response.status === 401) return
      dispatch({ type: SET_INITIAL_STATE })
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [isAuthenticated])

  const sendFriendRequest = async (id) => {
    try {
      await apiFetch.post(`users/${id}/friend-request`)
      return { ok: true }
    } catch (error) {
      return { ok: false }
    }
  }

  const acceptFriendRequest = async (id) => {
    dispatch({ type: FRIEND_REQUESTS_BEGIN })
    try {
      const { data } = await apiFetch.put(`users/${id}/accept`)
      dispatch({ type: FRIEND_REQUESTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FRIEND_REQUESTS_ERROR })
    }
  }

  const rejectFriendRequest = async (id) => {
    dispatch({ type: FRIEND_REQUESTS_BEGIN })
    try {
      const { data } = await apiFetch.put(`users/${id}/reject`)
      dispatch({ type: FRIEND_REQUESTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FRIEND_REQUESTS_ERROR })
      return
    }
  }

  const getUsers = async () => {
    const { search } = state
    let url = `/users`
    if (search) url = `${url}?search=${search}`
    dispatch({ type: GET_USERS_BEGIN })
    try {
      const { data } = await apiFetch(url);
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USERS_ERROR })
    }
  }

  const getUser = async (id) => {
    dispatch({ type: GET_USER_BEGIN })
    try {
      const { data } = await apiFetch(`/users/${id}`);
      const { data: mutuals } = await apiFetch(`users/${id}/mutual-friends`)
      dispatch({ type: GET_USER_SUCCESS, payload: { ...data, ...mutuals } });
    } catch (error) {
      dispatch({ type: GET_USER_ERROR })
    }
  }

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH })
  }

  const setUserInitials = () => {
    dispatch({ type: SET_INITIAL_STATE })
  }

  const uploadImage = async (formData) => {
    dispatch({ type: UPLOAD_BEGIN })
    try {
      const { data: { imageUrl } } = await apiFetch.post(`users/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        })
      const { data } = await apiFetch.patch(`users/${state.currentUser._id}`, { image: imageUrl });

      dispatch({ type: UPLOAD_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: UPLOAD_ERROR })
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleChange,
        clearSearch,
        getUsers,
        getUser,
        setUserInitials,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        uploadImage
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export {
  UserProvider,
  UserContext,
  initialState
}