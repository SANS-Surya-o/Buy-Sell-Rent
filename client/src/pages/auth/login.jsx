import React, { use } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LOGIN_URL } from '../../constants';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import { ThemeProvider } from '@emotion/react';
import AppTheme from '../../theme';

import Title from '../../components/title';

import { useNavigate } from 'react-router-dom';


const SignInContainer = styled(Stack)(({ theme }) => ({
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

const Card = styled(MuiCard)(({ theme }) => {
  return ({
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  });
});

const Login = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [invalidCred, setInvalidCred] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateInputs()) return;
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    try {
      await axios.post(LOGIN_URL, {
        email: email.value,
        password: password.value
      }, {
        withCredentials: true
      });

      // Navigate to the dashboard
      navigate('/dashboard');
    }
    catch (err) {
      console.log(err);
      setInvalidCred(true);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@+\S+\.iiit\.ac\.in$/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid IIIT email address.');
      isValid = false;
    }
    else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Password .');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={AppTheme}>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card
        >

          <Title variant="h5" motto={false} />
          <Typography
            component="h10"
            variant="h5"
            sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 2rem)' }}
            marginBottom={3}
          >
            Sign-in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                autoComplete="students.iiit.ac.in, research.iiit.ac.in"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                size='small'
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                size='small'
              />
            </FormControl>
            {invalidCred && (
              <Typography color="error">
                Invalid email or password. Please try again.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              style={{ marginTop: '2rem' }}
            >
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </Typography>

        </Card>
      </SignInContainer>
    </ThemeProvider>
  );

};

export default Login;

