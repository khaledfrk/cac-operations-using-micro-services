import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import operationsReducer from "./reducers/operations";



export const store=createStore(reducers,compose(applyMiddleware(thunk)))