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
  );
};

export default ProtectedRoute;
