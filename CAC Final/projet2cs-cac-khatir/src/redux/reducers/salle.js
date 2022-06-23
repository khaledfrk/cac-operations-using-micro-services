import * as actionType from "../actionTypes";
const sallesReducer = (state = [], action) => {
    switch (action.type) {
      case actionType.GET_SALLES:
        return action.data;
      default:
        return state;
    }
  };
  
  export default sallesReducer;