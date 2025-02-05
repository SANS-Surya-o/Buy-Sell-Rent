import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import Intro from './pages/intro.jsx';
import Login from './pages/auth/login.jsx';
import SignUp from './pages/auth/signup.jsx';
import Dashboard from './pages/dashboard.jsx';
import Profile from './pages/profile.tsx';
import Products from './pages/products.jsx';
import ProductDetails from './pages/productDetails.jsx';
import Cart from './pages/cart.jsx';
import Orders from './pages/orders.jsx';
import Deliver from './pages/deliver.jsx';
import PrivateRoute from './auth/privateRoute.jsx';
import Support from "./pages/support.jsx";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sell from './pages/sell.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <>
      {/* <GoogleReCaptchaProvider reCaptchaKey="6LfTpswqAAAAAN6c_CFGoFq20ZfTKYTAJmP417Su"> */}
  <Router>
    <Routes>
      <Route path="/landing" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
          {/* Registered Users */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/deliver" element={<Deliver />} />
          <Route path="/support" element={<Support />} />
          {/* </Route> */}
        </Route>
    </Routes>
  </Router>
  <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* </GoogleReCaptchaProvider> */}
  </>
);
       
        
  

     

