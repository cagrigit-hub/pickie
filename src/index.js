import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import App from './App';
import Login from './Login.jsx';
import Register from "./Register.jsx";

ReactDOM.render(
  <React.StrictMode>  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
