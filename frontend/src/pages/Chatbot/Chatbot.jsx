import React from 'react';
import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Chatbot from '../../components/Chatbot/Chatbot';

const starterPrompts = [
  'Improve my resume summary for a product role',
  'Give me 5 behavioral interview questions',
  'Rewrite my bullet points with stronger action verbs',
];

const ChatbotPage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        py: { xs: 3, md: 5 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: { xs: 320, md: 480 },
            height: { xs: 320, md: 480 },
            filter: 'blur(70px)',
            opacity: 0.7,
          },
          '&::before': {
            top: { xs: -160, md: -200 },
            right: { xs: -90, md: -100 },
            background: 'radial-gradient(circle, rgba(124, 140, 255, 0.65) 0%, rgba(124, 140, 255, 0) 70%)',
          },
          '&::after': {
            bottom: { xs: -180, md: -220 },
            left: { xs: -110, md: -120 },
            background: 'radial-gradient(circle, rgba(62, 222, 196, 0.55) 0%, rgba(62, 222, 196, 0) 70%)',
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1.5 }}>
            <AutoAwesomeIcon color="secondary" fontSize="small" />
            <Typography
              variant="overline"
              sx={{ color: 'secondary.light', letterSpacing: '0.18em', fontWeight: 700 }}
            >
              AI Resume Copilot
            </Typography>
          </Stack>
          <Typography variant="h2" component="h1" gutterBottom sx={{ px: 1 }}>
            Your sleek, all-in-one chatbot workspace
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 720, mx: 'auto', px: 1 }}
          >
            Ask for resume rewrites, interview prep, and tailored career advice in one focused, dark-mode experience.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mb: { xs: 2.5, md: 3 } }}
        >
          {starterPrompts.map((prompt) => (
            <Chip
              key={prompt}
              label={prompt}
              sx={{
                color: 'text.primary',
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                backdropFilter: 'blur(6px)',
              }}
            />
          ))}
        </Stack>

        <Chatbot />
      </Container>
    </Box>
  );
};

export default ChatbotPage;

