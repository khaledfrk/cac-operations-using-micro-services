
import * as actionType from "../actionTypes";
const coordinateursReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_COORDINATEURS:
      return action.data;
    default:
      return state;
  }
};

export default coordinateursReducer;