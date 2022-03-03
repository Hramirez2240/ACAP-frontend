import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cedula from './components/Cedula';
import Aleatoria from './components/Aleatoria';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route exact path="/" element={<App />} />
        <Route exact path="/cedula" element={<Cedula />} />
        <Route exact path="/aleatoria" element={<Aleatoria />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
