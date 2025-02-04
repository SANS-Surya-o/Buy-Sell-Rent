import express from "express";
import authenticateUser from "../middlewares/authenticate.js";
import { getProducts,AddProduct, getProductDetails, addToCart, getCartItems, buyFromCart, updateCart, getOrders, getPendingOrders, closeTransaction } from "../controllers/productController.js";


// The router lets you aplit the main url into separate files: for eg, here without router you would have to use router.route("/api/users") 
const router = express.Router();


router.route("/getproducts").get(authenticateUser,getProducts);
router.route("/addproduct").post(authenticateUser, AddProduct);
router.route("/getproductdetails/:id").get(authenticateUser, getProductDetails);
router.route("/addtocart").post(authenticateUser, addToCart);
router.route("/getcartitems").get(authenticateUser, getCartItems);
router.route("/buyfromcart").post(authenticateUser, buyFromCart);
router.route("/updatecart").post(authenticateUser, updateCart);
router.route("/getorders").get(authenticateUser, getOrders);
router.route("/getpendingorders").get(authenticateUser, getPendingOrders);
router.route("/closetransaction").post(authenticateUser, closeTransaction);
export default router;


