import {
    USERAUTH_LOGIN_LOADING,
    USERAUTH_LOGIN_ERROR,
    USERAUTH_LOGIN_SUCCESS,
    USERAUTH_LOGOUT,
    ERROR_RESET,
  } from "./userAuth.types";
  
  const initialState = {
    token: "",
    refreshToken: "",
    loading: false,
    error: false,
  };
  
  export const userauthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case USERAUTH_LOGIN_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      case USERAUTH_LOGIN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
      case USERAUTH_LOGIN_SUCCESS: {
        return {
          ...state,
          token: payload.token,
          refreshToken: payload.refreshToken,
          loading: false,
          error: false,
        };
      }
      case USERAUTH_LOGOUT: {
        return {
          ...state,
          token: "",
        };
      }
      case ERROR_RESET: {
        return {
          ...state,
          error: false,
        };
      }
      default: {
        return state;
      }
    }
  };