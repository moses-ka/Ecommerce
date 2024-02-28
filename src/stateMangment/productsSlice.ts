import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productType,productInCartType } from '../types';
const stateFromLocalStorage = localStorage.getItem('reduxBasketState');
 stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [] as productInCartType[] // Assuming products is an array of productType


export const productSlice = createSlice({
  name: 'products',
  initialState:stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [] as productInCartType[], // Assuming products is an array of productType,
  reducers: {
    addItem: (state, action: PayloadAction<productInCartType>) => {
      const item = state.products.find( (item: productType) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('reduxBasketState', JSON.stringify(state));
      } else {
        action.payload.quantity = 1;
        state.products.push(action.payload);
        localStorage.setItem('reduxBasketState', JSON.stringify(state));
      }
      // Save updated state to localStorage
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const updatedProducts = state.products.filter( (item: productType) => item.id !== action.payload);
      state.products = updatedProducts;
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    },
    editItem: (state, action: PayloadAction<productInCartType>) => {
      const item = state.products.find( (item: productType) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem('reduxBasketState', JSON.stringify(state));
      }
    }
  }
});

export const { addItem, removeItem, editItem } = productSlice.actions;
export default productSlice.reducer;
