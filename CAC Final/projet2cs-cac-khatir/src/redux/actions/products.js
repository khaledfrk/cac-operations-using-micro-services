import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    UPDATE_PRODUCT,
  } from "../actionTypes";
  import * as api from "../../api/index.js";
  
  export const getProducts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchProducts();
      dispatch({ type: GET_PRODUCTS, data });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const getProduct = (productId) => async (dispatch) => {
    try {
      const { data } = await api.fetchProduct(productId);
      // console.log(data);
      dispatch({ type: GET_PRODUCT, data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createProduct = (formData) => async (dispatch) => {
    try {
      const { data } = await api.createProduct(formData);
      dispatch({ type: CREATE_PRODUCT, data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = (formData,productId) => async (dispatch) => {
    try {
      const { data } = await api.updteProduct(formData,productId);
      dispatch({ type: UPDATE_PRODUCT, data });
    } catch (error) {
      console.log(error);
    }
  };
  
  // export const searchEmployees = (searchValue) => async (dispatch) => {
  //   try {
  //   //   const { data } = await api.searchEmployees(searchValue);
  //   //   dispatch({ type: GET_EMPLOYEES, data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  export const deleteProduct = (productId) => async (dispatch) => {
    try {
      await api.deletProduct(productId);
      dispatch({ type: DELETE_PRODUCT, productId});
    } catch (error) {
      console.log(error);
    }
  };
  