
import * as actionType from "../actionTypes";
const anesthesistesReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_ANESTHESISTES:
      return action.data;
    default:
      return state;
  }
};

export default anesthesistesReducer;