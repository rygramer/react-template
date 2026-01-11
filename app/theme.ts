import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const customTheme = createTheme({
  typography: {
    fontFamily: ['"Libre Baskerville"', 'serif'].join(','),
    body1: {
      fontFamily: ['"Source Sans 3"', 'sans-serif'].join(','),
    },
  },
  palette: {
    primary: {
      main: '#660033'
    },
    secondary: {
      main: '#E673AC'
    },
    background: {
      default: grey[50]
    }
  }
});
