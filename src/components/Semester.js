import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Semester = () => {
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
        <Flex columnGap="2rem">
          <Link to="/">
            <Button
              bgColor="blackAlpha.900"
              px="1.5rem"
              py="1.9rem"
              fontSize="1.5rem"
              _hover={{
                color: 'black',
                bgColor: 'white',
              }}
              _active={{
                color: 'black',
                bgColor: 'white',
              }}
            >
              Home
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            bgColor="blackAlpha.900"
            px="1.5rem"
            py="1.9rem"
            fontSize="1.5rem"
            _hover={{
              color: 'black',
              bgColor: 'white',
            }}
            _active={{
              color: 'black',
              bgColor: 'white',
            }}
          >
            Log Out
          </Button>
        </Flex>
      </Flex>

      <Box mt="2rem" textAlign="center">
        <Text fontSize="1.6rem" mb=".5rem">
          Hello welcome {user && user.email}
        </Text>
        <Heading as="h3">GPA: 0.00 </Heading>
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
          justifyContent="space-evenly"
          w="70%"
          p="1.5rem"
          mb="3rem"
          borderRadius="1rem"
        >
          <Input
            type="text"
            placeholder="Course"
            variant="flushed"
            p="2rem"
            fontSize="1.9rem"
            borderRadius="1rem"
            textColor="white"
            width="35%"
            _placeholder={{
              opacity: '0.5',
              color: 'white',
              fontWeight: '300',
            }}
          />
          <Select
            placeholder=""
            borderRadius="1rem"
            textColor="black"
            fontWeight="medium"
            textAlign="center"
            width="20%"
            mt="1.7rem"
            p="1rem"
            fontSize="1.9rem"
            variant="flushed"
          >
            <option value="A" bg="green">
              A
            </option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </Select>

          {/* <select>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select> */}

          <Input
            type="number"
            placeholder="unit points"
            variant="flushed"
            p="2rem"
            fontSize="1.9rem"
            borderRadius="1rem"
            textColor="white"
            width="25%"
            _placeholder={{
              opacity: '0.6',
              color: 'white',
              fontWeight: '300',
            }}
          />
          <Button
            fontSize="2.5rem"
            py="2rem"
            color="red.400"
            borderRadius="1rem"
          >
            <RiDeleteBin2Fill />
          </Button>
        </Box>
        <Button
          p="2rem"
          fontSize="1.9rem"
          borderRadius="1rem"
          textColor="black"
        >
          Add Course
        </Button>
      </Box>
    </Box>
  );
};

export default Semester;
