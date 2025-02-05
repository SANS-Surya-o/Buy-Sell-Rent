import {Navigate,Outlet } from 'react-router-dom';
import Authenticate from './authenticate';
import Navbar from '../components/Navbar';

const PrivateRoute = () => {
    const userInfo = Authenticate();
    return userInfo ? (
        <>
        <Navbar />
        <Outlet />
        </>
    ) : (
        <Navigate to="/landing" />
    );
};

export default PrivateRoute;