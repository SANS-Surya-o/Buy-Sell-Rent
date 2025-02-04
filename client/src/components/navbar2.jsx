import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, ThemeProvider, Toolbar, Typography, Box, Container } from '@mui/material';
import AppTheme from '../theme';
import Title from './title';
import '../index.css';
import Logout from '../auth/logout';

const Navbar2 = () => {

  return (
    <ThemeProvider theme={AppTheme}>
      <Toolbar
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        borderWidth: '3px',
        borderStyle: 'dashed',
      }}
      >

        <div className="navbar h-1">
          <div className="navbar-start">
            <a className="btn btn-dash"><Title variant="h9" /></a>
          </div>
          <div className='navbar-end'>
            <ul className="menu menu-horizontal px-1 gap-4">
              <li><Link to="/login"><Typography variant="h5" sx={{ fontWeight: "bold"}}>Login</Typography></Link></li>
              <li><Link to="/signup"><Typography variant="h5" sx={{ fontWeight: "bold"}}>Signup</Typography></Link></li>

            </ul>
          </div>
        </div>

      {/* </Container> */}
      </Toolbar>
    </ ThemeProvider>
  );
}

export default Navbar2;
