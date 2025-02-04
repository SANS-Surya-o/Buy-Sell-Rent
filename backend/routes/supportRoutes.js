import express from "express";
import { createUser, loginUser, logoutUser, getUserProfile, updateCUrrentUserProfile } from "../controllers/userController.js";
import authenticateUser from "../middlewares/authenticate.js";
import  processChatRequest  from "../controllers/supportController.js"

const router = express.Router();


router.route("/").post( processChatRequest );

export default router;
