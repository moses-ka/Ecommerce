import  productSlice from './productsSlice'
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    products: productSlice,
  },
});

export default store;
