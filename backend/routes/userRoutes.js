import express from "express";
import { createUser, loginUser, logoutUser, getUserProfile, updateCUrrentUserProfile } from "../controllers/userController.js";
import authenticateUser from "../middlewares/authenticate.js";


// The router lets you aplit the main url into separate files: for eg, here without router you would have to use router.route("/api/users") 
const router = express.Router();


router.route("/").post(createUser);

// Login, logout
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get( authenticateUser, getUserProfile).put(authenticateUser, updateCUrrentUserProfile);



export default router;