import { GET_SALLES } from "../actionTypes";
  
  import * as api from "../../api/index.js";
  
  
  export const getSalles = () => async (dispatch) => {
    try {
     const { data } = await api.fetchSalles();
      dispatch({type: GET_SALLES,data});
    } catch (error) {
      console.log(error);
    }
  };