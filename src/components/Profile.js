import {
  Box,
  Link,
  Flex,
  Heading,
  Skeleton,
  Text,
  Alert,
  AlertTitle,
  AlertIcon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TYPES } from '../context/Reducer';
import { useHandler } from '../context/StateHandler';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { DiGithubBadge } from 'react-icons/di';
import Year from './Year';
import { useLoader } from '../context/LoaderContext';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { items, dispatch } = useHandler();
  const { loader, setLoader } = useLoader();
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    try {
      await setDoc(doc(db, 'details', user.uid), {
        items: JSON.stringify(items),
      });
    } catch (error) {
      setError(error.message);
    }
  };
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
  function calculateCGPA() {
    let totalGPA;
    let calcCGPA;
    let totalUnit;

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
  cgpa = !cgpa ? 0 : cgpa;
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
        <Link
          display="flex"
          justifyContent="center"
          alignItems="center"
          isExternal
          href="https://github.com/codacdanny/grader"
          fontSize="2.5rem"
          mr="1rem"
        >
          <Heading as="h1" mr=".2rem">
            The Grader
          </Heading>
          <DiGithubBadge />
        </Link>
        <Box>
          <Link
            onClick={handleSave}
            bgColor="blackAlpha.900"
            px="1.5rem"
            py="1.9rem"
            mr={{
              base: '1rem',
              lg: '2rem',
            }}
            fontSize={{
              base: '1.2rem',
              lg: '1.5rem',
            }}
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
          </Link>
          <Link
            onClick={handleLogout}
            bgColor="blackAlpha.900"
            px="1.5rem"
            py="1.9rem"
            fontSize={{
              base: '1.2rem',
              lg: '1.5rem',
            }}
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
            Log Out
          </Link>
        </Box>
      </Flex>
      <Box my="2rem" textAlign="center">
        <Text fontSize="1.6rem" mb=".5rem">
          Hello welcome {user && user.email}
        </Text>
        <Box>
          {error && (
            <Alert status="error" fontSize="1.4rem" my="1rem" color="black">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </Box>
        <Heading as="h3">CGPA: {cgpa.toFixed(2)} </Heading>
      </Box>
      {loader ? (
        Array.from(Array(4).keys()).map(i => (
          <Skeleton
            mx="auto"
            display="flex"
            maxWidth="600px"
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

          <Link
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
            onClick={addSemester}
          >
            Add Semester
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
