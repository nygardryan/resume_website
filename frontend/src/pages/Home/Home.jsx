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
            <Box sx={{ mt: 4, gap: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadResume}
              >
                Download Resume
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                onClick={handleContactMe}
              >
                Contact Me
              </Button>
            </Box>
          </Box>
        </SectionContainer>

        {/* Quick Info Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn more about my background, skills, and what drives my passion for technology.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  My Work
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore my professional experience, projects, and technical expertise.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Get In Touch
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ready to collaborate? Let's discuss your next project or opportunity.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <SectionContainer sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Work Together?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            I'm always interested in new opportunities and exciting projects. 
            Let's connect and see how we can create something amazing together.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<EmailIcon />}
            onClick={handleContactMe}
            sx={{ mt: 2 }}
          >
            Start a Conversation
          </Button>
        </SectionContainer>
      </Container>
    </MainContent>
  );
};

export default Home;
