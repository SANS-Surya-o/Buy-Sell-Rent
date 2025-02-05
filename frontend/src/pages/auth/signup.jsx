import React from 'react';
import { useState } from 'react';
import { SIGNUP_URL } from '../../constants';
import axios from 'axios';

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

import AppTheme from '../../theme';
import { ThemeProvider } from '@emotion/react';

import Title from '../../components/title';
import { useNavigate } from 'react-router-dom';




const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const Card = styled(MuiCard)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(1),
    margin: 'auto',
    paddingTop: theme.spacing(6),
    // contain all elements insie the card


    // paddingBottom: theme.spacing(75),
    // marginBottom: theme.spacing(100),
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));



const signUp = () => {
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [invalidCred, setInvalidCred] = useState(false);
    const navigate = useNavigate();



    const validateInputs = () => {
        let isValid = true;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (!firstName.value || !/^[a-zA-Z]+$/.test(firstName.value)) {
            setFirstNameError(true);
            setFirstNameErrorMessage('Please enter a valid first name.');
            isValid = false;
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        }

        if (!lastName.value || !/^[a-zA-Z]+$/.test(lastName.value)) {
            setLastNameError(true);
            setLastNameErrorMessage('Please enter a valid last name.');
            isValid = false;
        } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
        }

        if (!email.value || !/^\S+@(students|research)\.iiit\.ac\.in$/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid IIIT email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage('Please enter a password.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        try {
            await axios.post(SIGNUP_URL, {
                firstName: firstName.value,
                lastName: lastName.value,
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




    return (
        <ThemeProvider theme={AppTheme}>
            <SignUpContainer>
                <Card
                >
                    <Title variant="h5" />
                    <Typography
                        component="h10"
                        variant="h5"
                        sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 2rem)' }}
                        marginBottom={3}
                    >
                        Sign-Up
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
                            <FormLabel htmlFor="firstname">First Name</FormLabel>
                            <TextField
                                error={firstNameError}
                                helperText={firstNameErrorMessage}
                                id="firstName"
                                type="text"
                                name="firstName"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                size="small"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="lastname">Last Name</FormLabel>
                            <TextField
                                error={lastNameError}
                                helperText={lastNameErrorMessage}
                                id="lastName"
                                type="text"
                                name="lastName"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                size='small'
                            />
                        </FormControl>

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
                                size="small"
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
                                size="small"
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
                            Sign Up
                        </Button>
                    </Box>
                    <Divider>or</Divider>
                    <Typography textAlign={'center'}>
                        Already Have an account ?{' '}
                        <Link
                            href="/login"
                            underline="hover">
                            Sign in
                        </Link>
                    </Typography>

                </Card>
            </SignUpContainer>
        </ThemeProvider>

    );
}

export default signUp;