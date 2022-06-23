import { GET_COORDINATEURS } from "../actionTypes";
  import * as api from "../../api/index.js";
  
  export const getCoordinateurs = () => async (dispatch) => {
    try {
      const { data } = await api.fetchCoordinateurs();
      dispatch({type: GET_COORDINATEURS, data });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };