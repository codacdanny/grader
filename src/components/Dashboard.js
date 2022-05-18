import { Box, Flex, Heading, Image, LinkBox, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import svg from '../undraw_calculator_re_alsc.svg';

const Dashboard = () => {
  return (
    <Box mx="auto">
      <Heading as="h1" m="2rem" color="white">
        Grade Calculator
      </Heading>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="90vh"
        p="3rem"
        className="card"
      >
        <Flex justifyContent="center" alignItems="center" gap="8rem">
          <Box>
            <Heading as="h1" fontSize="3rem" mt="1rem" textColor="white">
              Calculate your grades <Spacer />
              Save your grades <Spacer />
              Access them anywhere
            </Heading>
            <LinkBox mt="21rem" fontSize="2.5rem" textAlign="center">
              <Link to="/signup">
                <Box
                  fontWeight="semibold"
                  fontSize="1.6rem"
                  px="1.2rem"
                  py="1.3rem"
                  borderRadius="3rem"
                  bgColor="whiteAlpha.900"
                  _hover={{
                    bgColor: 'whiteAlpha.800',
                  }}
                  textColor="black"
                >
                  Create Account
                </Box>
              </Link>
              <Link to="/login">
                <Box
                  fontWeight="semibold"
                  mt="1rem"
                  fontSize="1.6rem"
                  px="1.2rem"
                  py="1.3rem"
                  borderRadius="3rem"
                  bgColor="whiteAlpha.900"
                  _hover={{
                    bgColor: 'whiteAlpha.800',
                  }}
                  textColor="black"
                >
                  Login
                </Box>
              </Link>
            </LinkBox>
          </Box>
          <Box>
            <Image src={svg} alt="calculator app" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
