import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    file:String,
    resumeKey:String,
    mimeType:String,
    size:Number,
    originalName: String
})

export default mongoose.model('Resume', resumeSchema)