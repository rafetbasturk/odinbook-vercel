/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { authReducer } from "./reducer";
import apiFetch from "../../config/axiosConfig";
import useAlert from "../../hooks/useAlertContext";

import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_INITIAL_STATE
} from "./actions";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { showAlert } = useAlert();

  const login = async (user, endPoint) => {
    dispatch({ type: LOGIN_BEGIN })
    try {
      const url = `/auth/${endPoint}`
      await apiFetch.post(url, user)
      dispatch({ type: LOGIN_SUCCESS, payload: { endPoint } })
      const text = endPoint === "login" ? "Login Successful." : "User Created! Redirecting..."
      showAlert("success", text)
    } catch (error) {
      dispatch({ type: LOGIN_ERROR })
      showAlert("danger", error.response.data.msg)
    }
  };

  const setAuthInitials = () => {
    dispatch({ type: SET_INITIAL_STATE });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        setAuthInitials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthProvider,
  AuthContext,
  initialState
}