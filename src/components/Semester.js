import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHandler } from '../context/StateHandler';
import Courses from './Courses';
import { TYPES } from '../context/Reducer';

const Semester = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { id } = useParams();
  let semesterId = parseInt(id);

  const { items, dispatch } = useHandler();

  let list = items.find(item => item.semesterId === semesterId);
  function calculateGPA() {
    let totalScore;
    let totalUnits;
    if (list.result.length === 0) {
      totalScore = 0;
      totalUnits = 0;
    } else {
      totalScore = list.result
        .map(item => parseInt(item.unit) * parseInt(item.grade))
        .reduce((a, b) => a + b);
      totalUnits = parseInt(
        list.result?.reduce((a, b) => a + parseInt(b.unit), 0)
      );
    }
    if (totalUnits === 0) return 0;
    return totalScore / totalUnits;
  }
  let gpa = calculateGPA();

  function addCourses() {
    dispatch({
      type: TYPES.ADD_COURSE,
      value: {
        semesterId,
      },
    });
  }
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

      <Box my="2rem" textAlign="center">
        <Text fontSize="1.6rem" mb=".5rem">
          Hello welcome {user && user.email}
        </Text>
        <Heading as="h3">GPA: {gpa.toFixed(2)} </Heading>
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
        {list?.result.map(
          (
            item // i changed this line
          ) => (
            <Courses
              key={item.courseId}
              courseId={item.courseId}
              grade={item.grade}
              unit={item.unit}
              courseName={item.courseName}
              semesterId={semesterId}
            />
          )
        )}

        <Button
          p="2rem"
          fontSize="1.9rem"
          borderRadius="1rem"
          textColor="black"
          onClick={addCourses}
        >
          Add Course
        </Button>
      </Box>
    </Box>
  );
};

export default Semester;
