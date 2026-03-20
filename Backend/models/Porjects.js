import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageKey: String,     
  imageMimeType: String,  
  imageSize: Number, 
  order:{
    type:Number,
    default:0,
    index:true
  },
  technologies: [{
        type: String,
        trim: true
    }],
  projectUrl:String,
  createdAt: { type: Date, default: Date.now }    
})

const Projects = mongoose.model('Project', projectSchema);
export default Projects;