import { Box, Button, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logOut } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box as="main">
      <Text>
        Hello welcome {user && user.email} <Spacer />
      </Text>

      <Button onClick={handleLogout}>Log Out</Button>
    </Box>
  );
};

export default Profile;
