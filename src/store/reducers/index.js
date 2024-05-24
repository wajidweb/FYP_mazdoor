import { combineReducers } from "redux";
import authReducer from "./authSlice";
import mazdoorReducer from "./mazdoorSlice";
import employerReducer from "./employerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  mazdoor: mazdoorReducer,
  employer: employerReducer,
});

export default rootReducer;
