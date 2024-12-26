import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import { getAuthToken } from './helper/helper';
import Profile from './pages/userProfile/Profile';
import Cart from './components/Cart';
import AdminPanel from './admin/AdminPanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

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
           <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Navbar /> 
                <Cart/>
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
    </div>
  );
}

export default App;
