import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authenticationReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;