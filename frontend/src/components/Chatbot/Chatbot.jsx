import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Avatar,
  Stack,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000/api/chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your resume copilot. Ask me for resume edits, interview prep, or role-specific guidance.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          thread_id: threadId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      setThreadId(data.thread_id);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: { xs: '72vh', md: '76vh' },
          minHeight: { xs: 520, md: 600 },
          maxHeight: 780,
          overflow: 'hidden',
          borderRadius: 4,
          border: '1px solid rgba(148, 163, 184, 0.25)',
          backgroundColor: 'rgba(9, 14, 30, 0.72)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 35px 80px rgba(2, 6, 23, 0.55)',
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.75, sm: 2.25 },
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background:
              'linear-gradient(90deg, rgba(124, 140, 255, 0.12) 0%, rgba(62, 222, 196, 0.08) 100%)',
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #7c8cff 0%, #3edec4 100%)',
                color: '#041214',
              }}
            >
              <SmartToyRoundedIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                Career Assistant
              </Typography>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'secondary.main',
                    boxShadow: '0 0 10px rgba(62, 222, 196, 0.9)',
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Online and ready to help
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row" spacing={0.75} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <AutoAwesomeRoundedIcon fontSize="small" color="secondary" />
            <Typography variant="body2" color="text.secondary">
              Powered by AI
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 1.5, sm: 2.25 },
            backgroundColor: 'transparent',
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(15, 23, 42, 0.4)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(124, 140, 255, 0.4)',
              borderRadius: 999,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(124, 140, 255, 0.6)',
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Stack
                direction={message.role === 'user' ? 'row-reverse' : 'row'}
                spacing={1.2}
                sx={{
                  alignItems: 'flex-start',
                  maxWidth: { xs: '93%', sm: '82%', md: '74%' },
                }}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor:
                      message.role === 'user' ? 'primary.dark' : 'secondary.dark',
                  }}
                >
                  {message.role === 'user' ? (
                    <PersonRoundedIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <SmartToyRoundedIcon sx={{ fontSize: 18 }} />
                  )}
                </Avatar>
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.75,
                    py: 1.35,
                    borderRadius: 3,
                    border: '1px solid rgba(148, 163, 184, 0.22)',
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(135deg, rgba(87, 103, 230, 0.95) 0%, rgba(124, 140, 255, 0.9) 100%)'
                        : 'rgba(15, 23, 42, 0.76)',
                    color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {message.content}
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          ))}
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: 'flex-start',
                }}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor: 'secondary.dark',
                  }}
                >
                  <SmartToyRoundedIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.75,
                    py: 1.2,
                    borderRadius: 3,
                    border: '1px solid rgba(148, 163, 184, 0.22)',
                    backgroundColor: 'rgba(15, 23, 42, 0.76)',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={16} color="secondary" />
                    <Typography variant="body2" color="text.secondary">
                      Thinking...
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1.25,
            px: { xs: 1.5, sm: 2.25 },
            py: { xs: 1.5, sm: 2 },
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            backgroundColor: 'rgba(2, 6, 23, 0.35)',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask anything about your resume or interviews..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            sx={{
              '& .MuiInputBase-input': {
                py: 1.2,
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'text.secondary',
                opacity: 1,
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{
              alignSelf: 'flex-end',
              width: 46,
              height: 46,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #7c8cff 0%, #3edec4 100%)',
              color: '#041214',
              boxShadow: '0 10px 20px rgba(62, 222, 196, 0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #90a0ff 0%, #68edd8 100%)',
              },
              '&.Mui-disabled': {
                background: 'rgba(148, 163, 184, 0.25)',
                color: 'rgba(238, 243, 255, 0.45)',
              },
            }}
          >
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;


