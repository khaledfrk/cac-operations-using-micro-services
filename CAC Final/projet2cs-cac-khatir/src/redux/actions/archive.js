
  import * as api from "../../api/index.js";
import { GET_OPERATION_ARCHIVE } from "../actionTypes.js";

export const getOperationByIdss = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchOperationsById(id);
      dispatch({ type: GET_OPERATION_ARCHIVE, data });
    } catch (error) {
      console.log(error);
    }
  };