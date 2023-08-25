import { initialState } from "./";
import {
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
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

export const userReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_BEGIN:
      return {
        ...state,
        userLoading: true,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        userLoading: false,
        currentUser: action.payload.user
      };
    case UPLOAD_ERROR:
      return {
        ...state,
        userLoading: false,
      };
    case FRIEND_REQUESTS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload.receiver,
        user: action.payload.sender
      };
    case FRIEND_REQUESTS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case GET_CURRENT_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        userLoading: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userLoading: false,
        currentUser: action.payload.user
      };
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userLoading: false,
      };
    case SET_INITIAL_STATE:
      return initialState
    case CLEAR_SEARCH:
      return {
        ...state,
        search: "",
        users: []
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case GET_USERS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case GET_USER_BEGIN:
      return {
        ...state,
        user: null,
        userLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
        mutualFriends: action.payload.mutualFriends.length
      };
    case GET_USER_ERROR:
      return {
        ...state,
        user: null,
        userLoading: false,
      };
    default:
      throw new Error(`No action matching ${action.type}`)
  }
}