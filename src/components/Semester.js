import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHandler } from '../context/StateHandler';
import Courses from './Courses';

const Semester = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { courses, addCourse } = useHandler();

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
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {courses.map(course => (
          <Courses course={course} key={course.id} />
        ))}

        <Button
          p="2rem"
          fontSize="1.9rem"
          borderRadius="1rem"
          textColor="black"
          onClick={() => addCourse(courses.id)}
        >
          Add Course
        </Button>
      </Box>
    </Box>
  );
};

export default Semester;
