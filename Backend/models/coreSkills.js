import mongoose from "mongoose";


const coreSkillsSchema = new mongoose.Schema({
    icon: { type: String },
    iconImageKey: String,
    iconImageMimeType: String,
    iconImageSize: Number,
    title: { type: String, required: true },
    description: { type: String, required: true },
})

export const CoreSkills = mongoose.model("CoreSkills", coreSkillsSchema);
