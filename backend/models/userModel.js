import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    // Allow only emails ending with @students.iiit.ac.in -- yet to be done
    email : {type: String, required: true, unique: true, index: true, dropDups: true},
    // age: { type: Number, required: true},
    // contactNumber: { type: Number, required:true},
    // // store encrypted password
    // password: { type: String, required: true},
    // items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    // sellerReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    // isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model('User', userSchema);
export default User;