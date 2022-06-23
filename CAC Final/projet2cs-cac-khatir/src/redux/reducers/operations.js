import * as actionType from "../actionTypes";
const operationsReducer = (state = [], action) => {
    switch (action.type) {
      case actionType.GET_OPERATIONS:
        console.log(action.data)
        return action.data;
      case actionType.GET_OPERATION:
        console.log(action.data)
        return action.data;
      case actionType.GET_OPERATIONS_BY_USER:
        return action.data;
      case actionType.CREATE_OPERATION:
        return [...state,action.data];
      case actionType.CREATE_DETAIL_OPERATION:
        return state.map((operation) =>
          operation.idOperation === action.data.id ? action.data  : operation
        );
        // console.log(action.data);
        // return [...state,action.data];
      case actionType.CREATE_DETAIL_OPERATION_ANEST:
        // console.log(action.data);
       return state.map((operation) =>
        operation.idOperation === action.data.id ? action.data : operation
        // return [action.data];
      );
      case actionType.CREATE_DETAIL_OPERATION_COOR:
        // console.log(action.data);
       return state.map((operation) =>
        operation.idOperation === action.data.id ? action.data : operation
      );
      case actionType.UPDATE_OPERATION:
        return  console.log(action);
        // return state.map((operation) =>
        //   operation.zakazaniPregledId !== action.id ? operation : action.data
        // );
        
      default:
        return state;
    }
  };
  
  export default operationsReducer;