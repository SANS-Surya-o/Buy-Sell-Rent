import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, ThemeProvider, Toolbar, Typography, Box, Container } from '@mui/material';
import AppTheme from '../theme';
import Title from './title';
import '../index.css';
import Logout from '../auth/logout';

const Navbar = () => {

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
          <div className='navbar-center'>
            <ul className="menu menu-horizontal px-1 gap-4">
              <li><Link className="link link-hover" to="/Dashboard"><Typography variant="h6">Home</Typography></Link></li>
              <li><Link to="/products"><Typography variant="h6">Products</Typography></Link></li>
              <li><Link to="/orders"><Typography variant="h6">Orders</Typography></Link></li>
              <li><Link to="/deliver"><Typography variant="h6">Deliver</Typography></Link></li>
              <li><Link to="/sell"><Typography variant="h6">Sell</Typography></Link></li>
              <li><Link to="/support"><Typography variant="h6">Support</Typography></Link></li>

            </ul>
          </div>
          <div className="navbar-end gap-7">
            {/* <div className="dropdown dropdown-end"> */}
              <a tabIndex={0} role="button" className="btn btn-ghost btn-circle" href="/cart">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </a>
            {/* </div> */}

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 border-4 border-double rounded-2xl z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between" href="/profile">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a onClick={Logout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      {/* </Container> */}
      </Toolbar>
    </ ThemeProvider>
  );
}

export default Navbar;
