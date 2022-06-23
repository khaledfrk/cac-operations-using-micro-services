import * as actionType from "../actionTypes";
const productReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS:
      return action.data;
    case actionType.GET_PRODUCT:
      // console.log(action.data);
      return action.data;
    case actionType.CREATE_PRODUCT:
      // console.log(state);
      // console.log(action.data);
    
      return [...state, action.data];
      
    case actionType.UPDATE_PRODUCT:
      console.log(action.data);
      return state.map((product) =>
        product.productId !== action.data.productId ? product : action.data
      );
    case actionType.DELETE_PRODUCT:
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

export default productReducer;
