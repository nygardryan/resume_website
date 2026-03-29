import { styled } from '@mui/material/styles';

// Global styled components that can be easily customized
export const PageContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
}));

export const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4, 3, 6),
  maxWidth: '1240px',
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2, 5),
  },
}));

export const SectionContainer = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(4.5),
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.82)',
  borderRadius: 20,
  border: '1px solid rgba(255, 255, 255, 0.92)',
  boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
  backdropFilter: 'blur(14px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    borderRadius: 16,
  },
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
