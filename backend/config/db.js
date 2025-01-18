import mongoose from "mongoose";
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try{
        console.log(`Attempting connection to Database`);
        await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Successfully connected to Database`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;