import { combineReducers } from "redux";
import authReducer from "./authSlice";
import mazdoorReducer from "./mazdoorSlice";
import employerReducer from "./employerSlice";
import contractorReducer from './contractorSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  mazdoor: mazdoorReducer,
  employer: employerReducer,
  contractor: contractorReducer,
});

export default rootReducer;
