import * as actionType from "../actionTypes";
const chirugienReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_CHIRUGIENS:
      return action.data;
    case actionType.GET_CHIRUGIEN:
      // console.log(action.data);
      return action.data;
    case actionType.CREATE_CHIRUGIEN:
      // console.log(state);
      // console.log(action.data);
    
      return [...state, action.data];
      
    case actionType.UPDATE_CHIRUGIEN:
      console.log(action.data);
      return state.map((doc) =>
        doc.productId !== action.data.productId ? doc : action.data
      );
    case actionType.DELETE_CHIRUGIEN:
      // console.log(action.productId);
      // console.log(state);
      const aa=state.filter((p) =>
        p.productId !== action.productId ? p : null,
      );
      return [...aa];
    default:
      return state;
  }
};

export default chirugienReducer;