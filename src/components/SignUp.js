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
import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
const SignUp = () => {
  const [loading, setloading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { signup } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setloading(true);

    if (passwordConfirm === password) {
      try {
        await signup(email, password);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('passwords do not match');
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
        display="flex"
        className="card"
        p="3rem"
        height="100%"
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
          Sign Up
        </Heading>
        {error && (
          <Alert status="error" fontSize="1.4rem" my="1rem">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <FormControl my="2rem" w="100%" onSubmit={handleSubmit}>
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

          <FormLabel
            htmlFor="password"
            fontSize="1.7rem"
            my=".7rem"
            ml="2rem"
            color="white"
          >
            Password:
          </FormLabel>
          <Input
            isRequired={true}
            onChange={e => setPassword(e.target.value)}
            id="password"
            type="password"
            // ref={passwordref}
            placeholder="*******"
            padding="2rem"
            w="100%"
            fontSize="1.6rem"
            borderRadius="10rem"
            color="white"
          />

          <FormLabel
            htmlFor="password-confirm"
            fontSize="1.7rem"
            my=".7rem"
            ml="2rem"
            color="white"
          >
            Confirm Password:
          </FormLabel>
          <Input
            isRequired={true}
            onChange={e => setPasswordConfirm(e.target.value)}
            id="password-confirm"
            type="password"
            // ref={password_confirm_ref}
            placeholder="*******"
            padding="2rem"
            fontSize="1.6rem"
            borderRadius="10rem"
            w="100%"
            color="white"
          />

          <Box mt="3rem" fontSize="1.6rem" textAlign="center" minWidth="100%">
            <Button
              isDisabled={loading}
              onClick={handleSubmit}
              type="submit"
              fontSize="1.6rem"
              px="1.7rem"
              py="1.8rem"
              bgColor="whiteAlpha.900"
              _hover={{
                bgColor: 'whiteAlpha.800',
              }}
              textColor="black"
              w="100%"
            >
              SignUp
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
              <Link to="/">Login</Link>
            </Box>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
