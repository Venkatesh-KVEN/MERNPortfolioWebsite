import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    default: "Skills & Technologies"
  },
  description: {
    type: String,
    default: "Here are some of my works"
  },
});

// ✅ prevent overwrite error
const SkillSection =
  mongoose.models.SkillSection ||
  mongoose.model("SkillSection", skillSchema);

export default SkillSection;