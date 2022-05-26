import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiDeleteBin2Fill } from 'react-icons/ri';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  console.log('navigated');
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

      <Box mt="2rem" textAlign="center">
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
        height="50vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          bgColor="#6c63ff"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="70%"
          p="1.5rem"
          mb="3rem"
          borderRadius="1rem"
        >
          <Input
            type="text"
            placeholder="First year"
            variant="flushed"
            p="2rem"
            fontSize="1.9rem"
            borderRadius="1rem"
            textColor="white"
            width="30%"
            _placeholder={{
              opacity: '0.6',
              color: 'white',
              fontWeight: '300',
            }}
          />

          <Flex columnGap=".7rem" alignItems="center">
            <Link to="/semester">
              <Button
                p="2rem"
                fontSize="1.9rem"
                borderRadius="1rem"
                textColor="black"
              >
                Open
              </Button>
            </Link>
            <Button
              fontSize="2.5rem"
              py="2rem"
              color="red.400"
              borderRadius="1rem"
            >
              <RiDeleteBin2Fill />
            </Button>
          </Flex>
        </Box>
        <Button
          p="2rem"
          fontSize="1.9rem"
          borderRadius="1rem"
          textColor="black"
        >
          Add year
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
