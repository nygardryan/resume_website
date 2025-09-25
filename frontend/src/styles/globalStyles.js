import { styled } from '@mui/material/styles';

// Global styled components that can be easily customized
export const PageContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

export const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

export const SectionContainer = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

export const FlexContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

// Custom utility classes
export const textCenter = {
  textAlign: 'center',
};

export const fullWidth = {
  width: '100%',
};

export const marginTop = (spacing) => ({
  marginTop: spacing,
});

export const marginBottom = (spacing) => ({
  marginBottom: spacing,
});

export const padding = (spacing) => ({
  padding: spacing,
});
