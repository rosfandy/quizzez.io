import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
  </React.StrictMode>,
)
