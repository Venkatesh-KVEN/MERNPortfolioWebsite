import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    resumeKey:String,
    mimeType:String,
    size:Number
},
{timestamps:true})

export default mongoose.model('Resume', resumeSchema)