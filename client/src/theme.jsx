import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';


const AppTheme = createTheme({
  // Background color
  palette: {
    background:{
      default:"#000000",
    },
    primary:{
      main:"#000000",
    },
    secondary:{
      main:"#f50057"
    }
  },
  typography:{
    fontFamily: 'Inter',
  },
  // add a border to every container and card
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '5px double black',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          border: '4px double black',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '4px double black',
        },
      },
    },
  },
});

export default AppTheme;