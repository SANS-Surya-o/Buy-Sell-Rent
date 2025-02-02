export const BASE_URL = 'http://localhost:5000';


// Users API
const USERS_URL = `${BASE_URL}/api/users`;
export const LOGIN_URL = `${USERS_URL}/login`;
export const SIGNUP_URL = `${USERS_URL}`;
export const LOGOUT_URL = `${USERS_URL}/logout`;
export const PROFILE_URL = `${USERS_URL}/profile`;

// Products API
const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const GET_PRODUCTS_URL = `${PRODUCTS_URL}/getproducts`;
export const ADD_PRODUCT_URL = `${PRODUCTS_URL}/addproduct`;
export const GET_PRODUCT_DETAILS_URL = `${PRODUCTS_URL}/getproductdetails`;
export const ADD_TO_CART_URL = `${PRODUCTS_URL}/addtocart`;
export const GET_CART_ITEMS_URL = `${PRODUCTS_URL}/getcartitems`;


// Categories
export const categories = ['All', 'electronic', 'Clothing', 'Books', 'Beauty', 'Home', 'Other'];
