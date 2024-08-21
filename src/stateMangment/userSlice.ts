// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const reduxUserState = localStorage.getItem('reduxUserState');
const { user_name = '', token = '', logging = false } 
= typeof reduxUserState === 'string' ? JSON.parse(reduxUserState) : {};//this is for checking if the user is logged in or not

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_name: user_name || '',
    token: token || '',
    logging: logging || false, // this is if there is a state will take it or init it empty
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
