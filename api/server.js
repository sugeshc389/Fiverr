import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {


    try {
        await mongoose.connect(process.env.MONGO);
        console.log("DB Connected");
    } catch (err) {
        console.log(err);
    }

}




app.listen(8800, () => {
    connect();
    console.log("Server is Running");
})