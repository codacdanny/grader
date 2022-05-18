import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Box,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
  // const emailref = useRef();
  // const passwordref = useRef();

  const [loading, setloading] = useState(false);
  //   const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [display, setDisplay] = useState('');

  const { passwordReset } = useAuth();

  async function handleReset(e) {
    e.preventDefault();
    setloading(true);
    try {
      await passwordReset(email);
      setDisplay('check your email');
    } catch (err) {
      setError(err.message);
    }
    setloading(false);
  }

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Box
        mx="auto"
        display="flex"
        className="card"
        p="3rem"
        height="90%"
        w="40%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          as="h1"
          fontSize="3rem"
          textColor="white"
          textTransform="uppercase"
          mt="-4rem"
        >
          Reset Password
        </Heading>
        {error && (
          <Alert status="error" fontSize="1.4rem" my="1rem">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {display && (
          <Alert status="success" fontSize="1.4rem" my="1rem">
            <AlertIcon />
            <AlertTitle>{display}</AlertTitle>
          </Alert>
        )}
        <FormControl my="2rem" w="100%">
          <FormLabel
            htmlFor="email"
            fontSize="1.7rem"
            my=".7rem"
            ml="2rem"
            color="white"
          >
            Email:
          </FormLabel>

          <Input
            onChange={e => setEmail(e.target.value)}
            isRequired={true}
            id="email"
            type="email"
            // ref={emailref}
            placeholder="name@mail.com"
            padding="2rem"
            fontSize="1.6rem"
            borderRadius="10rem"
            w="100%"
            color="white"
          />

          <Box mt="3rem" fontSize="1.6rem" textAlign="center" minWidth="100%">
            <Button
              isDisabled={loading}
              onClick={handleReset}
              type="submit"
              fontSize="1.6rem"
              px="1.7rem"
              py="1.8rem"
              mt="2rem"
              bgColor="whiteAlpha.900"
              _hover={{
                bgColor: 'whiteAlpha.800',
              }}
              textColor="black"
              w="50%"
            >
              Reset
            </Button>
          </Box>
        </FormControl>

        <Box
          mt="2rem"
          color="white"
          fontSize="1.6rem"
          textAlign="center"
          minWidth="100%"
        >
          <Text>
            Already have an account?{' '}
            <Box as="span" textDecor="underline">
              <Link to="/login">Login</Link>
            </Box>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
