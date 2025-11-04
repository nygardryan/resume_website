import React from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { MainContent, SectionContainer } from '../../styles/globalStyles';

const Home = () => {
  const handleDownloadResume = () => {
    // Placeholder for resume download functionality
    console.log('Download resume clicked');
  };

  const handleContactMe = () => {
    // Placeholder for contact functionality
    console.log('Contact me clicked');
  };

  return (
    <MainContent>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <SectionContainer>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Welcome to My Portfolio
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Software Engineer & Developer
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '600px', mx: 'auto' }}>
              Passionate about creating innovative solutions and building amazing user experiences. 
              Explore my work and get to know more about my journey in software development.
            </Typography>
          </Box>
        </SectionContainer>
      </Container>
    </MainContent>
  );
};

export default Home;
