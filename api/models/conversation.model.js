import mongoose from "mongoose";

const { Schema } = mongoose;

const consersationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    seelerId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    readBySeller: {
        type: Boolean,
        required: true,
    },
    readByBuyer: {
        type: Boolean,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    },

},
    {
        timestamps: true
    })

export default mongoose.model("Conversation", consersationSchema);