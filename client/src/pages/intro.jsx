import React from 'react'
import  Navbar  from '../components/Navbar';
import { Link } from 'react-router-dom';
import Navbar2 from '../components/navbar2';
import  Dashboard  from '../pages/dashboard';


const Intro = () => {
  return (
    <>
    <Navbar2 />
    <Dashboard />
    </>
  )
}

export default Intro;
