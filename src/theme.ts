import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    danger: Palette['primary'];
  }

  interface PaletteOptions {
    danger?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4169e1',
    },
    secondary: {
      main: '#ffffff',
    },
    danger: {
      main: '#FC8181',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      lineHeight: '150%',
      letterSpacing: '-0.02em',
    },
  },
});

export default theme;
