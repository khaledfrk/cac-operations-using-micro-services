import { GET_STAT } from "../actionTypes";
  
  import * as api from "../../api/index.js";
  
  
  export const getStats = () => async (dispatch) => {
    try {
     const { data } = await api.getStatDoc();
      dispatch({type: GET_STAT,data});
    } catch (error) {
      console.log(error);
    }
  };
  