// Packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

// utils
import connectDB from "./config/db.js";


// Routes
import userRoutes from "./routes/userRoutes.js";





const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();


const PORT = process.env.PORT || 5000;


connectDB();

app.use('/api/users', userRoutes);


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})