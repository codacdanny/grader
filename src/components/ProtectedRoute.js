import React from 'react';
import { useAuth } from '../context/AuthContext';

import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  let { user } = useAuth();

  return user ? children : <HomePage />;
};

export default ProtectedRoute;
