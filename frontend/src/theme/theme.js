import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c8cff',
      light: '#a8b3ff',
      dark: '#5767e6',
      contrastText: '#f7f9ff',
    },
    secondary: {
      main: '#3edec4',
      light: '#78f4df',
      dark: '#1ea392',
      contrastText: '#041214',
    },
    background: {
      default: '#070b17',
      paper: '#0f172a',
    },
    text: {
      primary: '#eef3ff',
      secondary: '#99a7cb',
    },
    divider: 'rgba(148, 163, 184, 0.2)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.35rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.9rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.45rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          backgroundColor: '#070b17',
          backgroundImage: `
            radial-gradient(circle at 12% 18%, rgba(124, 140, 255, 0.22) 0%, rgba(124, 140, 255, 0) 42%),
            radial-gradient(circle at 88% 8%, rgba(62, 222, 196, 0.18) 0%, rgba(62, 222, 196, 0) 35%),
            linear-gradient(180deg, #0b1020 0%, #070b17 100%)
          `,
          color: '#eef3ff',
        },
        '#root': {
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          padding: '10px 18px',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 20,
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 16px 40px rgba(2, 6, 23, 0.45)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          transition: 'border-color 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
          },
        },
      },
    },
  },
});

export default theme;
