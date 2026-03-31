import mongoose from "mongoose";

const projectSectionSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    default: "My Projects"
  },
  description: {
    type: String,
    default: "Here are some of my works"
  },
  subTitle: {
    type: String,
    default: "Other Projects"
  }
});

// ✅ prevent overwrite error
const ProjectSection =
  mongoose.models.ProjectSection ||
  mongoose.model("ProjectSection", projectSectionSchema);

export default ProjectSection;