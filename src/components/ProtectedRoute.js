import React from 'react';
import { useAuth } from '../context/AuthContext';

import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  let { user } = useAuth();
  if (!user) localStorage.removeItem('details');
  return user || localStorage.getItem('login') === 'true' ? (
    children
  ) : (
    <HomePage />
  ); // here we are checking if user is logged in
};

export default ProtectedRoute;
