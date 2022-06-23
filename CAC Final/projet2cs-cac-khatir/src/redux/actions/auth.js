import { LOGIN, LOGOUT } from "../actionTypes";
import * as api from "../../api/index.js";
import jwt from "jwt-decode";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    console.log(data);
    const user = jwt(data.token);
    console.log(user);
    // const roles = user.sub;
    // console.log(roles);
    localStorage.setItem("token", data.token);
    localStorage.setItem("loggedUser", JSON.stringify(user));
    
    dispatch({type: LOGIN, payload: user });
    if (user.isAdmin) navigate("/admin");
    else if (user.isChirurgien) navigate("/doctor");
    else if (user.isAnesthesiste) navigate("/anesth");
    else if (user.isCoordinateur) navigate("/coordinateur");
    else if (user.isInstrumentiste) navigate("/instrument");
    else if (user.isInfermier) navigate("/inferier");
    // else navigate("/coordinator");
  } catch (error) {
    console.log(error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};


