import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ThemeProvider
} from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SendIcon from '@mui/icons-material/Send';
import UserIcon from '@mui/icons-material/Person';
import { SUPPORT_URL } from "../constants";
import AppTheme from '../theme';
const SupportChat = () => {
  const [chatHistory, setChatHistory] = useState([{
    text: "Hello! I'm your AI assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, sender: 'user', timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch(SUPPORT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
      
      const data = await response.json();
      if (response.ok) {
        const aiMessage = { 
          text: data.response, 
          sender: 'ai', 
          timestamp: new Date() 
        };
        setChatHistory(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, {
        text: "Sorry, I'm having trouble responding right now.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
    
    setIsLoading(false);
  };

  const clearChatHistory = () => {
    setChatHistory([{
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }]);
    setIsDialogOpen(false);
  };

  return (
    <ThemeProvider theme = {AppTheme} >
    <Box sx={{ 
      height: '90vh', 
      display: 'flex', 
      flexDirection: 'column', 
      p: 2,
    }}>
      <Paper elevation={4} sx={{ 
        flex: 1, 
        mb: 2, 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        // bgcolor: '#ffffff',
        color: "white",
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" sx={{ 
          p: 2.5, 
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: "black",
          fontWeight: 600,
          letterSpacing: 0.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               AI Support Chat
          </Box>
          <IconButton 
            onClick={() => setIsDialogOpen(true)}
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ClearAllIcon />
          </IconButton>
        </Typography>
        
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#555'
            }
          }
        }}>
          {chatHistory.map((message, index) => (
            <Fade in={true} key={index}>
              <Box sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: 1
              }}>
                <Avatar sx={{ 
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                  width: 32,
                  height: 32,
                  animation: message.sender === 'ai' ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(33, 150, 243, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0)' }
                  }
                }}>
                  {message.sender === 'user' ? <UserIcon /> : 'AI'}
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.50',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: message.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.text}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute',
                      bottom: -20,
                      right: message.sender === 'user' ? 0 : 'auto',
                      left: message.sender === 'ai' ? 0 : 'auto',
                      color: 'text.secondary'
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Avatar sx={{width: 32, height: 32 }}>
              </Avatar>
              <CircularProgress size={20} />
            </Box>
          )}
          <div ref={chatEndRef} />
        </Box>
      </Paper>

      <Paper 
        component="form" 
        elevation={3}
        sx={{ 
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'white',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:focus-within': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)'
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{
            '& .MuiInput-underline:before': { borderBottom: 'none' },
            '& .MuiInput-underline:after': { borderBottom: 'none' },
            '& .MuiInput-underline:hover:before': { borderBottom: 'none' }
          }}
        />
        <IconButton 
          color="primary" 
          onClick={sendMessage}
          disabled={!userInput.trim() || isLoading}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.1)'
            },
            '&:disabled': {
              bgcolor: 'grey.300',
              color: 'grey.500'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle>Clear Chat History?</DialogTitle>
        <DialogContent>
          Are you sure you want to clear all chat messages?
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setIsDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={clearChatHistory}
            variant="contained" 
            color="error"
            startIcon={<ClearAllIcon />}
          >
            Clear Chat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </ThemeProvider>
  );
};

export default SupportChat;