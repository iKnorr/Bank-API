'use client';

import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    token: localStorage.getItem('token') || sessionStorage.getItem('token'),
  },
  reducers: {
    SET_EMAIL: (state, action) => {
      state.email = action.payload;
    },
    SET_PASSWORD: (state, action) => {
      state.password = action.payload;
    },
    SET_TOKEN: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { SET_EMAIL, SET_PASSWORD, SET_TOKEN } = loginSlice.actions;
export default loginSlice.reducer;
