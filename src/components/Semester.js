import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHandler } from '../context/StateHandler';
import Courses from './Courses';
import { TYPES } from '../context/Reducer';
import { useLoader } from '../context/LoaderContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Semester = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const { loader, setLoader } = useLoader();
  const { id } = useParams();
  let semesterId = parseInt(id);
  const [error, setError] = useState('');
  const [save, setSave] = useState(false);

  const { items, dispatch } = useHandler();
  let toast = useToast();
  let semester = items.find(item => item.semesterId === semesterId);
  if (semester === undefined) return navigate('/');

  const handleSave = async () => {
    setSave(true);
    try {
      await setDoc(doc(db, 'details', user.uid), {
        items: JSON.stringify(items),
      });

      toast({
        title: 'Result Saved',
        description: "We've saved your result for you",
        status: 'success',
        duration: 9000,
        isClosable: true,
        containerStyle: {
          color: 'black',
          fontSize: '1.5rem',
        },
      });
    } catch (err) {
      setError(err.message);
    }
    setSave(false);
  };
  function calculateGPA() {
    let totalScore;
    let totalUnits;
    if (semester.result.length === 0) {
      totalScore = 0;
      totalUnits = 0;
    } else {
      totalScore = semester.result
        .map(item => parseInt(item.unit) * parseInt(item.grade))
        .reduce((a, b) => a + b);
      totalUnits = parseInt(
        semester.result?.reduce((a, b) => a + parseInt(b.unit), 0)
      );
    }
    if (totalUnits === 0) return 0;
    return totalScore / totalUnits;
  }

  let gpa = calculateGPA();
  gpa = !gpa ? 0 : gpa;
  function addCourses() {
    dispatch({
      type: TYPES.ADD_COURSE,
      value: {
        semesterId,
      },
    });
  }

  const handleLogout = async () => {
    setError('');
    try {
      await logOut();
      localStorage.removeItem('login');
      await handleSave();
      dispatch({
        type: TYPES.RESET_DATA,
      });
      setLoader(true);
      navigate('/');
    } catch (error) {
      setError(error.message);
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
        <Heading as="h1" mr="1rem">
          The Grader
        </Heading>
        <Flex
          columnGap={{
            base: '1rem',
            lg: '2rem',
          }}
        >
          <Button
            isLoading={save}
            onClick={handleSave}
            bgColor="blackAlpha.900"
            fontSize={{
              base: '1.2rem',
              lg: '1.5rem',
            }}
            px="1.5rem"
            py="1.9rem"
            _active={{
              color: 'black',
              bgColor: 'white',
            }}
            _focus={{
              color: 'black',
              bgColor: 'white',
            }}
            _hover={{
              color: 'black',
              bgColor: 'white',
            }}
          >
            Save
          </Button>

          <Link to="/">
            <Button
              bgColor="blackAlpha.900"
              px="1.5rem"
              py="1.9rem"
              fontSize={{
                base: '1.2rem',
                lg: '1.5rem',
              }}
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
            fontSize={{
              base: '1.2rem',
              lg: '1.5rem',
            }}
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
        {error && (
          <Alert status="error" fontSize="1.4rem" my="1rem">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <Text fontSize="1.6rem" mb=".5rem">
          Hello welcome {user && user.email}
        </Text>
        <Heading as="h3">GPA: {gpa.toFixed(2)} </Heading>
      </Box>
      {loader ? (
        Array.from(Array(4).keys()).map(i => (
          <Skeleton
            mx="auto"
            display="flex"
            maxWidth="600px"
            // p="3rem"
            key={i}
            height="50px"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            my="10px"
          />
        ))
      ) : (
        <Box
          as="section"
          mx="auto"
          display="flex"
          // p="3rem"
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {semester?.result.map(
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
            p={{
              base: '1.4rem',
              lg: '2rem',
            }}
            fontSize={{
              base: '1.2rem',
              lg: '1.9rem',
            }}
            borderRadius="1rem"
            textColor="black"
            onClick={addCourses}
          >
            Add Course
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Semester;
