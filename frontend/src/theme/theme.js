import { alpha, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#4f83ff',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed',
      light: '#9f67ff',
      dark: '#5b21b6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f3f6fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: alpha('#0f172a', 0.12),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 650,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.35rem',
      fontWeight: 650,
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
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 14,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(circle at 0% 0%, rgba(79, 131, 255, 0.18), transparent 45%), radial-gradient(circle at 100% 0%, rgba(159, 103, 255, 0.16), transparent 42%), #f3f6fc',
          minHeight: '100vh',
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
          borderRadius: 12,
          padding: '10px 18px',
        },
        containedPrimary: {
          boxShadow: `0 10px 24px ${alpha('#2563eb', 0.3)}`,
          '&:hover': {
            boxShadow: `0 14px 28px ${alpha('#2563eb', 0.36)}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha('#ffffff', 0.8)}`,
          boxShadow: `0 10px 30px ${alpha('#0f172a', 0.07)}`,
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 10px 24px ${alpha('#0f172a', 0.07)}`,
          borderRadius: 18,
          border: `1px solid ${alpha('#ffffff', 0.8)}`,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 16px 32px ${alpha('#0f172a', 0.1)}`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: `0 8px 24px ${alpha('#0f172a', 0.08)}`,
          backgroundColor: alpha('#ffffff', 0.78),
          color: '#0f172a',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${alpha('#ffffff', 0.9)}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: alpha('#ffffff', 0.84),
          '& fieldset': {
            borderColor: alpha('#0f172a', 0.16),
          },
        },
      },
    },
  },
});

export default theme;
