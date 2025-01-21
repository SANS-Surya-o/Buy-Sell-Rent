import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/createToken.js';



// Function needs to be async as it involves DB operations: 
// 1. Handling concurrent requests
// 2. Prevent server blovking - DB operations are slow



// Create new user, return details and cookie
const createUser = asyncHandler(async (req, res) => {
    const details = req.body;
    if (!details){
        res.status(400);
        throw new Error('Req Body empty: No data received');
    }

    const { firstName, lastName, email , password} = details;

    // Verify
    if (!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error('Invalid data');
    };
    // Check if email already exists
    if (await User.findOne({email}))
    {
        res.status(400);
        throw new Error('User already exists');
    }

    //Encrypt user password
    const salt = await bcrypt.genSalt(10); 
    // The salt is stored in the hashedpassword tself, bcrypt will extract it and use it to hash the password later
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User Instance - updation of details will be done in profile
    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    });
    if (!user){
        res.status(400);
        throw new Error('User could not be created');
    }
    
    generateToken(res, user._id.toString());


    if (process.env.NODE_ENV === 'b_development'){
        console.log('User created: ', {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    }

    res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });

});    

const loginUser = asyncHandler( async(req, res)=>{
    const {email, password} = req.body;

    if (!email || !password){
        res.status(400);
        throw new Error('Invalid data');
    }

    const user = await User.findOne({email});
    if (!user){
        res.status(400);
        throw new Error('User does not exist');
    }

    // User exists
    if (await bcrypt.compare(password, user.password)){
        
        if (process.env.NODE_ENV === 'b_development'){
            console.log('User logged in: ', {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin
            });
        }
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
    // Invalid Password
        res.status(400);
        throw new Error('Invalid password');
    }

});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "" , {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        message: 'User logged out'
    });
});



const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user){
        res.status(400);
        throw new Error('User not found');
    }
    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        contactNumber: user.contactNumber,
    });


});

const updateCUrrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user)
    {
        res.status(400);
        throw new Error('User not found');
    }

    if (req.body.firstName){
        user.firstName = req.body.firstName;
    }
    if (req.body.lastName){
        user.lastName = req.body.lastName;
    }
    if (req.body.email){
        user.email = req.body.email;
    }
    if (req.body.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.age){
        user.age = req.body.age;
    }
    if (req.body.contactNumber){
        user.contactNumber = req.body.contactNumber;
    }
    const updatedUser = await user.save();
    if (updatedUser)
    {
        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            age: updatedUser.age,
            contactNumber: updatedUser.contactNumber,
        });
    }
    else{
        res.status(400);
        throw new Error('User could not be updated');
    }
});


// Implement later 
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cannot delete admin user");
      }
  
      await User.deleteOne({ _id: user._id });
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  });

export { createUser, loginUser, logoutUser , getUserProfile, updateCUrrentUserProfile, deleteUserById };