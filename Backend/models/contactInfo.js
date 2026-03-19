import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
    heading: { type: String, required:true},
    description: { type: String, required:true },
});

export const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
