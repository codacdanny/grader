import React from 'react';
import { ChakraProvider, VStack, theme, Container } from '@chakra-ui/react';
// import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack spacing={8} overflowX="hidden">
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxW="80rem"
        >
          {/* <Login /> */}
          <SignUp />
        </Container>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
