import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,

    },
    isSeller: {
        type: Boolean,
        default: false,

    },
    whishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gig" }]





},
    {
        timestamps: true
    })


export default mongoose.model("User", userSchema);