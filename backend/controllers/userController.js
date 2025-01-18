import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createUser = asyncHandler(async (req, res) => {
    // res.send('Testing create user');
    const { firstName, lastName, email } = req.body;
    console.log(firstName, lastName, email);
    const user = await User.create({ firstName, lastName, email });
    if (!user){
        res.status(400);
        throw new Error('Invalid data');
    }
    res.status(201).json(user);
});     

export { createUser };