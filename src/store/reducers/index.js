import { combineReducers } from 'redux';
import authReducer  from './authSlice';
import mazdoorReducer from './mazdoorSlice';

const rootReducer = combineReducers({
  auth: authReducer ,
  mazdoor : mazdoorReducer,
});

export default rootReducer;