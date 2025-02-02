import React from 'react'
import  Navbar  from '../components/Navbar';
import { Link } from 'react-router-dom';


const Intro = () => {
  return (
    <>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
    </>
  )
}

export default Intro;
