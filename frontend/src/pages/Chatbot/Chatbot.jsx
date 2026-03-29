import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Chatbot from '../../components/Chatbot/Chatbot';

const ChatbotPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Chatbot
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chat with Ryan's assistant about his background, projects, and best-fit resume version.
        </Typography>
      </Box>
      <Chatbot />
    </Container>
  );
};

export default ChatbotPage;


