import  { StrictMode } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';

import Login from './components/Login';
import SignUp from './components/SignUp';
import { createRoot } from 'react-dom/client';
import store from './stateMangment/store'
import { Provider } from 'react-redux';
import Product from './components/ProductDetails';
import Cart from './components/cart';
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  
<Provider store={store}>
   <StrictMode>
    <Router>
      <Routes>
       <Route path="/" element={<App />} />
      
       <Route path="/login" element={<Login/>} />
       <Route path='/signup' element={<SignUp/>} /> 
       <Route path='product/:id' element={<Product/>} />
       <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  </StrictMode>
</Provider>
  
);