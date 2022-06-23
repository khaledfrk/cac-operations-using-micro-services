import {
    GET_ANESTHESISTES,
  } from "../actionTypes";
  import * as api from "../../api/index.js";
  
  export const getAnesthesistes = () => async (dispatch) => {
    try {
      const { data } = await api.fetchAnesthesistes();
      dispatch({type: GET_ANESTHESISTES, data });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };