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
    editItem: (state, action: PayloadAction<productInCartType>) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    }
  }
});

export const { addItem, removeItem, editItem } = productSlice.actions;
export default productSlice.reducer;
