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
import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { DiGithubBadge } from 'react-icons/di';

import { useAuth } from '../context/AuthContext';
const SignUp = () => {
  const [loading, setloading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { signup, googleSignIn, gitHubSignIn } = useAuth();

  const handleGoogleSignin = async e => {
    e.preventDefault();
    setError('');
    setloading(true);
    try {
      await googleSignIn();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setloading(false);
  };

  const handleGitHubSignin = async e => {
    e.preventDefault();
    setError('');
    setloading(true);
    try {
      await gitHubSignIn();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setloading(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setloading(true);

    if (passwordConfirm === password) {
      try {
        await signup(email, password);
        navigate('/');
      } catch (error) {
        setError(error.message);
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
        mx="auto"
        display="flex"
        className="card"
        p="3rem"
        height="100%"
        w={{
          base: '90%',
          lg: '60%',
          mini: '45%',
        }}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          as="h1"
          fontSize={{
            base: '2rem',
            lg: '3rem',
          }}
          textColor="white"
          textTransform="uppercase"
          mt=".7rem"
        >
          Sign Up
        </Heading>
        {error && (
          <Alert
            status="error"
            fontSize="1.4rem"
            my="1rem"
            color="black"
            py="1rem"
          >
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <FormControl my="2rem" w="100%" onSubmit={handleSubmit}>
          <FormLabel
            htmlFor="email"
            fontSize={{
              base: '1.5rem',
              lg: '1.7rem',
            }}
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
            placeholder="name@email.com"
            padding={{
              base: '1.5rem',
              lg: '2rem',
            }}
            fontSize="1.6rem"
            borderRadius="10rem"
            w="100%"
            color="white"
          />

          <FormLabel
            htmlFor="password"
            fontSize={{
              base: '1.5rem',
              lg: '1.7rem',
            }}
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
            padding={{
              base: '1.5rem',
              lg: '2rem',
            }}
            w="100%"
            fontSize="1.6rem"
            borderRadius="10rem"
            color="white"
          />

          <FormLabel
            htmlFor="password-confirm"
            fontSize={{
              base: '1.5rem',
              lg: '1.7rem',
            }}
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
            padding={{
              base: '1.5rem',
              lg: '2rem',
            }}
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
              w="50%"
            >
              SignUp
            </Button>
          </Box>
        </FormControl>

        <Box mt="2rem" color="white" fontSize="1.6rem" textAlign="center">
          <ButtonGroup
            my="1rem"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
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
              w="100%"
            >
              <DiGithubBadge /> Sign in with Github
            </Button>

            <Button
              isDisabled={loading}
              onClick={handleGoogleSignin}
              fontSize="1.6rem"
              mx="0rem"
              marginInlineStart="0rem"
              mb="2rem"
              px="1.7rem"
              py="1.8rem"
              bgColor="whiteAlpha.900"
              _hover={{
                bgColor: 'whiteAlpha.800',
              }}
              textColor="black"
              w="100%"
            >
              Sign in with Google
            </Button>
          </ButtonGroup>

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

export default SignUp;
