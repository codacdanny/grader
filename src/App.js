import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import UserAuthProvider from './context/AuthContext';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import Semester from './components/Semester';
//import HomePage from './components/HomePage';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserAuthProvider>
        <Box mx="auto" overflowX="hidden">
          <Box>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* <Route path="/home" element={<HomePage />} /> */}

              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/semester" element={<Semester />} />
            </Routes>
          </Box>
        </Box>
      </UserAuthProvider>
    </ChakraProvider>
  );
}

export default App;
