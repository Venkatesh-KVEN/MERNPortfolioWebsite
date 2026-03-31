import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
   category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default:'UIUX',
        required: true
    }
})

export const Skills = mongoose.model("Skills", skillsSchema);

