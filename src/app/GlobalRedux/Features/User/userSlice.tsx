'use client';

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    firstName: '',
    lastName: '',
  },
  reducers: {
    SET_FIRST_NAME: (state, action) => {
      state.firstName = action.payload;
    },
    SET_LAST_NAME: (state, action) => {
      state.lastName = action.payload;
    },
    SET_USER_ID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { SET_FIRST_NAME, SET_LAST_NAME, SET_USER_ID } = userSlice.actions;
export default userSlice.reducer;
