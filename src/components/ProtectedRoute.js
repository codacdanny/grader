import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Profile from './Profile';
import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(`user is ${user}`);
  // let [user, setUser] = useState('');
  // console.log(myUser);
  return user ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;
