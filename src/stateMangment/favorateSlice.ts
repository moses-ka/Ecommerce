import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productInCartType } from '../types';

const stateFromLocalStorage = localStorage.getItem('reduxFavorateState');
const initialState: productInCartType[] = stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [];

export const favorateSlice = createSlice({
  name: 'favorate',
  initialState,
  reducers: {
    addFavorate: (state, action: PayloadAction<productInCartType>) => {
      state.push(action.payload);
      localStorage.setItem('reduxFavorateState', JSON.stringify(state));
      return state;
    },
    removeFavorate: (state, action: PayloadAction<productInCartType>) => {
      const index = state.findIndex(item => item === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem('reduxFavorateState', JSON.stringify(state));
    },
  }
});