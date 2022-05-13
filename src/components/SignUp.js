import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Container,
  Heading,
  Box,
  Button,
  Text,
  Link,
} from '@chakra-ui/react';

import React, { useRef } from 'react';

const SignUp = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const password_confirm_ref = useRef();
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      minW="100vw"
    >
      <Container
        display="flex"
        className="card"
        p="3rem"
        height="90%"
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          as="h1"
          fontSize="3rem"
          textColor="#C05621"
          textTransform="uppercase"
          mt="-4rem"
        >
          Sign Up
        </Heading>
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
            id="email"
            type="email"
            ref={emailref}
            placeholder="name@mail.com"
            padding="2rem"
            fontSize="1.6rem"
            borderRadius="10rem"
            w="100%"
          />
        </FormControl>

        <FormControl w="100%">
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
            id="password"
            type="password"
            ref={passwordref}
            placeholder="*******"
            padding="2rem"
            w="100%"
            fontSize="1.6rem"
            borderRadius="10rem"
            color="white"
          />
        </FormControl>
        <FormControl my="2rem" w="100%">
          <FormLabel
            htmlFor="password-confirm"
            fontSize="1.7rem"
            my=".7rem"
            ml="2rem"
            color="white"
          >
            Confirm Password
          </FormLabel>
          <Input
            id="password=confirm"
            type="password"
            ref={password_confirm_ref}
            placeholder="*******"
            padding="2rem"
            fontSize="1.6rem"
            borderRadius="10rem"
            w="100%"
          />
        </FormControl>
        <Box mt="2rem" fontSize="1.6rem" textAlign="center" minWidth="100%">
          <Button
            type="submit"
            fontSize="1.6rem"
            px="1.7rem"
            py="1.8rem"
            bgColor="orange.600"
            _hover={{
              bgColor: 'orange.400',
            }}
          >
            Login
          </Button>
          <Box mt="2rem">
            <Text>
              Already have an account?{' '}
              <Link to="/Login" color="#C05621">
                Login
              </Link>
            </Text>
            <Text>
              Forgot password?{' '}
              <Link to="/Reset" color="#C05621">
                Reset Password
              </Link>
            </Text>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
};

export default SignUp;
