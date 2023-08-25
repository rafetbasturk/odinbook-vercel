import { initialState } from ".";
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_INITIAL_STATE,
} from "./actions";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_INITIAL_STATE:
      return initialState;
    default:
      throw new Error(`No action matching ${action.type}`);
  }
}