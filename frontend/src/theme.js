import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E9549',
    },
    secondary: {
      main: '#62BD56',
    },
    error: {
      main: '#C02027',
    },
    background: {
      default: '#112314',
      paper: '#FFFFFF',
    },
    white: {
      main: '#FFFFFF',
    },
    grey: {
      main: '#C3C3C3',
    },
    black: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
