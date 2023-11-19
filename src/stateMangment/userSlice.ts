// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const reduxUserState = localStorage.getItem('reduxUserState');
const { user_name = '', token = '', logging = false } 
= typeof reduxUserState === 'string' ? JSON.parse(reduxUserState) : {};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_name: user_name || '',
    token: token || '',
    logging: logging || false,
  },
  reducers: {
    loggedIn: (state, action) => {
      return { ...state, ...action.payload };
    },
    loggedOut: (state) => {
      state.user_name = '';
      state.token = '';
      state.logging = false;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
