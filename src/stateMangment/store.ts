import  productSlice from './productsSlice'
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { favorateSlice } from './favorateSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    products: productSlice,
    favorate: favorateSlice,
  },
});

export default store;
