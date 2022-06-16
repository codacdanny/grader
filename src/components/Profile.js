import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TYPES } from '../context/Reducer';
import { useHandler } from '../context/StateHandler';
import Year from './Year';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { items, dispatch } = useHandler();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem('login');
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  // const init = [
  //   {
  //     semesterId: 1,
  //     semesterName: 'Semester 1',
  //     result: [{ courseId: 1, courseName: `Course 1`, grade: 5, unit: 0 }],
  //   },
  // ];

  function calculateCGPA() {
    let totalGPA;
    let calcCGPA;
    let totalUnit;
    console.log(items.length);
    let cgpaObject = items
      .map(item =>
        item.result.reduce(
          (a, b) => {
            totalGPA = a.totalGPA + b.grade * b.unit;
            totalUnit = a.totalUnit + b.unit;
            return { totalGPA, totalUnit };
          },
          { totalUnit: 0, totalGPA: 0 }
        )
      )
      .map(item => {
        if (item.totalUnit === 0) return null;
        return item.totalGPA / item.totalUnit;
      });
    calcCGPA =
      cgpaObject.reduce((a, b) => a + b, 0) /
      cgpaObject.filter(x => x !== null).length;

    return calcCGPA;
  }
  let cgpa = calculateCGPA();
  const addSemester = () => {
    dispatch({
      type: TYPES.ADD_SEMESTER,
    });
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
        <Heading as="h3">GPA: {cgpa.toFixed(2)} </Heading>
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
          <Year
            key={item.semesterId}
            semesterName={item.semesterName}
            semesterId={item.semesterId}
          />
        ))}

        <Button
          p="2rem"
          fontSize="1.9rem"
          borderRadius="1rem"
          textColor="black"
          // newItem={newItem}
          // setNewItem={setNewItem}
          onClick={addSemester}
        >
          Add Semester
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
