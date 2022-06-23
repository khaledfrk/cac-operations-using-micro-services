import {
  DELETE_PATIENT,
  GET_PATIENTS,
} from "../actionTypes";

import * as api from "../../api/index.js";


export const getPatients = () => async (dispatch) => {
  try {
   const { data } = await api.fetchPatients();
    dispatch({type: GET_PATIENTS,data});
  } catch (error) {
    console.log(error);
  }
};

// export const getPatient = (lbp) => async (dispatch) => {
//   try {
    
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const searchPatients = (searchValue) => async (dispatch) => {
//   try {
    
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createPatient = (formData) => async (dispatch) => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePatient = (formData, lbp) => async (dispatch) => {
//   try {
   
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletePatient = (lbp) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PATIENT, lbp });
//   } catch (error) {
//     console.log(error);
//   }
// };
