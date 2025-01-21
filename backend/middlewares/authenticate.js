import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const authenticateUser = asyncHandler(async (req, res , next) => {
    let token;
    if (!req.cookies || !req.cookies.jwt){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
    token = req.cookies.jwt;
    try {
        const id_from_token = jwt.verify(token, process.env.TOKEN_SECRET).id;
        req.user = await User.findById(id_from_token).select('-password');  // Exclude password in the response 
        next();
    }catch(error){
        res.status(401);
        throw new Error('Not authorized, token failed');
    }

});

export default authenticateUser;