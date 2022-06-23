import React from 'react';
import { useAuth } from '../context/AuthContext';

import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  let { user } = useAuth();
  // || localStorage.getItem('login') === 'true'
  return user ? children : <HomePage />; // here we are checking if user is logged in
};

export default ProtectedRoute;
