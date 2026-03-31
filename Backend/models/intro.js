import mongoose from "mongoose";

const introSchema = new mongoose.Schema({
    welcomeText: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String, required: true },
    captions: [{ type: String }]

});

export const Intro = mongoose.model("Intro", introSchema);
