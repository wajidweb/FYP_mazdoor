import { combineReducers } from "redux";
import authReducer from "./authSlice";
import mazdoorReducer from "./mazdoorSlice";
import employerReducer from "./employerSlice";
import contractorReducer from './contractorSlice';
import jobsReducer from './jobSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  mazdoor: mazdoorReducer,
  employer: employerReducer,
  contractor: contractorReducer,
  jobs: jobsReducer,
});

export default rootReducer;
