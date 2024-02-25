import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productType } from '../types';
const stateFromLocalStorage = localStorage.getItem('reduxBasketState');
 stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [] as productType[] // Assuming products is an array of productType


export const productSlice = createSlice({
  name: 'products',
  initialState:stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [] as productType[], // Assuming products is an array of productType,
  reducers: {
    addItem: (state, action: PayloadAction<productType>) => {
      state.push(action.payload);
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const updatedProducts = state.filter((item: productType) => item.id !== action.payload);
      state = updatedProducts;
      // Save updated state to localStorage
      localStorage.setItem('reduxBasketState', JSON.stringify(state));
    }
  }
});

export const { addItem, removeItem } = productSlice.actions;
export default productSlice.reducer;
