import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  console.log('navigated');
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/home');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box as="main">
      <Text>Hello welcome {user && user.email}</Text>

      <Button onClick={handleLogout}>Log Out</Button>
    </Box>
  );
};

export default Profile;
