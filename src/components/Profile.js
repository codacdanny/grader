import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHandler } from '../context/StateHandler';
import Year from './Year';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { items, addItem } = useHandler();
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem('login');
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box as="main" mx="auto" textColor="white">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="1rem"
        bgColor="#6c63ff"
      >
        <Heading as="h1">The Grader</Heading>
        <Button
          onClick={handleLogout}
          bgColor="blackAlpha.900"
          px="1.5rem"
          py="1.9rem"
          fontSize="1.5rem"
        >
          Log Out
        </Button>
      </Flex>

      <Box my="2rem" textAlign="center">
        <Text fontSize="1.6rem" mb=".5rem">
          Hello welcome {user && user.email}
        </Text>
        <Heading as="h3">Current CGPA: 0.00 </Heading>
      </Box>
      <Box
        as="section"
        mx="auto"
        display="flex"
        maxWidth="800px"
        // p="3rem"
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {items.map(item => (
          <Year item={item} key={item.id} />
        ))}

        <Button
          p="2rem"
          fontSize="1.9rem"
          borderRadius="1rem"
          textColor="black"
          // newItem={newItem}
          // setNewItem={setNewItem}
          onClick={addItem}
        >
          Add year
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
