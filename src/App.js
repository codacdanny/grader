import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import UserAuthProvider from './context/AuthContext';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
// import theme from './theme';

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
                path="/home"
                element={
                  <ProtectedRoute>
                    {' '}
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <Dashboard />
                  // <ProtectedRoute>
                  //   {' '}

                  // </ProtectedRoute>
                }
              />
              <Route
                path="/reset"
                element={
                  <ResetPassword />
                  // <ProtectedRoute>
                  //   {' '}
                  // </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </UserAuthProvider>
    </ChakraProvider>
  );
}

export default App;
