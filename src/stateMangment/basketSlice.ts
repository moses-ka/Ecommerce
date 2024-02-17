// basketSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { productType } from '../types';

// const reduxUserState = localStorage.getItem('reduxUserState');
// const { user_name = '', token = '', logging = false } 
// = typeof reduxUserState === 'string' ? JSON.parse(reduxUserState) : {};//this is for checking if the user is logged in or not
const reduxBasketState = localStorage.getItem('reduxBasketState');
export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
   
     products: reduxBasketState ? JSON.parse(reduxBasketState) : [],
    user: '' || false, // this is if there is a state will take it or init it empty
  },
  reducers: {
    addItem: (state, action : PayloadAction<productType>) => {

      state.products.push(action.payload);
      localStorage.setItem('reduxBasketState', JSON.stringify(state.products));
    },
    removeItem: (state, action) => {
     
      state.products = state.products.filter((item: productType) => item.id !== action.payload);
      
    }
  },
});

export const { addItem, removeItem } = basketSlice.actions;
export default basketSlice.reducer;
