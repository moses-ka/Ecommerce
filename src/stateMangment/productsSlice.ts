import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productInCartType } from '../types';

// Retrieve state from local storage or set an empty array
const stateFromLocalStorage = localStorage.getItem('reduxBasketState');
const initialState: productInCartType[] = stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [];

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<productInCartType>) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        action.payload.quantity = 1;
        state.push(action.payload);
      }
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    },
    PlusItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.find(item => item.id === action.payload);
      if (existingItem && existingItem.quantity>1) { // Check if quantity is greater than 1
        existingItem.quantity -= 1;
      }
    }, //
  }
});

export const { addItem, removeItem, PlusItem,minusItem } = productSlice.actions;
export default productSlice.reducer;
