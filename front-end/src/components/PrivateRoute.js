import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../helper/helper';

const PrivateRoute = ({ children }) => {
  const token = getAuthToken();
  
  // Redirect to login if no token
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
