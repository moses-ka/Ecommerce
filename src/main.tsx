import  { StrictMode } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Hello from './components/Hello';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { createRoot } from 'react-dom/client';
import store from './stateMangment/store'
import { Provider } from 'react-redux';
import Product from './components/ProductDetails';
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  
<Provider store={store}>
   <StrictMode>
    <Router>
      <Routes>
       <Route path="/" element={<App />} />
       <Route path="/hello" element={<Hello />} />
       <Route path="/login" element={<Login/>} />
       <Route path='/signup' element={<SignUp/>} /> 
       <Route path='product/:id' element={<Product/>} />
      </Routes>
    </Router>
  </StrictMode>
</Provider>
  
);