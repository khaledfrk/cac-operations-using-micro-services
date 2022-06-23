import {
    GET_OPERATIONS,
    CREATE_OPERATION,
    // DELETE_OPERATION,
    UPDATE_OPERATION,
    CREATE_DETAIL_OPERATION,
    GET_OPERATIONS_BY_USER,
    GET_OPERATION,
    CREATE_DETAIL_OPERATION_ANEST,
    CREATE_DETAIL_OPERATION_COOR,
  } from "../actionTypes";
  import * as api from "../../api/index.js";
  
  export const getOperations = () => async (dispatch) => {
    try {
      const { data } = await api.fetchOperations();
      dispatch({ type: GET_OPERATIONS, data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getOperationById = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchOperationsById(id);
      dispatch({ type: GET_OPERATION, data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createOperation = (formData) => async (dispatch) => {
    try {
      console.log(formData);
      const {data} = await api.creatOperation(formData);
      // data={...data,id:data.idOperation};
      // console.log(data);
      dispatch({ type: CREATE_OPERATION,data});
    } catch (error) {
      console.log(error);
    }
  };

  export const createDetailOperation = (formData,path) => async (dispatch) => {
    try {
      console.log(formData);
      const {data} = await api.createDetailOperations(formData,path);
      dispatch({type: CREATE_DETAIL_OPERATION,data});
    } catch (error) {
      console.log(error);
    }
  };
  export const getOperationsByUserName = (username) => async (dispatch) => {
    try {
      console.log(username);
      const {data} = await api.getOperationsByUserNames(username);
      console.log(data);
      dispatch({type: GET_OPERATIONS_BY_USER,data});
    } catch (error) {
      console.log(error);
    }
  };

  export const createDetailOperationAnesth = (formData,path) => async (dispatch) => {
    try {
      console.log(formData);
      const {data} = await api.createDetailOperationAnesths(formData,path);
      dispatch({type: CREATE_DETAIL_OPERATION_ANEST,data});
    } catch (error) {
      console.log(error);
  }};
  export const createDetailOperationCoor = (formData,path) => async (dispatch) => {
    try {
      console.log(formData);
      const {data} = await api.createDetailOperationCoors(formData,path);
      dispatch({type: CREATE_DETAIL_OPERATION_COOR,data});
    } catch (error) {
      console.log(error);
  }};
  export const createDetailOperationCoordinateur = (formData,path) => async (dispatch) => {
    try {
      console.log(formData);
      const {data} = await api.createDetailOperationCoordinateurform2(formData,path);
      dispatch({type: CREATE_DETAIL_OPERATION_COOR,data});
    } catch (error) {
      console.log(error);
  }};



  
  
  export const updateOperation = (appointmentData) => async (dispatch) => {
    try {
    //   const { data } = await api.updateOperation(appointmentData);
      dispatch({
        type: UPDATE_OPERATION,
        // id: data.zakazaniPregledId,
        // data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteOperation = (formData) => async (dispatch) => {
    try {
    //   const { data } = await api.deleteOperation(formData);
    //   dispatch({ type: DELETE_OPERATION, data });
    } catch (error) {
      console.log(error);
    }
  };
  