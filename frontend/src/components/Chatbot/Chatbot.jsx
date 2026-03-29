import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Avatar,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const API_URL = 'http://localhost:8000/api/chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I can help answer questions about resumes and interview preparation. How can I assist you today?',
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

  const handleKeyPress = (e) => {
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
        height: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        padding: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '600px',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.84)',
          border: '1px solid rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
              <SmartToyIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="subtitle1" fontWeight={600}>
              Resume Assistant
            </Typography>
          </Box>
          <Chip size="small" color="primary" variant="outlined" label="Online" />
        </Box>

        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: 2,
            backgroundColor: 'rgba(247, 250, 255, 0.75)',
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent:
                  message.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  maxWidth: '70%',
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor:
                      message.role === 'user' ? 'primary.main' : 'secondary.main',
                  }}
                >
                  {message.role === 'user' ? (
                    <PersonIcon />
                  ) : (
                    <SmartToyIcon />
                  )}
                </Avatar>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 1.5,
                    backgroundColor:
                      message.role === 'user' ? 'primary.main' : 'rgba(255,255,255,0.92)',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2.5,
                    border: message.role === 'user' ? 'none' : '1px solid rgba(15, 23, 42, 0.08)',
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                </Paper>
              </Box>
            </Box>
          ))}
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                  <SmartToyIcon />
                </Avatar>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 1.5,
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    borderRadius: 2.5,
                  }}
                >
                  <CircularProgress size={20} />
                </Paper>
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Container */}
        <Box
          sx={{
            display: 'flex',
            padding: 2,
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'rgba(255,255,255,0.84)',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            sx={{
              marginRight: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{
              alignSelf: 'flex-end',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
                color: 'action.disabled',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;


