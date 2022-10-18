import axios from "axios";
import {
  USERAUTH_LOGIN_LOADING,
  USERAUTH_LOGIN_ERROR,
  USERAUTH_LOGIN_SUCCESS,
  USERAUTH_LOGOUT,
} from "./userAuth.types";

export const loginUser = (creds) => async (dispatch) => {
  dispatch({ type: USERAUTH_LOGIN_LOADING });

  try {
    let res = await axios.post("http://localhost:8080/login", creds);
    dispatch({
      type: USERAUTH_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: USERAUTH_LOGIN_ERROR });
  }
};

export const logoutUser = () => ({ type: USERAUTH_LOGOUT });