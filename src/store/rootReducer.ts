/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from '../views/signIn/slice/signInSlice';
import configReducer from '../views/config/slice/configSlice';

const rootReducer = combineReducers({
  signInReducer,
  configReducer,
});

export default rootReducer;
