import React from 'react';
import { Box, Container, Typography, Chip, Stack } from '@mui/material';
import Chatbot from '../../components/Chatbot/Chatbot';
import { MainContent, SectionContainer } from '../../styles/globalStyles';

const ChatbotPage = () => {
  return (
    <MainContent>
      <Container maxWidth="lg">
        <SectionContainer>
          <Box sx={{ textAlign: 'center', py: { xs: 1, md: 2 } }}>
            <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
              <Chip label="AI Assistant" color="secondary" variant="outlined" />
            </Stack>
            <Typography variant="h2" component="h1" gutterBottom>
              Chat with your resume copilot
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Ask questions about experience, interview preparation, and role fit. The assistant keeps context across messages.
            </Typography>
          </Box>
          <Chatbot />
        </SectionContainer>
      </Container>
    </MainContent>
  );
};

export default ChatbotPage;


