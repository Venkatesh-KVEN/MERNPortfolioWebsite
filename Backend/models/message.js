import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
})

export const Message = mongoose.model("Message", messageSchema);
