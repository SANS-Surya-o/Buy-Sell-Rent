import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
{
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    // Allow only emails ending with @students.iiit.ac.in -- yet to be done
    email : {type: String, required: true, unique: true, index: true, dropDups: true},
    age: { type: Number},
    contactNumber: { type: Number},
    // store encrypted password
    password: { type: String},
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    // sellerReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    isAdmin: { type: Boolean, required: true, default: false },
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;