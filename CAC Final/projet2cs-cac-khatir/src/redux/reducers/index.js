import { combineReducers } from "redux";
import operationsReducer from "./operations";
import patientReducer from "./patients"
import productReducer from "./products"
import employeeReducer from "./employee";
import chirugienReducer from "./chirugien";
import anesthesistesReducer from "./anesthesistes"
import coordinateursReducer from "./coordinateur"
import sallesReducer from "./salle"
import authReducer from "./auth" 
import operationarchiveReducer from "./archive"
import statReducer from "./stat";
export const reducers = combineReducers({
    operationsReducer,
    patientReducer,
    productReducer,
    employeeReducer,
    chirugienReducer,
    anesthesistesReducer,
    coordinateursReducer,
    sallesReducer,
    authReducer,
    operationarchiveReducer,
    statReducer,
})