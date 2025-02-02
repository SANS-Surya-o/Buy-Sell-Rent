import express from "express";
import { createUser, loginUser, logoutUser, getUserProfile, updateCUrrentUserProfile } from "../controllers/userController.js";
import authenticateUser from "../middlewares/authenticate.js";
import { getProducts,AddProduct, getProductDetails, addToCart, getCartItems } from "../controllers/productController.js";


// The router lets you aplit the main url into separate files: for eg, here without router you would have to use router.route("/api/users") 
const router = express.Router();


router.route("/getproducts").get(authenticateUser,getProducts);
router.route("/addproduct").post(authenticateUser, AddProduct);
router.route("/getproductdetails/:id").get(authenticateUser, getProductDetails);
router.route("/addtocart").post(authenticateUser, addToCart);
router.route("/getcartitems").get(authenticateUser, getCartItems);
export default router;

