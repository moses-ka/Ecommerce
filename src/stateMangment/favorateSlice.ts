import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productInCartType } from '../types';

const stateFromLocalStorage = localStorage.getItem('reduxFavorateState');
const initialState: productInCartType[] = stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [];

export const favorateSlice = createSlice({
  name: 'favorate',
  initialState,
  reducers: {
    addFavorate: (state, action: PayloadAction<productInCartType>) => {
      if (state.find(item => item.id === action.payload.id)) {
        return state;
      }else{
        
        state.push(action.payload);
        localStorage.setItem('reduxFavorateState', JSON.stringify(state));
        return state;
      }
    },
    removeFavorate: (state, action: PayloadAction<productInCartType>) => {

      state.splice(state.findIndex(item => item.id === action.payload.id), 1);
      

      localStorage.setItem('reduxFavorateState', JSON.stringify(state));
    },
  }
});
export const { addFavorate, removeFavorate } = favorateSlice.actions;
export default favorateSlice.reducer;