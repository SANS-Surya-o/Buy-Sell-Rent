import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, CssBaseline, Container, Avatar,Divider, Paper, TextField, Typography, CircularProgress, Alert, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { PROFILE_URL } from '../constants';
import AppTheme from '../theme';
import {styled } from '@mui/system';




const Background = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    // backgroundColor: 'red'
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 100%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));


interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  contactNumber?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(PROFILE_URL,{ withCredentials: true });
      setProfile(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(PROFILE_URL, profile, { withCredentials: true });
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading && !profile) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    {/* <Navbar /> */}
      <ThemeProvider theme={AppTheme}>
        <Background>
      <Container maxWidth="sm"
      >
        <Box 
          my={4} 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              width: '100%', 
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // border: '5px solid gray',
              // borderStyle: 'double',
            }}
          >
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                fontSize: '2rem',
                mb: 2
              }}
            >
              {profile?.firstName ? profile.firstName[0].toUpperCase() : '?'}
            </Avatar>

            <Typography 
              variant="h5" 
              component="h1" 
              gutterBottom 
              sx={{ mb: 3, fontWeight: 500 }}
            >
              Profile
            </Typography>
            

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {profile && (
          <form onSubmit={handleUpdate}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={profile.firstName || ''}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={profile.lastName || ''}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            <Divider sx={{ my: 2 }} />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              disabled
              margin="normal"
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={profile.age || ''}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={profile.contactNumber || ''}
              onChange={handleChange}
              disabled={!isEditing}
              margin="normal"
            />
            
            <Box mt={3} display="flex" justifyContent="center" gap={2}>
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                      sx={{ 
                        minWidth: 120,
                        borderRadius: 2
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box display="flex" gap={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ 
                          minWidth: 120,
                          borderRadius: 2
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsEditing(false);
                          fetchProfile();
                        }}
                        sx={{ 
                          minWidth: 120,
                          borderRadius: 2
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
          </form>
        )}
        </Paper>
      </Box>
    </Container>
    </Background> 
    </ThemeProvider>
    </>
  );
};





export default Profile;

