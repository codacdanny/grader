import React from 'react';
import { useAuth } from '../context/AuthContext';

import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  let { user } = useAuth();

  return user || localStorage.getItem('login') === 'true' ? (
    children
  ) : (
    <HomePage />
  ); // here we are checking if user is logged in
};

export default ProtectedRoute;
