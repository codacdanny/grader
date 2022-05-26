import { extendTheme } from '@chakra-ui/react';
//  const customTheme = extendTheme(
//   withDefaultColorScheme({
//     colorScheme: 'red',
//     components: ['Select'],
//   })
// );

// theme.js
// import { extendTheme } from '@chakra-ui/react'

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#080808',
        color: 'white',
      },
      // styles for the `a`
    },
  },
});
export default theme;
