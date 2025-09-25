import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Container,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { MainContent, SectionContainer } from '../../styles/globalStyles';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      severity: 'success'
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com'
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <LocationIcon />,
      title: 'Location',
      value: 'San Francisco, CA',
      link: null
    },
    {
      icon: <LinkedInIcon />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile'
    },
    {
      icon: <GitHubIcon />,
      title: 'GitHub',
      value: 'github.com/yourusername',
      link: 'https://github.com/yourusername'
    }
  ];

  return (
    <MainContent>
      <Container maxWidth="lg">
        {/* Header Section */}
        <SectionContainer>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </Typography>
          </Box>
        </SectionContainer>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <SectionContainer>
              <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
                Send Me a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </SectionContainer>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <SectionContainer>
              <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {contactInfo.map((info, index) => (
                  <Card key={index} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ color: 'primary.main' }}>
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          {info.title}
                        </Typography>
                        {info.link ? (
                          <Typography
                            variant="body2"
                            component="a"
                            href={info.link}
                            sx={{
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {info.value}
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            {info.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            </SectionContainer>

            {/* Additional Info */}
            <SectionContainer>
              <Typography variant="h5" component="h3" gutterBottom>
                Let's Connect
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question, want to collaborate, or just want to say hi, 
                I'd love to hear from you!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                I typically respond to messages within 24 hours. For urgent matters, 
                feel free to call or text me directly.
              </Typography>
            </SectionContainer>
          </Grid>
        </Grid>

        {/* Snackbar for form submission feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </MainContent>
  );
};

export default Contact;
