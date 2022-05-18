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
  ButtonGroup,
} from '@chakra-ui/react';
import { DiGithubBadge } from 'react-icons/di';
import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
// import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  // const emailref = useRef();
  // const passwordref = useRef();

  const [loading, setloading] = useState(false);
  //   const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, googleSignIn, gitHubSignIn } = useAuth();

  const handleGoogleSignin = async e => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGitHubSignin = async e => {
    e.preventDefault();
    try {
      await gitHubSignIn();
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setloading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
    setloading(false);
  }

  return (
    <Flex
      as="main"
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
          Log in
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
              Login
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
          <ButtonGroup my="1rem" display="flex" flexDir="column">
            <Button
              isDisabled={loading}
              onClick={handleGitHubSignin}
              fontSize="1.6rem"
              mb="2rem"
              px="1.7rem"
              py="1.8rem"
              bgColor="whiteAlpha.900"
              _hover={{
                bgColor: 'whiteAlpha.700',
              }}
              textColor="black"
            >
              <DiGithubBadge /> Signin with Github
            </Button>

            <Button
              isDisabled={loading}
              onClick={handleGoogleSignin}
              fontSize="1.6rem"
              mx="0rem"
              mb="2rem"
              px="1.7rem"
              py="1.8rem"
              bgColor="whiteAlpha.900"
              _hover={{
                bgColor: 'whiteAlpha.800',
              }}
              textColor="black"
            >
              Sign in with Goggle
            </Button>
          </ButtonGroup>

          <Text mb="1rem">
            Don't have an account?{' '}
            <Box as="span" textDecor="underline">
              <Link to="/signup">Sign Up</Link>
            </Box>
          </Text>
          <Text>
            Forgot password?{' '}
            <Box as="span" textDecor="underline">
              <Link to="/Reset">Reset Password</Link>
            </Box>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
