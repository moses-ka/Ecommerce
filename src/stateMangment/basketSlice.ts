// basketSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// const reduxUserState = localStorage.getItem('reduxUserState');
// const { user_name = '', token = '', logging = false } 
// = typeof reduxUserState === 'string' ? JSON.parse(reduxUserState) : {};//this is for checking if the user is logged in or not

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
   
    products: [] ,
    user: '' || false, // this is if there is a state will take it or init it empty
  },
  reducers: {
    loggedIn: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { loggedIn, loggedOut } = basketSlice.actions;
export default basketSlice.reducer;
