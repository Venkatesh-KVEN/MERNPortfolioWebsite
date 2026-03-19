import mongoose from "mongoose";


const coreSkillsSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})

export const CoreSkills = mongoose.model("CoreSkills", coreSkillsSchema);
