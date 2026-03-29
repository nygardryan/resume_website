import React from 'react';
import {
  Typography,
  Box,
  Button,
  Grid,
  Container,
  Chip,
  Stack,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Download as DownloadIcon,
  SmartToy as SmartToyIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';
import { MainContent, SectionContainer } from '../../styles/globalStyles';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleDownloadResume = () => {
    // Placeholder for resume download functionality
    console.log('Download resume clicked');
  };

  const highlights = [
    {
      title: 'Product-minded engineering',
      description: 'I build performant, reliable, and accessible applications with maintainable architecture.',
      icon: <WorkspacePremiumIcon color="primary" />,
    },
    {
      title: 'Fast execution',
      description: 'From idea to shipped feature, I prioritize iteration speed without sacrificing quality.',
      icon: <BoltIcon color="primary" />,
    },
    {
      title: 'AI-powered workflows',
      description: 'Use the integrated assistant to explore resume details and interview preparation tips.',
      icon: <SmartToyIcon color="primary" />,
    },
  ];

  return (
    <MainContent>
      <Container maxWidth="lg">
        <SectionContainer>
          <Box
            sx={{
              textAlign: { xs: 'left', md: 'center' },
              py: { xs: 1, md: 3 },
              px: { xs: 0, md: 1 },
            }}
          >
            <Stack direction="row" justifyContent={{ xs: 'flex-start', md: 'center' }} sx={{ mb: 2 }}>
              <Chip label="Available for new opportunities" color="primary" variant="outlined" />
            </Stack>
            <Typography variant="h1" component="h1" gutterBottom>
              Designing and shipping modern digital experiences.
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{ maxWidth: 800, mx: { md: 'auto' }, mb: 4 }}
            >
              I am a software engineer focused on building elegant, scalable web products with strong UX and clean code.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent={{ xs: 'flex-start', md: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/about')}
              >
                Explore my work
              </Button>
              <Button variant="outlined" size="large" startIcon={<DownloadIcon />} onClick={handleDownloadResume}>
                Download resume
              </Button>
            </Stack>
          </Box>
        </SectionContainer>

        <SectionContainer>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 1 }}>
            Why teams enjoy working with me
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            A blend of engineering depth, collaboration, and outcome-driven execution.
          </Typography>
          <Grid container spacing={2.5}>
            {highlights.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.72)',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    height: '100%',
                  }}
                >
                  <Box sx={{ mb: 1.25 }}>{item.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>

        <SectionContainer>
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Ready to collaborate?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Let’s build something meaningful together.
              </Typography>
            </Box>
            <Button variant="contained" onClick={() => navigate('/contact')}>
              Start a conversation
            </Button>
          </Box>
        </SectionContainer>
      </Container>
      <ChatPanel />
    </MainContent>
  );
};

export default Home;
