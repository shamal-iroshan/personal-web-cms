/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from '../views/signIn/slice/signInSlice';
import configReducer from '../views/config/slice/configSlice';
import messageReducer from '../views/message/slice/messageSlice';
import portfolioReducer from '../views/portfolio/slice/portfolioSlice';

const rootReducer = combineReducers({
  signInReducer,
  configReducer,
  messageReducer,
  portfolioReducer,
});

export default rootReducer;
