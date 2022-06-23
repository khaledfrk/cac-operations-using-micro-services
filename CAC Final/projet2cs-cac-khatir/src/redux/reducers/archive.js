import * as actionType from "../actionTypes";
const operationarchiveReducer = (state = [], action) => {
    switch (action.type) {
      case actionType.GET_OPERATION_ARCHIVE:
        console.log(action.data)
        return action.data;
      default:
        return state;
    }
  };
  
  export default operationarchiveReducer;