import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#080808',
        color: 'white',
      },
    },
  },
  breakpoints: {
    small: '250px',
    md: '320px',
    big: '375px',
    bigger: '425px',
    sm: '480px',
    lg: '768px',
    mini: '1000px',
    xl: '1440px',
    '2xl': '2560px',
  },
});
export default theme;
