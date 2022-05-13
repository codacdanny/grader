import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Container,
  Heading,
  Box,
  Button,
} from '@chakra-ui/react';

import React from 'react';

const Login = () => {
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
        height="70vh"
        w="50rem"
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
          LogIn
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
            placeholder="name@mail.com"
            padding="1.7rem"
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
            placeholder="*******"
            padding="2rem"
            w="100%"
            fontSize="1.6rem"
            borderRadius="10rem"
            color="white"
          />
        </FormControl>
        <Box mt="2rem">
          <Button
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
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
