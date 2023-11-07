import  { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Hello from './components/Hello';
ReactDOM.render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/hello" element={<Hello />} />
    </Routes>
  </Router>
  </StrictMode>,
  document.getElementById('root')
);