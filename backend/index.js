// Packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

// utils
import connectDB from "./config/db.js";








const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true                 // Allow cookies to be sent
  }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dotenv.config();
// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";


const PORT = process.env.PORT || 5000;


connectDB();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})