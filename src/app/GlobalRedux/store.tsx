'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './Features/Login/loginSlice';
import userReducer from './Features/User/userSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
