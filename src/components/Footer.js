import { Box, Flex, Link, Text } from '@chakra-ui/react';

import { DiGithubBadge } from 'react-icons/di';
const Footer = () => {
  return (
    <Box
      fontSize="2rem"
      position="absolute"
      bottom="0%"
      width="100%"
      bgColor="#6c63ff"
    >
      <Link isExternal href="https://github.com/codacdanny/grader">
        <Flex justify="center" alignItems="center">
          <Text> codacdanny</Text>
          <DiGithubBadge />
        </Flex>
      </Link>
    </Box>
  );
};

export default Footer;
