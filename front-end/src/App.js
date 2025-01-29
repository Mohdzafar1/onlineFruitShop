import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import { getAuthToken } from './helper/helper';
import Profile from './pages/userProfile/Profile';

import AdminPanel from './admin/AdminPanel';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Route */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Navbar /> {/* Navbar only renders within PrivateRoute */}
                <Home />
              </PrivateRoute>
            }
          />
            <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Navbar /> {/* Navbar only renders within PrivateRoute */}
                <Profile/>
              </PrivateRoute>
            }
          />
         
          
          {/* admin start */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
              
                <AdminPanel/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
