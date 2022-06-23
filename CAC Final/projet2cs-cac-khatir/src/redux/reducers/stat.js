import * as actionType from "../actionTypes";
const statReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_STAT:
      console.log(action.data);
      return action.data;
    default:
      return state;
  }
};

export default statReducer;
