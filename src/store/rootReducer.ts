/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from '../views/signIn/slice/signInSlice';
import configReducer from '../views/config/slice/configSlice';
import messageReducer from '../views/message/slice/messageSlice';

const rootReducer = combineReducers({
  signInReducer,
  configReducer,
  messageReducer,
});

export default rootReducer;
