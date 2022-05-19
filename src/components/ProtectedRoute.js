import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Profile from './Profile';

import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  let { user } = useAuth();

  return user ? children : <HomePage />;
};

export default ProtectedRoute;
