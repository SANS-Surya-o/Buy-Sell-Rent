import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {
    console.log('Generating token');
    const token =  jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: `30d`,
    });

    if (!token){
        res.status(500);
        throw new Error('Token could not be generated');
    }
    // Set it in a  cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    
    return token;
};


export default generateToken;
